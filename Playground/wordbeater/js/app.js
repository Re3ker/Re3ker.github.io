(async () => {
    window.addEventListener("DOMContentLoaded", init);

    const wordInput = document.querySelector('#word-input');
    const wordsList = document.querySelector('#wordList');
    const scoreDisplay = document.querySelector('#score');
    const timeDisplay = document.querySelector('#time');
    const wordsLeftDisplay = document.querySelector('#wordsLeft');
    const message = document.querySelector('#message');
    let words = [];
    let currentWordIndex = 0;
    let countdownTimer;
    let timeLeft = 0;
    let isPlaying = false;
    let score = 0;
    let wordsLeft = 0;

    let difficulty = {
        easy: 2,
        medium: 1.3,
        hard: 0.7
    }

    let settings = {
        difficulty: difficulty.easy
    }

    async function init() {
        // Getting all the stories
        let data = await getStories().then(data => JSON.parse(data)).catch(error => error);

        // check if the data could've been received
        if (data.status) {
            message.innerHTML = "Something went wrong. Please try again later!";
            message.classList.add("lost");
            return console.log("noot noot");
        }

        // selecting a random paragraph from a random story
        let story = data.stories[Math.floor(Math.random() * data.stories.length)];
        let para = story.paragraphs[Math.floor(Math.random() * story.paragraphs.length)];
        words = para.split(" ");

        await buildWordsList(words);
        time = setTime(words);
        wordsLeft = words.length;
        wordsLeftDisplay.innerHTML = wordsLeft;

        wordInput.addEventListener('input', matchWord);
    }

    // filling up the ul element with the words
    function buildWordsList(words) {
        words.forEach((word, index) => {
            let item = document.createElement('li');
            let text = document.createTextNode(word);
            item.appendChild(text);
            item.setAttribute('data-index', index);

            if (index === 0) {
                item.classList.add("current");
            } else if (index === 1) {
                item.classList.add("next");
            } else {
                item.classList.add("future");
            }

            wordsList.appendChild(item);
        });
    }

    function matchWord() {
        if (wordInput.value.toString() === words[currentWordIndex].toString()) {
            if (currentWordIndex === 0 && isPlaying === false) {
                countdownTimer = setInterval(countDown, 1000);
            }
            let currentItem = wordsList.querySelector('[data-index="' + currentWordIndex + '"]');
            if (currentWordIndex === words.length - 1) {
                gameWon();
            } else {

                currentItem.classList.remove("current");
                currentItem.classList.add("off");

                let nextWordIndex = currentWordIndex + 1;

                if (nextWordIndex < words.length) {
                    let nextItem = wordsList.querySelector('[data-index="' + nextWordIndex + '"]');

                    setTimeout(function() { currentItem.style.display = "none" }, 100);

                    nextItem.classList.remove("next");
                    nextItem.classList.add("current");
                }

                let futureWordIndex = currentWordIndex + 2;
                if (futureWordIndex < words.length) {
                    let futureItem = wordsList.querySelector('[data-index="' + futureWordIndex + '"]');
                    futureItem.classList.remove("future");
                    futureItem.classList.add("next");
                }
                currentWordIndex++;
                wordInput.value = '';
                score++;
                scoreDisplay.innerHTML = score;
                wordsLeft -= 1;
                wordsLeftDisplay.innerHTML = wordsLeft;
            }
        }
    }

    // game is running and counting down
    function countDown() {
        if (timeLeft <= 1) {
            gameLost();
            clearInterval(countdownTimer);
        } else {
            timeLeft -= 1;
            timeDisplay.innerHTML = timeLeft;
        }
    }

    // stopping timer and telling the user he won
    function gameWon() {
        clearInterval(countdownTimer);
        message.innerHTML = "You won. Congratulations!";
        message.classList.add("won");
        isPlaying = false;
    }

    // stopping timer and telling the user he lost
    function gameLost() {
        clearInterval(countdownTimer);
        message.innerHTML = "You lost. Maybe next time!";
        message.classList.add("lost");
        isPlaying = false;
    }

    // setting the time based on the difficulty
    function setTime(words) {
        timeLeft = parseInt(Math.round(words.length * settings.difficulty));
        timeDisplay.innerHTML = timeLeft;
    }

    // Getting the stories.json content
    function getStories() {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open('GET', 'stories.json');
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }
})();