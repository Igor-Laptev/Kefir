import {Comment} from "src/features/comments/types";
import {Author} from "src/features/users/types";

export type Action =
    | {type: "authors/load"; payload: Author[]}
    | {type: "comments/load"; payload: Comment[]}
    | {type: "likes/toggle"; payload: {commentId: number}}
    | {type: "comments/add"; payload: Comment}
    | {type: "comments/remove"; payload: {commentId: number}};
