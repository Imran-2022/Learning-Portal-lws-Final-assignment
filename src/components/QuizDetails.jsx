import React, { useState } from 'react';

const QuizDetails = ({ dt = {}, idx }) => {
    const { question, options } = dt;
    // console.log(options);
    const writeAnswer = options.filter(dt => dt.isCorrect).map(dt => {
        if (dt.isCorrect) {
            return dt.option
        }
    })

    console.log(writeAnswer);

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleAnswerChange = (e) => {
        const selectedOption = e.target.value;
        const alreadySelected = selectedAnswers.includes(selectedOption);

        if (alreadySelected) {
            const newSelectedAnswers = selectedAnswers.filter(
                (option) => option !== selectedOption
            );
            setSelectedAnswers(newSelectedAnswers);
        } else {
            const newSelectedAnswers = [...selectedAnswers, selectedOption];
            setSelectedAnswers(newSelectedAnswers);
        }
    };

    console.log(selectedAnswers);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isCorrectd = (writeAnswer, selectedAnswers)=> {
            console.log(writeAnswer,selectedAnswers);
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
          console.log(isCorrectd(writeAnswer, selectedAnswers));
    };

    return (
        <div className="quiz">
            <h4 className="question">{`Quiz ${idx + 1} - ${question}`}</h4>
            <form className="quizOptions" onSubmit={handleSubmit}>
                {options &&
                    options.map((option) => (
                        <label key={option.id} htmlFor={`${option.id}_q${idx}`}>
                            <input
                                type="checkbox"
                                id={`${option.id}_q${idx}`}
                                value={option.option}
                                checked={selectedAnswers.includes(option.option)}
                                onChange={handleAnswerChange}
                            />
                            {option.option}
                        </label>
                    ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default QuizDetails;