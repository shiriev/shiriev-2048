
export type language = 'en' | 'ru';

const localeStrings = {
    en: {
        restart: "new game",
        score: "score",
        stepCount: "moves",
        gameOver: "Game over",
        doYouWantToTryAgain: "Do you want to try again?",
    },
    ru: {
        restart: "рестарт",
        score: "очки",
        stepCount: "ходы",
        gameOver: "Игра окончена",
        doYouWantToTryAgain: "Хотите сыграть ещё?",
    }
};

export default localeStrings;
