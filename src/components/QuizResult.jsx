import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAddQuizMarksMutation } from '../features/adminPortal/quizMark/quizMarkApi';
import useUser from '../hooks/useUser';

function QuizResult({ QuizData, score, totalScore, tryAgain }) {

  const [addQuizMarks,{isSuccess}]=useAddQuizMarksMutation();
  const user = useUser();
  const navigate=useNavigate()
  // submit quiz with marks ->
  const handleSubmitAssignment = () => {

    const finalQuizData = {
      student_id: user.id,
      student_name: user.name,
      video_id: QuizData?.[0].video_id,
      video_title: QuizData?.[0].video_title,
      totalQuiz: totalScore,
      totalCorrect: score,
      totalMark: totalScore * 5,
      mark: score * 5,
      totalWrong:totalScore-score,
    }
    addQuizMarks(finalQuizData);

  }


  useEffect(()=>{
    if(isSuccess) navigate('/studentPortal/leaderBoard')
  },[isSuccess])

  return (
    <>
      <div className='show-score'>
        Your Score:{score}<br />
        Total Score:{totalScore}
      </div>
      <button id="next-button" onClick={tryAgain}>Try Again</button>
      <button type="button" class=" mx-8 py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none  rounded-full border border-gray-200 bg-gray-100 text-white focus:z-10 focus:ring-2 focus:ring-gray-200" onClick={handleSubmitAssignment}>submit Assignment</button>
    </>
  )
}

export default QuizResult;