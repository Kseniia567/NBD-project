import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

import { User } from "../models";
import {CONSTANTS} from "../constants";

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRESIN as string,
    });
};

export const registerOrLogin = async (req: Request, res: Response) => {
    const {email, password}: { email: string; password: string } = req.body;

    try {
        const _user = await User.findOne({email}).select("+password").exec();

        if (_user) {
            console.log("User found")
            if (!await(bcrypt.compare(password, _user?.password))){
                return res.status(400).json({error: "Invalid email or password"}) as any;
            }

            console.log("Password ok")
            const token = signToken(_user?._id);
            return res.status(200).json({token, email, id: _user._id}) as any;
        }

        const newUser = await User.create({
            email,
            password: await bcrypt.hash(password, CONSTANTS.SALT),
        });
        const token = signToken(newUser._id);
        res
            .status(201)
            .json({ token, email: newUser?.email, id: newUser._id });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "An error occured while processing your request" }) as any;
    }
};

