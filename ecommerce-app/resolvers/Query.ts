import { IResolvers } from "@graphql-tools/utils";
import { CategoryType as Category } from "./Category";
import { ProductType as Product } from "./Product";

const Query: IResolvers  = {
    products: (parent, args, context) => {
        const { products } = context;
        return products;
    },
    product: (parent,args, context) => {
        const { products } = context;
        return products.find((product: Product) => product.id === args.id);
    },
    categories: (parent, args, context) => {
        const { categories } = context;
        return categories; 
    },
    category: (parent, args, context) => {
        const { categories } = context;
        const { id } = args;
        return categories.find((category: Category) => category.id === id);
    }   
};

export {
    Query
}