// Configuration for download URLs - Easy to update!
// Update these URLs here to change them across the entire application

export const config = {
  urls: {
    // iOS TestFlight URL - Replace with your actual TestFlight invite link
    testflight: 'https://testflight.apple.com/join/PKas1Kgd',
    
    // Android APK download URL - Direct download link for automatic APK download
    androidApk: 'https://github.com/payu-intrepos/Android-SDK-Sample-App/raw/main/SampleApp.apk',
    
    // Alternate download URL for regions where TestFlight is not available
    alternateDownload: 'https://d11scqmct6emw5.cloudfront.net/gglqsonp6islj1',
    
    // TestFlight app in App Store - Usually doesn't need to change
    testflightAppStore: 'https://apps.apple.com/app/testflight/id899247664'
  }
};

// QR Code configuration
export const qrConfig = {
  width: 200,
  height: 200,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
};
