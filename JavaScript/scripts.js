const questionElement = document.querySelector('.quest');
    const scoreElement = document.querySelector('.score');
    let correctAnswers = 0;
    let questionCounter = 0;

    function updateScore() {
      scoreElement.textContent = `Score: ${correctAnswers}`;
    }

    function loadQuestion() {
      fetch('https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=boolean')
        .then(response => response.json())
        .then(data => {
          const question = data.results[0].question;
          const correctAnswer = data.results[0].correct_answer;
          const incorrectAnswer = data.results[0].incorrect_answers[0];
          const answerChoices = [correctAnswer, incorrectAnswer];
          // Shuffle the answer choices
          answerChoices.sort(() => Math.random() - 0.5);
          // Build the answer choice HTML
          let answerChoiceHtml = '';
          answerChoices.forEach(answer => {
            answerChoiceHtml += `<li><button class="answer-btn">${answer}</button></li><br>`;
          });
          // Build the question HTML
          const questionHtml = `
            <div class="quest">Question: "${question}"
              <div class="answer">
                <ul>
                  ${answerChoiceHtml}
                </ul>
              </div>
            </div>
          `;
          // Add the question HTML to the page
          questionElement.innerHTML = questionHtml;

          // Add event listeners to the answer buttons
          const answerButtons = document.querySelectorAll('.answer-btn');
          answerButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
              if (button.textContent === correctAnswer) {
                correctAnswers++;
                updateScore();
              }
              questionCounter++;
              if (questionCounter < 3) {
                loadQuestion();
              } else {
                if (correctAnswers === 3) {
                  window.location.href = 'secret_page.html'; // Change this to the URL of your secret page
                } else {
                  alert('Sorry, you didn\'t answer all 3 questions correctly. Better luck next time!');
                  correctAnswers = 0;
                  questionCounter = 0;
                  updateScore();
                  loadQuestion();
                }
              }
            });
          });
        })
        .catch(error => {
          console.error('Error fetching question:', error);
        });
    }

    loadQuestion();
