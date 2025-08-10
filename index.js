const beatA = [5, 6, 9, 10, 12]

const beatB = [5, 6, 8, 9, 11]

const beatC = [5, 6, 8, 9]

let imagesA = []
let imagesB = []
let imagesC = []

let beatAindex = 0;
let beatBindex = 0;
let beatCindex = 0;

const MAX_TIME = 5;
const DISPLACEMENT_MULTIPLIER = 500;
const STARTING_POINT = -500;
let lineIndex = 0;

let scoreA = 0;
let scoreB = 0;
let scoreC = 0;

function incrementScoreA(amount) {
    scoreA += amount;
    document.getElementById("scoreA").innerText = scoreA + " pts!";
}
function incrementScoreB(amount) {
    scoreB += amount;
    document.getElementById("scoreB").innerText = scoreB + " pts!";
}

function incrementScoreC(amount) {
    scoreC += amount;
    document.getElementById("scoreC").innerText = scoreC + " pts!";
}

incrementScoreA(1);
incrementScoreB(2); 
incrementScoreC(3);

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
    }
});

// Loop

function makeBeatImg() {
    var img = document.createElement("img");
    img.src="./beat.png";
    var src = document.getElementById("music");
    img.style.position = 'absolute';
    src.append(img);
    return img
}

for (let i = 0; i < beatA.length; i++){
    img = makeBeatImg()
    img.id = `imgA${i}`;
    imagesA[i] = img;
} 
for (let i = 0; i < beatA.length; i++){
    img = makeBeatImg()
    img.id = `imgB${i}`;
    imagesB[i] = img;
}
for (let i = 0; i < beatA.length; i++){
    img = makeBeatImg()
    img.id = `imgC${i}`;
    imagesC[i] = img;
}

document.addEventListener('keydown', function(event) {
    if (event.key == 'w') { // w
        console.log('left');
    }
    if (event.code == 'Space'){ // space
        console.log('middle');
    } 
    if (event.key == 'ArrowUp'){ // top arrow
        console.log('right');
    }
})

let loop = () => {
    //console.log(audioContext.currentTime, beatAindex, beatBindex, beatCindex);
    if(audioContext.state == 'running') {
        if(beatAindex < beatA.length && audioContext.currentTime > beatA[beatAindex]) {
            console.log("Playing beat A at index:", beatAindex);
            beatAindex++;
        }
        if(beatBindex < beatB.length && audioContext.currentTime > beatB[beatBindex]) {
            console.log("Playing beat B at index:", beatBindex);
            beatBindex++;
        }
        if(beatCindex < beatC.length && audioContext.currentTime > beatC[beatCindex]) {
            console.log("Playing beat C at index:", beatCindex);
            beatCindex++;
        }
    }
    for(let indexA = 0; indexA < imagesA.length; indexA++) {
        let beatTime = beatA[indexA];
        let timeUntilBeat = beatTime - lineIndex;

        let beatId = `imgA${indexA}`;
        let beatImg = document.getElementById(beatId);
        if(timeUntilBeat > 0){
            beatImg.style.left = (timeUntilBeat * DISPLACEMENT_MULTIPLIER + STARTING_POINT) + "px"
        } else {
            beatImg.classList.add("hidden");
        }

    }
    
    lineIndex = audioContext.currentTime;
}

setInterval(loop, 1);