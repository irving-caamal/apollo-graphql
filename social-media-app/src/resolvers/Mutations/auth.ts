import { IResolvers } from '@graphql-tools/utils';
import { Context } from "../../index"
import validator from 'validator';
import { User } from '@prisma/client';
interface SignupArgs {
    email: string;
    name: string;
    bio?: string;
    password: string;
}
interface UserPayloadType {
    userErrors: {
        message: string;
    }[];
    user: User | null;
}
export const authResolvers: IResolvers = {
    signUp: async(_, args: SignupArgs, context: Context) : Promise<UserPayloadType> => {
        const { email, name, bio, password } = args;
        const { prisma } = context;
        if (!email || !password || !name) {
            return {
                userErrors: [
                    {
                        message: "Email, name and password are required",
                    }
                ],
                user: null
            }
        }
        const isEmail = validator.isEmail(email);
        if (!isEmail) {
            return {
                userErrors: [
                    {
                        message: "Email is invalid",
                    }
                ],
                user: null
            }
        }
        if(!name || !bio) {
            return {
                userErrors: [
                    {
                        message: "Name and bio are required",
                    }
                ],
                user: null
            }
        }
        const isSafePassword = validator.isStrongPassword(password);
        if (!isSafePassword) {
            return {
                userErrors: [
                    {
                        message: "Password is invalid",
                    }
                ],
                user: null
            }
        }
        const existingEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (existingEmail) {
            return {
                userErrors: [
                    {
                        message: 'User with this email already exists',
                    }
                ],
                user: null,
            }
        }
        return {
            userErrors: [],
            user: await prisma.user.create({
                data: { email, name, password },
            })
        }
    },
    signIn: (_, args: SignupArgs, context: Context) => {
        //
    },
}