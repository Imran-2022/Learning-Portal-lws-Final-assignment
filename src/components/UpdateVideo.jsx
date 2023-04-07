import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useGetVideoQuery,
    useUpdateVideoMutation
} from '../features/adminPortal/videos/videosApi';
import AdminNav from './AdminNav';

const UpdateVideo = () => {
    // Get the ID of the video to be updated from the URL
    const { updateVideoId } = useParams();

    // Use React Router's navigate function to redirect the user after updating the video
    const navigate = useNavigate();

    // Set up state variables for the video title, description, URL, views, and duration
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [views, setViews] = useState('');
    const [duration, setDuration] = useState('');

    // Fetch the data for the video to be updated using a query from the videos API
    const { data: singleVideo, isSuccess } = useGetVideoQuery(updateVideoId);

    // Set the state variables to their corresponding values in the fetched video data
    useEffect(() => {
        setTitle(singleVideo?.title);
        setDescription(singleVideo?.description);
        setUrl(singleVideo?.url);
        setViews(singleVideo?.views);
        setDuration(singleVideo?.duration);
    }, [singleVideo]);

    // Define a function to handle the form submission
    const handleUpdateVideo = (e) => {
        // Prevent the form from submitting normally
        e.preventDefault();

        // Create an object with the updated video data
        const updatedVideoData = {
            title,
            description,
            url,
            views,
            duration
        };

        // Call the updateVideo mutation from the videos API with the updated video data
        updateVideo({ id: updateVideoId, data: updatedVideoData });
    };

    // Call the handleUpdateVideo function if the video was successfully updated
    const [updateVideo, { data, isSuccess: updateSuccess }] =
        useUpdateVideoMutation();

    useEffect(() => {
        if (updateSuccess) navigate('/dashboard/videos');
    }, [updateSuccess]);

    // Render the form for updating the video
    return (
        <div>
            <AdminNav />
            <div className='w-8/12 m-auto bg-slate-100 mt-16 p-12'>

                <form onSubmit={handleUpdateVideo}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={title} onChange={e => setTitle(e.target.value)} required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">title</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={description} onChange={e => setDescription(e.target.value)} required />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">description</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={url} onChange={e => setUrl(e.target.value)} required />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">url</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={views} onChange={e => setViews(e.target.value)} required />
                            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">views</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={duration} onChange={e => setDuration(e.target.value)} required />
                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">duration</label>
                        </div>
                    </div>

                    <button type="submit" className='text-black px-4 py-2 border  w-full'>Submit</button>
                </form>

            </div>
        </div>
    );
};

export default UpdateVideo;