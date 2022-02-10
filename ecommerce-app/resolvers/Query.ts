import { IResolvers } from "@graphql-tools/utils";

import * as data from '../mockdata.json';

const Query: IResolvers  = {
    products: () => data.products,
    product: (parent,args, context) => {
        return data.products.find(product => product.id === args.id);
    },
    categories: (parent, args, context) => {
        return data.categories; 
    },
    category: (parent, args, context) => {
        const { id } = args;
        return data.categories.find(category => category.id === id);
    }   
};

export {
    Query
}