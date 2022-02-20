import 'dotenv/config';

export const config = {
    JWT: {
        SECRET: process.env.JWT_SECRET || '',
    }
}