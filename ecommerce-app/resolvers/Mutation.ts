import { IResolvers } from '@graphql-tools/utils';
import { nanoid } from 'nanoid'
import { CategoryType } from './Category';

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
    },
    addProduct: async (parent, args, context) => {
        const { name, description, quantity, price, onSale, image, categoryId } = args.input;
        const { products, categories } = context;
        const newProduct = {
            id: nanoid(),
            name,
            description,
            quantity,
            price,
            onSale,
            image,
            category: categories.find((category: CategoryType) => category.id === categoryId)
        }
        await products.push(newProduct)
        return newProduct;
    }
}

export {
    Mutation
}