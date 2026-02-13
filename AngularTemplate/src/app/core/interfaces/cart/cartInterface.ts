import {BookResponse} from "../books/bookResponse";

export interface cartInterface {
    id: number;
    book: BookResponse,
    count: number;
    price: number;
}