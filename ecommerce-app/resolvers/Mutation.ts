import { IResolvers } from '@graphql-tools/utils';
import { nanoid } from 'nanoid'
import { CategoryType } from './Category';
import { ProductType } from './Product';
import { ReviewType } from './Review';

const Mutation: IResolvers = {
    addCategory: async (parent, args, context) => {
        const { name } = args.input;
        const { categories } = context;
        const newCategory = {
            id: nanoid(),
            name
        }
        await categories.push(newCategory)
        return newCategory;
    },
    addProduct: async (parent, args, context) => {
        const { name, description, quantity, price, onSale, image, categoryId } = args.input;
        const { products, categories } = context;
        const newProduct = {
            id: nanoid(),
            name,
            description,
            quantity,
            price,
            onSale,
            image,
            category: categories.find((category: CategoryType) => category.id === categoryId).id
        }
        await products.push(newProduct)
        return newProduct;
    },
    addReview: async(parent, args, context) => {
        const { date, comment, rating, productId } = args.input;
        const { reviews, products } = context;
        const newReview = {
            id: nanoid(),
            date,
            comment,
            rating,
            productId: products.find((product: ProductType) => product.id === productId).id
        }
        await reviews.push(newReview);
        console.log({reviews})
        return newReview;
    },
    deleteCategory: async(parent, args, context) => {
        const { id } = args;
        const { categories } = context;
        const categoryIndex = categories.findIndex((category: CategoryType) => category.id === id);
        if (categoryIndex === -1) {
            return false;
        }
        let { products } = context;
        const updatedProducts = products.map((product: ProductType) => {
            if (product.categoryId === id) {
                product.categoryId = null;
            }
            return product
        })
        products = updatedProducts;
        categories.splice(categoryIndex, 1);
        return true;
    },
    deleteProduct: async(parent, args, context) => {
        const { id } = args;
        let { products } = context.db;
        let { reviews } = context.db;
        const productIndex = products.findIndex((product: ProductType) => {
            return product.id === id;
        });
        if (productIndex === -1) { 
            return false;
        }
        const updatedProducts = products.filter((product: ProductType) => product.id !== id)
        const updatedReviews = reviews.filter((review: ReviewType) => {
            return review.productId !== id;
        })
        console.log( { updatedReviews  })
        products.splice(productIndex, 1);

        context.db.reviews = updatedReviews
        return true;
    },
    deleteReview: async(parent, args, context) => {
        const { id } = args;
        let { reviews } = context.db;
        const reviewIndex = reviews.findIndex((review: ReviewType) => { return review.id === id });
        if (reviewIndex === -1) {
            return false;
        }
        reviews.splice(reviewIndex, 1);
        
        return true;
    },
    updateCategory: async (parent, args, context) => {
        const { id } = args;
        const { name } = args.input;
        const { categories } = context.db;
        const updatedCategory = {
            name
        }
        const categoryIndex = categories.findIndex((category:CategoryType) => category.id === id);
        if (categoryIndex === -1) {
            return false;
        }
        context.db.categories[categoryIndex] = {
            ...context.db.categories[categoryIndex],
            ...updatedCategory
        }
        return context.db.categories[categoryIndex];
    },
    updateProduct: async (parent, args, context) => {
        const { id } = args;
        const { name, description, quantity, price, onSale, image, categoryId } = args.input;
        const { products, categories } = context.db;
        const updatedProduct = {
            name, description, quantity, price, onSale, image, categoryId
        }
        const productIndex = products.findIndex((product: ProductType) => product.id === id);
        if (productIndex === -1) {
            return false;
        }
        context.db.products[productIndex] = {
            ...context.db.categories[productIndex],
            ...updatedProduct
        }
        return context.db.products[productIndex];
    },
    updateReview: async (parent, args, context) => {
        const { id } = args;
        const { date, comment, rating } = args.input;
        const updatedReview = { date, comment, rating };
        const { reviews, products } = context.db;
        const reviewIndex = reviews.findIndex((review: ReviewType) => review.id === id)
        if (reviewIndex === -1) {
            return false;
        }
        context.db.reviews[reviewIndex] = {
            ...context.db.reviews[reviewIndex],
            ...updatedReview
        }
        return context.db.reviews[reviewIndex];
    }
    
}

export {
    Mutation
}