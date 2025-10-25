# Installation Guide

## Quick Start

1. **Build the extension:**

    ```bash
    bun run build
    ```

2. **Load in Chrome:**

    - Open Chrome and go to `chrome://extensions/`
    - Enable "Developer mode" (toggle in top right)
    - Click "Load unpacked"
    - Select the `dist/` folder from this project

3. **Start recording:**
    - Click the extension icon in your browser toolbar
    - Click "Start Recording" in the side panel
    - Select what you want to record
    - Click "Share" to begin

## Features

-   ✅ Screen recording (entire screen, window, or tab)
-   ✅ Audio recording (system audio + microphone)
-   ✅ Pause/Resume functionality
-   ✅ Real-time duration timer
-   ✅ Visual recording indicator on web pages
-   ✅ Download recordings as WebM files
-   ✅ Modern UI with Tailwind CSS

## Troubleshooting

### Extension won't load

-   Make sure you're in Developer mode
-   Check that the `dist/` folder contains `manifest.json`
-   Try refreshing the extensions page

### Recording won't start

-   Grant screen recording permissions when prompted
-   Make sure you select a screen/window to record
-   Check that your browser supports the MediaRecorder API

### No audio in recording

-   Check system audio permissions
-   Ensure you've selected the correct audio source
-   Try refreshing the page and starting recording again

## Development

To modify the extension:

1. Make changes to the source code
2. Run `bun run build` to rebuild
3. Go to `chrome://extensions/`
4. Click the refresh icon on your extension
5. Test your changes

## File Structure

```
dist/                    # Built extension files
├── manifest.json        # Extension configuration
├── index.html          # Main UI
├── main.js            # React app
├── main.css           # Tailwind styles
├── background.js      # Background script
└── content.js         # Content script

src/                    # Source code
├── App.tsx            # Main React component
├── components/        # React components
├── services/          # Recording service
├── background.ts      # Background script
├── content.ts         # Content script
└── types/            # TypeScript definitions
```

## Permissions Explained

-   `desktopCapture`: Required for screen recording
-   `tabCapture`: Required for tab-specific recording
-   `activeTab`: Access to current tab information
-   `sidePanel`: Extension UI panel
-   `storage`: Save user preferences
-   `scripting`: Inject content scripts

## Browser Compatibility

-   ✅ Chrome 88+ (Manifest V3)
-   ✅ Edge 88+ (Chromium-based)
-   ⚠️ Firefox (limited support, different APIs)
-   ❌ Safari (not supported)

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all permissions are granted
3. Try reloading the extension
4. Check that your browser supports screen recording APIs
