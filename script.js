const questions = {
    lecture3: [
        { question: "List the Pauline Epistles in Chronological order.", answer: "Pauline Epistles (Chronological):<ul><li>Galatians</li><li>1 & 2 Thessalonians</li><li>1 & 2 Corinthians</li><li>Romans</li><li>Ephesians, Philippians, Colossians, Philemon</li><li>1 Timothy, Titus</li><li>2 Timothy</li></ul>" }
    ],
    lecture3a: [
        { question: "Cara's generic Pauline letter outline.", answer: "Pauline Generic Outline:<ul><li>Opening – X to Y, grace and peace</li><li>Thanksgiving</li><li>Body – Doctrinal then Hortatory</li><li>Closing – peace-benediction, greetings, grace-benediction</li></ul>" }
    ],
    lecture4: [
        { question: "Outline of Galatians.", answer: "Galatians:<ul><li>1:1-5 – Opening</li><li>1:6-2:21 – Apostolic Defense<ul><li>2:15-21 is transition section</li></ul></li><li>3:1-5:12 – Justificaton by Faith</li><li>5:13-6:10 – Live by Spirit not Flesh</li><li>6:11-18 – Closing</li></ul>" },
        { question: "Identify the chapter: “If anyone preaches any other gospel... let him be cursed.”", answer: "Galatians 1" }
    ],
    lecture5: [
        { question: "Identify the chapter: “There is neither Jew nor Greek… for you are all one in Christ Jesus.”", answer: "Galatians 3" }
    ],
    lecture6: [
        { question: "Identify the chapter: “The fruit of the Spirit is love, joy, …”", answer: "Galatians 5" }
    ],
    lecture7: [
        { question: "Outline of 1 Thessalonians.", answer: "1 Thessalonians:<ul><li>1:1 – Opening</li><li>1:2-10 – Thanksgiving</li><li>2:1-3:13 – Defense, Thanksgiving, Tim’s Mission</li><li>4:1-5:22 – Hortatory</li><li>5:23-28 – Closing</li></ul>" }
    ],
    lecture8: [
        { question: "Identify the chapter: “You accepted it not as the word of men, but as it truly is, the word of God.”", answer: "1 Thessalonians 2" },
        { question: "Identify the chapter, “We will be caught up together with them in the clouds to meet the Lord.”", answer: "1 Thessalonians 4" }
    ],
    lecture9: [
        { question: "Outline of 2 Thessalonians.", answer: "2 Thessalonians:<ul><li>1:1-2 – Opening</li><li>1:3-12 – Thanksgiving</li><li>2:1-12 – Man of Lawlessness</li><li>2:13-3:5 – Thanksgiving and Prayer Request</li><li>3:6-15 – Idleness</li><li>3:16-18 – Closing</li></ul>" }
    ],
    lecture10: [
        { question: "Identify the chapter: “Man of lawlessness”", answer: "2 Thessalonians 2" },
        { question: "Identify the chapter: “If a man will not work, he shall not eat.”", answer: "2 Thessalonians 3" }
    ],
    lecture11: [
        { question: "Outline of 1 Corinthians.", answer: "1 Corinthians:<ul><li>1:1-3 – Opening</li><li>1:4-9 – Thanksgiving</li><li>1:10-6:20 – Responses to Verbal Reports</li><li>7:1-16:4 – Responses to Letter</li><li>16:5-24 – Closing</li></ul>" }
    ],
    lecture12: [
        { question: "Identify the chapter: “Jews require a sign and Greeks seek wisdom, but we preach Christ crucified.”", answer: "1 Corinthians 1" },
        { question: "Identify the chapter: “The man without the Spirit does not accept the things that come from the Spirit of God.”", answer: "1 Corinthians 2" }
    ],
    lecture13: [
        { question: "Identify the chapter: “Hand this man over to Satan.”", answer: "1 Corinthians 5" },
        { question: "Identify the chapter: “Body is the temple of the Holy Spirit.”", answer: "1 Corinthians 6" }
    ],
    lecture14: [
        { question: "Identify the chapter: “The unbelieving husband is sanctified through the wife.”", answer: "1 Corinthians 7" },
        { question: "Identify the chapter: “The rock was Christ.”", answer: "1 Corinthians 10" },
        { question: "Identify the chapter: “God is faithful, he will not let you be tempted beyond what you can bear.”", answer: "1 Corinthians 10" }
    ],
    lecture15: [
        { question: "Identify the chapter: “This cup is the new covenant in my blood.”", answer: "1 Corinthians 11" },
        { question: "Identify the chapter: “God has appointed first of all Apostles, second prophets...”", answer: "1 Corinthians 12" },
        { question: "Identify the chapter: “Where O death is your sting?”", answer: "1 Corinthians 15" }
    ],
    lecture16: [],
    lecture17: [],
    lecture18: [],
    lecture19: [],
    lecture20: [],
    lecture21: [],
    lecture22: [],
    lecture23: [],
    lecture24: [],
    lecture25: [],
    lecture26: [],
    lecture27: [],
    lecture28: [],
    lecture29: []
};

let timer;
let timeLeft = 120;
let selectedQuestions = [];
let chosenQuestions = [];
let chosenAnswers = [];
let finalQuestions;
let finalAnswers;

document.getElementById("start").addEventListener("click", function () {
    const selectedLectures = [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .map(checkbox => checkbox.value);

    if (selectedLectures.length === 0) {
        alert("Select at least one lecture!");
        return;
    }

    // Clear previous question and answer lists
    chosenQuestions = [];
    chosenAnswers = [];
    finalQuestions = [];
    finalAnswers = [];
    
    // Collect questions and corresponding answers
    selectedLectures.forEach(lecture => {
        if (questions[lecture]) {
            questions[lecture].forEach((q, index) => {
                chosenQuestions.push(q["question"]);
                chosenAnswers.push(q["answer"]);
            });
        }
    });

    // Randomly select up to 3 questions
    const selectedIndices = [...Array(chosenQuestions.length).keys()].sort(() => Math.random() - 0.5).slice(0, 3);
    finalQuestions = selectedIndices.map(i => chosenQuestions[i]);
    finalAnswers = selectedIndices.map(i => chosenAnswers[i]);

    // Display questions with proper numbering
    document.getElementById("questions").innerHTML = `
        <h3>Questions:</h3><ol>
        ${finalQuestions.map((q) => `<li>${q}</li>`).join("")}</ol>
    `;

    // Clear any previous answers
    document.getElementById("answers").innerHTML = "";

    // Enable Stop button and disable Start button
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;

    // Timer setup
    let timeLeft = 120;
    let countingUp = false;

    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    window.quizTimer = setInterval(() => {
        if (!countingUp) {
            timeLeft--;
            if (timeLeft === 0) {
                countingUp = true;
                document.getElementById("timer").style.color = "red";
                document.getElementById("timer").innerText = `Time Over: 0s`;
            } else {
                document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
            }
        } else {
            timeLeft++;
            document.getElementById("timer").innerText = `Time Over: ${timeLeft}s`;
        }
    }, 1000);
});

document.getElementById("stop").addEventListener("click", function () {
    clearInterval(window.quizTimer);

    document.getElementById("start").innerHTML = "Restart Quiz";

    // Display answers below the questions, properly numbered
    document.getElementById("answers").innerHTML = `
        <h3>Answers:</h3><ol>
        ${finalAnswers.map((a) => `<li>${a}</li>`).join("")}</ol>
    `;

    // Enable Start button and disable Stop button
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
});


document.getElementById("selectAll").addEventListener("click", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = [...checkboxes].every(checkbox => checkbox.checked); // Check if all are already checked

    checkboxes.forEach(checkbox => checkbox.checked = !allChecked); // Toggle state
});
