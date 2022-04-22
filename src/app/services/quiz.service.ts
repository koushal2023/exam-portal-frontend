import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  // create quiz
  public createQuiz(quiz: any) {
    return this.http.post(`${baseUrl}/quiz/`, quiz);
  }
  // update quiz
  public updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  }
  // get all Quizzes
  public getAllQuizzes() {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  // get all Quizzes
  public getAllActiveQuizzes() {
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  // get quiz by id
  public getQuizById(qid: any) {
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  // get quiz by id
  public getActiveQuizById(qid: any) {
    return this.http.get(`${baseUrl}/quiz/active/${qid}`);
  }

  // delete quiz
  public deleteQuiz(id: any) {
    return this.http.delete(`${baseUrl}/quiz/${id}`);
  }

  // get all quizzes by category id
  public getQuizzesByCatId(cid: any) {
    return this.http.get(`${baseUrl}/quiz/bycategory/${cid}`);
  }

  // get all quizzes by category id
  public getActiveQuizzesByCatId(cid: any) {
    return this.http.get(`${baseUrl}/quiz/active/bycategory/${cid}`);
  }

}
