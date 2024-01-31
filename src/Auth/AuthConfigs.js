import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "e31baeb8-c199-4364-8c00-4e0bf7e2b3c4",
    authority:
      "https://login.microsoftonline.com/ff00942c-81e2-4530-b90f-4e7d35c20644",
    // redirectUri: "http://localhost:3000/MainPage",
    redirectUri: "http://localhost:7000",
    postLogoutRedirectUri: '/', 
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
