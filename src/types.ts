import {FormControl} from '@angular/forms';


export enum Tech {
    GENERAL = 'General',
    BROWSER = 'Browser',
    CSS = 'CSS',
    JAVASCRIPT = 'JavaScript',
    TYPESCRIPT = 'TypeScript',
    NODE_JS = 'NodeJS',
    ANGULAR = 'Angular',
    RXJS = 'RxJS',
    NGRX = 'NgRx',
    CODING = 'Coding',
}

export const TECHS_WITH_ICONS: string[] =
    Object.values(Tech).slice(1, Object.values(Tech).length - 1);

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum Panel {
    SETTINGS = 'settings',
    TOPIC = 'topic',
}

export interface DictionaryAnswer {
    tech: string;
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

export interface TopicDeleteForm {
    techField: FormControl<string|null>;
    topicField: FormControl<string|null>;
}