export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/v1',
  jwtTokenName: 'token',
  redirectUrl: 'http://localhost:4200/redirect',
  userPropertyNameInLocalStorage: 'currentUser',
  // BEGIN EE
  firebase: {
    apiKey: 'AIzaSyBik7RRZ6S8QIpG4GqzwoF_SCNn3Dr9PPw',
    authDomain: 'cloud.activepieces.com',
    projectId: 'activepieces-b3803',
    storageBucket: 'activepieces-b3803.appspot.com',
    messagingSenderId: '89039225374',
    appId: '1:89039225374:web:7e9279293327e021236 40f',
  },
  // END EE
  localesMap: {
    en: 'English',
    it: 'Italiano',
    de: 'Deutsch',
    fr: 'Français',
  },
};
