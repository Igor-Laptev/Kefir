import {Action} from "./action";
import {State} from "./reducerType";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "comments/load":
            return {...state, comments: action.payload};
        case "authors/load":
            return {...state, authors: action.payload};
        case "comments/add": {
            return {...state, comments: [...state.comments, action.payload]};
        }
        case "comments/remove": {
            const newComments = state.comments.filter(
                (comment) => comment.id !== action.payload.commentId,
            );
            return {...state, comments: newComments};
        }
        case "likes/toggle": {
            const updatedComments = state.comments.map((comment) => {
                if (comment.id === action.payload.commentId) {
                    const isLiked = !comment.isLiked;
                    const likes = isLiked
                        ? comment.likes + 1
                        : comment.likes - 1;
                    return {...comment, isLiked, likes};
                }
                return comment;
            });
            return {...state, comments: updatedComments};
        }
        default:
            return state;
    }
};

export const initState: State = {
    comments: [],
    authors: [],
};
