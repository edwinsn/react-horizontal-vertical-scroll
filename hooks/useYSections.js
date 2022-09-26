import { useDimentions } from '../components/DimentionsContext';

export default function useYSections() {

    const { dimentions } = useDimentions() || {};

    const ySections = []

    dimentions?.forEach?.((scrolleable, index) => {

        if (scrolleable.orientation === 'horizontal') {

            const initialCord = dimentions.slice(0, index)
                .reduce((acc, curr) => acc + curr.height, 0) || 0

            const ySection = [initialCord, initialCord + scrolleable.height]
            ySections.push(ySection)


        }

    });

    return ySections

}
