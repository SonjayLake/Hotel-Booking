//A user document in the mongodb database
import mongoose from "mongoose";


export type UserType =  {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
});

const User = mongoose.model<UserType>("User",userSchema);

export default User;