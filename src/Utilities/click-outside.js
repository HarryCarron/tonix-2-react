export class ClickOutside {
    listen(onClick, elem) {
        const mouseDown = target => {
            if (elem.contains(target)) {
                return;
            }

            onClick();
            document.removeEventListener('mousedown', mouseDown);
        };

        document.addEventListener('mousedown', event =>
            mouseDown(event.target)
        );
    }
}
