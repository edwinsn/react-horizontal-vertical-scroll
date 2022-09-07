import React from 'react'
import Scrolleable from './Scrolleable'

export default function HorizontalScroll({ children, position }) {

    return (
        <Scrolleable
            position={position}
            className='HV-scroll-horizontal-container'
        >
            {children}
        </Scrolleable>
    )
}
