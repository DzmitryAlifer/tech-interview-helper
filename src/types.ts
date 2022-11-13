export enum Tech {
    GENERAL = 'General',
    CSS = 'CSS',
    JAVASCRIPT = 'JavaScript',
    ANGULAR = 'Angular',
    RXJS = 'RxJS',
    NGRX = 'NgRx',
}

export interface DictionaryAnswer {
    topic: string;
    dictionary: string[];
    answer: string;
}