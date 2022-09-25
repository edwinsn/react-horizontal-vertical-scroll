import React from 'react'
import Scrolleable from './Scrolleable';
import { useDimentions } from './DimentionsContext'

export default function VerticalScroll({ children, position, style }) {

  const { dimentions } = useDimentions()

  const previousComponentsHorizontalWidths = dimentions
    .filter(({ orientation }) => orientation === 'horizontal')
    .slice(0, position)
    .reduce((acc, { width }) => acc + width, 0)

  const positionStyle = {
    position: 'relative',
    left: (previousComponentsHorizontalWidths - dimentions[position]?.width) || 0,
  }

  positionStyle.left = positionStyle.left < 0 ? 0 : positionStyle.left

  return (
    <Scrolleable
      style={{ ...style, ...positionStyle }}
      position={position}
      orientation="vertical"
      className='HV-scroll-vertical-container'
    >
      {children}
    </Scrolleable>
  )
}
