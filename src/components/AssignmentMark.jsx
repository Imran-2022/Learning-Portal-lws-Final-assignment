import React, { useEffect, useState } from 'react';
import { useUpdateAssignmentMarksMutation } from '../features/adminPortal/assignmentMarks/assignmentMarksApi';

const AssignmentMark = ({ dt = {} }) => {
    // console.log(dt);
    const { id, repo_link, student_id, student_name, assignment_id, title, createdAt, totalMark, status, mark
    } = dt
    const [updateAssignmentMarks, { isSuccess }] = useUpdateAssignmentMarksMutation()
    const [deservedMarks, setDesearvedMarks] = useState(0)

    useEffect(() => {
        setDesearvedMarks(totalMark)
    }, [totalMark])

    const handleAssignmentMarks = () => {
        const data = {
            student_id,
            student_name,
            assignment_id,
            title,
            createdAt,
            totalMark,
            mark: deservedMarks || 0,
            repo_link,
            status: 'published'
        }
        updateAssignmentMarks({ id, data })
    }

    console.log(!(status === 'pending'));
    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{createdAt}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            {
                !(status === 'pending')
                    ?
                    <td className="table-td">{mark || "no marks"}/{totalMark}</td>
                    :
                    <td className="table-td input-mark">
                        <input max={totalMark} value={deservedMarks} onChange={(e) => setDesearvedMarks(e.target.value)} />
                        <svg onClick={handleAssignmentMarks} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                    </td>
            }

        </tr>
    );
};

export default AssignmentMark;