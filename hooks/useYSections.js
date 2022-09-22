import { useDimentions } from '../components/DimentionsContext';

export default function useYSections() {

    const { dimentions } = useDimentions() || {};

    const ySections = []

    dimentions?.forEach?.((scrolleable, index) => {

        if (scrolleable.orientation === 'horizontal') {

            if (dimentions[index - 1]) {

                const initialCord = dimentions[index - 1]?.height || 0

                const ySection = [initialCord, initialCord + scrolleable.height]
                ySections.push(ySection)

            }
        }

    });

    return ySections

}
