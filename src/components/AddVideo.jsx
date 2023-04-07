import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import { useAddVideoMutation } from '../features/adminPortal/videos/videosApi';
import { useNavigate } from 'react-router-dom';

const AddVideo = () => {
    // Initialize state variables for form inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [views, setViews] = useState('');
    const [duration, setDuration] = useState('');

    // Use the `useAddVideoMutation` hook to add a video
    const [addVideo, { data, isSuccess }] = useAddVideoMutation();

    // Use the `useNavigate` hook to redirect after adding a video
    const navigate = useNavigate();

    // Callback function to handle adding a video
    const handleAddVideo = (e) => {
        e.preventDefault();
        addVideo({ title, description, url, views, duration });
    };

    // Use the `useEffect` hook to redirect after a successful video addition
    useEffect(() => {
        if (isSuccess) navigate('/dashboard/videos');
    }, [isSuccess]);

    return (
        <div>
            {/* Render the navigation component */}
            <AdminNav />

            {/* Render the form for adding a video */}
            <div className="w-8/12 m-auto bg-slate-100 mt-16 p-12">
                <form onSubmit={handleAddVideo}>
                    {/* Title input field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="floating_email"
                            id="floating_email"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Title
                        </label>
                    </div>

                    {/* Description input field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="floating_password"
                            id="floating_password"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                        />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Description
                        </label>
                    </div>

                    {/* URL input field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="repeat_password"
                            id="floating_repeat_password"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                        />
                        <label
                            htmlFor="floating_repeat_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            URL
                        </label>
                    </div>     {/* Views and duration input fields */}
                    <div className="grid md:grid-cols-2 md:gap-6">
                        {/* Views input field */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="floating_first_name"
                                id="floating_first_name"
                                value={views}
                                onChange={(e) => setViews(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                            <label
                                htmlFor="floating_first_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Views
                            </label>
                        </div>

                        {/* Duration input field */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="floating_last_name"
                                id="floating_last_name"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                            <label
                                htmlFor="floating_last_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Duration
                            </label>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="text-black px-4 py-2 border  w-full">
                        Submit
                    </button>
                </form>
            </div>
        </div>);
};

export default AddVideo;