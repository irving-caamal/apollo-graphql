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
            profile: user,
        }
    },
    profile: async(_,{ userId }, { prisma, userInfo }) => {
        const isMyProfile = Number(userId) === userInfo?.userId;
        console.log({userInfo, userId, isMyProfile})
        const user = await prisma.profile.findUnique({
            where: {
                userId: Number(userId)
            }
        });
        if(!user) {
            return {
                userErrors: [
                    {
                        message: "User not found",
                    }
                ],
                profile: null,
                isMyProfile,
            }
        }
        return {
            userErrors: [],
            profile: user,
            isMyProfile,
        }
    },
    posts: (_, __, context: Context) => {
        const { prisma } = context;
        return prisma.post.findMany({
            where: {
                published: true,
            },
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