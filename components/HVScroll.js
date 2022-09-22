import React, { useRef } from 'react'

import { DimentionsProvider } from './DimentionsContext';
import ScrollListener from './ScrollListener';
import ScrollContainer from './ScrollContainer';
import '../styles/styles.css'

export default function Wrapper({ children }) {

  const wrapperContainer = useRef();

  //Pass the children their position as a prop
  const childrenWithUpdateDimentions = React.Children.map(
    children, (child, i) => {
      return React.cloneElement(child, { position: i });
    });



  return (

    <DimentionsProvider>
      <ScrollListener wrapperContainer={wrapperContainer} />
      <ScrollContainer container={wrapperContainer}>
        {childrenWithUpdateDimentions}
      </ScrollContainer>
    </DimentionsProvider>
  )

}