import { useState, useEffect } from "react";
import shuffleArray from "../utilities.js";
import QuizQuestion from "./QuizQuestion.jsx";

export default function QuizPage() {
    const [round, setRound] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [roundScore, setRoundScore] = useState(null);
    const [totalScore, setTotalScore] = useState(0);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [isChecked, setIsChecked] = useState(false);

    function safeDecode(value) {
        try {
            return decodeURIComponent(value);
        } catch {
            return value;
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchQuestions() {
            try {
                const res = await fetch(
                    "https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986",
                    { signal: controller.signal }
                );
                if (!res.ok) return;

                const data = await res.json();

                const normalized = (data.results ?? []).map((q) => ({
                    ...q,
                    question: safeDecode(q.question),
                    correct_answer: safeDecode(q.correct_answer),
                    incorrect_answers: q.incorrect_answers.map((a) => safeDecode(a)),
                    answers: shuffleArray([
                        safeDecode(q.correct_answer),
                        ...q.incorrect_answers.map((a) => safeDecode(a)),
                    ]),
                }));

                setQuestions(normalized);
                setSelectedAnswers({});
                setRoundScore(null);
                setIsChecked(false);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(err);
                }
            }
        }

        fetchQuestions();
        return () => controller.abort();
    }, [round]);

    function handleAnswerClick(questionIndex, answer) {
        if (isChecked) return;

        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }));
    }

    function handleCheckAnswersClick() {
        if (questions.length === 0) return;

        const newScore = questions.reduce((total, q, i) => {
            return total + (selectedAnswers[i] === q.correct_answer ? 1 : 0);
        }, 0);

        setRoundScore(newScore);
        setTotalScore((prev) => prev + newScore);
        setRoundsPlayed((prev) => prev + 1);
        setIsChecked(true);
    }

    function handleNextRoundClick() {
        setRound((prevRound) => prevRound + 1);
    }

    const allAnswered =
        questions.length > 0 && Object.keys(selectedAnswers).length === questions.length;

    return (
        <main className="quiz-page-main">
            <h1 className="quiz-page-title">Quizzical</h1>
            {questions.map((Q, idx) => {
                return (
                    <QuizQuestion
                        key={idx}
                        question={Q.question}
                        answers={Q.answers}
                        questionIndex={idx}
                        selectedAnswer={selectedAnswers[idx]}
                        correctAnswer={Q.correct_answer}
                        isChecked={isChecked}
                        handleAnswerClick={handleAnswerClick}
                    />
                );
            })}

            <section className="quiz-actions-row">
                {!isChecked ? (
                    <button
                        className="primary-btn"
                        onClick={handleCheckAnswersClick}
                        disabled={!allAnswered}
                    >
                        Check answers
                    </button>
                ) : (
                    <>
                        <p className="round-score-text">
                            You scored {roundScore}/{questions.length} correct answers
                        </p>
                        <button className="primary-btn" onClick={handleNextRoundClick}>
                            Play again
                        </button>
                    </>
                )}
            </section>

            <p className="total-score-text">Total score: {totalScore} across {roundsPlayed} rounds</p>
        </main>
    );
}