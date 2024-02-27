//types.ts
export type Comment ={
    [x: string]: any;
    id: number,
    created: string,
    text: string,
    author: number,
    parent: null | number,
    likes: number,
    isLiked: boolean;
}

export type Pagination = {
    page: number;
    size: number;
    total_pages: number;
};

export type Comments = {
    pagination: Pagination;
    data: Comment[];
};