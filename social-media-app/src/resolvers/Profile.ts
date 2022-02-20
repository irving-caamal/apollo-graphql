import { IResolvers } from "@graphql-tools/utils";
import { Context } from "..";

interface ProfileParentType {
    id:number;
    bio:string;
    userId: number;
}
const ProfileResolver: IResolvers = {
    user: async (parent: ProfileParentType, __, { prisma, userInfo }: Context) => { 
        return prisma.user.findUnique({
            where: {
                id: parent.userId
            }
        })
    },
};

export {
    ProfileResolver
};