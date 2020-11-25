import React, {useState} from 'react';
import {QuestionCard} from "./components/question-card";
import {Difficulty, fetchQuestions, QuestionState} from "./api-tools/api";
import {GlobalStyle, AppStyleWrapper} from "./style";
import {QuestionCardStyleWrapper} from "./components/style";
import generateComment from "./utils/generateComment";
import getNumberOfCorrectAnswer from "./utils/getNumberOfCorrectAnswer";

const TOTAL_QUESTIONS = 10;

export type UserAnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string,
} | undefined;

const App = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [questionNum, setQuestionNum] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswerObject[]>([])
    const [score, setScore] = useState(0);
    const [report, setReport] = useState(false);
    const [gameOver, setGameOver] = useState(true);

    // 这个function 因为是开始游戏，然后app的state都跟游戏有关，所以要set全部的state
    const startTrivia = async () => {
        try {
            setLoading(true);
            setGameOver(false);
            const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
            setQuestions(newQuestions)
            setScore(0);
            setUserAnswers([]);
            setQuestionNum(0);
            setLoading(false);
            setReport(false);
        } catch (error) {
            console.log(error);
        }
    }

    const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = event.currentTarget.value
            const correctAnswer = questions[questionNum].correct_answer;
            //这里的userAnswerObject里面会根据user 现有的answer和问题的正确答案来evaluate user这个问题有没有答对。
            // 所以不需要再用if else 来进行判断了
            const newUserAnswer: UserAnswerObject = {
                question: questions[questionNum].question,
                answer: answer,
                correctAnswer: correctAnswer,
                correct: answer === correctAnswer,
            }

            if (newUserAnswer.correct) setScore(prevState => prevState + 1)
            setUserAnswers(prevState => [...prevState, newUserAnswer])
        }
    }

    const nextQuestion = () => {
        //这里是现在的questionNUm 超了问题上限才做的操作，
        // 然而set score是在 没有超上限的时候就要做，不是edge case
        // 所以要放在else里，因为if的处理一个edge case/特殊情况的
        const nextQuestionNum = questionNum + 1;

        // 如果现在的num 已经到达上限 （用现在来判断，而不是过去）
        if (nextQuestionNum === TOTAL_QUESTIONS) {
            setReport(true)
        } else {
            if (!userAnswers[questionNum]) {
                setUserAnswers(prevState => [...prevState, undefined])
            }
            setQuestionNum(nextQuestionNum)
        }
    }

    const toggleReport = () => {
        setReport(false);
        setGameOver(true)
    }

    return (
        <>
            <GlobalStyle/>
            <AppStyleWrapper className="App">
                <h1>Fun Quiz!!</h1>
                {gameOver ? (
                    <button className='start' onClick={startTrivia}>
                        Start Trivia!
                    </button>
                ) : null}
                {!gameOver && !loading ? (
                    <p className='score'>Score: {score}</p>
                ) : null}
                {loading && <p>Loading Questions......</p>}
                {!gameOver && !loading && !report ? (
                    <QuestionCard
                        question={questions[questionNum].question}
                        answers={questions[questionNum].allAnswers}
                        answerCallback={checkAnswer}
                        userAnswer={userAnswers ? userAnswers[questionNum] : undefined}
                        questionNum={questionNum + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                    />
                ) : null}
                {(!gameOver && !report) && <button className='next' onClick={nextQuestion}>Next Question</button>}
                {report && (
                    <QuestionCardStyleWrapper>
                        <div>
                            <p>You have scored {getNumberOfCorrectAnswer(userAnswers)} questions!</p>
                            <p>{generateComment( getNumberOfCorrectAnswer(userAnswers) / TOTAL_QUESTIONS)}</p>
                        </div>
                        <button className='toggleReport' onClick={() => {toggleReport()}}>
                            Ok
                        </button>
                    </QuestionCardStyleWrapper>
                )}
            </AppStyleWrapper>
        </>
    );
}

export default App;
