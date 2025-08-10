console.log("FUCK")

const beatA = new Set([1, 4, 5, 8, 10])

const beatB = new Set([2, 4, 5, 7, 8])

const beatC = new Set([1, 2, 5, 6])


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
    }
});

// Loop


let loop = () => {

    

}

setInterval(loop, 1);