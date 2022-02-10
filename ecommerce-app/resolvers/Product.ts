import { IResolvers } from "@graphql-tools/utils";
import { CategoryType as Category } from './Category'
interface ProductType {
    id: string;
    name: string;
    categoryId: string;
}
const Product: IResolvers  = {
    category: (parent, args, context) => {
        const { categoryId } = parent;
        const { categories } = context;
        return categories.find((category: Category) => category.id === categoryId);    
    }
}

export {
    Product,
    ProductType
}