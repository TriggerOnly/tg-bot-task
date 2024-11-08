const tg = window.Telegram.WebApp;

const useTelegram = () => {
    return {
        tg,
        userId: tg.initDataUnsafe?.user?.username, 
    };
};

export default useTelegram;