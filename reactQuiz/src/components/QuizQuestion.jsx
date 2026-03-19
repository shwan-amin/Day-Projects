export default function QuizQuestion({
    question,
    answers,
    questionIndex,
    selectedAnswer,
    correctAnswer,
    isChecked,
    handleAnswerClick,
}) {
    function getButtonClass(answer) {
        if (!isChecked) {
            return selectedAnswer === answer ? "answer-btn selected" : "answer-btn";
        }

        if (answer === correctAnswer) return "answer-btn correct";
        if (answer === selectedAnswer && answer !== correctAnswer) return "answer-btn wrong";
        return "answer-btn";
    }

    return (
        <div className="quiz-question-div">
            <h2 className="quiz-question-h2">{question}</h2>
            <div className="answers-div">
                {answers.map((answer, idx) => (
                    <button
                        key={`${questionIndex}-${idx}-${answer}`}
                        className={getButtonClass(answer)}
                        onClick={() => handleAnswerClick(questionIndex, answer)}
                        disabled={isChecked}
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
}