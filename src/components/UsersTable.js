"use client";
'use strict';

import { useEffect , useState} from "react";
import GraySecondaryButton from "./GraySecondaryButton";
import Pagination from "./Pagination";
import axios from "axios";



export const users = [];
export function UsersTable({ data, currentPage, setCurrentPage, onDeleteUser }) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage] = useState(10);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            // res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            //setPosts(res.data);
            //console.log("data been passed: ", data.data)
            setPosts(data);
            setLoading(false);
        };

        fetchPosts();

    }, [data]); // Re-fetch posts when the currentPage changes

     // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    // Handle checkbox selection
    const handleUserSelect = (user, isChecked) => {
        if (isChecked) {
            setSelectedUsers(prev => [...prev, user]);
        } else {
            setSelectedUsers(prev => prev.filter(u => u.email !== user.email));
        }
    };
    
    // Handle delete selected users
    const handleDeleteSelected = () => {
        selectedUsers.forEach(user => {
            onDeleteUser?.(user);
        });

        // Clear after deletion
        setSelectedUsers([]);
    };

    return (
        <>
            <div className="mx-auto max-w-screen-xl">
                <div className="overflow-x-auto sm:justify-center bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mb-8">

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3"></th>
                                    <th scope="col" className="px-4 py-3">First Name</th>
                                    <th scope="col" className="px-4 py-3">Last Name</th>
                                    <th scope="col" className="px-4 py-3">Email</th>
                                    <th scope="col" className="px-4 py-3">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <PostList posts={currentPosts} selectedUsers={selectedUsers} onUserSelect={handleUserSelect} />
                            </tbody>
                        </table>
                    </div>
                    <div className="m-4">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={posts?.length}
                            paginateBack={paginateBack}
                            paginate={paginate}
                            paginateFront={paginateFront}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-5">
                    <GraySecondaryButton buttonLabel={"Save"} />
                    <GraySecondaryButton buttonLabel={"Delete"} handleClick={handleDeleteSelected} disabled={selectedUsers.length === 0} />
                </div>
            </div>
        </>
    );      
}

const PostList = ({ posts, selectedUsers, onUserSelect }) => {

    return(
        <>
            {posts?.map((post,i) => {
                const isSelected = selectedUsers.some(user => user.email === post.email);

                return (
                    <tr className="border-b dark:border-gray-700" key={`${post.email}-${post.last_name}`}>
                        <li className="flex mt-3 justify-center">
                            <input id="chkbx" type="checkbox" checked={isSelected} onChange={e => onUserSelect(post, e.target.checked)} className="px-2 py-2 h-4 w-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        </li>
                        <td className="px-4 py-3">{post.first_name}</td>
                    <td className="px-4 py-3">{post.last_name}</td>
                    <td className="px-4 py-3">{post.email}</td>
                    <td className="px-4 py-3">{post.position}</td>
                </tr>
                );
            })}
        </>
    )
};
