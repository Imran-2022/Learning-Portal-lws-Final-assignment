import React from 'react';

const AssignmentMark = ({ dt = {} }) => {
    console.log(dt);
    const { repo_link, student_name, title, createdAt, totalMark
    } = dt

    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{createdAt}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            {
                totalMark?<td className="table-td">{totalMark}</td>: <td className="table-td input-mark">
                <input max="100" defaultValue="100" />
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
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