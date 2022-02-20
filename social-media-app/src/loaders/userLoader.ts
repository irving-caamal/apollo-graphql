import Dataloader from 'dataloader';
import { User } from '@prisma/client';
import { prisma } from '../.';
import { userInfo } from 'os';

type BatchUser= (ids: number[]) => Promise<User[]>;
const batchUsers: BatchUser = async (ids: number[]) => {
    console.log({ ids})
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });

    const userMap: {[key: string]: User} = {};
    users.forEach(user => {
        userMap[user.id] = user;
    });

    return ids.map((id) => userMap[id]);
};
// @ts-ignore
export const userLoader = new Dataloader<number, User>(batchUsers);