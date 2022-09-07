//@TODO make a function to check the intervals are logically correct


export default function contolScroll(
    alturaLosHijos,
    anchuraDeLosHijos,
    horizontalSections,
    wrapperContainer,
) {

    return (e) => {

        //Nosotros manejamos el scroll, desabilitar el comportamiento por defecto
        e.preventDefault();
        e.stopPropagation();


        //how much the user scrolls
        const delta = e.deltaY;

        //Max scroll position
        //const maxScrollY = alturaLosHijos - wrapperContainer.offsetHeight;
        //const maxScrollX = anchuraDeLosHijos - wrapperContainer.offsetWidth;


        //Current scroll position
        let scrollY = wrapperContainer.scrollTop;
        let scrollX = wrapperContainer.scrollLeft;

        const isHorizontal = isHorizontalRequired(scrollX, scrollY, horizontalSections, delta)

        if (isHorizontal) {

            const { isOnLimit } = isHorizontal

            if (isOnLimit) {
                scrollY += delta
            } else {
                scrollX += delta
            }

            //Check we are not scrolling beyond the page 🚦 
            /* const overflow = scrollX - maxScrollX;
             if (overflow > 0) {
               scrollX = maxScrollX;
             }*/
            return wrapperContainer.scrollTo(scrollX, scrollY);

        }

        // Si continuamos es porque no se hizo scroll horizontal 🙂🙂🙂🙂🙂🙂
        //Calcula scroll vertical
        scrollY += delta;

        //Verificar que no estamos scroleando fuera de la pagina 🚦 
        /*const overflow = scrollY - maxScrollY;
        if (overflow > 0) {
          scrollY = maxScrollY;
        }*/

        return wrapperContainer.scrollTo(scrollX, scrollY);

    }
}

//check if the scrolling position is in the horizontal section
const isHorizontalRequired = (scrollX, scrollY, horizontalSections, delta) => {

    const { xSections, ySections } = horizontalSections

    const inXsection = xSections.some((Xinterval) => belongs(scrollX, Xinterval))
    const inYsection = ySections.some((YInterval) => belongs(scrollY, YInterval))

    //console.log({inYsection, inXsection, xSections, scrollX})

    if (!inYsection || !inXsection) return false

    return { isOnLimit: !xSections.some((Xinterval) => belongs(scrollX + delta, Xinterval)) }

}

const belongs = (number, interval) => {
    return number >= interval[0] && number <= interval[1]
}