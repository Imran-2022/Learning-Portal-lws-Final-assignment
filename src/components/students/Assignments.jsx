import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentNav from '../StudentNav';
import { useGetSingleAssignmentQuery, useUpdateAssignmentMutation } from '../../features/adminPortal/assignments/assignmentApi'
import useUser from '../../hooks/useUser';
import { useAddAssignmentMarksMutation } from '../../features/adminPortal/assignmentMarks/assignmentMarksApi';
const Assignments = () => {
    const user = useUser();
    // console.log(user);
    const { assignmentId } = useParams();
    // console.log(assignmentId);
    const [updateAssignment, {data, isSuccess: updateAssignmentTask }] = useUpdateAssignmentMutation();
    const [addAssignmentMarks] = useAddAssignmentMarksMutation()
    const { data: singleAssignment } = useGetSingleAssignmentQuery(assignmentId)
    const { id, title, totalMark, video_id, video_title } = singleAssignment || {};
    const [repo_link, setRepo_link] = useState('')

    // console.log(singleAssignment);

    const handleSubmitAssignment = (e) => {
        e.preventDefault();
        const data = { id, title, totalMark, video_id, video_title, student_id: user.id, student_name: user.name, assignment_id: assignmentId, mark: 0, status: 'pending', repo_link };
        updateAssignment({ id: assignmentId, data }).unwrap().then((dt) =>addAssignmentMarks(data))
    }

    // useEffect(() => {
    //     if (data) {
    //         addAssignmentMarks(data)
    //     }
    // }, [data])


    return (
        <div>
            <StudentNav />
            <div>
                <form onSubmit={handleSubmitAssignment}>
                    <div className="border-b border-gray-900/10 pb-12 bg-white w-8/12 m-auto p-4 mt-16">
                        <div className=" grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-6 ">
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
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="repo_link" className="block text-sm font-medium leading-6 text-gray-900">
                                    Your Solution Repo_link :
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={repo_link}
                                        onChange={(e) => setRepo_link(e.target.value)}
                                        required
                                        id="repo_link"
                                        name="repo_link"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>
                        <button disabled={singleAssignment?.status}
                            type="submit"
                            className="rounded-md text-black mt-5 w-full py-2 px-3 border"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <Link to='/dashboard/assignmentMark'>/dashboard/assignmentMark</Link>
        </div>
    );
};

export default Assignments;