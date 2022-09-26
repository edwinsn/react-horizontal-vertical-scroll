import React, { useEffect, useRef } from 'react'
import { useDimentionsUpdate, useDimentions } from './DimentionsContext';

export default function Scrolleable({ children, className, position, orientation, style }) {

    const ref = useRef();
    const updateChildrenDimentions = useDimentionsUpdate()

    const { dimentions } = useDimentions()

    const previousComponentsHorizontalWidths = dimentions
        .slice(0, position)
        .filter(({ orientation }) => orientation === 'horizontal')
        .reduce((acc, { width }) => acc + width, 0)

    const positionStyle = {
        position: 'relative',
        left: (previousComponentsHorizontalWidths - window.innerWidth) || 0,
    }
    positionStyle.left = positionStyle.left < 0 ? 0 : positionStyle.left

    //Update the children dimentions
    useEffect(() => {

        const onResize = () => {
            updateChildrenDimentions({ width: ref.current.offsetWidth, height: ref.current.offsetHeight, position, orientation })
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
            style={{ ...style, ...positionStyle }}
            ref={ref}
            className={className + ' scrolleable'}
        >
            {children}
        </div>
    )
}