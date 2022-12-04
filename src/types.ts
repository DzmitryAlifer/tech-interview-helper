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
    tech?: string;
    topic: string;
    dictionary: string[];
    answer: string;
}

export interface DictionaryAnswerForm {
    techField: FormControl<string|null>;
    newTechField: FormControl<string | null>;
    topicField: FormControl<string|null>;
    dictionaryField: FormControl<string[]|null>;
    answerField: FormControl<string|null>;
}