import React from 'react';
import { useGetAssignmentMarksQuery } from '../../features/adminPortal/assignmentMarks/assignmentMarksApi';
import AssignmentMark from '../../components/AssignmentMark'
import AdminNav from '../../components/AdminNav';
import AssignmentStatus from '../../components/AssignmentStatus';
const AssignmentsMark = () => {
    const { data: assignmentsMarks, isLoading, isError, error } = useGetAssignmentMarksQuery();

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading....... wait & see</p>
    if (!isLoading && isError) content = <p>sorry , you get an error</p>
    if (!isLoading && !isError && assignmentsMarks?.length === 0) content = <p>NO assignmentsMarks Found !</p>
    if (!isLoading && !isError && assignmentsMarks?.length > 0) content = assignmentsMarks.map(dt => <AssignmentMark key={dt.id} dt={dt} />)
    
    return (
        <div>
         <AdminNav/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <AssignmentStatus/>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Assignment</th>
                                        <th className="table-th">Date</th>
                                        <th className="table-th">Student Name</th>
                                        <th className="table-th">Repo Link</th>
                                        <th className="table-th">Mark</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-600/50">
                                    {
                                        content
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AssignmentsMark;