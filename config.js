// Configuration for download URLs - Easy to update!
// URLs are fetched from API for dynamic updates without redeployment

// API endpoint for configuration
const CONFIG_API_URL = 'https://api.tf-manager.vip/api/v1/get_appInfo';
const TESTFLIGHT_API_URL = 'https://api.tf-manager.vip/api/v1/get_tfLink';
const UPDATE_TESTFLIGHT_API_URL = 'https://api.tf-manager.vip/api/v1/update_tfLink';

// Default fallback URLs (used if API fails)
const defaultConfig = {
  urls: {
    testflight: 'https://testflight.apple.com/join/PKas1Kgd',
    androidApk: 'https://expo.dev/accounts/htetko111000/projects/the-video-pj/builds/c07eedfe-7578-474d-b1d2-00238e810732',
    alternateDownload: 'https://mmuwy.ajy199.com/29x9qj',
    testflightAppStore: 'https://apps.apple.com/app/testflight/id899247664'
  }
};

// Cache for API data to avoid repeated requests
let cachedConfig = null;
let configPromise = null;

// Generate unique user ID
function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get or create user ID from localStorage
function getUserId() {
  let userId = localStorage.getItem('miyu_user_id');
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem('miyu_user_id', userId);
    console.log('Generated new user ID:', userId);
  }
  return userId;
}

// Function to get TestFlight link for user
async function getTestFlightLink() {
  const userId = getUserId();
  
  try {
    console.log('Requesting TestFlight link for user:', userId);
    const response = await fetch(`${TESTFLIGHT_API_URL}?user_id=${userId}&app_name=xmiyu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('TestFlight link response:', data);
    
    // Check if we got a valid link
    if (data.link && data.link.trim() !== '') {
      // Update the link as claimed
      await updateTestFlightLink(userId);
      return data.link;
    } else {
      console.log('No TestFlight link available, using alternate download');
      // Get current config to access alternateDownload
      const currentConfig = await getConfig();
      return currentConfig.urls.alternateDownload;
    }
  } catch (error) {
    console.error('Failed to get TestFlight link:', error);
    // Fallback to alternate download URL
    console.log('Using alternate download as fallback');
    const currentConfig = await getConfig();
    return currentConfig.urls.alternateDownload;
  }
}

// Function to update TestFlight link status
async function updateTestFlightLink(userId) {
  try {
    console.log('Updating TestFlight link status for user:', userId);
    const response = await fetch(UPDATE_TESTFLIGHT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        app_name: 'xmiyu'
      })
    });
    
    if (!response.ok) {
      console.warn('Failed to update TestFlight link status:', response.status);
    } else {
      console.log('TestFlight link status updated successfully');
    }
  } catch (error) {
    console.error('Error updating TestFlight link status:', error);
  }
}

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
      
      // API returns an array, find the item with app_name "GG"
      const appInfo = data.find(item => item.app_name === "xmiyu");
      
      if (!appInfo) {
        throw new Error('GG app configuration not found in API response');
      }
      
      // Map API response to our config format
      const apiConfig = {
        urls: {
          testflight: appInfo.TF_url || defaultConfig.urls.testflight, // This will be overridden by dynamic link
          androidApk: appInfo.apk_url,
          alternateDownload: appInfo.alternate_url,
          testflightAppStore: appInfo.TF_url
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

// Export TestFlight link functions
export { getTestFlightLink, getUserId };

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
