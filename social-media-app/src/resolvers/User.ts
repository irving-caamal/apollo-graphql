import { IResolvers } from "@graphql-tools/utils";
import { Context } from "..";

interface PostParentType {
    id: number;
}
const User: IResolvers = {
    posts: async (parent: PostParentType, __, { prisma, userInfo }: Context) => {
        const { id } = parent;
        const isOwnProfile = parent.id === userInfo?.userId;
        if (isOwnProfile) {
            return prisma.post.findMany({
                where: {
                    authorId: parent.id
                },
                orderBy: [
                    {
                        createdAt: "desc",
                    }
                ]
            })
        }
        return prisma.post.findMany({
            where: {
                authorId: parent.id,
                published: true,
            },
            orderBy: [
                {
                    createdAt: "desc",
                }
            ]
        })
    },
};

export {
    User
};