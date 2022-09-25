export default function contolScroll(
    horizontalSections,
    wrapperContainer,
) {

    return (e) => {

        //Nosotros manejamos el scroll, desabilitar el comportamiento por defecto
        e.preventDefault();
        e.stopPropagation();


        //How much the user scrolls
        const delta = e.deltaY;

        //Current scroll position
        let scrollY = wrapperContainer.scrollTop;
        let scrollX = wrapperContainer.scrollLeft;
        const clientWidth = wrapperContainer.clientWidth > window.innerWidth ? window.innerWidth : wrapperContainer.clientWidth;
        const clientHeight = wrapperContainer.clientHeight;

        const isHorizontal = isHorizontalRequired(scrollX, scrollY, horizontalSections, delta, clientWidth, clientHeight)

        if (isHorizontal.value) {

            const { isOnLimit, nearestXposition } = isHorizontal

            if (isOnLimit) {
                scrollY += delta
                scrollX = nearestXposition
            } else {
                scrollX += delta
            }

            return wrapperContainer.scrollTo(scrollX, scrollY);

        }

        //Scroll horizontal
        const { isOnLimit, nearestYposition } = isHorizontal

        if (isOnLimit) {
            scrollY = nearestYposition
        } else {
            scrollY += delta
        }

        return wrapperContainer.scrollTo(
            {
                top: scrollY,
                left: scrollX,
                behavior: 'auto'
            }
        );

    }
}

//check if the scrolling position is in the horizontal section
const isHorizontalRequired = (scrollX, scrollY, horizontalSections, delta, clientWidth, clientHeight) => {

    const { xSections, ySections } = horizontalSections

    const inXsection = xSections.some((Xinterval) => belongs(scrollX, Xinterval))
    const inYsection = ySections.some((YInterval) => belongs(scrollY, YInterval))

    const currentInterval = ySections.find((YInterval) => belongs(scrollY, YInterval))
    const notDownEnought = scrollY + clientHeight - 60 > currentInterval?.[1]

    //In vertical section
    if (!inYsection || !inXsection || notDownEnought) {

        let isOnLimit = ySections.find((Yinterval) => belongs(scrollY + delta, Yinterval)) //&& !notDownEnought
        let nearestYposition = 0

        const nextScrollY = scrollY + delta
        const nextScrollDownEnought = nextScrollY + clientHeight - 60 < currentInterval?.[1]
        if (delta < 0 && !nextScrollDownEnought) {
            isOnLimit &= false
        }

        if (delta > 0 && scrollY + clientHeight > currentInterval?.[0]) {
            isOnLimit = false
        }

        if (isOnLimit) {
            const nextInterval = isOnLimit
            nearestYposition = nextInterval[0]

        }

        return {
            value: false,
            isOnLimit: isOnLimit, //&& notDownEnought,
            nearestYposition,
        }

    }

    //In horizontal section
    const isOnLimit = !xSections.some((Xinterval) => belongs(scrollX + delta, Xinterval)) ||
        !xSections.some((Xinterval) => belongs(scrollX + delta + clientWidth, Xinterval))

    let nearestXposition = 0

    if (isOnLimit) {

        const currentInterval = xSections.find((Xinterval) => belongs(scrollX, Xinterval))

        const isNextPositionAfter = scrollX + clientWidth + delta > currentInterval[1]

        if (isNextPositionAfter) nearestXposition = currentInterval[1]
        else nearestXposition = currentInterval[0]

    }

    return {
        value: true,
        isOnLimit,
        nearestXposition,
    }

}

const belongs = (number, interval) => {
    return number >= interval[0] && number <= interval[1]
}