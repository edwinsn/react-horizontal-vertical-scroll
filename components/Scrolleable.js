import React, { useEffect, useRef } from 'react'
import { useDimentionsUpdate } from './DimentionsContext';

export default function Scrolleable({ children, className, position }) {

    const ref = useRef();
    const updateChildrenDimentions = useDimentionsUpdate()

    //Update the children dimentions
    useEffect(() => {

        const onResize = () => {
            updateChildrenDimentions({ width: ref.current.clientWidth, height: ref.current.clientHeight, position })
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [updateChildrenDimentions, position]);


    useEffect(() => {

        updateChildrenDimentions?.({ width: ref.current.offsetWidth, height: ref.current.offsetHeight, position });

    }, [position, updateChildrenDimentions])


    return (
        <div
            ref={ref}
            className={className}
        >
            {children}
        </div>
    )
}