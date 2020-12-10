import React, { useState } from 'react';
import Post from './Post';
import './App.css';

function App() {
    const [posts, setPosts] = useState([
        {
            username: 'theadventureking',
            caption: 'Autumnal sadness',
            imageUrl:
                'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/129812536_837727237048632_8848539024195552609_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=VfIYy3_1HcUAX_T8TxK&tp=1&oh=2f978c9cbe6492a516708f7f73139dc3&oe=5FF9AC18',
        },
    ]);
    return (
        <>
            <div className="app">
                <div className="app__header">
                    <img
                        src="https://instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                        alt="Instagram Logo"
                        className="app__headerImage"
                    />
                </div>
                {posts.map((post) => (
                    <Post
                        username={post.username}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                    />
                ))}
            </div>
        </>
    );
}

export default App;
