import { Router } from "express";
import { tokenRouter } from "./token";

export const routes = Router();

routes.use('/token', tokenRouter)
