const url = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=8&limit=200&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
const wordInput = document.querySelector("#word-input");
const scoreDisplay = document.querySelector("#score");
const message = document.querySelector("#message");
const timeDisplay = document.querySelector("#time");
const headerTime = document.querySelector("#seconds");
const btnStart = document.querySelector(".btn-start");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");

let score = 0;
let gameTime = 5;
let time = gameTime;
let isPlaying = false;
let countInterval = '';
let checkInterval = '';

headerTime.innerHTML = gameTime;
const words = [];

  // 게임 시작 함수
function start() {
    //초기화 작업
    isPlaying = true;
    wordInput.readOnly = false;
    wordInput.value = '';
    wordInput.focus();
    time = gameTime;
    score = 0;
    scoreDisplay.innerHTML = 0;
    message.innerHTML= '';
    timeDisplay.innerHTML = time;
    

    getWords();
    wordInput.addEventListener("input", startMatch);
    countInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
}

  // 단어 가져오기
function getWords() {
    axios.get(url).then((res) => {
        res.data.forEach((word) => {
            if (word.word.length < 9) {
                words.push(word.word);
            }
        })
    }).catch((err) => {
        console.log(err);
    })
}

  // 게임이 플레이중인지 확인
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'GAME OVER';
        btnStart.classList.remove('btn-success');
        btnStart.classList.add('btn-warning');
        btnStart.innerHTML = '다시 시작하시겠습니까?'
        btnStart.style.display = 'inline-block';
        score = -1;
        wordInput.readOnly = true
    }
}


  // 시간을 카운트 다운
function countDown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
        clearInterval(countInterval);
    }
    timeDisplay.innerHTML = time;
}


  // 글자가 맞는지 확인 함수
function startMatch() {
    const currentword = document.querySelector("#current-word");
    if (currentword.innerHTML === wordInput.value) {
        score++;
        time = gameTime;
        scoreDisplay.innerHTML = score;
        wordInput.value = "";
        message.innerHTML = "정답 입니다!!!";

        const randomIndex = Math.floor((Math.random() * words.length));
        currentword.innerHTML = words[randomIndex];
    } else {
        message.innerHTML = '';
    }

    if (score === -1) {
        scoreDisplay.innerHTML = 0;

    } else {
        scoreDisplay.innerHTML = score;
    }
}

  // 게임시작 버튼 클릭 이벤트
btnStart.addEventListener("click" , function() {
    btnStart.style.display = "none";
    start();
})

  // 난이도 초급 버튼 이벤트
btn1.addEventListener("click" , function() {
    if(!isPlaying) {
        gameTime = 5;
        headerTime.innerHTML = gameTime;
        btn1.classList.remove("btn-secondary");
        btn1.classList.add("btn-primary");
        btn2.classList.add("btn-secondary");
        btn3.classList.add("btn-secondary");
    }
})

  // 난이도 중급 버튼 이벤트
btn2.addEventListener("click" , function() {
    if(!isPlaying) {
        gameTime = 4;
        headerTime.innerHTML = gameTime;
        btn2.classList.remove("btn-secondary");
        btn2.classList.add("btn-primary");
        btn1.classList.add("btn-secondary");
        btn3.classList.add("btn-secondary");
    }
})

  // 난이도 고급 버튼 이벤트
btn3.addEventListener("click" , function() {
    if(!isPlaying) {
        gameTime = 3;
        headerTime.innerHTML = gameTime;
        btn3.classList.remove("btn-secondary");
        btn3.classList.add("btn-primary");
        btn1.classList.add("btn-secondary");
        btn2.classList.add("btn-secondary");
    }
})


