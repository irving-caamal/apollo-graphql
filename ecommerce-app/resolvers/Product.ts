import { IResolvers } from "@graphql-tools/utils";
import { CategoryType as Category } from './Category'
import { ReviewType as Review } from './Review'
interface ProductType {
    id: string;
    name: string;
    categoryId: string | null;
    onSale: boolean;
    reviews: Review[];
}
const Product: IResolvers  = {
    category: (parent, args, context) => {
        const { categoryId } = parent;
        const { categories } = context.db;
        return categories.find((category: Category) => category.id === categoryId);    
    },
    reviews: (parent, args, context) => {
        const { reviews } = /* It's a way to pass data to resolvers. */
        context.db;
        const { id } = parent;
        return reviews.filter((review: Review) => review.productId === id);
    }
}

export {
    Product,
    ProductType
}