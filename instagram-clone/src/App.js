import React from 'react';
import Post from './Post';
import './App.css';

function App() {
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
                <Post />
            </div>
        </>
    );
}

export default App;
