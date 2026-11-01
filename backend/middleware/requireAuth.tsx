import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const BearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  const headerCookieToken = req.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("token="))
    ?.slice("token=".length);
  const cookieToken =
    (req.cookies?.token as string | undefined) ?? headerCookieToken;

  const token = BearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({
      message: "authorization token require",
    });
  }
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "authentication config error",
      });
    }
    const decode = jwt.verify(token, secret);
    if (
      typeof decode !== "object" ||
      decode === null ||
      !Number.isInteger(decode.id) ||
      decode.id <= 0
    ) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    req.id = decode.id;
    req.userRole = decode.role;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "invalid or expire token",
    });
  }
}
