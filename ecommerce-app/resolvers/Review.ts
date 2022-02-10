import { IResolvers } from "@graphql-tools/utils";
import { ProductType as Product } from "./Product";

export interface ReviewType {
    id: string;
    date: string;
    comment: string;
    productId: string;
    rating: number;
};

const Review: IResolvers = {
}
export {
    Review
}