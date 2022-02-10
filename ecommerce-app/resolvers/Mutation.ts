import { IResolvers } from '@graphql-tools/utils';
import { nanoid } from 'nanoid'

const Mutation: IResolvers = {
    addCategory: async (parent, args, context) => {
        const { name } = args.input;
        const { categories } = context;
        const newCategory = {
            id: nanoid(),
            name
        }
        await categories.push(newCategory)
        return newCategory;
    }
}

export {
    Mutation
}