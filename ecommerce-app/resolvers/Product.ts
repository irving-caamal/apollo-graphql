import { IResolvers } from "@graphql-tools/utils";
import { CategoryType as Category } from './Category'
import { ReviewType as Review } from './Review'
interface ProductType {
    id: string;
    name: string;
    categoryId: string;
    onSale: boolean;
    reviews: Review[];
}
const Product: IResolvers  = {
    category: (parent, args, context) => {
        const { categoryId } = parent;
        const { categories } = context;
        return categories.find((category: Category) => category.id === categoryId);    
    },
    reviews: (parent, args, context) => {
        const { reviews } = context;
        const { id } = parent;
        return reviews.filter((review: Review) => review.productId === id);
    }
}

export {
    Product,
    ProductType
}