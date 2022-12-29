import {ElementRef} from '@angular/core';
import {Settings} from './settings-panel/state/settings.reducers';


export function highlight(elementRef: ElementRef, selector: string, highlightColors: Partial<Settings>): void {
    setTimeout(() => {
        elementRef.nativeElement.querySelectorAll(selector)
            .forEach((element: HTMLElement) => {
                element.style.backgroundColor = highlightColors.backgroundHighlightColor ?? '';
                element.style.color = highlightColors.textHighlightColor ?? '';
            });
    });
}

export function selectFontSize(elementRef: ElementRef, selector: string, fontSize: number): void {
    setTimeout(() => {
        elementRef.nativeElement.querySelectorAll(selector)
            .forEach((element: HTMLElement) => {
                element.style.fontSize = fontSize + 'px';
            });
    });
}