import { Schema, model, models, Model } from "mongoose";

export interface IUser{
    _id?: string;
    email: string;
    password: string;
    favorites?: string[];
    isActivated: boolean;
    activationLink: string;
}


const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: { type: String, required: true, select: false },
        favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }]

    },
    {
        timestamps: true,
        autoIndex: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);