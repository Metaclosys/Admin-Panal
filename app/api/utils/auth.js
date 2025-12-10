/**
 * Extract access token from request authorization header
 * @param {Request} request - The incoming request object
 * @returns {string|null} - The access token or null if not found
 */
export function getAccessTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  return authHeader?.replace('Bearer ', '') || null;
}

/**
 * Create unauthorized response
 * @returns {Response} - NextResponse with 401 status
 */
export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ message: 'Unauthorized' }), 
    { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
