export enum Topic {
    HOISTING = 'Hoisting',
    STRICT_MODE = 'Strict mode', 
    EVENT_LOOP = 'Event loop',
}

export interface DictionaryAnswer {
    topic: Topic;
    dictionary: string[];
    answer: string;
}

export const JS_DICTIONARY = new Map<Topic, DictionaryAnswer>([
    [Topic.HOISTING, {
        topic: Topic.HOISTING,
        dictionary: ['hoisting'],
        answer: 'Hoisting is the default JS behavior when all the var and function declarations are moved on top of their scope (global or local) without their value initialization.',
    }],
    [Topic.STRICT_MODE, {
        topic: Topic.STRICT_MODE,
        dictionary: ['strict', 'mode', 'use'],
        answer: 'In ES5, a new feature called Strict Mode allows to write code in a strict operational environment. It\'s much less error-prone, since all forms of errors(including silent errors) will be thrown.So debugging becomes a lot simpler.',
    }],
    [Topic.EVENT_LOOP, {
        topic: Topic.EVENT_LOOP,
        dictionary: ['event', 'loop'],
        answer: 'Event loop is a mechanism that allows non-blocking execution af async code in a single threaded environment.',
    }],
]);