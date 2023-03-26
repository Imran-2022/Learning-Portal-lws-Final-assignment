import React from 'react';
import { useGetAssignmentsQuery } from '../../features/adminPortal/assignments/assignmentApi';
import Assignment from '../../components/Assignment'
import AdminNav from '../../components/AdminNav';
import { Link } from 'react-router-dom';

const Assignments = () => {

    const { data: assignments, isLoading, isError, error } = useGetAssignmentsQuery();

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading....... wait & see</p>
    if (!isLoading && isError) content = <p>sorry , you get an error</p>
    if (!isLoading && !isError && assignments?.length === 0) content = <p>NO assignments Found !</p>
    if (!isLoading && !isError && assignments?.length > 0) content = assignments.map(dt => <Assignment key={dt.id} dt={dt} />)

    return (
        <div>
           <AdminNav/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <Link to="/dashboard/assignment/add" className="btn ml-auto"><button>Add Assignment</button></Link>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Title</th>
                                        <th className="table-th">Video Title</th>
                                        <th className="table-th">Mark</th>
                                        <th className="table-th">Action</th>
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

export default Assignments;