import { useDimentions } from '../components/DimentionsContext';

export default function useXSections() {

    const { dimentions } = useDimentions();

    const xSections = []

    dimentions?.forEach?.((scrolleable, index) => {

        if (scrolleable.orientation === 'horizontal') {
            if (dimentions[index - 1]) {

                const initialCord = xSections[xSections.length - 1]?.[1] || 0

                const xSection = [initialCord, initialCord + dimentions[index].width]
                xSections.push(xSection)

            }
        }

    });

    return xSections

}
