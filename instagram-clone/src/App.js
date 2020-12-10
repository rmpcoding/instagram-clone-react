import React, { useState, useEffect } from 'react';
import Post from './Post';
import { db } from './firebase'
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    

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
