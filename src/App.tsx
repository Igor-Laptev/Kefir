import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import Comments from "./features/comments/Comments";
import {appContext} from "./context/context";
import getCommentsRequest from "./api/comments/getCommentsRequest";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import {Comment} from "./features/comments/types";

function App() {
    const {dispatch} = useContext(appContext);
    const [page, setPage] = useState(1);
    const [countComments, setCountComments] = useState(0);
    const [countLikes, setCountLikes] = useState(0);

    const fetchDataWithRetry = async (
        requestFunction: () => Promise<any>,
        retries = 2,
    ) => {
        try {
            return await requestFunction();
        } catch (error) {
            if (retries > 0) {
                return new Promise((resolve, reject) => {
                    resolve(fetchDataWithRetry(requestFunction, retries - 1));
                });
            } else {
                throw error;
            }
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsPage = await fetchDataWithRetry(() =>
                    getCommentsRequest(page),
                );
                if (page === commentsPage.pagination.total_pages) {
                    setPage(0);
                }
                dispatch({type: "comments/load", payload: commentsPage.data});
                let comms = countComments;
                let likes = countLikes;
                for (let i = 0; i < commentsPage.pagination.total_pages; i++) {
                    const res = await fetchDataWithRetry(() =>
                        getCommentsRequest(i + 1),
                    );
                    comms += res.data.length;
                    likes += res.data
                        .map((comment: Comment) => comment.likes)
                        .reduce((a: number, b: number) => a + b, 0);
                }

                setCountComments(comms);
                setCountLikes(likes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authors = await fetchDataWithRetry(getAuthorsRequest);
                dispatch({type: "authors/load", payload: authors});
            } catch (error) {
                console.log(error);
            }
        };
        fetchAuthors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return <Comments setPage={setPage} page={page} countComments={countComments}
    countLikes={countLikes} />;
}

export default App;
