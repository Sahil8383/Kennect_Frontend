import React from 'react'
import {
  Spinner
} from "@material-tailwind/react";
import { PostCard } from './Post';
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../config';

const MyPost = () => {

  const navigate = useNavigate()
  const [post, setPost] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const fetchPost = async () => {
    setLoading(true)
    const response = await fetch(`${API_BASE_URL}/myPosts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: localStorage.getItem('userId')
      })
    })
    const data = await response.json()
    console.log(data)
    setPost(data)
    setLoading(false)
  }

  React.useEffect(() => {
    fetchPost()
  }, [])


  if(!localStorage.getItem('userId')) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Please login to view posts</h1>
      </div>
    )
  }

  if(post.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">You have not posted anything yet</h1>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <Spinner color="blue" size="large" />
            </div>
          ) : Array.isArray(post) ? (
            post.map((post) => (
              <PostCard
                madeBy={post.made_by}
                content={post.content}
                onClickFun={() => navigate(`/posts/${post._id}`)}
                key={post._id}
              />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>

    </>
  )
}

export default MyPost