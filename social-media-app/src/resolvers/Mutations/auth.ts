import { IResolvers } from '@graphql-tools/utils';
import { Context } from "../../index"
import validator from 'validator';
import { User } from '@prisma/client';
import argon2 from 'argon2';
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
        const hashedPassword = await argon2.hash(password);
        return {
            userErrors: [],
            user: await prisma.user.create({
                data: { email, name, password: hashedPassword },
            })
        }
    },
    signIn: async (_, args: SignupArgs, context: Context) => {
        const { email, password } = args;
        const { prisma } = context;
        if( !email || !password ) {
            return {
                userErrors: [
                    {
                        message: "Invalid Email or Password",
                    }
                ],
                user: null
            }
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (!user) {
            return {
                userErrors: [
                    {
                        message: "Invalid Email or Password",
                    }
                ],
                user: null
            }
        }
        const isValidPassword = await argon2.verify(user.password, password);
        if (!isValidPassword) {
            return {
                userErrors: [
                    {
                        message: "Invalid Email or Password",
                    }
                ],
                user: null
            }
        }
        return {
            userErrors: [],
            user,
        }
    },
}