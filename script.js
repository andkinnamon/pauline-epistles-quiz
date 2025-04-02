document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggle-darkmode");
  
    // Function to check system's dark mode preference
    const isSystemDarkMode = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    // Function to update the dark mode based on the user's preference
    const updateDarkMode = (isDark) => {
      if (isDark) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    };

    if (isSystemDarkMode) {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    // Event listener to toggle dark mode when switch is clicked
    toggleSwitch.addEventListener("change", function () {
      const isDark = toggleSwitch.checked;
      updateDarkMode(isDark);
      localStorage.setItem("darkMode", isDark); // Save user preference
    });
  });
  
let questions = {};

fetch('questions.json')
    .then(response => response.json()) // Parse JSON
    .then(data => {
          questions = data; // Store in global variable
        console.log(questions); // Verify it's loaded
    })
    .catch(error => console.error('Error loading JSON:', error));

console.log(questions)

let timer;
let timeLeft = 120;
let selectedQuestions = [];
let chosenQuestions = [];
let chosenAnswers = [];
let finalQuestions;
let finalAnswers;

document.getElementById("start").addEventListener("click", function () {
    const selectedLectures = [...document.querySelectorAll('.lecture-checkbox:checked')]
        .map(checkbox => checkbox.value);

    if (selectedLectures.length === 0) {
        alert("Select at least one lecture!");
        return;
    }

    const includeOutlines = document.getElementById("filterOutline").checked;
    const includeChapters = document.getElementById("filterChapter").checked;

    if (!includeOutlines && !includeChapters) {
        alert("You must select at least one question type (Outlines or Chapters).");
        return;
    }

    // Clear previous question and answer lists
    chosenQuestions = [];
    chosenAnswers = [];
    finalQuestions = [];
    finalAnswers = [];

    // Collect questions based on selected filters
    selectedLectures.forEach(lecture => {
        if (questions[lecture]) {
            questions[lecture].forEach(q => {
                if ((includeOutlines && q["type"] === "outline") || 
                    (includeChapters && q["type"] === "chapter")) {
                    chosenQuestions.push(q["question"]);
                    chosenAnswers.push(q["answer"]);
                }
            });
        }
    });

    if (chosenQuestions.length === 0) {
        alert("No questions match the selected filters. Try adjusting your selections.");
        return;
    }

    // Randomly select up to 3 questions
    const selectedIndices = [...Array(chosenQuestions.length).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
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
    const checkboxes = document.querySelectorAll('.lecture-checkbox'); // Select only lecture checkboxes
    const allChecked = [...checkboxes].every(checkbox => checkbox.checked); // Check if all are already checked

    checkboxes.forEach(checkbox => checkbox.checked = !allChecked); // Toggle state
});