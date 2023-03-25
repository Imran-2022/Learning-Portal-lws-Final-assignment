import React from 'react';
import { useSelector } from 'react-redux';
import AssignmentAndQuiz from './AssignmentAndQuiz';

const VideoDetails = () => {
    const videoDetail= useSelector(state=>state.videoDetails)
    const {url,title,createdAt,description,id}=videoDetail?.videoDetails||{}
    
    return (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <iframe width="100%" className="aspect-video" src={url}
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>

            <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                    {title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    Uploaded on {createdAt}</h2>

                {
                    <AssignmentAndQuiz video_id={id}/>
                }
                <p className="mt-4 text-sm text-slate-400 leading-6">
                   {description}
                </p>
            </div>
        </div>
    );
};

export default VideoDetails;