import React, { useEffect, useState } from 'react';
import { useUpdateAssignmentMarksMutation } from '../features/adminPortal/assignmentMarks/assignmentMarksApi';

const AssignmentMark = ({ dt = {} }) => {
    // Destructure the variables from the dt prop
    const {
        id,
        repo_link,
        student_id,
        student_name,
        assignment_id,
        title,
        createdAt,
        totalMark,
        status,
        mark,
    } = dt;

    const [updateAssignmentMarks, { isSuccess }] = useUpdateAssignmentMarksMutation();
    const [assignedMarks, setAssignedMarks] = useState(0);

    useEffect(() => {
        setAssignedMarks(totalMark);
    }, [totalMark]);

    const handleAssignmentMarks = () => {
        const data = {
            student_id,
            student_name,
            assignment_id,
            title,
            createdAt,
            totalMark,
            mark: assignedMarks || 0,
            repo_link,
            status: 'published',
        };
        updateAssignmentMarks({ id, data });
    };

    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{createdAt}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            {status !== 'pending' ? (
                <td className="table-td">
                    {mark || 'no marks'}/{totalMark}
                </td>
            ) : (
                <td className="table-td input-mark">
                    <input
                        max={totalMark}
                        value={assignedMarks}
                        onChange={(e) => setAssignedMarks(e.target.value)}
                    />
                    <svg
                        onClick={handleAssignmentMarks}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </td>
            )}
        </tr>
    );
};

export default AssignmentMark;
