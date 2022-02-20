import { IResolvers } from '@graphql-tools/utils';
import { Context } from "../../index"

interface SignupArgs {
    email: string;
    name: string;
    bio?: string;
    password: string;
}
export const authResolvers: IResolvers = {
    signUp: (_, args: SignupArgs, context: Context) => {
        const { email, name, bio, password } = args;
        const { prisma } = context;
        return prisma.user.create({
            data: { email, name, password },
        });
    },
    signIn: (_, args: SignupArgs, context: Context) => {
        //
    },
}