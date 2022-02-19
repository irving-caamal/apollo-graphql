import { Context } from "../index"
import { IResolvers } from '@graphql-tools/utils';
import { Post } from "@prisma/client";

interface PostArgs {
    post: {
        title: string;
        content: string;
        published: boolean;
    }
}
interface PostPayloadType {
    userErrors: {
        message: string;
    }[];
    post: Post | null;
}
export const Mutation: IResolvers = {
    postCreate: async (_, args: PostArgs, { prisma }: Context) : Promise<PostPayloadType> => {
        const { title, content, published } = args.post;
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
    postUpdate: async(_, args: { postId: string, post: PostArgs["post"] }, context : Context) : Promise<PostPayloadType> => {
        const { postId, post } = args;
        const { title, content, published } = post;
        const { prisma } = context;
        if ( !postId || !Number(postId)) {
            return {
                userErrors: [
                    {
                        message: "Post id is required and should be a valid number",
                    }
                ],
                post: null
            }
        }
        if (!post.title && !post.content) {
            return {
                userErrors: [
                    {
                        message: "Title and content are required",
                    },
                ],
                post: null,
            }
        }
        const existingPost = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            }
        });
        if (!existingPost) {
            return {
                userErrors: [
                    {
                        message: "Post not found",
                    }
                ],
                post: null,
            }
        }
        let payloadToUpdate: {title?: string, content?: string } = {
            title,
            content
        }
        if(!title) delete payloadToUpdate.title;
        if(!content) delete payloadToUpdate.content;
        return {
            userErrors: [],
            post: await prisma.post.update({
                where: {
                    id: Number(postId),
                },
                data: {
                    ...payloadToUpdate
                },
            })
        }
    }
}