import { useEffect } from 'react'
import { wheelControllScroll, phoneScroll, touchStart, arrowScroll } from './eventsListeners';
import useXSections from '../hooks/useXSections';
import useYSections from '../hooks/useYSections';

export default function ScrollListener({ wrapperContainer }) {

    const xSections = useXSections();
    const ySections = useYSections();

    useEffect(() => {

        const horizontalSections = { xSections, ySections };
        const wrapper = wrapperContainer.current

        const wheelScrollListener = wheelControllScroll(horizontalSections, wrapperContainer.current);
        const phoneScrollListener = phoneScroll(horizontalSections, wrapperContainer.current)
        const keyListener = arrowScroll(horizontalSections, wrapperContainer.current)


        if (xSections.length > 0 && ySections.length > 0 && wrapper) {

            wrapper?.addEventListener('wheel', wheelScrollListener);
            wrapper?.addEventListener('touchstart', touchStart);
            wrapper?.addEventListener('touchmove', phoneScrollListener);
            wrapper?.addEventListener('keydown', keyListener);

        }

        return () => {
            wrapper?.removeEventListener('wheel', wheelScrollListener);
            wrapper?.removeEventListener('touchstart', touchStart);
            wrapper?.removeEventListener('touchmove', phoneScrollListener);
            wrapper?.removeEventListener('keydown', keyListener);

        }

    }, [xSections, ySections, wrapperContainer]);

    return null
}
