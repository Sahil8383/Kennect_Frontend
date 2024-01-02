import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
    Input,
    IconButton,
    Spinner
} from "@material-tailwind/react";
import { FaComment } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import {
    useParams
} from "react-router-dom";
import API_BASE_URL from '../config';

const SinglePost = () => {

    const { id } = useParams()
    const [post, setPost] = React.useState({})
    const [comments, setComments] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [comment, setComment] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const fetchPost = async () => {
        const response = await fetch(`${API_BASE_URL}/post/${id}`)
        const data = await response.json()
        console.log(data)
        setPost(data)
    }

    React.useEffect(() => {
        fetchPost()
    }, [])

    const fetchComments = async () => {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/commentsData/${id}`)
        const data = await response.json()
        console.log(data)
        setComments(data)
        setLoading(false)
    }

    const postComment = async () => {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: comment,
                userId: localStorage.getItem('userId'),
                postId: id
            })
        })
        const data = await response.json()
        console.log(data)
        setComment('')
        setLoading(false)
        fetchComments()
    }


    React.useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div
            className='
                flex
                flex-col
                items-center
                justify-center
            '
        >
            <Card className="
                p-2
                mt-6
                w-1/2
                smt:w-64
                mdt:w-96
                border-t-2
            ">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        <Avatar
                            src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                            alt="avatar"
                            size="sm"
                            withBorder={true}
                        />{" "}
                        {post?.made_by}
                    </Typography>
                    <Typography>{post?.content}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        size="sm"
                        variant="text"
                        color="blue"
                        className="flex items-center gap-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FaComment className="h-6 w-6" />
                    </Button>
                </CardFooter>
                <div className="relative flex w-full max-w-[24rem]">
                    <Input
                        type="text"
                        label="Comment"
                        color="lightBlue"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {loading ? (
                        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
                            <Spinner color="blue" size="lg" />
                        </div>
                    ) : (
                        <IconButton
                            size="sm"
                            variant="outlined"
                            className="!absolute right-1 top-1 rounded"
                            onClick={postComment}
                        >
                            <IoMdSend className="h-6 w-6" color="blue" />
                        </IconButton>
                    )}
                </div>
            </Card>

            {
                isOpen && (
                    <div className="flex flex-col items-center justify-center mt-4">
                        {
                            loading ? (
                                <div className="flex items-center justify-center">
                                    <Spinner
                                        color="blue"
                                        size="lg"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col overflow-y-auto max-h-[300px] "
                                >
                                    {
                                        comments.map((comment) => (
                                            <Card className="w-64 h-16 ">
                                                <CardBody
                                                    className="flex flex-row justify-between"
                                                >
                                                    <Typography variant="h6" color="blue-gray" className="">
                                                        <Avatar
                                                            src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                                                            alt="avatar"
                                                            size="xs"
                                                            withBorder={true}
                                                        /> {comment.made_by}
                                                    </Typography>
                                                    <Typography>
                                                        {
                                                            comment.content
                                                        }
                                                    </Typography>
                                                </CardBody>
                                            </Card>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SinglePost