import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAssignmentsQuery } from '../features/adminPortal/assignments/assignmentApi';
import { useGetQuizzesQuery } from '../features/adminPortal/quizzes/quizzesApi';

const AssignmentAndQuiz = ({video_id}) => {
   
    const {data:quiz}=useGetQuizzesQuery();
    const {data:assignments}=useGetAssignmentsQuery();
    const isQuizAvailable = quiz?.find(dt=>dt.video_id==video_id)
    const isAssignmentAvailable = assignments?.find(dt=>dt.video_id==video_id)
    // console.log(isQuizAvailable,isAssignmentAvailable);


    return (
        <div className="flex gap-4">
            {
                isAssignmentAvailable && <Link to={`/studentPortal/assignment/${isAssignmentAvailable.id}`} className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">এসাইনমেন্ট</Link>
            }
            {
                isQuizAvailable && <Link to={`/studentPortal/quiz/${video_id}`} className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে অংশগ্রহণ করুন</Link>
            }
        </div>
    );
};

export default AssignmentAndQuiz;