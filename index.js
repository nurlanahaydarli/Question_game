const questions = [
    {
        title: "Question 1",
        trueAnswer: "answer1",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 2",
        trueAnswer: "answer1",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 3",
        trueAnswer: "answer1",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 4",
        trueAnswer: "answer1",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 5",
        trueAnswer: "answer2",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 6",
        trueAnswer: "answer2",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 7",
        trueAnswer: "answer2",
        variants: ["answer1", "answer2", "answer3"],
    },
];
const qTitle = document.querySelector("#qTitle");
const btnGroup = document.querySelector("#btnGroup");
const questionBg = document.getElementById("questionBg")
const progress_bar = document.getElementById("progress_bar")
const score = document.getElementById("score")
const question_box = document.getElementById("question_box")
const game_over_message = document.getElementById("game_over_message")

class QuestionGame {
    score = 0
    qIndex = -1
    currentQuestion = null
    questionData = []
    one_question_point = 0

    constructor(data) {
        this.questionData = data
        this.one_question_point = Math.round(100 / this.questionData.length)
    }

    nextQuestion() {
        if (this.qIndex === this.questionData.length - 1) {
            question_box.innerHTML = ""
            game_over_message.style.display = "block"
            return false;
        } else {
            this.qIndex += 1;
            const questionItem = this.questionData[this.qIndex];
            this.currentQuestion = questionItem;
            game_over_message.style.display = "none"
            return questionItem;
        }
    }

    incrementPoint() {
        this.score = this.score + this.one_question_point
        console.log(this.score,'this.score')
        return this.score
    }

}

const gameQ = new QuestionGame(questions);

function startGame() {
    gameQ.nextQuestion();

    const qObj = gameQ.currentQuestion;
    qTitle.innerHTML = qObj.title;

    btnGroup.innerHTML = qObj.variants
        .map(
            (item, index) =>
                `<button class="btn btn-outline-light"  onclick="selectItem('${item}')">${index}. ${item}</button>`
        )
        .join("");
}

startGame();

function selectItem(userChoose) {
    if (userChoose === gameQ.currentQuestion.trueAnswer) {
        let incrementPoint = gameQ.incrementPoint()
        score.innerHTML = incrementPoint
        progress_bar.style.width = `${incrementPoint}%`
        questionBg.classList.add("bg-success")
        questionBg.classList.remove("bg-warning")
        questionBg.classList.remove("bg-danger")
    } else {
        questionBg.classList.add("bg-danger")
        questionBg.classList.remove("bg-warning")
        questionBg.classList.remove("bg-success")
    }
    startGame();
}

