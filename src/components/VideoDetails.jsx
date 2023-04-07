import React from 'react';
import { useSelector } from 'react-redux';
import AssignmentAndQuiz from './AssignmentAndQuiz';

const VideoDetails = () => {
    // Select video details from Redux store
    const videoDetail = useSelector((state) => state.videoDetails);

    // Destructure properties from videoDetails object
    const { url, title, createdAt, description, id } = videoDetail?.videoDetails || {};

    // Extract video ID from YouTube URL using split and join
    const videoId = url?.split('/').slice(-1).join();

    return (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {/* Embed YouTube video */}
            <iframe
                onError={() => {
                    console.log(`Failed to load YouTube video with URL: ${url}`);
                }}
                width="100%"
                className="aspect-video"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            {/* Show video details */}
            <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">{title}</h1>
                <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">Uploaded on {createdAt}</h2>
                
                {/* Render AssignmentAndQuiz component if video ID exists */}
                {id && <AssignmentAndQuiz video_id={id} />}

                <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
            </div>
        </div>
    );
};

export default VideoDetails;
