import './style.css'
import QRCode from 'qrcode'

// Language detection function
function detectLanguage() {
  // Check for URL parameters to override language detection (for testing)
  const urlParams = new URLSearchParams(window.location.search);
  const forceLang = urlParams.get('lang');
  
  if (forceLang) {
    return forceLang;
  }
  
  // Get browser language
  const userLang = navigator.language || navigator.userLanguage;
  
  // Check if language contains Chinese
  if (userLang.toLowerCase().includes('zh') || 
      userLang.toLowerCase().includes('cn') || 
      userLang.toLowerCase().includes('tw') || 
      userLang.toLowerCase().includes('hk')) {
    return 'zh';
  }
  
  return 'en'; // Default to English
}

// Localization strings
const translations = {
  en: {
    pageTitle: 'GG',
    androidTitle: 'GG for Android',
    desktopTitle: 'GG App',
    step1: 'Step 1',
    step2: 'Step 2',
    alternate: 'Alternate',
    step1Title: 'First install [TestFlight] and then return to this page',
    step1Description: 'If installed, please proceed to the second step',
    installTestFlight: 'Install TestFlight',
    step2Title: 'Click and Download 【GG】',
    step2Description: 'Please don\'t care about the name. Open it after downloading GG',
    downloadGG: 'Download GG',
    warningText: 'If it prompts that the invitation has been revoked or is invalid, please wait a few minutes and try again',
    iosTip: 'How does the iOS16 system open the developer mode?>>>',
    alternateText: 'When TF cannot be installed, please try alternate download!',
    androidDownloadTitle: 'Download GG App for Android',
    androidDescription: 'Get the latest version of GG app for your Android device',
    downloadAPK: 'Download APK',
    features: 'Features:',
    feature1: '✓ High-quality streaming',
    feature2: '✓ Live chat integration', 
    feature3: '✓ Offline viewing',
    feature4: '✓ Multi-language support',
    installInstructions: 'Installation Instructions:',
    installStep1: 'Download the APK file',
    installStep2: 'Enable "Install from Unknown Sources" in Settings',
    installStep3: 'Open the downloaded APK file',
    installStep4: 'Follow the installation prompts',
    installStep5: 'Launch GG app and enjoy!',
    systemRequirements: 'System Requirements:',
    systemReq1: '• Android 6.0 (API level 23) or higher',
    systemReq2: '• 100MB free storage space',
    systemReq3: '• Internet connection required',
    desktopDownloadTitle: 'Download GG App on Your Mobile Device',
    desktopDescription: 'Scan the QR code below with your mobile device to download the GG app',
    qrText: 'Scan to download GG App',
    downloadForiOS: 'Download for iOS',
    downloadForAndroid: 'Download for Android',
    viewOtherPages: 'View other pages:',
    iOSPage: 'iOS Page',
    androidPage: 'Android Page',
    desktopPage: 'Desktop Page'
  },
  zh: {
    pageTitle: 'GG',
    androidTitle: 'GG 安卓版',
    desktopTitle: 'GG 应用',
    step1: '第一步',
    step2: '第二步', 
    alternate: '备用方案',
    step1Title: '首先安装 [TestFlight] 然后返回此页面',
    step1Description: '如已安装，请继续第二步',
    installTestFlight: '安装 TestFlight',
    step2Title: '点击下载【GG】',
    step2Description: '请不要在意名称，下载 GG 后打开即可',
    downloadGG: '下载 GG',
    warningText: '如果提示邀请已被撤销或无效，请等待几分钟后重试',
    iosTip: 'iOS16 系统如何开启开发者模式？>>>',
    alternateText: '当无法安装 TF 时，请尝试备用下载！',
    androidDownloadTitle: '下载 GG 安卓应用',
    androidDescription: '获取适用于您安卓设备的最新版 GG 应用',
    downloadAPK: '下载 APK',
    features: '功能特色：',
    feature1: '✓ 高质量直播',
    feature2: '✓ 实时聊天互动',
    feature3: '✓ 离线观看',
    feature4: '✓ 多语言支持',
    installInstructions: '安装说明：',
    installStep1: '下载 APK 文件',
    installStep2: '在设置中启用"允许安装未知来源应用"',
    installStep3: '打开下载的 APK 文件',
    installStep4: '按照安装提示操作',
    installStep5: '启动 GG 应用并享受！',
    systemRequirements: '系统要求：',
    systemReq1: '• Android 6.0 (API 级别 23) 或更高版本',
    systemReq2: '• 100MB 可用存储空间',
    systemReq3: '• 需要网络连接',
    desktopDownloadTitle: '在移动设备上下载 GG 应用',
    desktopDescription: '使用您的移动设备扫描下方二维码下载 GG 应用',
    qrText: '扫码下载 GG 应用',
    downloadForiOS: '下载 iOS 版',
    downloadForAndroid: '下载安卓版',
    viewOtherPages: '查看其他页面：',
    iOSPage: 'iOS 页面',
    androidPage: '安卓页面',
    desktopPage: '桌面页面'
  }
};

// Get translation function
function t(key) {
  const lang = detectLanguage();
  return translations[lang][key] || translations.en[key] || key;
}

// Device detection function
function detectDevice() {
  // Check for URL parameters to override device detection (for testing)
  const urlParams = new URLSearchParams(window.location.search);
  const forceDevice = urlParams.get('device');
  
  if (forceDevice) {
    return forceDevice;
  }
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  } else {
    return 'desktop';
  }
}

// QR Code for desktop - uses local QRCode library (instant generation)
async function createQRCode() {
  // Automatically detect the current domain, or use fallback
  const landingPageURL = window.location.origin || 'https://gg-landing-page-indol.vercel.app/';
  
  try {
    // Generate QR code as data URL (base64 image)
    const qrDataURL = await QRCode.toDataURL(landingPageURL, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    return `
      <div class="qr-container">
        <div class="qr-code">
          <img src="${qrDataURL}" 
               alt="QR Code" 
               width="200" 
               height="200" 
               style="border: 2px solid #ccc; border-radius: 8px;">
        </div>
        <p class="qr-text">${t('qrText')}</p>
      </div>
    `;
  } catch (error) {
    console.error('QR Code generation failed:', error);
    // Fallback to Google Charts API if library fails
    const fallbackQR = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(landingPageURL)}`;
    return `
      <div class="qr-container">
        <div class="qr-code">
          <img src="${fallbackQR}" 
               alt="QR Code" 
               width="200" 
               height="200" 
               style="border: 2px solid #ccc; border-radius: 8px;">
        </div>
        <p class="qr-text">${t('qrText')}</p>
      </div>
    `;
  }
}

// iOS landing page content
function createiOSPage() {
  return `
    <div class="ios-container">
        <div class="header">
          <div class="logo">
            <img src="/logo.png" alt="GG Logo" class="logo-image">
          </div>
          <h1 class="app-title">${t('pageTitle')}</h1>
        </div>
        
        <div class="steps-container">
        <div class="step">
          <div class="step-header">
            <span class="step-number">${t('step1')}</span>
          </div>
          <div class="step-content">
            <h2>${t('step1Title')}</h2>
            <p class="step-description">${t('step1Description')}</p>
            <button class="install-button testflight-btn">
              <img src="/testflight.png" alt="TestFlight" class="testflight-icon">
              ${t('installTestFlight')}
            </button>
          </div>
        </div>

        <div class="step">
          <div class="step-header">
            <span class="step-number">${t('step2')}</span>
          </div>
          <div class="step-content">
            <h2>${t('step2Title')}</h2>
            <p class="step-description">${t('step2Description')}</p>
            <button class="install-button gg-btn">
              <div class="gg-icon">
                <img src="/logo.png" alt="GG" class="gg-icon-image">
              </div>
              ${t('downloadGG')}
            </button>
            <div class="warning-text">
              <p class="warning">${t('warningText')}</p>
              <p class="ios-tip">${t('iosTip')}</p>
            </div>
          </div>
        </div>

        <div class="step alternate">
          <div class="step-header">
            <span class="step-number">${t('alternate')}</span>
          </div>
          <div class="step-content">
            <button class="install-button gg-btn">
              <div class="gg-icon">
                <img src="/logo.png" alt="GG" class="gg-icon-image">
              </div>
              ${t('downloadGG')}
            </button>
            <p class="alternate-text">${t('alternateText')}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Android landing page content
function createAndroidPage() {
  return `
    <div class="android-container">
      <div class="header">
        <div class="logo">
          <img src="/logo.png" alt="GG Logo" class="logo-image">
        </div>
        <h1 class="app-title">${t('androidTitle')}</h1>
      </div>

      <div class="android-content">
        <div class="download-section">
          <h2>${t('androidDownloadTitle')}</h2>
          <p class="description">${t('androidDescription')}</p>
          
          <button class="install-button android-btn">
            <span class="android-icon">📱</span>
            ${t('downloadAPK')}
          </button>
          
          <div class="features">
            <h3>${t('features')}</h3>
            <ul>
              <li>${t('feature1')}</li>
              <li>${t('feature2')}</li>
              <li>${t('feature3')}</li>
              <li>${t('feature4')}</li>
            </ul>
          </div>

          <div class="android-instructions">
            <h3>${t('installInstructions')}</h3>
            <ol style="text-align: left; color: #555; line-height: 1.8;">
              <li>${t('installStep1')}</li>
              <li>${t('installStep2')}</li>
              <li>${t('installStep3')}</li>
              <li>${t('installStep4')}</li>
              <li>${t('installStep5')}</li>
            </ol>
          </div>

          <div class="system-requirements" style="margin-top: 30px; padding: 20px; background: rgba(76, 175, 80, 0.1); border-radius: 10px;">
            <h4 style="color: #4CAF50; margin-bottom: 10px;">${t('systemRequirements')}</h4>
            <p style="color: #666; font-size: 14px;">
              ${t('systemReq1')}<br>
              ${t('systemReq2')}<br>
              ${t('systemReq3')}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Desktop landing page content
async function createDesktopPage() {
  const qrCodeHTML = await createQRCode();
  
  return `
    <div class="desktop-container">
      <div class="header">
        <div class="logo">
          <img src="/logo.png" alt="GG Logo" class="logo-image">
        </div>
        <h1 class="app-title">${t('desktopTitle')}</h1>
      </div>

      <div class="desktop-content">
        <h2>${t('desktopDownloadTitle')}</h2>
        <p class="description">${t('desktopDescription')}</p>
        
        ${qrCodeHTML}
        
        <div class="platform-buttons">
          <a href="#" class="platform-link ios">${t('downloadForiOS')}</a>
          <a href="#" class="platform-link android">${t('downloadForAndroid')}</a>
        </div>
      </div>
    </div>
  `;
}

// Initialize the page based on device type
async function initializePage() {
  const app = document.querySelector('#app');
  const deviceType = detectDevice();
  
  let content = '';
  
  switch (deviceType) {
    case 'ios':
      content = createiOSPage();
      document.body.className = 'ios-page';
      break;
    case 'android':
      content = createAndroidPage();
      document.body.className = 'android-page';
      break;
    default:
      content = await createDesktopPage();
      document.body.className = 'desktop-page';
      break;
  }
  
  app.innerHTML = content;
  
  // Hide testing navigation (uncomment below to show for development)
  // if (deviceType === 'desktop') {
  //   const testingNav = document.getElementById('testing-nav');
  //   if (testingNav) {
  //     testingNav.style.display = 'block';
  //   }
  // }
  
  // Add event listeners
  addEventListeners();
}

// Add event listeners for buttons
function addEventListeners() {
  const buttons = document.querySelectorAll('.install-button, .platform-link');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (button.classList.contains('testflight-btn')) {
        // Open TestFlight in App Store
        window.open('https://apps.apple.com/app/testflight/id899247664', '_blank');
      } else if (button.classList.contains('gg-btn')) {
        // Check if this is the alternate button
        if (button.closest('.step.alternate')) {
          // Alternate download
          window.open('https://d11scqmct6emw5.cloudfront.net/gglqsonp6islj1', '_blank');
        } else {
          // Regular GG app download - you can add your main download link here
          // window.open('YOUR_MAIN_DOWNLOAD_URL', '_blank');
        }
      } else if (button.classList.contains('android-btn')) {
        // Handle Android APK download
        // Add your APK download logic here
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
