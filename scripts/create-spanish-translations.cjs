const fs = require('fs');
const path = require('path');

// Read extracted English translations
const extracted = fs.readFileSync(path.join(__dirname, 'extracted-en-translations.txt'), 'utf8');

// Professional Spanish translation mappings for trading/finance terminology
const termMappings = {
  'Trading Platform': 'Plataforma de Trading',
  'Web Platform': 'Plataforma Web',
  'Mobile Apps': 'Aplicaciones Móviles',
  'Market Data': 'Datos de Mercado',
  'Payment Gateway': 'Pasarela de Pago',
  'Trading API': 'API de Trading',
  'Customer Portal': 'Portal del Cliente',
  'Deposits': 'Depósitos',
  'Withdrawals': 'Retiros',
  'All Systems Operational': 'Todos los Sistemas Operativos',
  'Affected Systems': 'Sistemas Afectados',
  'Root Cause': 'Causa Raíz',
  'Resolution': 'Resolución',
  'Duration': 'Duración',
  'Impact': 'Impacto',
  'Severity': 'Gravedad',
  'Major': 'Mayor',
  'Moderate': 'Moderado',
  'Minor': 'Menor',
  'resolved': 'resuelto',
  'Scheduled Maintenance': 'Mantenimiento Programado',
  'System Update': 'Actualización del Sistema',
  'Security Patch': 'Parche de Seguridad',
  'Reason': 'Razón',
  'Affected Services': 'Servicios Afectados',
  'Incident History': 'Historial de Incidentes',
  'Date & Time': 'Fecha y Hora',
  'Status': 'Estado',
  'All trading services are currently running normally': 'Todos los servicios de trading están funcionando normalmente',
  'Last updated': 'Última actualización',
  'minutes ago': 'hace minutos',
  'minute ago': 'hace un minuto',
  'seconds ago': 'hace segundos',
  'hours ago': 'hace horas',
  'Database connection pool exhaustion': 'Agotamiento del pool de conexiones de base de datos',
  'high volatility': 'alta volatilidad',
  'Unavailable': 'No disponible',
  'Delayed': 'Retrasado',
  'Connection pool limits increased': 'Límites del pool de conexiones aumentados',
  'auto-scaling improved': 'auto-escalado mejorado',
  'Backup feed activated': 'Feed de respaldo activado',
  'rate limits renegotiated': 'límites de tasa renegociados',
  'DDoS attack mitigated': 'Ataque DDoS mitigado',
  'Enhanced DDoS protection': 'Protección DDoS mejorada',
  'memory leak': 'fuga de memoria',
  'Login Issues': 'Problemas de Inicio de Sesión',
  'Service restarted': 'Servicio reiniciado',
  'patched in': 'parcheado en',
  'CDN cache corruption': 'Corrupción de caché CDN',
  'Chart Data Not Loading': 'Datos del Gráfico No Cargan',
  'CDN cache purged': 'Caché CDN purgado',
  'refreshed': 'actualizado',
  'API endpoints responding normally': 'Endpoints API respondiendo normalmente',
  'Real-time price feeds streaming': 'Transmisión de feeds de precios en tiempo real',
  'All deposit methods accepting transactions': 'Todos los métodos de depósito aceptando transacciones',
  'Withdrawal processing normal': 'Procesamiento de retiros normal',
  'Mobile trading apps fully functional': 'Aplicaciones móviles de trading completamente funcionales',
  'Account management and settings accessible': 'Gestión de cuenta y configuraciones accesibles',
  'Card processing and bank transfers active': 'Procesamiento de tarjetas y transferencias bancarias activo',
  'Uptime': 'Tiempo de actividad',
  'Brief interruptions possible': 'Breves interrupciones posibles',
  'no downtime expected': 'sin tiempo de inactividad esperado',
  'unavailable for up to': 'no disponible por hasta',
  'may be briefly unavailable': 'puede estar brevemente no disponible',
  'Database optimization': 'Optimización de base de datos',
  'security patch deployment': 'despliegue de parche de seguridad',
  'infrastructure upgrade': 'actualización de infraestructura',
  'Data center migration': 'Migración de centro de datos',
  'enhanced infrastructure': 'infraestructura mejorada',
  'security updates': 'actualizaciones de seguridad',
  'SSL certificate renewal': 'renovación de certificado SSL',
  'Authentication': 'Autenticación',
  'All Systems': 'Todos los Sistemas',
  'Major Infrastructure Upgrade': 'Actualización Mayor de Infraestructura',
  // Security related
  'Two-Factor Authentication': 'Autenticación de Dos Factores',
  'Data Encryption': 'Cifrado de Datos',
  'GDPR Compliance': 'Cumplimiento GDPR',
  'Privacy Policy': 'Política de Privacidad',
  'Data Protection': 'Protección de Datos',
  'Threat Protection': 'Protección contra Amenazas',
  'Firewall': 'Cortafuegos',
  'Intrusion Detection': 'Detección de Intrusiones',
  'Rate Limiting': 'Limitación de Tasa',
  'Biometric': 'Biométrico',
  'User Practices': 'Prácticas del Usuario',
  'Best Practices': 'Mejores Prácticas',
  'Security Measures': 'Medidas de Seguridad',
  'Password': 'Contraseña',
  'Phishing': 'Phishing',
  'Device Security': 'Seguridad del Dispositivo',
  'Monitoring': 'Monitoreo',
  'Third Party': 'Terceros',
  // Market/Trading related
  'Fundamental Analysis': 'Análisis Fundamental',
  'Technical Analysis': 'Análisis Técnico',
  'Market Heatmap': 'Mapa de Calor del Mercado',
  'Currency Strength': 'Fortaleza de Divisas',
  'Trading Signals': 'Señales de Trading',
  'Economic Calendar': 'Calendario Económico',
  'Interest Rates': 'Tasas de Interés',
  'GDP': 'PIB',
  'Inflation': 'Inflación',
  'Employment': 'Empleo',
  'Central Bank': 'Banco Central',
  'Policy': 'Política',
  'Rate Decision': 'Decisión de Tasas',
  'Meeting Minutes': 'Minutas de Reunión',
  'Forward Guidance': 'Orientación Futura',
  'Quantitative Easing': 'Flexibilización Cuantitativa',
  'Trade Balance': 'Balanza Comercial',
  'Retail Sales': 'Ventas Minoristas',
  'Geopolitical': 'Geopolítico',
  'Market Sentiment': 'Sentimiento del Mercado',
  'Risk On': 'Risk On',
  'Risk Off': 'Risk Off',
  'Commodity Prices': 'Precios de Materias Primas',
  'Stock Market': 'Mercado de Valores',
  'Correlation': 'Correlación',
  'Divergence': 'Divergencia',
  'Volatility': 'Volatilidad',
  'Session': 'Sesión',
  'Trading Session': 'Sesión de Trading',
  'Relative Strength': 'Fortaleza Relativa',
  'Win Rate': 'Tasa de Éxito',
  'Risk/Reward': 'Riesgo/Recompensa',
  'Strategy': 'Estrategia',
  'Step-by-Step': 'Paso a Paso',
  'Pro Tips': 'Consejos Profesionales',
  'Common Mistakes': 'Errores Comunes',
  'FAQ': 'Preguntas Frecuentes',
  'Frequently Asked Questions': 'Preguntas Frecuentes',
};

// Function to translate a string using term mappings and context
function translateToSpanish(text) {
  let translated = text;
  
  // Apply term mappings
  for (const [english, spanish] of Object.entries(termMappings)) {
    const regex = new RegExp(english, 'gi');
    translated = translated.replace(regex, spanish);
  }
  
  return translated;
}

// Process all extracted translations
const lines = extracted.split('\n').filter(l => l.trim());
const spanishTranslations = [];

for (const line of lines) {
  // Extract key and value
  const match = line.match(/'([^']+)':\s*'(.*)'/);
  if (match) {
    const key = match[1];
    const englishValue = match[2];
    
    // Translate the value
    let spanishValue = translateToSpanish(englishValue);
    
    // Create the Spanish translation line
    spanishTranslations.push(`  '${key}': '${spanishValue}',`);
  }
}

console.log(`Generated ${spanishTranslations.length} Spanish translations`);

// Write to output file
const outputPath = path.join(__dirname, 'spanish-translations-generated.txt');
fs.writeFileSync(outputPath, spanishTranslations.join('\n'));

console.log(`Wrote translations to ${outputPath}`);
console.log('\nFirst 10 translations:');
spanishTranslations.slice(0, 10).forEach(t => console.log(t));
