class GlobalEventHandlers {

    removeGlobalEventListeners(mouseMove) {
        window.removeEventListener("mousemove", mouseMove);
    }


    initiate(onMouseMove) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', _ => this.removeGlobalEventListeners(onMouseMove));
    }


}

export default GlobalEventHandlers;