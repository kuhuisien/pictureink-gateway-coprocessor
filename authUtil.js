const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const constants = require("./constants");

// Initialize JWKS client for Google
const client = jwksClient({
  jwksUri: constants.JWKS_URL,
});

//
/**
 * Function to get the signing key from JWKS
 * @param {string} kid jwt kid
 * @returns google public signing key
 */
async function getGoogleSigningKey(kid) {
  return new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        return reject(err);
      }
      const signingKey = key.getPublicKey();
      resolve(signingKey);
    });
  });
}

/**
 * Function to validate Google OAuth 2.0 JWT
 * @param {string} token jwt token
 * @returns
 */
async function validateGoogleToken(token) {
  try {
    // Decode token to get header
    const { header } = jwt.decode(token, { complete: true });
    const { kid } = header;

    // Fetch the signing key
    const signingKey = await getGoogleSigningKey(kid);

    // Verify the token
    const decoded = jwt.verify(token, signingKey, {
      algorithms: ["RS256"],
      audience: constants.GOOGLE_CLIENT_ID,
      issuer: constants.JWT_ISSUER,
    });

    console.log("Token is valid:", decoded);
    return true;
  } catch (err) {
    console.error("Token validation failed:", err.message);
    return false;
  }
}

module.exports = validateGoogleToken;
