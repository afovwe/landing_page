export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self' clerk.clerk.dev *.clerk.accounts.dev *.clerk.dev; script-src 'self' 'unsafe-inline' 'unsafe-eval' clerk.clerk.dev *.clerk.accounts.dev *.clerk.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: clerk.clerk.dev *.clerk.accounts.dev; connect-src 'self' clerk.clerk.dev *.clerk.accounts.dev *.clerk.dev"
}
