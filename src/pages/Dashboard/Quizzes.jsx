import React from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import Quizze from '../../components/Quizze';

// Import the useGetQuizzesQuery hook to fetch quizzes from the API
import { useGetQuizzesQuery } from '../../features/adminPortal/quizzes/quizzesApi';

const Quizzes = () => {
    // Use the useGetQuizzesQuery hook to fetch quizzes and get the API response
    const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

    // Decide what content to render based on the API response and loading state
    let content = null;
    if (isLoading) {
        content = <p>Loading....... wait & see</p>;
    } else if (isError) {
        content = <p>Sorry, you got an error</p>;
    } else if (quizzes?.length === 0) {
        content = <p>No quizzes found!</p>;
    } else if (quizzes?.length > 0) {
        content = quizzes.map((quiz) => <Quizze key={quiz.id} quiz={quiz} />);
    }

    return (
        <div>
            <AdminNav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            {/* Add link to add quiz page */}
                            <Link to="/admin/dashboard/quizzes/add" className="btn ml-auto">
                                <button>Add Quiz</button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        {/* Add table header for quiz question */}
                                        <th className="table-th">Question</th>
                                        {/* Add table header for quiz video */}
                                        <th className="table-th">Video</th>
                                        {/* Add table header for actions */}
                                        <th className="table-th justify-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-600/50">
                                    {/* Render content based on API response and loading state */}
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

export default Quizzes;
