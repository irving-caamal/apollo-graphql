import JWT from 'jsonwebtoken';
import { User } from '@prisma/client';
import { config } from '../config';

export const getUserFromToken = (token: string) => {
    try {
        return JWT.verify(token, config.JWT.SECRET) as { userId: number};
    } catch (e) {
        return null;
    }
}