import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing API hooks
import { useAddAssignmentMutation } from '../features/adminPortal/assignments/assignmentApi';
import { useGetVideosQuery } from '../features/adminPortal/videos/videosApi';

// Importing components
import AdminNav from './AdminNav';

const AddAssignment = () => {
    // Initializing state variables
    const [assignment, setAssignment] = useState('');
    const [video_id, setVideo_id] = useState('');
    const [video_title, setVideo_title] = useState('');
    const [marks, setMarks] = useState('');

    // Getting video data from the API
    const { data: videos } = useGetVideosQuery();

    // Initializing mutation hook for adding assignments
    const [addAssignment, { isSuccess }] = useAddAssignmentMutation();

    // Initializing navigation hook
    const navigate = useNavigate();

    // Function to handle select change
    const handleSelectChange = (dt) => {
        const myObject = JSON.parse(dt);
        setVideo_id(myObject.id);
        setVideo_title(myObject.title);
    };

    // Function to handle add assignment form submission
    const handleAddAssignment = (e) => {
        e.preventDefault();
        const data = { totalMark: marks, video_id, video_title, title: assignment };
        addAssignment(data);
    };

    // Setting default video data when videos are fetched from the API
    useEffect(() => {
        setVideo_id(videos?.[0].id);
        setVideo_title(videos?.[0].title);
    }, [videos]);

    // Navigating to assignments dashboard after successful addition of assignment
    useEffect(() => {
        if (isSuccess) navigate('/dashboard/assignment');
    }, [isSuccess]);

    return (
        <div>
            {/* Navigation component */}
            <AdminNav />

            <form onSubmit={handleAddAssignment}>
                {/* Assignment form */}
                <div className="border-b border-gray-900/10 pb-12 bg-white w-8/12 m-auto p-4 mt-16">
                    <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-6 ">
                        {/* Assignment title input */}
                        <div className="sm:col-span-4">
                            <label htmlFor="assignment" className="block text-sm font-medium leading-6 text-gray-900">
                                Assignment Title:
                            </label>
                            <div className="mt-2">
                                <input
                                    value={assignment}
                                    onChange={(e) => setAssignment(e.target.value)}
                                    required
                                    id="assignment"
                                    name="assignment"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Video select box */}
                        <div className="sm:col-span-4">
                            <label htmlFor="video_title" className="block text-sm font-medium leading-6 text-gray-900">
                                Choose Video:
                            </label>
                            <div className="mt-2">
                                <select
                                    required
                                    onChange={(e) => handleSelectChange(e.target.value)}
                                    id="video_title"
                                    name="video_title"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                >
                                    {/* Mapping through video data to create options in select box */}
                                    {videos &&
                                        videos.map((dt) => (
                                            <option value={JSON.stringify(dt)} key={dt.id}>
                                                {dt.title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {/* Total marks input */}
                        <div className="sm:col-span-4">
                            <label htmlFor="marks" className="block text-sm font-medium leading-6 text-gray-900">
                                Total Marks:
                            </label>
                            <div className="mt-2">
                                <input
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                    required
                                    id="marks"
                                    name="marks"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text                                 sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save button */}
                    <button type="submit" className="rounded-md text-black mt-5 w-full py-2 px-3 border">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAssignment;
