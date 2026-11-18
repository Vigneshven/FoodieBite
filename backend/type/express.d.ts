declare global {
  namespace Express {
    interface Request {
      id: number;
      userRole: string;
      currentUser?: {
        id: number;
        username: string;
        role: string;
        email: string;
        phone: string;
      };
    }
  }
}

export {};
