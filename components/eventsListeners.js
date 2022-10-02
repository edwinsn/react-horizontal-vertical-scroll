import { scroll } from './controllScroll'

function wheelControllScroll(
    horizontalSections,
    wrapperContainer,
) {

    return (e) => {

        e.preventDefault();
        e.stopPropagation();

        //How much the user scrolls
        const delta = e.deltaY;

        scroll({
            wrapperContainer,
            horizontalSections,
            delta
        })

    }
}

let start = { x: 0, y: 0 };

function phoneScroll(
    horizontalSections,
    wrapperContainer
) {

    return (e) => {

        e.preventDefault();
        e.stopPropagation();

        let offset = {}

        offset.x = start.x - e.touches[0].pageX;
        offset.y = start.y - e.touches[0].pageY;

        //How much the user scrolls
        const delta = offset.y;

        scroll({
            wrapperContainer,
            horizontalSections,
            delta
        })

        start.x = e.touches[0].pageX;
        start.y = e.touches[0].pageY;

    }

}

function arrowScroll(
    horizontalSections,
    wrapperContainer
) {

    return (e) => {

        const isUp = e.key === 'ArrowUp';
        const isDown = e.key === 'ArrowDown';

        if (!isUp && !isDown) return;

        e.preventDefault();

        //How much the user scrolls
        let delta = isDown ? 95 : -95;

        scroll({
            wrapperContainer,
            horizontalSections,
            delta,
            behavior: 'smooth'
        })

    }

}

function touchStart(event) {
    start.x = event.touches[0].pageX;
    start.y = event.touches[0].pageY;
}

export { wheelControllScroll, phoneScroll, touchStart, arrowScroll }