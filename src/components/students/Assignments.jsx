import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentNav from '../StudentNav';
import useUser from '../../hooks/useUser';
import { useGetSingleAssignmentQuery } from '../../features/adminPortal/assignments/assignmentApi';
import { useAddAssignmentMarksMutation, useGetAssignmentMarksQuery, useGetSingleAssignmentMarksQuery } from '../../features/adminPortal/assignmentMarks/assignmentMarksApi';
import { useDispatch } from 'react-redux';

const Assignments = () => {
    const navigate = useNavigate();
    const user = useUser();
    const { assignmentId } = useParams();
    const [addAssignmentMarks] = useAddAssignmentMarksMutation()
    // Get single assignment and assignment marks data using RTK Query hooks
    const { data: singleAssignment } = useGetSingleAssignmentQuery(assignmentId);
    const { data: allAssignmentsMarks } = useGetAssignmentMarksQuery();

    // Destructure assignment data for ease of use
    const { id, title, totalMark, video_id, video_title } = singleAssignment || {};

    // Local state for handling form input
    const [repoLink, setRepoLink] = useState('');

    // Handler for submitting the assignment form
    const handleSubmitAssignment = (e) => {
        e.preventDefault();

        // Create object with form data
        const data = {
            title,
            totalMark,
            video_id,
            video_title,
            student_id: user.id,
            student_name: user.name,
            assignment_id: assignmentId,
            mark: 0,
            status: 'pending',
            repo_link: repoLink,
        };

        // Call addAssignmentMarks mutation to add assignment marks to database
        addAssignmentMarks(data)
        navigate('/studentPortal/coursePlayer')

    };

    const isSubmitted = allAssignmentsMarks?.filter(dt => dt.video_id == singleAssignment?.video_id).map(obj =>{
        if( obj.student_id==user.id){
            return obj;
        }
        return null;
    }).find(nm=>nm);
    console.log(isSubmitted);
    return (
        <div>
            <StudentNav />
            <div>
                <form onSubmit={handleSubmitAssignment}>
                    <div className="border-b border-gray-900/10 pb-12 bg-white w-8/12 m-auto p-4 mt-16">
                        <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-6 ">
                            {/* Assignment title input */}
                            <div className="sm:col-span-4">
                                <label htmlFor="assignment" className="block text-sm font-medium leading-6 text-gray-900">
                                    Assignment Title :
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={singleAssignment?.title}
                                        readOnly
                                        id="assignment"
                                        name="assignment"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Repository link input */}
                            <div className="sm:col-span-4">
                                <label htmlFor="repo_link" className="block text-sm font-medium leading-6 text-gray-900">
                                    Your Solution Repo_link :
                                </label>
                                <div className="mt-2">
                                    {isSubmitted ? (
                                        // If assignment has already been submitted, display the repo link as read-only
                                        <input
                                            value={isSubmitted?.repo_link}
                                            readOnly
                                            id="repo_link"
                                            name="repo_link"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                        />
                                    ) : (
                                        // If assignment has not been submitted, display an input for the repo link
                                        <input
                                            value={repoLink}
                                            onChange={(e) => setRepoLink(e.target.value)}
                                            required
                                            id="repo_link"
                                            name="repo_link"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            disabled={isSubmitted}
                            type="submit"
                            className="rounded-md text-black mt-5 w-full py-2 px-3 border disabled:bg-red-600 disabled:text-white">
                            {isSubmitted? "Already Assignment Submitted" : "Submit Your assignment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Assignments;