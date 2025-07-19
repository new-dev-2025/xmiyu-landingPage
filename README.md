# Device-Responsive Landing Page

A responsive landing page that detects device types and shows different content based on the user's device:

- **iOS devices**: Shows TestFlight installation steps for the GG app
- **Android devices**: Shows Android-specific landing page  
- **Desktop (macOS/Windows)**: Shows QR code for app download

## Features

- 📱 **Device Detection**: Automatically detects iOS, Android, and desktop devices
- 🎨 **Responsive Design**: Optimized layouts for each device type
- ✨ **Modern UI**: Clean, gradient-based design with smooth animations
- 🚀 **Fast Performance**: Built with Vite for optimal loading speed
- 📱 **Mobile-First**: Designed with mobile devices as the primary target

## Device-Specific Content

### iOS Page
- Step-by-step TestFlight installation guide
- GG app download with TestFlight integration
- iOS 16 developer mode instructions
- Alternative download option

### Android Page  
- Direct APK download option
- Feature highlights
- Android-optimized UI elements

### Desktop Page
- QR code for mobile app download
- Platform selection buttons
- Desktop-friendly layout

## Development

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── index.html          # Main HTML file
├── main.js             # Device detection and page logic
├── style.css           # Responsive styles for all device types
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Device Detection Logic

The app uses JavaScript to detect the device type based on the User Agent string:

- **iOS**: Detects iPhone, iPad, and iPod devices
- **Android**: Detects Android devices
- **Desktop**: All other devices (macOS, Windows, Linux)

## Customization

### Adding New Devices
To add support for new device types, modify the `detectDevice()` function in `main.js`.

### Styling
Each device type has its own CSS classes:
- `.ios-page` - iOS-specific styles
- `.android-page` - Android-specific styles  
- `.desktop-page` - Desktop-specific styles

### Content
Page content is generated dynamically in `main.js`:
- `createiOSPage()` - iOS installation steps
- `createAndroidPage()` - Android download page
- `createDesktopPage()` - Desktop QR code page

## Deployment

The app can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push the `dist` folder to a `gh-pages` branch

## License

This project is open source and available under the [MIT License](LICENSE).
