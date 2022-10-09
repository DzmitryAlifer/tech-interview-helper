export enum Tech {
    JAVA = 'Java',
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