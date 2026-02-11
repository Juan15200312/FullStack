export interface BookResponse {
    title: string;
    description: string;
    isbn: string;
    year: number;
    stock: number;
    price: number;
    image: string;
    slug: string;
    categories: [];
    authors: [];
}