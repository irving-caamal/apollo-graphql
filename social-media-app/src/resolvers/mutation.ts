import { Context } from "../index"
import { IResolvers } from '@graphql-tools/utils';
import { Post } from "@prisma/client";

interface PostCreateArgs {
    title: string;
    content: string;
    published: boolean;
}
interface PostPayloadType {
    userErrors: {
        message: string;
    }[];
    post: Post | null;
}
export const Mutation: IResolvers = {
    postCreate: async (parent, args: PostCreateArgs, { prisma }: Context) : Promise<PostPayloadType> => {
        const { title, content, published } = args;
        if (!title || !content) {
            return {
                userErrors: [
                    {
                        message: "Title and content are required",
                    }
                ],
                post: null
            }
        }
        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    published,
                    authorId: 1
                }
            });
            return {
                userErrors: [],
                post
            };
        } catch(e) {
            console.error(e);
            return {
                userErrors: [
                    {
                        message: "Something went wrong",
                    }
                ],
                post: null
            }
        }
    },
}