import React from 'react'
import Scrolleable from './Scrolleable';

export default function VerticalScroll({ children, position, style }) {


  return (
    <Scrolleable
      style={style}
      position={position}
      orientation="vertical"
      className='HV-scroll-vertical-container'
    >
      {children}
    </Scrolleable>
  )
}
