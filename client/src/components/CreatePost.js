import 'bootstrap/dist/css/bootstrap.min.css';

import {useState} from 'react';
import { useDispatch} from "react-redux";

import store from '../store';

import {Media, Image, Form, Button} from 'react-bootstrap';

import {addPost} from '../actions/postActions'

function CreatePost() {

    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);

    const {user} = store.getState().user;
    const dispatch = useDispatch();

    const handlePost = (e) => {
        e.preventDefault();
        if (message || file ) {
            const data = new FormData();
            data.append('posterId', user._id);
            data.append('message', message);
            if (file) data.append("file", file);
        
            dispatch(addPost(data));
            setMessage("");
            setFile(null);
        } else {
          alert("Please Enter a message !")
        }
    };
    

    return(
        <Media className="rounded bg-white mb-3 pt-3">
            <Image className="ml-3" src={user.avatar} roundedCircle width={40} height={40} alt="Profile image"/>
            <Media.Body className="ml-3 mr-3 mb-3">
                <Form action="" onSubmit={handlePost}>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)} value={message} placeholder={"What's on your mind, " + user.lastName + "?"}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.File id="postImages" label="Add an image to your Post" onChange={(e) => setFile(e.target.files[0])} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="float-right">
                        Post
                    </Button>
                </Form>
            </Media.Body>
        </Media>
    );
}


export default CreatePost;