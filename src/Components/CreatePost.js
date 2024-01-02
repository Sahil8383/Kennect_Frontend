import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Spinner
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const CreatePost = () => {
    const navigate = useNavigate()
    const [post, setPost] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const CreatePost = async () => { 
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: post,
                userId: localStorage.getItem('userId')
            })
        })
        const data = await response.json()
        if(response.status === 201) {
            navigate(`/`)
        }
        setLoading(false)
    }


    if(localStorage.getItem('userId') === null){
        return (
            <div
                className="flex flex-col items-center justify-center"
            >
                <Typography color="blueGray" className="text-center mt-6">
                    Please Login to create a post
                </Typography>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Create Post
                        </Typography>
                        <Input
                            type="text"
                            color="lightBlue"
                            label='What is on your mind?'
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            outline={true}
                        />
                    </CardBody>
                    <CardFooter className="pt-0">
                        {
                            loading ? (
                                <Button
                                    size="sm"
                                    color="blue"
                                    className="flex items-center gap-2"
                                >
                                    <Spinner
                                        color="white"
                                        size="sm"
                                    />
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    color="blue"
                                    className="flex items-center gap-2"
                                    onClick={CreatePost}
                                >
                                    Post
                                </Button>
                            )
                        }
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default CreatePost