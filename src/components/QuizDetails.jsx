import React from 'react';

const QuizDetails = ({ dt = {}, idx }) => {
    const { question, options } = dt;
    console.log(options);

    return (
        <div className="quiz">
            <h4 className="question">Quiz {idx + 1} - {question}</h4>
            <form className="quizOptions">
                {
                    options?.map(dt => <label key={dt.id} htmlFor="option1_q1">
                        <input type="checkbox" id="option1_q1" />
                        {dt.option}
                    </label>)
                }
            </form>
        </div>
    );
};

export default QuizDetails;