const calculateDates = (
    priority: number,
    whenReported: number
): { when: Date; deadline: Date; timeToDeadline: number } => {
    let when = new Date(whenReported);
    let deadline = new Date(whenReported + 43200000 * 2 ** (priority - 1));
    let timeToDeadline = whenReported + 43200000 * 2 ** (priority - 1) - Date.now();

    return {
        when: when,
        deadline: deadline,
        timeToDeadline: timeToDeadline,
    };
};
export default calculateDates;
