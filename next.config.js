const { createSecureHeaders } = require("next-secure-headers");

const isDev = process.env.NODE_ENV !== 'production';
const unsafeDirectives = isDev ? ["'unsafe-eval'", "'unsafe-inline'"] : [];

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
                "https://mmt-admin.deloitteopenlxp.com/",
                ...unsafeDirectives
              ],
              styleSrc: [
                "'self'",
                "https://mmt.staging.dso.mil/",
                "https://mmt.staging.dso.mil/mmt-backend/",
                "https://mmt-admin.deloitteopenlxp.com/",
                ...unsafeDirectives
              ],
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
