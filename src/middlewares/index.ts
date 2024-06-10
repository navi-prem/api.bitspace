import { Request, Response, NextFunction } from "express";
export { default as AuthMiddleware } from './auth'

const asyncMiddleware = (handler: (req: Request, res: Response, next: NextFunction, num: number, allowSelf: boolean) => Promise<void>, num: number, allowSelf: boolean = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next, num, allowSelf);
        } catch (err) {
            console.log(err)
            next(err)
        }
    };
};

export default asyncMiddleware
