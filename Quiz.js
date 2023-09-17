let score;
// deno-lint-ignore prefer-const
let usedQuestion = [];

async function fetchQuizQuestions() {
  try {
    const response = await fetch('file:///C:/Users/mczac/OneDrive/Pulpit/Projekty/Quiz%20-%20Deno/Questions.json');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
}

async function logQuestion(categoryIndex) {
  try {
    const quizData = await fetchQuizQuestions();
    const category = quizData.categories[categoryIndex];
    const availableQuestions = category.questions.length;

    if (availableQuestions < 10) {
      console.log(`There are only ${availableQuestions} questions available in this category.`);
      console.log(`You will be prompted to answer all of them.`);
    } else {
      console.log(`There are ${availableQuestions} questions available in this category.`);
      console.log(`You will be prompted to answer 10 of them.`);
    }

    for (let i = 1; i <= 10; i++) {
      let randomQuestion;

      if (availableQuestions < 10) {
        randomQuestion = i - 1; // Prompt all available questions
      } else {
        do {
          randomQuestion = Math.floor(Math.random() * availableQuestions);
        } while (usedQuestion.includes(randomQuestion));
      }

      const question = category.questions[randomQuestion];
      usedQuestion.push(randomQuestion);

      console.log(`Question ${i}/10:`, question.question);
      console.log('Answers:', question.answers);

      checkAnswer(question, i);
    }

    console.log(`Thank you for playing the quiz, your final score is: ${score}/10!`);
  } catch (error) {
    console.error('Error during the quiz:', error);
  }
}

function checkAnswer(question, progress) {
  let answer = prompt('Enter the answer number between 0 and 3:');

  while (isNaN(answer) || answer < 0 || answer > 3) {
    answer = prompt('Enter the correct answer number:');
  }

  if (question.answers[answer] === question.correctAnswer) {
    score++;
    console.log("Congratulations, that's correct!");
    console.log(`Your score: ${score}/${progress}`);
  } else {
    console.log(`That's incorrect. Correct answer is: ${question.correctAnswer}`);
    console.log(`Your score: ${score}/${progress}`);
  }
}

async function startGame() {
  score = 0;

  console.log('Welcome to the quiz, please choose the category (by typing the category number) Sports - 0, Biology - 1, Business - 2, Music - 3, Gaming - 4');
  let categoryChoice = prompt('Enter the category number:');

  switch (categoryChoice) {
    case '0':
      console.log(`You have chosen category SPORTS, to answer the question please type the number associated with your answer (0 to 3).`);
      break;
      case '1':
      console.log(`You have chosen category BIOLOGY, to answer the question please type the number associated with your answer (0 to 3).`);
      break;
    case '2':
      console.log(`You have chosen category BUSINESS, to answer the question please type the number associated with your answer (0 to 3).`);
      break;
    case '3':
      console.log(`You have chosen category MUSIC, to answer the question please type the number associated with your answer (0 to 3).`);
      break;
    case '4':
      console.log(`You have chosen category GAMING, to answer the question please type the number associated with your answer (0 to 3).`);
      break;
    default:
      console.log('Invalid category choice. Please enter a valid category number (0 to 4).');
      while (isNaN(categoryChoice) || categoryChoice < 0 || categoryChoice > 4) {
        categoryChoice = prompt('Enter the category number:');
      }
      break;
  }

  await logQuestion(categoryChoice);
}

startGame();