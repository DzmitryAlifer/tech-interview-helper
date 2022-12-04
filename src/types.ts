import {FormControl} from '@angular/forms';


export enum Tech {
    GENERAL = 'General',
    CSS = 'CSS',
    JAVASCRIPT = 'JavaScript',
    ANGULAR = 'Angular',
    RXJS = 'RxJS',
    NGRX = 'NgRx',
    CODING = 'Coding',
}

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum Panel {
    SETTINGS = 'settings',
    TOPIC = 'topic',
}

export interface DictionaryAnswer {
    topic: string;
    dictionary: string[];
    answer: string;
}

export interface DictionaryAnswerForm {
    tech: FormControl<string|null>;
    newTechField: FormControl<string | null>;
    topic: FormControl<string|null>;
    dictionary: FormControl<string[]|null>;
    answer: FormControl<string|null>;
}