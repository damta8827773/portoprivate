import 'express';

declare global {
  namespace Express {
    interface Request {
      /** Authenticated identity derived from a verified Firebase ID token. */
      user?: {
        email: string;
        name: string;
        picture: string;
      };
    }
  }
}

export {};
