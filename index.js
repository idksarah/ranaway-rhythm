const beatA = [1, 4, 5, 8, 10]

const beatB = [2, 4, 5, 7, 8]

const beatC = [1, 2, 5, 6]

let imagesA = []
let imagesB = []
let imagesC = []

let beatAindex = 0;
let beatBindex = 0;
let beatCindex = 0;

const MAX_TIME = 5;
const DISPLACEMENT_MULTIPLIER = 300; // 300px
let lineIndex = 0;



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