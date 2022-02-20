import { IResolvers } from "@graphql-tools/utils";
import { Context } from "..";

interface PostParentType {
    authorId: number;
}
const Post: IResolvers = {
    user: async (parent: PostParentType, __, { prisma, userInfo }: Context) => {
        const { authorId } = parent;
        return prisma.user.findUnique({
            where: {
                id: authorId
            }
        })
    },
};

export {
    Post
};