import { Post } from "@prisma/client";
import { Context } from "../../index"
import { IResolvers } from '@graphql-tools/utils';
import { canUserMutatePost } from "../../utils/canUserMutatePost";

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

export const postResolvers: IResolvers = {
    postCreate: async (_, args: PostArgs, { prisma, userInfo }: Context) : Promise<PostPayloadType> => {
        const { title, content, published } = args.post;
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "You must be logged in to create a post",
                    }
                ],
                post: null
            }
        }
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
                    authorId: userInfo.userId
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
    postUpdate: async(_, args: { postId: string, post: PostArgs["post"], }, context : Context) : Promise<PostPayloadType> => {
        const { postId, post } = args;
        const { title, content, published } = post;
        const { prisma } = context;
        const { userInfo } = context;
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "You must be logged in to create a post",
                    }
                ],
                post: null
            }
        }
        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma
        }); 
        if (error) {
            return error;
        }
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
    },
    postDelete: async(_, args: { postId: string }, context : Context) : Promise<PostPayloadType> => {
        const { postId } = args;
        const { prisma, userInfo } = context;
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: "You must be logged in to create a post",
                    }
                ],
                post: null
            }
        }
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
        const error = await canUserMutatePost({
            userId: userInfo.userId,
            postId: Number(postId),
            prisma
        }); 
        if (error) {
            return error;
        }
        const existingPost = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            }
        });
        if(!existingPost) {
            return {
                userErrors: [
                    {
                        message: "Post not found",
                    }
                ],
                post: null,
            };
        }
        await prisma.post.delete({
            where: {
                id: Number(postId),
            }
        });
        
        return {
            userErrors: [],
            post: null
        };
    },
}