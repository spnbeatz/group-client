export const formatDate = (date: string, type: string) => {
    const now = new Date();
    const before = new Date(date);
    const diff = now.getTime() - before.getTime();

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;

    const monthNames = [
        'sty', 'lut', 'mar', 'kwi', 'maj', 'cze',
        'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'
    ];
    const daysOfWeek = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

    const formattedHours = ('0' + before.getHours()).slice(-2);
    const formattedMinutes = ('0' + before.getMinutes()).slice(-2);

    const formattedDay = ('0' + before.getDate()).slice(-2);
    const formattedMonth = monthNames[before.getMonth()];

    const chatType = `${type === 'chat' ? "o " + formattedHours + ":" + formattedMinutes : ''}`;

    if (now.getDate() === before.getDate()) {
        return `${formattedHours}:${formattedMinutes}`;
    } 
    else if (diff < week) {
        return `${daysOfWeek[before.getDay()]} ${chatType}`;
    } 
    else {
        return `${formattedDay} ${formattedMonth} ${chatType}`;
    }
};
