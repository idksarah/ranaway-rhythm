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
const DISPLACEMENT_MULTIPLIER = 300; // 300px
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

for (let i = 0; i < beatA.length; i++){
    var img = document.createElement("img");
    img.src="./beat.png";
    var src = document.getElementById("music");
    src.append(img);
    imagesA[`img${i}`] = img;
    
} //turn into func later idc rn
for (let i = 0; i < beatA.length; i++){
    var img = document.createElement("img");
    img.src="./beat.png";
    var src = document.getElementById("music");
    src.append(img);
    imagesB[`img${i}`] = img;
}
for (let i = 0; i < beatA.length; i++){
    var img = document.createElement("img");
    img.src="./beat.png";
    var src = document.getElementById("music");
    src.append(img);
    imagesC[`img${i}`] = img;
}

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
    for(let indexA = imagesA[0]; indexA < imagesA.length; indexA++) {
        if(indexA > lineIndex){
            
        }
    }
    lineIndex = audioContext.currentTime;
}

setInterval(loop, 1);