
export interface BookWithAuthorId {
    id?: number;
    name: string;
    price: number;
    authorId: number;
    author?: string;
    categories: string;
    image?: string;
}
