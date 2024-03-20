import { Request, Response, NextFunction } from "express";
export { default as AuthMiddleware } from './auth'

const asyncMiddleware = (handler: (req: Request, res: Response, next: NextFunction, num: number) => Promise<void>, num: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next, num);
        } catch (err) {
            console.log(err)
            next(err)
        }
    };
};

export default asyncMiddleware
