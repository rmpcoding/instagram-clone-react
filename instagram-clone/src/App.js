import React, { useState, useEffect } from 'react';
import Post from './Post';
import ImageUpload from './ImageUpload';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './App.css';

/* -------------------------------------------------------- */
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
/* -------------------------------------------------------- */

function App() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    /* -------------------------------------------------------- */
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    /* -------------------------------------------------------- */

    const signUp = async (event) => {
        event.preventDefault();

        try {
            const authUser = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            alert('You are now logged in ' + authUser.user.displayName);
            return authUser.user.updateProfile({
                displayName: username,
            });
        } catch (e) {
            alert(e.message);
        }
    };

    const signIn = async (event) => {
        event.preventDefault();
        try {
            const authUser = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            alert(`${authUser.user.displayName} you are now signed in`);
            setOpenSignIn(false);
        } catch (e) {
            alert(e.message);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // user has logged in
                setUser(user);
            } else {
                // user has logged out
                setUser(null);
            }
        });

        return () => {
            // perform some cleanup actions
            unsubscribe();
        };
    }, [user, username]);

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <>
            <div className="app">
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openSignIn}
                        onClose={() => setOpenSignIn(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openSignIn}>
                            <div className={classes.paper}>
                                <form>
                                    <center className="app__signup">
                                        <img
                                            src="https://instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                                            alt="Instagram Logo"
                                            className="app__headerImage"
                                        />

                                        <Input
                                            type="text"
                                            placeholder="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        ></Input>
                                        <Input
                                            type="text"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        ></Input>

                                        <Button onClick={signIn} type="submit">
                                            Sign in
                                        </Button>
                                    </center>
                                </form>
                            </div>
                        </Fade>
                    </Modal>

                    {/* -------------------------------------------------------------------------- */}

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <form>
                                    <center className="app__signup">
                                        <img
                                            src="https://instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                                            alt="Instagram Logo"
                                            className="app__headerImage"
                                        />
                                        <Input
                                            type="text"
                                            placeholder="username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        ></Input>
                                        <Input
                                            type="text"
                                            placeholder="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        ></Input>
                                        <Input
                                            type="text"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        ></Input>

                                        <Button onClick={signUp} type="submit">
                                            Sign up
                                        </Button>
                                    </center>
                                </form>
                            </div>
                        </Fade>
                    </Modal>
                </div>

                <div className="app__header">
                    <img
                        src="https://instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                        alt="Instagram Logo"
                        className="app__headerImage"
                    />

                    {user ? (
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                auth.signOut();
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <div className="app__loginContainer">
                            <Button
                                type="button"
                                onClick={handleOpen}
                                variant="contained"
                                color="primary"
                            >
                                Sign up
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setOpenSignIn(true)}
                                variant="outlined"
                                color="primary"
                            >
                                Sign in
                            </Button>
                        </div>
                    )}
                </div>

                <div className="app__posts">
                    {posts.map(({ id, post }) => (
                        <Post
                            key={id}
                            username={post.username}
                            caption={post.caption}
                            imageUrl={post.imageUrl}
                        />
                    ))}
                </div>

                {user?.displayName ? (
                    <ImageUpload username={user.displayName} />
                ) : (
                    <h3> please sign in to upload</h3>
                )}
            </div>
        </>
    );
}

export default App;
