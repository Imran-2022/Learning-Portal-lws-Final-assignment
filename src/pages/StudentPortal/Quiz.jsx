import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizResult from '../../components/QuizResult';
import StudentNav from '../../components/StudentNav';
import { useGetquizMarksQuery } from '../../features/adminPortal/quizMark/quizMarkApi';
import { useGetQuizzesQuery } from '../../features/adminPortal/quizzes/quizzesApi';
import useUser from '../../hooks/useUser';

const Quiz = () => {
  const user = useUser();
  const { quizId } = useParams()
  const { data: allQuizMarks } = useGetquizMarksQuery();
  // need to get single video details by id  when refresh.
  const { data: quiz } = useGetQuizzesQuery();
  const QuizData = quiz?.filter(dt => dt.video_id == quizId)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption([]);
    } else {
      setShowResult(true)
    }
  }

  const correctAnser = QuizData?.[currentQuestion].options.filter(dt => dt.isCorrect).map(dt => dt.id)


  const updateScore = () => {

    console.log("correctAnser", correctAnser);
    console.log("clickedOption", clickedOption);

    const isCorrectd = (writeAnswer, selectedAnswers) => {
      console.log(writeAnswer, selectedAnswers);
      if (writeAnswer.length == selectedAnswers.length) {
        return writeAnswer.every((element, index) => {
          if (element === selectedAnswers[index]) {
            return true;
          }
          return false;
        });
      }

      return false;
    }
    if (isCorrectd(correctAnser, clickedOption)) {
      setScore(score + 1);
    }
  }

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption([]);
    setScore(0);
  }

  const handleClick = (dt) => {
    console.log(dt);
    const alreadySelected = clickedOption.includes(dt);

    if (alreadySelected) {
      const newSelectedAnswers = clickedOption.filter(
        (t) => t != dt
      );
      setClickedOption(newSelectedAnswers);
    } else {
      const newSelectedAnswers = [...clickedOption, dt];
      setClickedOption(newSelectedAnswers);
    }
  }

  // get all quiz marks -

  const isSubmitted = allQuizMarks?.filter(dt => dt.video_id == QuizData?.[0].video_id).map(obj => obj.student_id)?.includes(user.id);

  return (
    <div>
      <StudentNav />
      {
        showResult ? (
          <QuizResult isSubmitted={isSubmitted} QuizData={QuizData} score={score} totalScore={QuizData.length} tryAgain={resetAll} />
        ) : <section className="py-6 bg-primary">
          {
            isSubmitted && <p className=' w-8/12 m-auto mb-4 text-center font-mono text-xs text-white py-8 underline underline-offset-4 bg-cyan-400 p-4'>Already Submitted  ! you have no permission to submit again , but you can visit through all quizes</p>
          }
          <div className="mx-auto quiz max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Quizzes for "{QuizData?.[0].video_title}</h1>
              <p className="text-sm text-slate-200">Each question contains 5 marks</p>
            </div>
            <div className="space-y-8 p-4">
              <span className="text-sm">{currentQuestion + 1}.</span>
              <span className="question">{QuizData?.[currentQuestion]?.question}</span>

              <div className="grid grid-cols-2 gap-4">
                {QuizData?.[currentQuestion]?.options.map((option, i) => {
                  return (
                    <button
                      className={`block px-4 py-2 rounded-md shadow-sm transition-colors duration-150 ${clickedOption.includes(i + 1) ? "bg-red-400 text-white" : "bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        }`}
                      key={i}
                      onClick={() => handleClick(option.id)}
                    >
                      {option.option}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className='bg-green-500 m-4 mt-8 text-center cursor-pointer'  onClick={changeQuestion}>
              <button className=" bg-green-500 text-white px-4 py-2 " type="button"  >Next</button>
            </div>
          </div>

        </section>
      }
    </div>
  );
};

export default Quiz;