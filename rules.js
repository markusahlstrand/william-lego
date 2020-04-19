module.exports = [
  {
    handlerName: "logger",
    host: ":sub.disvolvigo.*",
    options: {
      type: "http",
      url:
        "https://listener.logz.io:8071/?token=DssUhkzNpOfijcapFSnuOSHpabMwXmUN&type=disvolvigo-io",
      contentType: "text/plain",
      delimiter: "_",
    },
  },
  {
    handlerName: "rateLimit",
    options: {},
  },
  // {
  //   handlerName: "response",
  //   host: "api.disvolvigo.io",
  //   protocol: "http",
  //   path: "/",
  //   options: {
  //     status: 302,
  //     body: "Redirecting to https",
  //     headers: {
  //       Location: "https://api.disvolvigo.io",
  //     },
  //   },
  // },
  {
    handlerName: "response",
    host: "app.disvolvigo.io",
    protocol: "http",
    options: {
      status: 302,
      body: "Redirecting to https",
      headers: {
        Location: "https://app.disvolvigo.io",
      },
    },
  },
  {
    handlerName: "cors",
    options: {
      allowedOrigins: [
        "http://app.disvolvigo.local:3001",
        "https://app.disvolvigo.io",
      ],
    },
  },
  {
    handlerName: "response",
    path: "/edge",
    options: {
      body: "This is a static page served directly from the edge",
    },
  },
  {
    handlerName: "loadbalancer",
    host: "www.disvolvigo.:host",
    path: "/:file*",
    options: {
      sources: [
        {
          url: "https://test.disvolvigo.io/{file}",
        },
      ],
    },
  },
  {
    host: "api.disvolvigo.:host",
    method: ["POST"],
    path: "/webhooks/:hook",
    handlerName: "loadbalancer",
    options: {
      sources: [
        {
          url:
            "https://europe-west1-disvolvigo.cloudfunctions.net/disvolvigo-api/webhooks/{hook}",
        },
      ],
    },
  },
  {
    handlerName: "oauth2",
    path: "/.*",
    options: {
      cookieName: "disvolvigo",
      oauth2ClientId: "Sr9X2zDNy1HKDehLGSuSODE2AvvJbIbW",
      oauth2ClientSecret:
        "mmpXutAyl6eb64bharOOheESWK4OLYcY0F-w_6tQhPSkmaLdlSYBYONGibDtxLN6",
      oauth2AuthDomain: "https://disvolvigo.eu.auth0.com",
      oauth2Audience: "https://api.disvolvigo.io",
      oauth2ServerLogoutPath: "/v2/logout",
      oauth2Scopes: ["openid", "email", "profile", "offline_access"],
      kvAccountId: "bfbba687e68f84266013cc6dd14759c9",
      kvNamespace: "54edd42533604331ad8616d2b0ff3f32",
      kvAuthEmail: "markus@ahlstrand.de",
      kvAuthKey: "d5999ab5379c85b5c598f3d947347e15c89f0",
      kvTtl: 259200,
    },
  },
  {
    handlerName: "jwt",
    path: "/.*",
    options: {
      jwksUri: "https://disvolvigo.eu.auth0.com/.well-known/jwks.json",
    },
  },
  {
    host: "app.disvolvigo.:host",
    handlerName: "kvStorage",
    path: "/:file*",
    options: {
      kvAccountId: "d614d24f3368832764c0844e3da24883",
      kvNamespace: "236b6971e0004532bc33be7082b193cb",
      kvAuthEmail: "dev@disvolvigo.se",
      kvAuthKey: "8d53ea22303689c23d6bc6160b7346609bd23",
      kvBasePath: "app/",
      defaultIndexDocument: "index.html",
      defaultErrorDocument: "index.html",
    },
  },
  {
    host: "app.disvolvigo.io",
    handlerName: "kvStorage",
    options: {
      kvAccountId: "d614d24f3368832764c0844e3da24883",
      kvNamespace: "236b6971e0004532bc33be7082b193cb",
      kvAuthEmail: "dev@disvolvigo.se",
      kvAuthKey: "8d53ea22303689c23d6bc6160b7346609bd23",
      kvKey: "app/index.html",
    },
  },
  {
    host: "app.disvolvigo.local:3001",
    path: "/static/:file*",
    handlerName: "loadbalancer",
    options: {
      sources: [
        {
          url: "http://localhost:3000/static/{file}",
        },
      ],
    },
  },
  {
    host: "app.disvolvigo.local:3001",
    handlerName: "loadbalancer",
    options: {
      sources: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  },
  {
    handlerName: "loadbalancer",
    host: "api.disvolvigo.local:3001",
    path: "/:file*",
    options: {
      sources: [
        {
          url: "http://localhost:3002/{file}",
        },
      ],
    },
  },
  {
    handlerName: "loadbalancer",
    host: "api.disvolvigo.io",
    path: "/:file*",
    options: {
      sources: [
        {
          url:
            "https://europe-west1-disvolvigo.cloudfunctions.net/disvolvigo-api/{file}",
        },
      ],
    },
  },
];
