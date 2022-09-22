import React from 'react'
import Scrolleable from './Scrolleable'

export default function HorizontalScroll({ children, position, style }) {

    return (
        <Scrolleable
            style={style}
            position={position}
            orientation="horizontal"
            className='HV-scroll-horizontal-container'
        >
            {children}
        </Scrolleable>
    )
}
