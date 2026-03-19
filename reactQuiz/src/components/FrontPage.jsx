export default function FrontPage({ handleStartQuiz }) {
    return (
        <main className="front-page-div">
            <h1 className="quiz-title">Reactive Quiz</h1>
            <p className="quiz-description">
                Are you ready to take on the most devious general knowledge quiz ever? 
                Click the button below to take on the Reactive Quiz!
            </p>
            <button className="start-quiz-btn" onClick={handleStartQuiz}>Start Quiz</button>
        </main>
    );
}