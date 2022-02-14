import { IResolvers } from "@graphql-tools/utils";
import { ProductType as Product } from "./Product";
export interface CategoryType {
    id: string;
    name: string;
    products: Product[];
}
const Category: IResolvers = {
    products: (parent, args, context) => {
        const { products } = context.db;
        const { categoryId } = parent;
        const { filter } = args;
        let CategoryProducts = products.filter((product: Product) => product.categoryId === categoryId);
        if( filter ) {
            if ( filter.onSale ) {
                CategoryProducts = CategoryProducts.reduce((acc: Product[], product: Product) => {
                    if ( product.onSale ) {
                        acc.push(product);
                    }
                    return acc;
                }, []);
            }   
        }
    
        return CategoryProducts
    }
}

export {
    Category
}