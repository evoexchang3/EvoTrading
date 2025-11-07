import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupWebSocket } from "./websocket";
import { setupCRMIntegration } from "./crm";
import { db } from "./db";
import type { Server } from "http";

const app = express();

// Trust first proxy (Caddy, nginx, etc.) for accurate rate limiting and client IP detection
// When behind a reverse proxy, this ensures X-Forwarded-For headers are trusted
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS;
if (CORS_ALLOWED_ORIGINS) {
  const origins = CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
  console.log(`✓ CORS enabled for origins: ${origins.join(', ')}`);
  app.use(cors({
    origin: origins,
    credentials: true
  }));
} else {
  console.log('⚠️  CORS_ALLOWED_ORIGINS not set - defaulting to deny-by-default for security');
  app.use(cors({
    origin: false
  }));
}

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);

const authRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth', authRateLimiter);
app.use('/api/crm', authRateLimiter);

console.log(`✓ Rate limiting enabled: ${RATE_LIMIT_MAX} requests per ${RATE_LIMIT_WINDOW_MS}ms`);

const LOG_FORMAT = process.env.LOG_FORMAT || 'plain';

function logRequest(method: string, path: string, statusCode: number, duration: number, responseData?: any) {
  if (LOG_FORMAT === 'json') {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      method,
      path,
      statusCode,
      duration,
      ...(responseData && { response: responseData })
    }));
  } else if (LOG_FORMAT === 'pretty') {
    const statusEmoji = statusCode >= 500 ? '🔴' : statusCode >= 400 ? '🟡' : '🟢';
    console.log(`${statusEmoji} ${method} ${path} → ${statusCode} (${duration}ms)`);
    if (responseData) {
      console.log(`   Response: ${JSON.stringify(responseData).substring(0, 100)}...`);
    }
  } else {
    let logLine = `${method} ${path} ${statusCode} in ${duration}ms`;
    if (responseData) {
      logLine += ` :: ${JSON.stringify(responseData)}`;
    }
    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }
    log(logLine);
  }
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      logRequest(req.method, path, res.statusCode, duration, capturedJsonResponse);
    }
  });

  next();
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

(async () => {
  // Setup CRM integration routes
  setupCRMIntegration(app);

  const server = await registerRoutes(app);

  // Setup WebSocket server
  setupWebSocket(server);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });

  setupGracefulShutdown(server);
})();

function setupGracefulShutdown(server: Server) {
  let isShuttingDown = false;

  const shutdown = async (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`\n${signal} received - initiating graceful shutdown...`);

    server.close(async (err) => {
      if (err) {
        console.error('Error during server shutdown:', err);
        process.exit(1);
      }

      console.log('✓ HTTP server closed');

      try {
        await db.$client.end();
        console.log('✓ Database connections closed');
      } catch (dbErr) {
        console.error('Error closing database connections:', dbErr);
      }

      console.log('✓ Graceful shutdown complete');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('⚠️  Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  console.log('✓ Graceful shutdown handlers registered');
}
