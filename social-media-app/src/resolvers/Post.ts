import { IResolvers } from "@graphql-tools/utils";
import { userLoader } from "../loaders/userLoader";
import { Context } from "..";

interface PostParentType {
    authorId: number;
}
const Post: IResolvers = {
    user: async (parent: PostParentType, __, { prisma, userInfo }: Context) => {
        const { authorId } = parent;
        return userLoader.load(authorId);
    },
};

export {
    Post
};