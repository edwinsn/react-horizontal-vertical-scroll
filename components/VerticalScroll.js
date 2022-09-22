import React from 'react'
import Scrolleable from './Scrolleable';

export default function VerticalScroll({ children, position }) {

  return (
    <Scrolleable
      position={position}
      orientation="vertical"
      className='HV-scroll-vertical-container'
    >
      {children}
    </Scrolleable>
  )
}
