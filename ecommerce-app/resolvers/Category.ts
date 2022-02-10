import { IResolvers } from "@graphql-tools/utils";
import { ProductType as Product } from "./Product";
export interface CategoryType {
    id: string;
    name: string;
    products: Product[];
}
const Category: IResolvers = {
    products: (parent, args, context) => {
        const { products } = context;
        const { categoryId } = parent;
        return products.filter((product: Product) => product.categoryId === categoryId);
    }
}

export {
    Category
}