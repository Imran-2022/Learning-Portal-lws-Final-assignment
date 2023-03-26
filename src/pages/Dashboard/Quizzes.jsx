import React from 'react';
import lwsL from '../../assets/image/learningportal.svg'
import AdminNav from '../../components/AdminNav';
import Quizze from '../../components/Quizze';
import { useGetQuizzesQuery } from '../../features/adminPortal/quizzes/quizzesApi';

const Quizzes = () => {
    const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading....... wait & see</p>
    if (!isLoading && isError) content = <p>sorry , you get an error</p>
    if (!isLoading && !isError && quizzes?.length === 0) content = <p>NO quizzes Found !</p>
    if (!isLoading && !isError && quizzes?.length > 0) content = quizzes.map(dt => <Quizze key={dt.id} dt={dt} />)

    return (
        <div>
            <AdminNav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button className="btn ml-auto">Add Quiz</button>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Question</th>
                                        <th className="table-th">Video</th>
                                        <th className="table-th justify-center">Action</th>
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

export default Quizzes;