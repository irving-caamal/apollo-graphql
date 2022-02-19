import { Context } from "../index"
import { IResolvers } from '@graphql-tools/utils';

interface PostCreateArgs {
    title: string;
    content: string;
    published: boolean;
}
export const Mutation: IResolvers = {
    postCreate: async (parent, args: PostCreateArgs, { prisma }: Context) => {
        const { title, content, published } = args;
        prisma.post.create({
            data: {
                title,
                content,
                published,
                authorId: 1
            }
        });
    },
}