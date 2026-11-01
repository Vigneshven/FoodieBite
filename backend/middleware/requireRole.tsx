import type { Request, Response, NextFunction } from "express";

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.id || !req.userRole) {
      return res.status(401).json({
        message: "Authentication Required",
      });
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        message: "You do not have permission",
      });
    }

    next();
  };
}
