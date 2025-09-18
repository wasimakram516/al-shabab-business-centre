import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'om.whitewall.alshabab',
  appName: 'Al Shabab',
  "webDir": "out",
  "server": {
    "url": "https://al-shabab-whitewall.vercel.app",
    "cleartext": true
  }
};

export default config;
