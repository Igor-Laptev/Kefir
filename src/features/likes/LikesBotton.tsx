import React from "react";
import "./like.css";
import {LikeButtonProps} from "./types";

const LikeButton = ({
    isLiked,
    likesCount,
    onClick,
}: LikeButtonProps): JSX.Element => {
    const heartIcon = isLiked ? "🧡" : "💙";
    return (
        <div className="like">
            <p className="likeHeart" onClick={onClick}>
                {heartIcon}
            </p>

            {likesCount}
        </div>
    );
};

export default LikeButton;
