import React from 'react'
import { useDimentions } from './DimentionsContext'

export default function ScrollContainer({ children, container, style, className }) {

    const { dimentions } = useDimentions()

    let totalWidth = dimentions
        .filter(({ orientation }) => orientation === 'horizontal')
        .reduce((acc, { width }) => acc + width, 0)

    totalWidth = window.innerWidth < totalWidth ? totalWidth : window.innerWidth

    return (
        <section
            style={{ width: totalWidth, ...style }}
            className={`scroll_container ${className||''}`}
            ref={container}
        >
            {children}
        </section>
    )
}
