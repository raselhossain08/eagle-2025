import jwt from "jsonwebtoken";

export function verifyToken(
  token: string
): Promise<{ role?: string; exp?: number }> {
  return new Promise((resolve, reject) => {
    try {
      const secret = process.env.JWT_SECRET || "your-secure-secret-key"; // Match this with your signing secret
      console.log(
        "Verifying token with secret:",
        secret.substring(0, 5) + "..."
      );
      const decoded = jwt.verify(token, secret) as {
        role?: string;
        exp?: number;
      };
      console.log("Token verified, payload:", decoded);
      resolve(decoded);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Token verification error:",
          error.name,
          error.message,
          "Token:",
          token.substring(0, 10) + "..."
        );
      } else {
        console.error(
          "Token verification error:",
          error,
          "Token:",
          token.substring(0, 10) + "..."
        );
      }
      reject(new Error("Invalid token"));
    }
  });
}
