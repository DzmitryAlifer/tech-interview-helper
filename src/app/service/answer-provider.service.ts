import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DictionaryAnswer, Topic } from 'src/dictionary/js';

@Injectable({
  providedIn: 'root'
})
export class AnswerProviderService {

  constructor(private readonly http: HttpClient) {}

  getAllJsDictionaryAnswers(): Map<Topic, DictionaryAnswer> {
    return new Map();
  }
}
