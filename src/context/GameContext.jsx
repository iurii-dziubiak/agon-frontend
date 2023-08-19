import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const GameContext = createContext({
    game: { name: null, bgImage: null },
});

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error(
            "useGameContext must be used within a GameContextProvider"
        );
    }
    return context;
};

export const GameContextProvider = ({ children }) => {
    const [game, setGame] = useState({});
    const clearGame = useCallback(() => {
        setGame({ name: null, bgImage: null });
    }, []);

    const contextValue = useMemo(() => ({ game, setGame, clearGame }), [game]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};
