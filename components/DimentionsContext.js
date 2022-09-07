import React, { useState, useContext, useCallback } from "react";

const DimentionsContext = React.createContext();
const DimentionsUpdateContext = React.createContext();

export function useDimentions() {

    return useContext(DimentionsContext);

}

export function useDimentionsUpdate() {

    return useContext(DimentionsUpdateContext);

}

export function DimentionsProvider({ children }) {

    const [dimentions, setDimentions] = useState([]);

    const updateDimentions = useCallback(({ width, height, position }) => {

        setDimentions(dimentions => {
            dimentions[position] = { width, height };
            return [...dimentions];
        });

    }, [])


    return (
        <DimentionsContext.Provider value={{ dimentions }}>
            <DimentionsUpdateContext.Provider value={updateDimentions}>
                {children}
            </DimentionsUpdateContext.Provider>
        </DimentionsContext.Provider>)

}