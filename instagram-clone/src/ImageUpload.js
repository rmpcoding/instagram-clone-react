import React, { useState } from 'react';
import { storage, db } from './firebase';
import firebase from 'firebase'
import Button from '@material-ui/core/Button';
import './ImageUpload.css'


const ImageUpload = ({ username }) => {
    const [ caption, setCaption ] = useState('');
    const [ image, setImage ] = useState(null);
    const [ progress, setProgress ] = useState(0);
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
                setProgress(progress);
            },
            (e) => {
                console.log(e);
                alert(e.message)
            },
            async () => {
                // upload complete...
                try {
                    const imageUrl = await storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL();
                    
                    await db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: imageUrl,
                        username: username,
                    });
                    
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                } catch(e) {
                    console.log(e.message)
                }
            }
        )
    };

    return (
        <div className="imageUpload">
            <progress className="imageUpload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption"
            onChange={e => setCaption(e.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button type="button" variant="outlined" color="primary" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    );
};

export default ImageUpload;
