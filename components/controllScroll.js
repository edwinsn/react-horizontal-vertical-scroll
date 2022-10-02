
export function scroll({
    wrapperContainer,
    horizontalSections,
    delta,
    behavior = 'auto'
}) {

    //Current scroll position
    let scrollY = wrapperContainer.scrollTop;
    let scrollX = wrapperContainer.scrollLeft;

    const clientWidth = wrapperContainer.clientWidth > window.innerWidth ? window.innerWidth : wrapperContainer.clientWidth;
    const clientHeight = wrapperContainer.clientHeight;

    const isHorizontal = isHorizontalRequired(scrollX, scrollY, horizontalSections, delta, clientWidth, clientHeight)

    //Horizontal scroll
    if (isHorizontal.value) {

        const { isOnLimit, nearestXposition } = isHorizontal

        if (isOnLimit) {
            scrollY += delta
            scrollX = nearestXposition
        } else {
            scrollX += delta
        }

        return wrapperContainer.scroll({
            top: scrollY,
            left: scrollX,
            behavior
        });

    }

    //Vertical Scroll
    const { isOnLimit, nearestYposition, nearestXposition } = isHorizontal

    if (isOnLimit) {
        scrollY = nearestYposition
        scrollX = nearestXposition
    } else {
        scrollY += delta
    }

    return wrapperContainer.scroll(
        {
            top: scrollY,
            left: scrollX,
            behavior
        }
    );

}


//check if the scrolling position is in the horizontal section
const isHorizontalRequired = (scrollX, scrollY, horizontalSections, delta, clientWidth, clientHeight) => {

    const { xSections, ySections } = horizontalSections

    const currentXInterval = xSections.some((Xinterval) => belongs(scrollX, Xinterval))
    const currentYInterval = ySections.find((YInterval) => belongs(scrollY, YInterval))

    const notDownEnought = scrollY + clientHeight - 60 > currentYInterval?.[1]

    //In vertical section
    if (!currentYInterval || !currentXInterval || notDownEnought) {

        //Check if the next  vertical position is an horizontal section
        let isOnLimit = false
        const nextScrollY = scrollY + delta
        const nextScrollDownEnought = nextScrollY + clientHeight - 60 < currentYInterval?.[1]
        let nearestYposition = 0

        if (delta < 0 && notDownEnought) {
            isOnLimit = ySections.find((Yinterval) => belongs(scrollY, Yinterval))
        } else {
            isOnLimit = ySections.find((Yinterval) => belongs(scrollY + delta, Yinterval))
        }

        if (delta < 0 && !nextScrollDownEnought) {
            isOnLimit = false
        }

        if (delta > 0 && scrollY + clientHeight > currentYInterval?.[0]) {
            isOnLimit = false
        }

        if (isOnLimit) {
            nearestYposition = isOnLimit[0]
        }

        return {
            value: false,
            isOnLimit: isOnLimit,
            nearestYposition,
        }

    }

    //In horizontal section

    const nextXposition = delta > 0 ? scrollX + delta + clientWidth : scrollX + delta
    const nextHorizontalInterval = xSections.find((Xinterval) => belongs(nextXposition, Xinterval))
    const horizontalInterval = xSections.find((Xinterval, position) => belongs(scrollY, ySections[position]))


    let isOnLimit = !horizontalInterval || !nextHorizontalInterval || (horizontalInterval !== nextHorizontalInterval)

    if (delta > 0) {
        isOnLimit &= !belongs(scrollX + delta + clientWidth, horizontalInterval)
    }
    if (delta < 0) {
        isOnLimit &= !belongs(scrollX + delta, horizontalInterval)
    }

    let nearestXposition = 0

    if (isOnLimit) {
        const isNextPositionAfter = scrollX + clientWidth + delta > horizontalInterval[1]
        if (isNextPositionAfter) nearestXposition = horizontalInterval[1] - clientWidth
        else nearestXposition = horizontalInterval[0]
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