import React, {useContext} from "react";
import CommentEl from "./CommentEl";
import {appContext} from "src/context/context";
import {Comment} from "./types";
import "./comment.css";

function countComments(comments: Comment[], allComments: Comment[]): number {
    return comments.reduce((total, comment) => {
        const childComments = allComments.filter(
            (child) => child.parent === comment.id,
        );
        return total + 1 + countComments(childComments, allComments);
    }, 0);
}

function Comments({
    page,
    setPage,
    countComments,
    countLikes, //дописать общий счетчик всех лайков
}: {
    page: number;
    setPage: (page: number) => void;
    countComments: number;
    countLikes: number;
}): JSX.Element {
    const {comments} = useContext(appContext).state;

    const rootComments = comments
        .filter((comment) => comment.parent === null)
        .sort(
            (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime(),
        );

    const totalLikes = comments.reduce(
        (sum, comment) => sum + comment.likes,
        0,
    );

    return (
        <div className="comments">
            <div className="comments-header">
                <p className="comments-count">{countComments} Комментариев</p>
                <p className="total-likes">🤍 {totalLikes}</p>
            </div>
            <div className="commentParents">
                {rootComments.map((comment) => (
                    <CommentEl comment={comment} key={comment.id} />
                ))}
                {page > 0 && (
                    <button
                        type="button"
                        className="button"
                        onClick={() => setPage(page + 1)}
                    >
                        Загрузить еще
                    </button>
                )}
            </div>
        </div>
    );
}

export default Comments;
