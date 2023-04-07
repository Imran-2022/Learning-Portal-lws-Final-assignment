import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAddQuizMarksMutation } from '../features/adminPortal/quizMark/quizMarkApi';
import useUser from '../hooks/useUser';

function QuizResult({ QuizData, score, totalScore, tryAgain, isSubmitted }) {

  const [addQuizMarks, { isSuccess }] = useAddQuizMarksMutation();
  const user = useUser();
  const navigate = useNavigate()
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
      totalWrong: totalScore - score,
    }
    addQuizMarks(finalQuizData);

  }


  useEffect(() => {
    if (isSuccess) navigate('/studentPortal/leaderBoard')
  }, [isSuccess])





  return (
    <div className='w-8/12 mx-auto py-12'>
      {isSubmitted && (
        <p className='text-center text-xs font-mono font-bold uppercase tracking-wide text-white bg-blue-500 px-4 py-3 '>
          Already submitted! You cannot submit again, but you can visit all quizzes.
        </p>
      )}
      <div className='bg-gray-100 p-4 text-black'>
        <div className='text-center mb-6'>
          <span className='block text-4xl font-bold'>{score*5}</span>
          <span className='block text-sm'>Your correct answer: {score} / {totalScore}</span>
        </div>
        <div className='flex justify-center space-x-4'>
          {/* <button 
            id='try-again'
            className='px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg focus:outline-none hover:bg-gray-700'
            onClick={tryAgain}
          >
            Try Again
          </button> */}
          <button
            className='bg-green-700 p-2 rounded-sm disabled:bg-black text-white'
            disabled={isSubmitted} 
            onClick={handleSubmitAssignment}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizResult;