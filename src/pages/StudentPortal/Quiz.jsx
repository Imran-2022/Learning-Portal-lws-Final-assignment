import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import lwsL from '../../assets/image/learningportal.svg'
import QuizDetails from '../../components/QuizDetails';
import StudentNav from '../../components/StudentNav';
import { useGetQuizzesQuery } from '../../features/adminPortal/quizzes/quizzesApi';

const Quiz = () => {
  const { quizId } = useParams()
  const videoDetail = useSelector(state => state.videoDetails)

  // need to get single video details by id  when refresh.

  const { url, title, createdAt, description, id } = videoDetail?.videoDetails || {}
  const { data: quiz } = useGetQuizzesQuery();
  const allQuiz = quiz?.filter(dt => dt.video_id == quizId)

  return (
    <div>
      <StudentNav/>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{title}
            </h1>
            <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
          </div>
          <div className="space-y-8 ">
            {
              allQuiz?.map((dt,idx)=><QuizDetails key={dt.id} dt={dt} idx={idx}/>)
            }
            
          </div>

          <button
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
        </div>
      </section>

    </div>
  );
};

export default Quiz;