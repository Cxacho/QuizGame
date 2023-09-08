let score;
// deno-lint-ignore prefer-const
let usedQuestion = [];

function fetchQuizQuestions(callback) {
  fetch('file:///C:/Users/mczac/OneDrive/Pulpit/Projekty/Quiz%20-%20Deno/Questions.json') //nie działa samo 'Questions.json' pomimo, ze znajduja sie w tym samym folderze.
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Error fetching quiz questions:', error);
    });
}
function logQuestion(categoryIndex) {

  fetchQuizQuestions(function (quizData) {

    const category = quizData.categories[categoryIndex];

    //Prompt 10 questions
    for(let i=1; i<11; i++){

      let randomQuestion;

      //Ensure that no question will repeat
      do{
        randomQuestion = Math.floor(Math.random() * category.questions.length);
      }while (usedQuestion.includes(randomQuestion))

      const question = category.questions[randomQuestion];
      usedQuestion.push(randomQuestion);

      //prompt question
      console.log("Question " + i + "/" + "10 :", question.question);
      console.log("Answers:", question.answers);
      
      checkAnswer(question, i);
    }

    console.log("Thank you for playing the quiz, your final score is : " + score + "/10 !")

  });
}
function checkAnswer(question, progress){
  let answer = prompt("Enter the answer number between 0 and 3:");

  while(isNaN(answer) || answer<0 || answer>3){
  answer = prompt("Enter the correct answer number:");
  }

  if(question.answers[answer] === question.correctAnswer){
    score++;
    console.log("Congratulations, that's correct!");
    console.log("Your score : " + score + "/" + progress);
  }
  else{
    console.log("That's incorrect. Correct answer is : " + question.correctAnswer);
    console.log("Your score : " + score + "/" + progress);
  }
}
function startGame(){

  score = 0;

  console.log("Welcome to the quiz, please choose the category (by typing the category number) Sports - 0, Biology - 1, Business - 2, Music - 3, Gaming - 4");
  let categoryChoice = prompt("Enter the category number:");

  switch (categoryChoice) {
    case "0":
      console.log("You have chosen Sports, there will be 10 questions ahead of you from this category, please type the number assosiated to your answer the first being 0 and the last being 3.");
      break;
    case "1":
      console.log("You have chosen Biology, there will be 10 questions ahead of you from this category, please type the number assosiated to your answer the first being 0 and the last being 3.");
      break;
    case "2":
      console.log("You have chosen Business, there will be 10 questions ahead of you from this category, please type the number assosiated to your answer the first being 0 and the last being 3.");
      break;
    case "3":
      console.log("You have chosen Music, there will be 10 questions ahead of you from this category, please type the number assosiated to your answer the first being 0 and the last being 3.");
      break;
    case "4":
      console.log("You have chosen Gaming, there will be 10 questions ahead of you from this category, please type the number assosiated to your answer the first being 0 and the last being 3.");
      break;
    default:
      console.log("Invalid category choice. Please enter a valid category number.");
      while(isNaN(categoryChoice) || categoryChoice<0 || categoryChoice>4){
        categoryChoice = prompt("Enter the category number:");
        }
      break;
  }
  logQuestion(categoryChoice);
}
startGame();
