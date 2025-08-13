// const cspHeader = `
//     default-src 'self' 'https://ecc.staging.dso.mil' 'https://ecc.staging.dso.mil/ecc-openlxp-xds/' 'https://ecc.apps.dso.mil''https://ecc.apps.dso.mil/ecc-openlxp-xds-ui/';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline';
//     style-src 'self' 'https://ecc.apps.dso.mil' 'https://ecc.apps.dso.mil/ecc-openlxp-xds-ui/' 'https://ecc.staging.dso.mil' 'https://fonts.googleapis.com';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `

const { createSecureHeaders } = require("next-secure-headers");


module.exports = {

  reactStrictMode: true,
  swcMinify: true,
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          forceHTTPSRedirect: [
            true,
            { maxAge: 1024000, includeSubDomains: true, preload: true },
          ],
          contentSecurityPolicy: {
            directives: {
              defaultSrc: [
                "'self'",
                "https://mmt.staging.dso.mil/",
                "https://mmt.staging.dso.mil/mmt-backend/",
                "https://mmt-admin.deloitteopenlxp.com/"
              ],
              styleSrc: [
                "'self'",
                "https://mmt.staging.dso.mil/",
                "https://mmt.staging.dso.mil/mmt-backend/",
                "https://mmt-admin.deloitteopenlxp.com/"              ],
              imgSrc: ["'self'",
                "data:",
                "data:*",
              ],
              fontSrc: [
                "'self'",
                "https://fonts.googleapis.com",

              ],
              frameAncestors: [
                "'self'",
                "https://mmt.staging.dso.mil/",
                "https://mmt-admin.deloitteopenlxp.com/"
              ]
            },
            frameGuard: "deny",
            noopen: "noopen",
            nosniff: "nosniff",
            xssProtection: "sanitize",
            referrerPolicy: "origin-when-cross-origin",
            gpc: true,
          }
        })
      },
    ];
  },
}