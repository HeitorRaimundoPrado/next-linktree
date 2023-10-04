const jwt = require('jsonwebtoken');
import { cookies } from "next/headers";

export const verifyTokenMiddleware = (req: Request): number | null => {
  const token = cookies().get("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token.value, process.env.SECRET_KEY_NEXT);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
