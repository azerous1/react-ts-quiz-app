import {shuffleArray} from "../utils/shuffleArray";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export interface QuestionData {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

export type QuestionState = QuestionData & { allAnswers: string[] };

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    try {
        const data = await (await fetch(endpoint)).json();
        // 在每个question obj里面，加上一个field 叫 allAnswer，里面是随机排序过的正确+错误答案，可以让每次的正确答案在不同的位置
        return data.results.map((question: QuestionData) => {
            return (
                {
                    ...question,
                    allAnswers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
                }
            )
        })
    } catch (error) {
        console.log(error)
    }
}
