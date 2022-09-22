import React from 'react'
import { useDimentions } from './DimentionsContext';

export default function ScrollContainer({ children, container }) {

    const { dimentions } = useDimentions() || {};

    /* const width = dimentions?.reduce?.((acu, curr) => {
 
         if (curr.orientation === 'horizontal') {
             return curr.width + acu
         }
 
         return acu
 
     }, 0);*/

    //console.log('width', width)

    return (
        <section
            className='scroll_container'
            ref={container}
        >
            <div className='scroll_content'>
                {children}
            </div>
        </section>
    )
}
