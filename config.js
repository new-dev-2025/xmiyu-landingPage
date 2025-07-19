// Configuration for download URLs - Easy to update!
// URLs are fetched from API for dynamic updates without redeployment

// API endpoint for configuration
const CONFIG_API_URL = 'https://687b7388b4bc7cfbda85f05f.mockapi.io/gg_info/1';

// Default fallback URLs (used if API fails)
const defaultConfig = {
  urls: {
    testflight: 'https://testflight.apple.com/join/PKas1Kgd',
    androidApk: 'https://github.com/payu-intrepos/Android-SDK-Sample-App/raw/main/SampleApp.apk',
    alternateDownload: 'https://d11scqmct6emw5.cloudfront.net/gglqsonp6islj1',
    testflightAppStore: 'https://apps.apple.com/app/testflight/id899247664'
  }
};

// Cache for API data to avoid repeated requests
let cachedConfig = null;
let configPromise = null;

// Function to fetch configuration from API
async function fetchConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }

  if (configPromise) {
    return configPromise;
  }

  configPromise = (async () => {
    try {
      console.log('Fetching configuration from API...');
      const response = await fetch(CONFIG_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Map API response to our config format
      const apiConfig = {
        urls: {
          testflight: data.TF_app_url,
          androidApk: data.apk_url,
          alternateDownload: data.alternate_url,
          testflightAppStore: data.TF_url
        }
      };
      
      cachedConfig = apiConfig;
      console.log('Configuration loaded from API:', apiConfig);
      return apiConfig;
      
    } catch (error) {
      console.warn('Failed to load config from API, using defaults:', error);
      cachedConfig = defaultConfig;
      return defaultConfig;
    } finally {
      configPromise = null;
    }
  })();

  return configPromise;
}

// Export the config object (will be populated by fetchConfig)
export let config = defaultConfig;

// Export function to get current config (async)
export const getConfig = fetchConfig;

// Initialize config on module load
fetchConfig().then(loadedConfig => {
  Object.assign(config, loadedConfig);
});

// QR Code configuration
export const qrConfig = {
  width: 200,
  height: 200,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
};
