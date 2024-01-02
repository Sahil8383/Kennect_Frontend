import React, { useEffect } from 'react'
import { PostCard } from './Post';
import { useNavigate } from 'react-router-dom';
import {
    Input,
    Spinner
} from "@material-tailwind/react";
import API_BASE_URL from '../config';

const Posts = () => {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const [search, setSearch] = React.useState('')

    const fetchPosts = async () => {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/posts`)
        const data = await response.json()
        setPosts(data)
        setLoading(false)
        console.log(data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    
    const handleSearch = async () => {

        if(search === '') {
            fetchPosts()
            return
        }

        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/searchedPosts?query=${search}`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        handleSearch();
    }, [search]);

    if (!userId) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Please login to view posts</h1>
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <input
                    placeholder="Search Posts or Comments"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=" 
                        w-2/3
                        mt-4 
                        mr-2
                        border-2
                        rounded
                        px-4
                        py-2
                    "
                />
            </div>

            <div className="flex flex-col items-center justify-center">
                <div
                    className="
                        grid 
                        grid-cols-3
                        smt:grid-cols-1
                        mdt:grid-cols-2
                        lgt:grid-cols-3
                        xlt:grid-cols-3 
                        gap-4
                    ">
                    {
                        loading ? <div className="flex flex-col items-center justify-center">
                            <Spinner color="blue" size="large" />
                        </div> : Array.isArray(posts) ? posts.map((post) => (
                            <PostCard
                                madeBy={post.made_by}
                                content={post.content}
                                onClickFun={() => navigate(`/posts/${post._id}`)}
                                key={post?._id}
                            />
                        )) : <div className="flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-bold">No posts found</h1>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Posts