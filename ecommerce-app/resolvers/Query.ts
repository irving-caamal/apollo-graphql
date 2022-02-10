import { IResolvers } from "@graphql-tools/utils";
import { CategoryType as Category } from "./Category";
import { ProductType as Product } from "./Product";
import { ReviewType as Review } from "./Review";

const Query: IResolvers = {
    products: (parent, args, context) => {
        const { products } = context;
        const { reviews } = context;
        const { filter } = args;
        let filteredProducts = products;
        if (filter) {
            const { onSale, avgRating } = filter;
            if (onSale) {
                filteredProducts = filteredProducts.filter((product: Product) => product.onSale);
            }
            if ([1, 2, 3, 4, 5].includes(avgRating)) {
                filteredProducts = filteredProducts.filter((product: Product) => {
                    let numberOfReviews = 0
                    const sumRating = reviews.reduce((acc: number, review: Review) => {
                        if(review.productId === product.id) {
                            acc += review.rating;
                            numberOfReviews++;   
                        }   
                        return acc; 
                    }, 0);     
                    const avgProductRating =  sumRating / numberOfReviews
                    if(avgProductRating >= avgRating) {
                        return product;
                    }
                });
            }
        }
        return filteredProducts;
    },
    product: (parent, args, context) => {
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