class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click',this.pause);
    }

    start = () => {
        if(this.onStart){
            this.onStart(this.remainingTime);
        }
        this.tick();
        this.interval = setInterval(this.tick, 50);
    }

    tick = () => {
        // const remainingTime = parseFloat(this.durationInput.value);
        // this.durationInput.value = remainingTime - 1;
        if(this.remainingTime <= 0) {
            this.pause();
            if(this.onComplete) {
                this.onComplete();
            }
        } else {
            this.remainingTime = this.remainingTime - 0.05;
            if(this.onTick) {
                this.onTick(this.remainingTime);
            }
        }
    }

    pause = () => {
        clearInterval(this.interval);
    }

    get remainingTime() {
        return this.durationInput.value;
    }

    set remainingTime(time) {
        return this.durationInput.value = time.toFixed(2);
    }
}