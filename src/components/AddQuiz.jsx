import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the useAddQuizMutation hook to add a quiz
import { useAddQuizMutation } from '../features/adminPortal/quizzes/quizzesApi';

// Import the useGetVideosQuery hook to get a list of available videos for the quiz
import { useGetVideosQuery } from '../features/adminPortal/videos/videosApi';

// Import the AdminNav component to display the navigation bar for the admin panel
import AdminNav from './AdminNav';

const AddQuiz = () => {
    // Use the useNavigate hook to navigate to different routes
    const navigate = useNavigate();

    // Use the useAddQuizMutation hook to add a quiz to the API
    const [addQuiz, { isSuccess }] = useAddQuizMutation();

    // Use the useGetVideosQuery hook to get a list of available videos for the quiz
    const { data: videos } = useGetVideosQuery();

    // Use state hooks to manage the form inputs
    const [question, setQuestion] = useState('');
    const [video_id, setVideo_id] = useState('');
    const [video_title, setVideo_title] = useState('');

    const [option1, setOption1] = useState({
        id: 1,
        option: '',
        isCorrect: false,
    });
    const [option2, setOption2] = useState({
        id: 2,
        option: '',
        isCorrect: true,
    });
    const [option3, setOption3] = useState({
        id: 3,
        option: '',
        isCorrect: false,
    });
    const [option4, setOption4] = useState({
        id: 4,
        option: '',
        isCorrect: false,
    });

    // Define a function to handle the video select change
    const handleSelectChange = (dt) => {
        const myObject = JSON.parse(dt);
        setVideo_id(myObject.id);
        setVideo_title(myObject.title);
    };

    // Define a function to handle adding a new quiz
    const handleAddQuiz = (e) => {
        e.preventDefault();

        const data = {
            question,
            video_id,
            video_title,
            options: [option1, option2, option3, option4],
        };
        addQuiz(data);
    };

    // Use the useEffect hook to navigate to the quizzes page when a new quiz is successfully added
    useEffect(() => {
        if (isSuccess) navigate('/dashboard/quizzes');
    }, [isSuccess]);

    return (
        <div>
            {/* Render the navigation bar for the admin panel */}
            <AdminNav />
            <div>
                <form onSubmit={handleAddQuiz}>
                    <div className="border-b border-gray-900/10 pb-12 bg-white w-8/12 m-auto p-4 mt-16">
                        <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="question" className="block text-sm font-medium leading-6 text-gray-900">
                                    Question:
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        required
                                        id="question"
                                        name="question"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="video_title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Choose Video:
                                </label>
                                <div className="mt-2">
                                    <select
                                        required
                                        onChange={(e) => handleSelectChange(e.target.value)}
                                        id="video_title"
                                        name="video_title"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    >
                                        {/* Map through the available videos and render them as options in the select element */}
                                        {videos &&
                                            videos.map((dt) => (
                                                <option value={JSON.stringify(dt)} key={dt.id}>
                                                    {dt.title}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="option1" className="block text-sm font-medium leading-6 text-gray-900">
                                    option1:
                                </label>
                                <div className="mt-2 flex gap-3">
                                    <input
                                        type="radio"
                                        name="option1"
                                        id=""
                                        checked={option1.isCorrect}
                                        onClick={(e) => setOption1({ ...option1, isCorrect: !option1.isCorrect })}
                                    />
                                    <input
                                        value={option1.option}
                                        onChange={(e) => setOption1({ ...option1, option: e.target.value })}
                                        required
                                        id="option1"
                                        name="option1"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="option2" className="block text-sm font-medium leading-6 text-gray-900">
                                    option2:
                                </label>
                                <div className="mt-2 flex gap-3">
                                    <input
                                        type="radio"
                                        name="option2"
                                        id=""
                                        checked={option2.isCorrect}
                                        onClick={(e) => setOption2({ ...option2, isCorrect: !option2.isCorrect })}
                                    />

                                    <input
                                        value={option2.option}
                                        onChange={(e) => setOption2({ ...option2, option: e.target.value })}
                                        required
                                        id="option2"
                                        name="option2"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="option1" className="block text-sm font-medium leading-6 text-gray-900">
                                    option3:
                                </label>
                                <div className="mt-2 flex gap-3">
                                    <input
                                        type="radio"
                                        name="option3"
                                        id=""
                                        checked={option3.isCorrect}
                                        onClick={(e) => setOption3({ ...option3, isCorrect: !option3.isCorrect })}
                                    />
                                    <input
                                        value={option3.option}
                                        onChange={(e) => setOption3({ ...option3, option: e.target.value })}
                                        required
                                        id="option3"
                                        name="option3"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="option1" className="block text-sm font-medium leading-6 text-gray-900">
                                    option4:
                                </label>
                                <div className="mt-2 flex gap-3">
                                    <input
                                        type="radio"
                                        name="option4"
                                        id=""
                                        checked={option4.isCorrect}
                                        onClick={(e) => setOption4({ ...option4, isCorrect: !option4.isCorrect })}
                                    />
                                    <input
                                        value={option4.option}
                                        onChange={(e) => setOption4({ ...option4, option: e.target.value })}
                                        required
                                        id="option4"
                                        name="option4"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add a button to submit the form */}
                        <button type="submit" className="rounded-md text-black mt-5 w-full py-2 px-3 border">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuiz;
