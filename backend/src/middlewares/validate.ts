import {NextFunction, Request, Response} from "express";
import {InferType} from "yup";

import {
    createRecipeSchema,
    getRecipeSchema,
    getUserRecipesSchema,
    joinSchema,
} from "../schema-validations";

export const validate =
    (
        schema: InferType<
            | typeof createRecipeSchema
            | typeof getRecipeSchema
            | typeof getUserRecipesSchema
            | typeof joinSchema
            >
    ) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.validate({
                    ...(req?.body && { body: req.body }),
                    ...(req?.query && { query: req.query }),
                    ...(req?.params && { params: req.params }),
                });
                next();
            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
        };