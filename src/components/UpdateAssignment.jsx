import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleAssignmentQuery, useUpdateAssignmentMutation } from '../features/adminPortal/assignments/assignmentApi';
import { useGetVideosQuery } from '../features/adminPortal/videos/videosApi';
import AdminNav from './AdminNav';

const UpdateAssignment = () => {
    // Get the update assignment ID from the URL
    const { updateAssignmentId } = useParams();

    const navigate = useNavigate();

    // Use Redux Toolkit Query API to fetch videos
    const { data: videos } = useGetVideosQuery();

    // Use Redux Toolkit Query API to fetch single assignment
    const { data: singleAssignment } = useGetSingleAssignmentQuery(updateAssignmentId);

    // Use Redux Toolkit Mutation API to update assignment
    const [updateAssignment, { isSuccess }] = useUpdateAssignmentMutation();

    // Use state hooks to manage form data
    const [title, setTitle] = useState('');
    const [video_id, setVideo_id] = useState('');
    const [video_title, setVideo_title] = useState('');
    const [totalMark, setTotalMark] = useState('');

    // Event handler for video select change
    const handleSelectChange = (dt) => {
        // Parse selected video object from JSON string
        const myObject = JSON.parse(dt);
        setVideo_id(myObject.id);
        setVideo_title(myObject.title);
    };

    // Event handler for updating assignment
    const handleAddAssignment = (e) => {
        e.preventDefault();
        const data = { totalMark, video_id, video_title, title };
        updateAssignment({ id: updateAssignmentId, data });
    };

    // Set form data when single assignment data is loaded
    useEffect(() => {
        setTitle(singleAssignment?.title);
        setTotalMark(singleAssignment?.totalMark);
        setVideo_title(singleAssignment?.video_title);
        setVideo_id(singleAssignment?.video_id);
    }, [singleAssignment]);

    // Redirect to assignments page when assignment is updated
    useEffect(() => {
        if (isSuccess) navigate('/dashboard/assignment');
    }, [isSuccess]);

    return (
        <div>
            {/* Render admin navigation */}
            <AdminNav />

            {/* Render update assignment form */}
            <form onSubmit={handleAddAssignment}>
                <div className="border-b border-gray-900/10 pb-12 bg-white w-8/12 m-auto p-4 mt-16">
                    <div className=" grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-6 ">
                        {/* Render Assignment Title input */}
                        <div className="sm:col-span-4">
                            <label htmlFor="assignment" className="block text-sm font-medium leading-6 text-gray-900">
                                Assignment Title :
                            </label>
                            <div className="mt-2">
                                <input
                                    value={title || ''}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    id="assignment"
                                    name="assignment"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Render Video Title select */}
                        <div className="sm:col-span-4">
                            <label htmlFor="video_title" className="block text-sm font-medium leading-6 text-gray-900">
                                Choose Video :
                            </label>
                            <div className="mt-2">
                                <select disabled
                                    required
                                    onChange={(e) => handleSelectChange(e.target.value)}
                                    id="video_title"
                                    name="video_title"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                >
                                    {/* Render default and video title options */}
                                    <option selected hidden disabled value={JSON.stringify({ video_id, video_title })}>
                                        {video_title}
                                    </option>
                                    {videos &&
                                        videos.map((dt) => (
                                            <option value={JSON.stringify(dt)} key={dt.id}>
                                                {dt.title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {/* Render Total Marks input */}
                        <div className="sm:col-span-4">
                            <label htmlFor="marks" className="block text-sm font-medium leading-6 text-gray-900">
                                Total marks :
                            </label>
                            <div className="mt-2">
                                <input
                                    value={totalMark || ''}
                                    onChange={(e) => setTotalMark(e.target.value)}
                                    required
                                    id="marks"
                                    name="marks"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Render Save button */}
                    <button type="submit" className="rounded-md text-black mt-5 w-full py-2 px-3 border">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAssignment;