/**
 * The `calculateDates` function takes in a priority and a reported time, and returns the when,
 * deadline, and time to deadline based on the priority.
 * @param {number} priority - The priority parameter represents the priority level of a task. It is a
 * number that determines the urgency or importance of the task.
 * @param {number} whenReported - The `whenReported` parameter represents the timestamp when an event
 * or task was reported. It is a number that represents the number of milliseconds since January 1,
 * 1970, 00:00:00 UTC (also known as Unix timestamp).
 * @returns The function `calculateDates` returns an object with three properties: `when`, `deadline`,
 * and `timeToDeadline`.
 */
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
