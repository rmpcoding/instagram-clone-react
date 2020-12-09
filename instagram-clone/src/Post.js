import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post() {
    return (
        <div className="post">
            <div className="post__header post__text">
                <Avatar
                    className="post__avatar"
                    alt="Robert Parsons"
                    src="blank_for_now"
                ></Avatar>
                <p><b>theadventureking</b></p>
            </div>
            <img
                className="post__image"
                src="https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/129812536_837727237048632_8848539024195552609_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=VfIYy3_1HcUAX_T8TxK&tp=1&oh=2f978c9cbe6492a516708f7f73139dc3&oe=5FF9AC18"
                alt="BLM from Nat Geo"
            />
            <h4 className="post__text">
                <b>theadventureking</b> Comment section
            </h4>
        </div>
    );
}

export default Post;
