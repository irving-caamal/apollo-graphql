import { IResolvers } from "@graphql-tools/utils";
import { Context } from "..";

const Query: IResolvers = {
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