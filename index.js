const beatA = [5, 6, 9, 10, 12]

const beatB = [5, 6, 8, 9, 11]

const beatC = [5, 6, 8, 9]

let imagesA = []
let imagesB = []
let imagesC = []

let imageAindex = 0;
let imageBindex = 0;
let imageCindex = 0;

let beatAindex = 0;
let beatBindex = 0;
let beatCindex = 0;

const MAX_TIME = 5;
const DISPLACEMENT_MULTIPLIER = 500;
const STARTING_POINT = -500;

const OK_TIME = 0.5;
const GOOD_TIME = 0.4;
const GREAT_TIME = 0.3;

let lineIndex = 0;

let scoreA = 0;
let scoreB = 0;
let scoreC = 0;

function incrementScoreA(amount) {
    scoreA += amount;
    document.getElementById("scoreA").innerText = scoreA + " pts";
}
function incrementScoreB(amount) {
    scoreB += amount;
    document.getElementById("scoreB").innerText = scoreB + " pts";
}

function incrementScoreC(amount) {
    scoreC += amount;
    document.getElementById("scoreC").innerText = scoreC + " pts";
}

incrementScoreA(0);
incrementScoreB(0);
incrementScoreC(0);

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function loadAudio(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

function playAudio(buffer, when = 0) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(audioContext.currentTime + when);
    return source;
}

// Example usage:
// loadAudio('path/to/your/audio.mp3').then(buffer => playAudio(buffer));

// To resume audio context on user gesture (required by browsers)
document.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
        console.log("Audio context resumed");
        loadAudio('./ran away.mp3').then(buffer => { playAudio(buffer); });
    }
});

// Loop

function makeBeatImg(row) {
    var img = document.createElement("img");
    img.src = "./winds.png";
    img.style.width = "200px";
    img.style.height = "auto";
    var src = document.getElementById("music");
    img.style.position = 'absolute';
    src.append(img);
    if (row == 1) {
        img.style.top = "10vh";
    }
    if (row == 2) {
        img.style.top = "40vh";
    }
    if (row == 3) {
        img.style.top = "70vh";
    }
    return img
}

for (let i = 0; i < beatA.length; i++) {
    img = makeBeatImg(1)
    img.id = `imgA${i}`;
    imagesA[i] = img;
}
for (let i = 0; i < beatB.length; i++) {
    img = makeBeatImg(2)
    img.id = `imgB${i}`;
    imagesB[i] = img;
}
for (let i = 0; i < beatC.length; i++) {
    img = makeBeatImg(3)
    img.id = `imgC${i}`;
    imagesC[i] = img;
}
// for (let i = 0; i < beatA.length; i++){
//     img = makeBeatImg()
//     img.id = `imgB${i}`;
//     imagesB[i] = img;
// }
// for (let i = 0; i < beatA.length; i++){
//     img = makeBeatImg()
//     img.id = `imgC${i}`;
//     imagesC[i] = img;
// }


let wPressedThisCycle = false;
let spacePressedThisCycle = false;
let enterPressedThisCycle = false;
document.addEventListener('keydown', function (event) {
    if (event.key == 'w') { // w
        wPressedThisCycle = true;
    }
    if (event.code == 'Space') { // space
        spacePressedThisCycle = true;
    }
    if (event.key == 'Enter') {
        enterPressedThisCycle = true;
    }
    if (event.key == 'ArrowUp') { // top arrow
        // (no change)
    }
})

let loop = () => {
    //console.log(audioContext.currentTime, beatAindex, beatBindex, beatCindex);
    if (audioContext.state == 'running') {
        if(wPressedThisCycle) console.log(audioContext.currentTime);
        if (beatAindex < beatA.length && audioContext.currentTime > beatA[beatAindex]) {
            //console.log("Playing beat A at index:", beatAindex);
            beatAindex++;
        }
        if (beatBindex < beatB.length && audioContext.currentTime > beatB[beatBindex]) {
            //console.log("Playing beat B at index:", beatBindex);
            beatBindex++;
        }
        if (beatCindex < beatC.length && audioContext.currentTime > beatC[beatCindex]) {
            //console.log("Playing beat C at index:", beatCindex);
            beatCindex++;
        }
        // Row A
        for (let indexA = 0; indexA < imagesA.length; indexA++) {
            let beatTime = beatA[indexA];
            let timeUntilBeat = beatTime - lineIndex;
            let beatId = `imgA${indexA}`;
            let beatImg = document.getElementById(beatId);
            let imgWidth = beatImg.offsetWidth || 0;
            if (timeUntilBeat > 0) {
                beatImg.style.left = (timeUntilBeat * DISPLACEMENT_MULTIPLIER + STARTING_POINT + imgWidth + 550) + "px"
            } else if (!beatImg.classList.contains("hidden")) {
                beatImg.classList.add("hidden");
                console.log("Hiding beat A at index:", indexA);
                imageAindex = indexA + 1;
            }
        }
        let beatTimeA = beatA[imageAindex];
        let timeUntilBeatA = beatTimeA - lineIndex;
        let beatIdA = `imgA${imageAindex}`;
        let beatImgA = document.getElementById(beatIdA);
        if (wPressedThisCycle && !beatImgA.classList.contains("hidden")) {
            imageAindex++;
            const scoreText = document.getElementById("scoreA");
            if (Math.abs(timeUntilBeatA) < GREAT_TIME) {
                console.log("Great! on beat A index:", imageAindex);
                incrementScoreA(300);
                beatImgA.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-great");
            } else if (Math.abs(timeUntilBeatA) < GOOD_TIME) {
                console.log("Good! on beat A index:", imageAindex);
                incrementScoreA(200);
                beatImgA.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-good");
            } else if (Math.abs(timeUntilBeatA) < OK_TIME) {
                console.log("Ok! on beat A index:", imageAindex);
                incrementScoreA(100);
                beatImgA.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-ok");
            } else {
                console.log("Missed! on beat A index:", imageAindex);
                beatImgA.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-miss");
            }
        }

        // Row B
        for (let indexB = 0; indexB < imagesB.length; indexB++) {
            let beatTime = beatB[indexB];
            let timeUntilBeat = beatTime - lineIndex;
            let beatId = `imgB${indexB}`;
            let beatImg = document.getElementById(beatId);
            let imgWidth = beatImg.offsetWidth || 0;
            if (timeUntilBeat > 0) {
                beatImg.style.left = (timeUntilBeat * DISPLACEMENT_MULTIPLIER + STARTING_POINT + imgWidth + 550) + "px"
            } else if (!beatImg.classList.contains("hidden")) {
                beatImg.classList.add("hidden");
                console.log("Hiding beat B at index:", indexB);
                imageBindex = indexB + 1;
            }
        }
        let beatTimeB = beatB[imageBindex];
        let timeUntilBeatB = beatTimeB - lineIndex;
        let beatIdB = `imgB${imageBindex}`;
        let beatImgB = document.getElementById(beatIdB);
        if (spacePressedThisCycle && !beatImgB.classList.contains("hidden")) {
            imageBindex++;
            const scoreText = document.getElementById("scoreB");
            if (Math.abs(timeUntilBeatB) < GREAT_TIME) {
                console.log("Great! on beat B index:", imageBindex);
                incrementScoreB(300);
                beatImgB.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-great");
            } else if (Math.abs(timeUntilBeatB) < GOOD_TIME) {
                console.log("Good! on beat B index:", imageBindex);
                incrementScoreB(200);
                beatImgB.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-good");
            } else if (Math.abs(timeUntilBeatB) < OK_TIME) {
                console.log("Ok! on beat B index:", imageBindex);
                incrementScoreB(100);
                beatImgB.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-ok");
            } else {
                console.log("Missed! on beat B index:", imageBindex);
                beatImgB.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-miss");
            }
        }

        // Row C
        for (let indexC = 0; indexC < imagesC.length; indexC++) {
            let beatTime = beatC[indexC];
            let timeUntilBeat = beatTime - lineIndex;
            let beatId = `imgC${indexC}`;
            let beatImg = document.getElementById(beatId);
            let imgWidth = beatImg.offsetWidth || 0;
            if (timeUntilBeat > 0) {
                beatImg.style.left = (timeUntilBeat * DISPLACEMENT_MULTIPLIER + STARTING_POINT + imgWidth + 550) + "px"
            } else if (!beatImg.classList.contains("hidden")) {
                beatImg.classList.add("hidden");
                console.log("Hiding beat C at index:", indexC);
                imageCindex = indexC + 1;
            }
        }
        let beatTimeC = beatC[imageCindex];
        let timeUntilBeatC = beatTimeC - lineIndex;
        let beatIdC = `imgC${imageCindex}`;
        let beatImgC = document.getElementById(beatIdC);
        if (enterPressedThisCycle && !beatImgC.classList.contains("hidden")) {
            imageCindex++;
            const scoreText = document.getElementById("scoreC");
            if (Math.abs(timeUntilBeatC) < GREAT_TIME) {
                console.log("Great! on beat C index:", imageCindex);
                incrementScoreC(300);
                beatImgC.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-great");
            } else if (Math.abs(timeUntilBeatC) < GOOD_TIME) {
                console.log("Good! on beat C index:", imageCindex);
                incrementScoreC(200);
                beatImgC.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-good");
            } else if (Math.abs(timeUntilBeatC) < OK_TIME) {
                console.log("Ok! on beat C index:", imageCindex);
                incrementScoreC(100);
                beatImgC.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-ok");
            } else {
                console.log("Missed! on beat C index:", imageCindex);
                beatImgC.classList.add("hidden");
                scoreText.classList.remove("flash-great", "flash-good", "flash-ok", "flash-miss");
                void scoreText.offsetWidth;
                scoreText.classList.add("flash-miss");
            }
        }


        lineIndex = audioContext.currentTime;
    }
    // Reset key flags for the next cycle
    wPressedThisCycle = false;
    spacePressedThisCycle = false;
    enterPressedThisCycle = false;
}

setInterval(loop, 1);