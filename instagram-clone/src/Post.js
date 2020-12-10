import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, caption, imageUrl }) {
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
            <img
                className="post__image"
                src={imageUrl}
                alt="Instagram Post" 
            />
            <h4 className="post__text">
                <b>{username}</b> {caption}
            </h4>
        </div>
    );
}

export default Post;
