import React, { useEffect, useRef } from 'react'
import { useDimentionsUpdate } from './DimentionsContext';

export default function Scrolleable({ children, className, position, orientation, style }) {

    const ref = useRef();
    const updateChildrenDimentions = useDimentionsUpdate()

    //Update the children dimentions
    useEffect(() => {

        const onResize = () => {
            updateChildrenDimentions({ width: ref.current.clientWidth, height: ref.current.clientHeight, position, orientation })
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [updateChildrenDimentions, position, orientation]);


    useEffect(() => {

        updateChildrenDimentions?.({ width: ref.current.offsetWidth, height: ref.current.offsetHeight, position, orientation });

    }, [position, updateChildrenDimentions, orientation])


    return (
        <div
            style={style}
            ref={ref}
            className={className + ' scrolleable'}
        >
            {children}
        </div>
    )
}