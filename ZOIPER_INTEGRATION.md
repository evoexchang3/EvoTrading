# Zoiper VoIP Integration Guide

This guide explains how to configure the Trading Platform to work with Zoiper softphone for click-to-dial functionality.

---

## Overview

The Trading Platform supports direct integration with Zoiper and other VoIP clients through configurable phone URI protocols. When properly configured, clicking on phone numbers in the application will:

1. **Open Zoiper automatically** (no Windows dialog)
2. **Insert the phone number** into Zoiper's dial pad
3. **Initiate the call** with a single click

---

## Supported Protocols

The platform supports multiple phone URI protocols:

| Protocol | Format | Best For | Notes |
|----------|--------|----------|-------|
| **zoiper:** | `zoiper:+15551234567` | Zoiper users | ✅ **Recommended** - Direct to Zoiper, won't be hijacked |
| **callto:** | `callto:+15551234567` | Generic VoIP | ⚠️ May conflict with Skype/FaceTime |
| **tel:** | `tel:+15551234567` | Default | ⚠️ Shows OS dialog (not ideal) |
| **sip:** | `sip:user@domain` | Enterprise SIP | For SIP URIs with domain |

---

## Quick Start

### 1. Install Zoiper

Download and install Zoiper:
- **Zoiper 5** (Recommended): https://www.zoiper.com/en/voip-softphone/download/current
- **Zoiper 3** (Legacy): https://www.zoiper.com/en/voip-softphone/download/zoiper3

### 2. Configure Zoiper Protocol Handlers

Enable Zoiper to handle phone URI protocols:

#### For Zoiper 5:
1. Open Zoiper 5
2. Go to **Settings** → **Features** → **Automation**
3. Under **Integration options**, enable:
   - ✅ **Register callto, sip: tel: URIs with operating system**
4. Click **Save**

#### For Zoiper 3:
1. Open Zoiper 3
2. Go to **Settings** → **Preferences** → **Automation** → **General**
3. Enable:
   - ✅ **Catch the 'callto' protocol request from URL**
4. Click **OK**

### 3. Set Zoiper as Default Handler (Windows)

Make Zoiper the default application for phone protocols:

1. **Windows 11:**
   - Settings → Apps → Default apps
   - Search for "Zoiper"
   - Click on Zoiper and set it as default for:
     - `callto` protocol
     - `tel` protocol
     - `zoiper` protocol (if available)

2. **Windows 10:**
   - Control Panel → Default Programs → Set your default programs
   - Select "Zoiper" from the list
   - Check both `callto` and `tel` protocols
   - Click "Set this program as default"

### 4. Configure the Trading Platform

Set the phone protocol in your `.env` file:

```bash
# .env
VITE_PHONE_PROTOCOL=zoiper
```

**Available Options:**
- `zoiper` - Direct Zoiper integration (recommended)
- `callto` - Generic VoIP (may conflict with other apps)
- `tel` - Standard phone protocol (shows OS dialog)
- `sip` - SIP URIs with domain

### 5. Restart the Application

After updating `.env`, restart the application:

```bash
npm run dev
# or in production
npm start
```

---

## Testing the Integration

### Test Click-to-Dial

1. Open the Trading Platform in your browser
2. Navigate to any page with phone numbers:
   - **Footer** - Support phone number
   - **Locations Page** - Office phone numbers
   - **Contact Page** - Contact information
3. Click on a phone number link
4. **Expected Result:**
   - ✅ Zoiper opens automatically
   - ✅ Phone number appears in dial pad
   - ✅ Ready to call with one click
   - ❌ No Windows "How do you want to open this?" dialog

### Troubleshooting

**Problem:** Windows still shows "How do you want to open this?" dialog

**Solutions:**
1. **Verify protocol handlers are enabled** in Zoiper settings (see Step 2)
2. **Set Zoiper as default handler** in Windows settings (see Step 3)
3. **Restart Zoiper** after enabling protocol handlers
4. **Restart browser** after changing Windows default apps
5. **Try different protocol** - Change `VITE_PHONE_PROTOCOL` to `callto` or `tel`

**Problem:** Zoiper opens but number is not inserted

**Solutions:**
1. **Update Zoiper** to the latest version
2. **Check phone number format** - Should include country code (e.g., +1)
3. **Re-enable protocol handlers** in Zoiper settings

**Problem:** Another app (Skype, FaceTime) opens instead

**Solutions:**
1. **Use `zoiper:` protocol** - Set `VITE_PHONE_PROTOCOL=zoiper` in `.env`
2. **Change default app** in Windows settings to Zoiper
3. **Disable protocol handlers** in competing apps (Skype, FaceTime)

---

## Advanced Configuration

### Per-Environment Setup

Use different protocols for different environments:

```bash
# Development (.env.development)
VITE_PHONE_PROTOCOL=tel

# Production (.env.production)
VITE_PHONE_PROTOCOL=zoiper
```

### SIP Protocol with Domain

For enterprise SIP systems with domain routing:

```typescript
import { getPhoneUri } from '@/lib/phoneUtils';

// Generate SIP URI with domain
const sipUri = getPhoneUri('john', { 
  protocol: 'sip', 
  domain: 'example.com' 
});
// Result: "sip:john@example.com"
```

### Custom Implementation

For custom phone number handling:

```typescript
import { getPhoneUri, sanitizePhoneNumber } from '@/lib/phoneUtils';

// Sanitize phone number
const cleanNumber = sanitizePhoneNumber('+1 (555) 123-4567');
// Result: "+15551234567"

// Generate URI with specific protocol
const uri = getPhoneUri(cleanNumber, { protocol: 'callto' });
// Result: "callto:+15551234567"
```

---

## Integration with Other VoIP Clients

While this guide focuses on Zoiper, the platform works with other VoIP clients:

### 3CX
```bash
VITE_PHONE_PROTOCOL=callto
```

### MicroSIP
```bash
VITE_PHONE_PROTOCOL=sip
```

### Skype (Not Recommended)
```bash
VITE_PHONE_PROTOCOL=callto
```
*Note: Skype may conflict with other apps. Use Zoiper for best results.*

---

## Platform-Specific Notes

### Windows
- Works with Zoiper 5, Zoiper 3, and other SIP clients
- Requires setting default app for protocols
- May require browser restart after changing settings

### macOS
- Use **RCDefaultApp** utility to set protocol handlers
- Zoiper for Mac supports all protocols
- May require security permissions

### Linux
- Protocol handlers configured via desktop files
- Most distributions support `xdg-open` for URI handling
- Zoiper for Linux supports all protocols

### Android/Mobile
- Protocol handlers work automatically
- No additional configuration needed
- Use `zoiper:` scheme to avoid conflicts

---

## Security Considerations

### Phone Number Privacy

Phone numbers in the application are:
- ✅ **Visible to authenticated users** only (where applicable)
- ✅ **Not exposed in URLs** or query parameters
- ✅ **Sanitized before URI generation** (removes formatting)

### Protocol Security

- **zoiper:** protocol is specific to Zoiper and cannot be hijacked
- **tel:** and **callto:** protocols may be handled by multiple apps
- No security risks - protocols only trigger local applications

---

## Additional Resources

### Zoiper Documentation
- **Protocol Handlers**: https://www.zoiper.com/en/support/answer/for/android/123/Protocol_Handlers
- **Click-to-Dial**: https://community.zoiper.com/33/can-zoiper-dial-numbers-with-a-click-on-a-webpage
- **Configuration Guide**: https://www.zoiper.com/downloads/documentation/Zoiper5_configuration_file_documentation.pdf

### Platform Documentation
- **Phone Utilities**: See `client/src/lib/phoneUtils.ts` for implementation details
- **Environment Variables**: See `.env.example` for all configuration options
- **Frontend Integration**: See component files for usage examples

---

## Support

For issues with this integration:

1. **Check this documentation** first
2. **Review troubleshooting section** above
3. **Test with different protocols** (zoiper, callto, tel)
4. **Verify Zoiper configuration** is correct
5. **Contact support** with details of the issue

---

## Changelog

### Version 1.0.0 (Current)
- ✅ Initial Zoiper integration
- ✅ Support for zoiper://, callto://, tel://, sip:// protocols
- ✅ Environment-based configuration
- ✅ Utility functions for phone URI generation
- ✅ Updated footer and locations pages

---

## License

This integration guide is part of the Trading Platform project.
See LICENSE file for details.
