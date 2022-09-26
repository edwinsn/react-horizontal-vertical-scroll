//let startYposition = 0
//let startXposition = 0

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
    const notDownEnought = scrollY + (delta < 0 ? 0 : 0) + clientHeight - 60 > currentInterval?.[1]

    //In vertical section
    if (!inYsection || !inXsection || notDownEnought) {

        let isOnLimit = ySections.find((Yinterval) => belongs(scrollY + delta, Yinterval))
        let nearestYposition = 0

        if (delta < 0 && notDownEnought) {
            isOnLimit = ySections.find((Yinterval) => belongs(scrollY, Yinterval))
        }

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

    const horizontalInterval = xSections.find((Xinterval, position) => belongs(scrollY, ySections[position]))

    const nextXposition = delta > 0 ? scrollX + delta + clientWidth : scrollX + delta
    const nextHorizontalInterval = xSections.find((Xinterval) => belongs(nextXposition, Xinterval))


    const isOnLimit = !horizontalInterval || !nextHorizontalInterval || (horizontalInterval !== nextHorizontalInterval)

    let nearestXposition = 0

    if (isOnLimit) {

        const currentInterval = horizontalInterval
        const isNextPositionAfter = scrollX + clientWidth + delta > currentInterval[1]

        if (isNextPositionAfter) nearestXposition = currentInterval[1] - window.innerWidth
        else nearestXposition = currentInterval[0] - window.innerWidth

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