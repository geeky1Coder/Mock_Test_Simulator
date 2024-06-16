// timerWorker.js

let timerInterval;
let initialTime;
let startTime;

self.onmessage = function(e) {
    if (e.data.action === 'start') {
        initialTime = e.data.timeLimit * 60;
        startTime = e.data.startTime;
        startTimer();
    } else if (e.data.action === 'stop') {
        clearInterval(timerInterval);
    }
};

function startTimer() {
    timerInterval = setInterval(function() {
        const currentTime = Math.floor(Date.now() / 1000);
        const elapsedSeconds = currentTime - startTime;
        const remainingSeconds = Math.max(initialTime - elapsedSeconds, 0);

        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        self.postMessage({
            type: 'timer',
            time: formattedTime,
            remainingSeconds: remainingSeconds
        });

        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            self.postMessage({ type: 'timeUp' });
        }
    }, 1000);
}
