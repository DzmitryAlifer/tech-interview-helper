export enum Tech {
    GENERAL = 'General',
    CSS = 'CSS',
    JAVASCRIPT = 'JavaScript',
    ANGULAR = 'Angular',
    RXJS = 'RxJS',
    NGRX = 'NgRx',
}

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export interface DictionaryAnswer {
    topic: string;
    dictionary: string[];
    answer: string;
}