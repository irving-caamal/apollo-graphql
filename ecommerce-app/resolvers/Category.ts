import { IResolvers } from "@graphql-tools/utils";
import * as data from '../mockdata.json';

const Category: IResolvers = {
    products: (parent, args, context) => {
        const { categoryId } = parent;
        return data.products.filter(product => product.categoryId === categoryId);
    }
}

export {
    Category
}