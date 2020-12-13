import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';

function Post({ postId, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comment')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
    }

    return (
        <div className="post">
            <div className="post__header post__text">
                <Avatar
                    className="post__avatar"
                    alt="Robert Parsons"
                    src="blank_for_now"
                ></Avatar>
                <p>
                    <b>{username}</b>
                </p>
            </div>
            <img className="post__image" src={imageUrl} alt="Instagram Post" />
            <h4 className="post__text">
                <b>{username}</b> {caption}
            </h4>



            

            <form className="post__commentBox">
                <input className="post__input" type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="post__button" disabled={!comment} type="submit" onClick={postComment}>
                    Post
                </button>
            </form>
        </div>
    );
}

export default Post;
