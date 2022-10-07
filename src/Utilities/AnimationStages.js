export class Animation {

    fps;
    turn;
    draw;

    stop = false;
    frameCount = 0;
    fpsInterval;
    startTime;
    now;
    then;
    elapsed;

    constructor(fps, turns, draw) {
        this.fps = fps;
        this.turns = turns;
        this.draw = draw;
    }

    startAnimating() {
        this.fpsInterval = 1000 / this.fps;
        this.then = window.performance.now();
        this.startTime = this.then;
        this.animate();
    }

    animate(newtime) {

        if (this.stop) {
            return;
        }
        requestAnimationFrame(this.animate);

        this.now = newtime;
        this.elapsed = this.now - this.then;

        if (this.elapsed > this.psInterval) {

            this.then = this.now - (this.elapsed % this.fpsInterval);
    
            this.draw();

        }
    }
    
}
