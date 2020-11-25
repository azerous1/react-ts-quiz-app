import {UserAnswerObject} from "../App";

const getNumberOfCorrectAnswer = (userAnswers: UserAnswerObject[]): number => {
   return userAnswers.filter((answer => {
        if (answer) {
            return answer.correct;
        } else {
            return false
        }
    })).length
}

export default getNumberOfCorrectAnswer;
