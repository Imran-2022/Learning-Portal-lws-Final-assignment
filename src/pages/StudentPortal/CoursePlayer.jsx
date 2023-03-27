import React from 'react';
import StudentNav from '../../components/StudentNav';
import VideoCard from '../../components/videoCard';
import VideoDetails from '../../components/VideoDetails';
import { useGetVideosQuery } from '../../features/adminPortal/videos/videosApi';

const CoursePlayer = () => {

    const { data: videos, isLoading, isError, error } = useGetVideosQuery();

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading....... wait & see</p>
    if (!isLoading && isError) content = <p>sorry , you get an error</p>
    if (!isLoading && !isError && videos?.length === 0) content = <p>NO videos Found !</p>
    if (!isLoading && !isError && videos?.length > 0) content = videos.map(dt => <VideoCard key={dt.id} dt={dt} />)

    return (
        <div>
            <StudentNav/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <VideoDetails />
                        <div
                            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

                            {
                                content
                            }

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoursePlayer;