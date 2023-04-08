import React from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import Video from '../../components/Video';
import { useGetVideosQuery } from '../../features/adminPortal/videos/videosApi';

const Videos = () => {
    // Get videos data using the `useGetVideosQuery` hook
    const { data: videos, isLoading, isError, error } = useGetVideosQuery();

    // Decide what to render based on the API response
    let content = null;
    if (isLoading) {
        content = <p>Loading....... wait & see</p>;
    } else if (isError) {
        content = <p>Sorry, there was an error</p>;
    } else if (videos?.length === 0) {
        content = <p>No videos found!</p>;
    } else {
        content = videos.map((video) => <Video key={video.id} data={video} />);
    }

    return (
        <div>
            <AdminNav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            {/* Link to the "Add Video" page */}
                            <Link className="btn ml-auto" to="/admin/dashboard/videos/add">
                                <button>Add Video</button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Video Title</th>
                                        <th className="table-th">Description</th>
                                        <th className="table-th">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-600/50">
                                    {/* Render the videos data */}
                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Videos;
