import { useEffect } from 'react'
import controllScroll from './controllScroll';
import useXSections from '../hooks/useXSections';
import useYSections from '../hooks/useYSections';

export default function ScrollListener({ wrapperContainer }) {

    const xSections = useXSections();
    const ySections = useYSections();

    useEffect(() => {

        const horizontalSections = { xSections, ySections };
        const wrapper = wrapperContainer.current

        const scrollListener = controllScroll(horizontalSections, wrapperContainer.current);

        wrapperContainer.current?.addEventListener('wheel', scrollListener);

        return () => wrapper?.removeEventListener('wheel', scrollListener);

    }, [xSections, ySections, wrapperContainer]);


    return null
}
