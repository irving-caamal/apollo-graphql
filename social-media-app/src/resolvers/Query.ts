import { IResolvers } from "@graphql-tools/utils";
import { Context } from "..";

const Query: IResolvers = {
    me: async (_, __, { prisma, userInfo }) => { 
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "You must be logged in to view your profile",
                    }
                ],
                user: null
            }
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userInfo.userId
            }
        });
        return {
            userErrors: [],
            user,
        }
    },
    posts: (_, __, context: Context) => {
        const { prisma } = context;
        return prisma.post.findMany({
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    title: "asc"
                }
            ],
        });
    }
};

export {
    Query
};