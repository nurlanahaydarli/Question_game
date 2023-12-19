const questions = [
    {
        title: "Who sang the title song for the latest Bond film, No Time to Die?",
        trueAnswer: "Billie Eilish",
        variants: ["Adele", "Sam Smith", "Billie Eilish"],
    },
    {
        title: "Which flies a green, white, and orange (in that order) tricolor flag? ",
        trueAnswer: "Ireland",
        variants: ["Ireland", "Ivory Coast", "Italy"],
    },
    {
        title: "What company makes the Xperia model of smartphone?",
        trueAnswer: "Sony",
        variants: ["Samsung", "Sony", "Nokia"],
    },
    {
        title: "Which city is home to the Brandenburg Gate?",
        trueAnswer: "Berlin",
        variants: ["Vienna", "Zurich", "Berlin"],
    },
    {
        title: " Where was the first example of paper money used?",
        trueAnswer: "China",
        variants: ["China", "Turkey", "Greece"],
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
                `<button class="btn btn-outline-light"  onclick="selectItem('${item}')">${index+1}. ${item}</button>`
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

