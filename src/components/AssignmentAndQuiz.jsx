import React from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useGetAssignmentsQuery } from '../features/adminPortal/assignments/assignmentApi';
import { useGetQuizzesQuery } from '../features/adminPortal/quizzes/quizzesApi';

const AssignmentAndQuiz = ({ video_id }) => {
    const user = useUser();

    // Fetch quizzes and assignments data from API using RTK Query hooks
    const { data: quiz } = useGetQuizzesQuery();
    const { data: assignments } = useGetAssignmentsQuery();

    // Check if quiz or assignment is available for this video ID
    const isQuizAvailable = quiz?.find((dt) => dt.video_id === video_id);
    const isAssignmentAvailable = assignments?.find((dt) => dt.video_id === video_id);

    return (
        <div className="flex gap-4">
            {/* Render link to assignment page if assignment is available */}
            {isAssignmentAvailable && (
                <Link
                    to={`/studentPortal/assignment/${isAssignmentAvailable.id}`}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                    এসাইনমেন্ট
                </Link>
            )}

            {/* Render link to quiz page if quiz is available */}
            {isQuizAvailable && (
                <Link
                    to={`/studentPortal/quiz/${video_id}`}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                    কুইজে অংশগ্রহণ করুন
                </Link>
            )}
        </div>
    );
};

export default AssignmentAndQuiz;
