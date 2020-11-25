const generateComment = (percentOfCorrectAnswer: number): string => {
    return percentOfCorrectAnswer == 1 ? "You got them all! Great Job!"
        : percentOfCorrectAnswer > 0.7 ? "Almost there! Keep up the good work!"
            : percentOfCorrectAnswer > 0.5 ? "You got more than half of them correct!"
                : percentOfCorrectAnswer > 0.3 ? "Good try Good try!"
                    :percentOfCorrectAnswer > 0 ? "That was tough, try it again!"
                    : percentOfCorrectAnswer == 0 ? "Oops, you miss all the questions. Try it again!" :
                            "error"
};

export default generateComment;
