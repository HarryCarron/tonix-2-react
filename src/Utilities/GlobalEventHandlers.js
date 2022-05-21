class GlobalEventHandlers {
    constructor(onKeyPress) {
        if (onKeyPress) {
            this.initiateObservePress(onKeyPress);
        }
    }

    removeGlobalEventListeners(mouseMove) {
        window.removeEventListener('mousemove', mouseMove);
    }

    initiateObservePress(onKeyPress) {
        document.addEventListener('keydown', event => {
            onKeyPress(true);
        });
        document.addEventListener('keyup', event => {
            onKeyPress(false);
        });
    }

    initiate(onMouseMove) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', _ => {
            this.removeGlobalEventListeners(onMouseMove);
        });
    }
}

export default GlobalEventHandlers;
