import { IResolvers } from "@graphql-tools/utils";

import * as data from '../mockdata.json';

const Product: IResolvers  = {
    category: (parent, args, context) => {
        const { categoryId } = parent;
        return data.categories.find(category => category.id === categoryId);    
    }
}

export {
    Product
}