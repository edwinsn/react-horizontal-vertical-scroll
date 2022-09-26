import React from 'react'
import Scrolleable from './Scrolleable'

export default function HorizontalScroll({ children, position, style }) {

    const minWidth = window.innerWidth;

    return (
        <Scrolleable
            style={{ ...style, minWidth }}
            position={position}
            orientation="horizontal"
            className='HV-scroll-horizontal-container'
        >
            {children}
        </Scrolleable>
    )
}
