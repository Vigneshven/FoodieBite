declare global {
  namespace Express {
    interface Request {
      id: number;
      userRole: string;
    }
  }
}

export {};
