import React from 'react';
import StudentNav from '../../components/StudentNav';
import VideoCard from '../../components/videoCard';
import VideoDetails from '../../components/VideoDetails';
import { useGetVideosQuery } from '../../features/adminPortal/videos/videosApi';

const CoursePlayer = () => {
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    // Render based on loading and error states
    let content;
    if (isLoading) content = <p>Loading...</p>;
    else if (isError) content = <p>Sorry, there was an error.</p>;
    else if (!videos?.length) content = <p>No videos found!</p>;
    else content = videos.map(dt => <VideoCard key={dt.id} dt={dt} />);

    return (
        <div>
            <StudentNav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    {
                        videos?.length ? <div className="grid grid-cols-3 gap-2 lg:gap-8">
                            <VideoDetails />
                            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
                                {content}
                            </div>
                        </div> : <p>No videos found yet !</p>
                    }
                </div>
            </section>
        </div>
    );
};

export default CoursePlayer;
