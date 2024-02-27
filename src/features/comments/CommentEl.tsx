import React, {useContext} from "react";
import {Comment} from "./types";
import {appContext} from "src/context/context";
import LikeButton from "../likes/LikesBotton";

function CommentEl({
    comment,
    isNested,
}: {
    comment: Comment;
    isNested?: boolean;
}): JSX.Element {
    const {state, dispatch} = useContext(appContext);

    const author = state.authors.find((auth) => auth.id === comment.author);
    const nextComments = state.comments
        .filter((child) => child.parent === comment.id)
        .sort(
            (a, b) =>
                new Date(a.created).getTime() - new Date(b.created).getTime(),
        );
    const formattedDate = new Date(comment.created).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    const now = new Date();
    const createdDate = new Date(comment.created);
    const timeDiffInHours =
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
    const displayDate =
        timeDiffInHours < 24
            ? `${Math.floor(timeDiffInHours)} hours ago`
            : formattedDate;

    const toggleLike = () => {
        dispatch({type: "likes/toggle", payload: {commentId: comment.id}});
    };

    return (
        <div className={`comment ${isNested ? "nested-comment" : ""}`}>
            <div className="author">
                <div
                    className="avatar"
                    style={{backgroundImage: `url(${author?.avatar})`}}
                ></div>
                <div className="info">
                    <p className="name">{author?.name}</p>
                    <p className="date">{displayDate}</p>
                </div>
                <LikeButton
                    isLiked={comment.isLiked}
                    likesCount={comment.likes}
                    onClick={toggleLike}
                />
            </div>
            <div className="text">{comment.text}</div>
            {nextComments.length > 0 && (
                <div className="nested-comments">
                    {nextComments.map((nextComment) => (
                        <CommentEl
                            key={nextComment.id}
                            comment={nextComment}
                            isNested={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentEl;
//для коммита