import React from "react";
import {UserAnswerObject} from "../App";
import {ButtonWrapper, QuestionCardStyleWrapper} from "./style";

interface QuestionCardProps {
    question: string,
    answers: string[],
    answerCallback: (event: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: UserAnswerObject | undefined, // 不是useranswerObj可以是undefined，是给进来的时候可能是undefine
    questionNum: number,
    totalQuestions: number
}

export const QuestionCard: React.FC<QuestionCardProps> = (props) => {
    return (
        <QuestionCardStyleWrapper>
            <p>Question: {props.questionNum} / {props.totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html: props.question}}/>
            <div>
                {props.answers.map(answer => {
                    //看user answer 是不是defined，存在就true，不行就false。
                    return (
                        <ButtonWrapper key={answer}
                                       correct={props.userAnswer?.correctAnswer === answer}
                                        userClicked={props.userAnswer?.answer === answer}
                        >
                            <button disabled={props.userAnswer ? true : false} value={answer}
                                    onClick={props.answerCallback}>
                                <span>{answer}</span>
                            </button>
                        </ButtonWrapper>
                    )
                })}
            </div>
        </QuestionCardStyleWrapper>
    )
}
