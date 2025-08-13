"use client";
'use strict';

import { useEffect , useState} from "react";
import GraySecondaryButton from "./GraySecondaryButton";
import Pagination from "./Pagination";
import axios from "axios";



export const users = [];
export function UsersTable({ data, currentPage, setCurrentPage }) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage] = useState(10);

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

    const userData = [
        { firstName: 'Linh', lastName: "Tran", email: "linh.tran@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Administrator" },
        { firstName: 'Alex', lastName: "Flavio", email: "alex.flavio@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Database Admin" },
        { firstName: 'Mark', lastName: "Nguyen", email: "mark.nguyen@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Manager" },
        { firstName: 'Themba', lastName: "Eurja", email: "themba.eurja@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"},
        { firstName: 'Anastasia', lastName: "Nguyen", email: "anastasia.nguyen@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"},
        { firstName: 'Uty', lastName: "Coogan", email: "uty.coogan@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Administrator"},
        { firstName: 'Olongo', lastName: "Shernick", email: "olongo.shernick@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Database Admin" },
        { firstName: 'Jeffery', lastName: "Snowman", email: "jeffery.snowman@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"},
        { firstName: 'Leon', lastName: "Becker", email: "leon.becker@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Administrator"},
        { firstName: 'Ember', lastName: "Muzuyka", email: "ember.muzuyka@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"},
        { firstName: 'Linh', lastName: "Tran", email: "linh.tran@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Administrator" },
        { firstName: 'Alex', lastName: "Flavio", email: "alex.flavio@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Database Admin" },
        { firstName: 'Mark', lastName: "Nguyen", email: "mark.nguyen@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Manager" },
        { firstName: 'Themba', lastName: "Eurja", email: "themba.eurja@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"},
        { firstName: 'Anastasia', lastName: "Nguyen", email: "anastasia.nguyen@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"},
        { firstName: 'Uty', lastName: "Coogan", email: "uty.coogan@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Administrator"},
        { firstName: 'Olongo', lastName: "Shernick", email: "olongo.shernick@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Database Admin" },
        { firstName: 'Jeffery', lastName: "Snowman", email: "jeffery.snowman@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"},
        { firstName: 'Leon', lastName: "Becker", email: "leon.becker@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Administrator"},
        { firstName: 'Ember', lastName: "Muzuyka", email: "ember.muzuyka@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Team Member"}, { firstName: 'Linh', lastName: "Tran", email: "linh.tran@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Administrator" },
        { firstName: 'Alex', lastName: "Flavio", email: "alex.flavio@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Database Admin" },
        { firstName: 'Mark', lastName: "Nguyen", email: "mark.nguyen@mmt.edu", dateAdded: "December 2, 2024 1:45 PM", role: "Manager" },
    
    ];
    
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
                                {loading ? <p>Loading...</p> : <PostList posts={currentPosts} />}
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
                    <GraySecondaryButton buttonLabel={"Delete"} />
                </div>
            </div>
        </>
    );      
}

const PostList = ({ posts }) => {

    return(
        <>
            {posts?.map((post,i) => (
                <tr className="border-b dark:border-gray-700" key={`${post.email}-${post.last_name}`}>
                    <li className="flex mt-3 justify-center">
                        <input id="chkbx" type="checkbox" value="" className="px-2 py-2 h-4 w-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    </li>
                    <td className="px-4 py-3">{post.first_name}</td>
                    <td className="px-4 py-3">{post.last_name}</td>
                    <td className="px-4 py-3">{post.email}</td>
                    <td className="px-4 py-3">{post.position}</td>
                </tr>
            ))}
        </>
    )
};
