import React, { useEffect, useRef } from 'react'
import controllScroll from './controllScroll';
import useXSections from '../hooks/useXSections';
import useYSections from '../hooks/useYSections';
import { DimentionsProvider } from './DimentionsContext';
import '../styles/styles.css'

export default function Wrapper({ children }) {

  const wrapperContainer = useRef();

  const xSections = useXSections();
  const ySections = useYSections();


  useEffect(() => {

    const horizontalSections = { xSections, ySections };

    const scrollListener = controllScroll(undefined, undefined, horizontalSections, wrapperContainer.current);

    wrapperContainer.current?.addEventListener('wheel', scrollListener);

    return wrapperContainer.current?.removeEventListener('wheel', scrollListener);

  }, [xSections, ySections]);


  //Passe the children the position prop
  const childrenWithUpdateDimentions = React.Children.map(
    children, (child, i) => {
      return React.cloneElement(child, { position: i });
    });

  return (
    <DimentionsProvider>
      <section
        ref={wrapperContainer}
      >
        {childrenWithUpdateDimentions}
      </section>
    </DimentionsProvider>
  )

}