# Configuring RunawayLog

RunawayLog offers various configuration options to tailor the application to your preferences. This guide will walk you through all the available settings and how to customize them.

## Accessing the Settings Menu

To access the settings menu:

1. Click the **Settings** button (⚙️) in the top navigation bar
2. A dropdown menu will appear with various configuration options
3. On mobile devices, this will appear as a bottom sheet for better usability

## General Settings

### Dark Mode Toggle

- **What it does:** Switches between light and dark visual themes
- **How to use:**
  1. Open the settings menu
  2. Find the "Dark Mode" toggle
  3. Click the toggle to switch themes
  4. Your preference will be saved automatically

- **Behavior:**
  - By default, RunawayLog respects your system's dark mode preference
  - Once you manually toggle it, your selection takes precedence
  - Smooth transitions between modes ensure a pleasant experience

### Calendar Theme

- **What it does:** Changes the color scheme of the calendar heatmap
- **Available themes:**
  - GitHub Green (default) - Classic GitHub contribution graph colors
  - Ocean Blue - Cool blue tones for a calming effect
  - Sunset Orange - Warm orange hues reminiscent of sunsets
  - Purple Dream - Vibrant purple shades for a creative look
  - Fire Red - Intense red colors for dramatic visual impact
  - Monochrome Gray - Clean black and white palette

- **How to use:**
  1. Open the settings menu
  2. Select "Calendar Theme"
  3. Choose your preferred theme from the dropdown
  4. The calendar will update immediately with the new theme

### Timezone Settings

- **What it does:** Configures the timezone used for displaying hit timestamps
- **How to use:**
  1. Open the settings menu
  2. Select "Timezone"
  3. Choose your timezone from the dropdown list
  4. All timestamps will be displayed in the selected timezone

- **Behavior:**
  - By default, RunawayLog detects your browser's timezone automatically
  - You can override this with a manual selection
  - Changing the timezone will reformat all existing timestamps

## Data Management

### Export Data

- **What it does:** Downloads your hit data as a JSON file for backup or transfer
- **How to use:**
  1. Open the settings menu
  2. Click "Export Data"
  3. A JSON file will be downloaded to your device
  4. Store this file in a safe location

- **File format:**
  - JSON format containing all your hit records
  - Includes timestamps, quotes, and hit IDs
  - Compatible with the import feature

### Import Data

- **What it does:** Loads previously exported data into your current session
- **How to use:**
  1. Open the settings menu
  2. Click "Import Data"
  3. Select the JSON file from your device
  4. Your data will be merged with existing records

- **Behavior:**
  - Duplicate hits (same ID and timestamp) will be ignored
  - New hits will be added to your existing data
  - The import process may take a few seconds for large datasets

### Clear Data

- **What it does:** Removes all your hit data from the browser
- **How to use:**
  1. Open the settings menu
  2. Click "Clear Data"
  3. Confirm the action in the dialog box
  4. All your data will be permanently deleted

- **Warning:**
  - This action is irreversible
  - Make sure to export your data first if you want to keep it
  - Only clears data from the current browser

## Printing Options

### Print Calendar

- **What it does:** Opens a print preview for your calendar heatmap
- **How to use:**
  1. Open the settings menu
  2. Click "Print Calendar"
  3. A new window will open with a print-friendly calendar
  4. Use your browser's print dialog to print or save as PDF

- **Print features:**
  - Calendar panel only (full size)
  - User info header
  - Month/year display
  - Optimized for A4/Letter paper
  - Print-friendly CSS with black & white option
  - No navigation controls or Run button

## Pro Mode Settings

### Mode Toggle

- **What it does:** Switches between Free and Pro modes
- **How to use:**
  1. Open the settings menu
  2. Find the "Mode" toggle
  3. Click to switch between Free and Pro modes

- **Features available in Pro Mode:**
  - Multiple game modes
  - Multi-page navigation
  - Remote storage options
  - Advanced analytics
  - Enhanced privacy controls
  - Customization options

### Remote Storage

- **What it does:** Configures cloud storage for your data (coming soon)
- **Available options:**
  - WebDAV
  - Firebase
  - Supabase

- **How to use:**
  1. Open the settings menu
  2. Select "Remote Storage"
  3. Choose your preferred storage provider
  4. Enter the required credentials
  5. Click "Save" to enable syncing

## Browser Configuration

### Installing as a PWA

RunawayLog is a Progressive Web App (PWA), which means you can install it on your device:

#### Chrome/Edge (Desktop)
1. Open RunawayLog in your browser
2. Click the install icon in the address bar
3. Follow the prompts to install the app
4. The app will appear in your app launcher

#### Safari (iOS)
1. Open RunawayLog in Safari
2. Tap the share button
3. Select "Add to Home Screen"
4. Follow the prompts to install

#### Chrome (Android)
1. Open RunawayLog in Chrome
2. Tap the three-dot menu
3. Select "Add to Home screen"
4. Follow the prompts to install

### Offline Usage

- RunawayLog works offline by default
- All data is stored locally in your browser
- PWA installation enhances offline capabilities
- Changes made offline will sync when you reconnect (Pro Mode only)

## Environment Variables (For Developers)

If you're running RunawayLog locally, you can configure these environment variables:

### .env.example
```
# Server Configuration
VITE_PORT=5173

# PWA Configuration
VITE_PWA_NAME="RunawayLog"
VITE_PWA_SHORT_NAME="RunawayLog"
VITE_PWA_DESCRIPTION="Track your desire to escape the daily grind"

# API Configuration (Pro Mode)
VITE_API_URL="https://api.runawaylog.example.com"
VITE_WEBDAV_URL="https://webdav.example.com"
```

- Copy this file to `.env` and modify as needed
- Changes require a server restart to take effect

## Resetting to Defaults

To reset all settings to their default values:

1. Clear your browser's localStorage for the RunawayLog domain
2. Alternatively, use the "Clear Data" option in the settings menu
3. Refresh the page to load default settings

## Troubleshooting

### Settings Not Saving

- Ensure your browser allows localStorage for the RunawayLog domain
- Check that you have sufficient storage space
- Try clearing your browser cache and reloading the page

### Theme Not Applying

- Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge)
- Try refreshing the page after changing the theme
- Check your browser's developer console for any errors

### Timezone Issues

- Make sure you've selected the correct timezone
- Try refreshing the page after changing the timezone
- Note that changing the timezone affects all timestamps

## Best Practices

1. **Regularly export your data** - Create backups to prevent data loss
2. **Choose a theme that works for you** - The right color scheme can enhance your experience
3. **Set your timezone correctly** - Ensures accurate timestamp display
4. **Use Pro Mode features** - Take advantage of advanced features if available
5. **Keep your browser updated** - Ensures compatibility with all features

By configuring RunawayLog to your preferences, you can create a personalized experience that enhances your tracking journey. Don't be afraid to experiment with different settings to find what works best for you!
