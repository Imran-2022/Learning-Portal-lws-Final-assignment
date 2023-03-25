import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import lwsL from '../../assets/image/learningportal.svg'
import QuizDetails from '../../components/QuizDetails';
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
      {/* <!-- Navigatin Bar. It contains Logo, Center Text And Save Progress Button at the end --> */}
      <nav className="shadow-md">
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
          <img className="h-10" src={lwsL} />
          <div className="flex items-center gap-3">
            <h2 className="font-medium">Saad Hasan</h2>
            <button
              className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

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