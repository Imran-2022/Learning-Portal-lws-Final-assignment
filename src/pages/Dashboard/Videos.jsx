import React from 'react';
import AdminNav from '../../components/AdminNav';
import Video from '../../components/Video';
import { useGetVideosQuery } from '../../features/adminPortal/videos/videosApi';

const Videos = () => {

    const { data: videos, isLoading, isError, error } = useGetVideosQuery();

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading....... wait & see</p>
    if (!isLoading && isError) content = <p>sorry , you get an error</p>
    if (!isLoading && !isError && videos?.length === 0) content = <p>NO videos Found !</p>
    if (!isLoading && !isError && videos?.length > 0) content = videos.map(dt => <Video key={dt.id} dt={dt} />)
    return (
        <div>
          <AdminNav/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button className="btn ml-auto">Add Video</button>
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