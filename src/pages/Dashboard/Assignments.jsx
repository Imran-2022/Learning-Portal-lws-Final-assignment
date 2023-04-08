import React from 'react';
import { useGetAssignmentsQuery } from '../../features/adminPortal/assignments/assignmentApi';
import Assignment from '../../components/Assignment'
import AdminNav from '../../components/AdminNav';
import { Link } from 'react-router-dom';

const Assignments = () => {
  // Fetch assignments data using Redux Toolkit Query API 
  const { data: assignments, isLoading, isError, error } = useGetAssignmentsQuery();

  // Decide what content to render based on the loading state and data
  let content = null;

  if (isLoading) {
    // Show loading message if data is still being fetched
    content = <p>Loading....... wait & see</p>
  } else if (isError) {
    // Show error message if there was an error fetching data
    content = <p>sorry , you get an error</p>
  } else if (assignments?.length === 0) {
    // Show message if no assignments were found
    content = <p>NO assignments Found !</p>
  } else {
    // Render assignment component for each assignment object in the array
    content = assignments.map((assignment) => <Assignment key={assignment.id} dt={assignment} />)
  }

  return (
    <div>
      {/* Render admin navigation component */}
      <AdminNav/>

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              {/* Add a link to the "Add Assignment" page */}
              <Link to="/admin/dashboard/assignment/add" className="btn ml-auto"><button>Add Assignment</button></Link>
            </div>

            <div className="overflow-x-auto mt-4">
              {/* Render a table to display the assignment data */}
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
                  {/* Render the content based on the current state */}
                  {content}
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
