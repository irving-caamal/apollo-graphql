import { IResolvers } from '@graphql-tools/utils';
import { postResolvers } from './post'
import { authResolvers } from './auth'

export const Mutation: IResolvers = {
    ...postResolvers,
    ...authResolvers
};