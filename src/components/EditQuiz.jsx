import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from './AdminNav';

// Importing queries and mutations from API slice
import { useGetQuizQuery, useUpdateQuizMutation } from '../features/adminPortal/quizzes/quizzesApi';
import { useGetVideosQuery } from '../features/adminPortal/videos/videosApi';

const EditQuiz = () => {
    // Getting quiz ID from URL params and initializing navigate function from react-router-dom
    const { updateQuizId } = useParams();
    const navigate = useNavigate();

    // Initializing mutation and query hooks for updating quiz and getting quizzes and videos
    const [updateQuiz, { isSuccess: updateSuccess }] = useUpdateQuizMutation();
    const { data: singleQuiz } = useGetQuizQuery(updateQuizId);
    const { data: videos } = useGetVideosQuery();
    // Initializing state variables and setters for form inputs
    const [question, setQuestion] = useState('');
    const [video_id, setVideo_id] = useState('');
    const [video_title, setVideo_title] = useState('');
    const [option1, setOption1] = useState({
        id: 1,
        option: '',
        isCorrect: false
    });
    const [option2, setOption2] = useState({
        id: 2,
        option: '',
        isCorrect: true,
    });
    const [option3, setOption3] = useState({
        id: 3,
        option: '',
        isCorrect: false
    });
    const [option4, setOption4] = useState({
        id: 4,
        option: '',
        isCorrect: false
    });

    // Function to handle changes to video select input
    const handleSelectChange = (dt) => {
        // Parsing selected option data and setting it to video_id and video_title state variables
        const myObject = JSON.parse(dt);
        setVideo_id(myObject.id);
        setVideo_title(myObject.title);
    };

    // Function to handle form submit for updating quiz
    const handleEditQuiz = (e) => {
        e.preventDefault();

        // Creating data object with form input values
        const data = {
            question,
            video_id,
            video_title,
            options: [option1, option2, option3, option4]
        };
        // Calling updateQuiz mutation with quiz ID and data as arguments
        updateQuiz({ id: updateQuizId, data });
    };

    useEffect(() => {
        // Setting form input values from fetched quiz data
        setQuestion(singleQuiz?.question || '');
        setOption1(singleQuiz?.options[0] || { id: 1, option: '', isCorrect: false });
        setOption2(singleQuiz?.options[1] || { id: 2, option: '', isCorrect: true });
        setOption3(singleQuiz?.options[2] || { id: 3, option: '', isCorrect: false });
        setOption4(singleQuiz?.options[3] || { id: 4, option: '', isCorrect: false });
        setVideo_title(singleQuiz?.video_title)
        setVideo_id(singleQuiz?.video_id)
    }, [singleQuiz]);

    useEffect(() => {
        // Navigating to quizzes dashboard page after successful quiz update
        if (updateSuccess) navigate('/dashboard/quizzes');
    }, [updateSuccess]);

    return (
        <div>
            {/* Rendering navigation component */}
            <AdminNav />
            <div>
                <div>
                    <form onSubmit={handleEditQuiz}>
                        <div className="border-b border-gray-900/10 pb-12 bg-white w-8/12 m-auto p-4 mt-16">
                            <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-6 ">
                                {/* Quiz question input */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">
                                        Question :
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            required
                                            id="question"
                                            name="question"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Video select input */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="video_title" className="block text-sm font-medium leading-6 text-gray-900">
                                        Choose Video :
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            required
                                            onChange={(e) => handleSelectChange(e.target.value)}
                                            id="video_title"
                                            name="video_title"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                        >
                                            {/* Filling video select input with fetched videos data */}
                                            <option selected hidden disabled value={JSON.stringify(singleQuiz)}>{singleQuiz?.video_title}</option>
                                            {videos &&
                                                videos.map((dt) => (
                                                    <option value={JSON.stringify(dt)} key={dt.id}>
                                                        {dt.title}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>  {/* Option 1 input */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="option1" className="block text-sm font-medium leading-6 text-gray-900">
                                        option1 :
                                    </label>
                                    <div className="mt-2 flex gap-3">
                                        <input type="radio" name="option1" id="" checked={option1?.isCorrect || false} onClick={(e) => setOption1({ ...option1, isCorrect: !option1.isCorrect })} />
                                        <input
                                            value={option1?.option}
                                            onChange={(e) => setOption1({ ...option1, option: e.target.value })}
                                            required
                                            id="option1"
                                            name="option1"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Option 2 input */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="option2" className="block text-sm font-medium leading-6 text-gray-900">
                                        option2 :
                                    </label>
                                    <div className="mt-2 flex gap-3">
                                        <input type="radio" name="option2" id="" checked={option2?.isCorrect || false} onClick={(e) => setOption2({ ...option2, isCorrect: !option2.isCorrect })} />

                                        <input
                                            value={option2?.option}
                                            onChange={(e) => setOption2({ ...option2, option: e.target.value })}
                                            required
                                            id="option2"
                                            name="option2"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Option 3 input */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="option1" className="block text-sm font-medium leading-6 text-gray-900">
                                        option3 :
                                    </label>
                                    <div className="mt-2 flex gap-3">
                                        <input type="radio" name="option3" id="" checked={option3?.isCorrect || false} onClick={(e) => setOption3({ ...option3, isCorrect: !option3.isCorrect })} />
                                        <input
                                            value={option3?.option}
                                            onChange={(e) => setOption3({ ...option3, option: e.target.value })}
                                            required
                                            id="option3"
                                            name="option3"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Option 4 input */}
                                <div className="sm:col-span-4">
                                    <label htmlFor="option1" className="block text-sm font-medium leading-6 text-gray-900">
                                        option4 :
                                    </label>
                                    <div className="mt-2 flex gap-3">
                                        <input type="radio" name="option4" id="" checked={option4?.isCorrect || false} onClick={(e) => setOption4({ ...option4, isCorrect: !option4.isCorrect })} />   <input
                                            value={option4?.option}
                                            onChange={(e) => setOption4({ ...option4, option: e.target.value })}
                                            required
                                            id="option4"
                                            name="option4"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <button type="submit">
                                    Update quiz
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditQuiz;