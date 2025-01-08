import express from "express";
import {registerOrLogin} from "../controllers";
import {validate} from "../middlewares";
import {joinSchema} from "../schema-validations";

const router = express.Router();

router.post("/join", validate(joinSchema), registerOrLogin);

export {router};