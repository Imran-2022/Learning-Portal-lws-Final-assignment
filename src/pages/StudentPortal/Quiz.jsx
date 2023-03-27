import React from 'react';
import { useParams } from 'react-router-dom';
import QuizDetails from '../../components/QuizDetails';
import StudentNav from '../../components/StudentNav';
import { useGetQuizzesQuery } from '../../features/adminPortal/quizzes/quizzesApi';

const Quiz = () => {
  const { quizId } = useParams()
  // need to get single video details by id  when refresh.
  const { data: quiz } = useGetQuizzesQuery();
  const allQuiz = quiz?.filter(dt => dt.video_id == quizId)
  console.log(allQuiz);
  return (
    <div>
      <StudentNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{allQuiz?.[0].video_title}
            </h1>
            <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
          </div>
          <div className="space-y-8 ">
            {
              allQuiz?.map((dt, idx) => <QuizDetails key={dt.id} dt={dt} idx={idx} />)
            }
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default Quiz;