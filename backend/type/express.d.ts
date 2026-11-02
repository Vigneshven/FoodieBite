declare global {
  namespace Express {
    interface Request {
      id: number;
      userRole: string;
      currentUser?: {
        id: number;
        username: string;
        role: string;
        status: "active" | "inactive";
      };
    }
  }
}

export {};
