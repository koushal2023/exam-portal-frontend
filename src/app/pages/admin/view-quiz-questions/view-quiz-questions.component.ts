import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;

  questions: any = [];
  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.qId = this.activatedRoute.snapshot.paramMap.get('qid');
    this.qTitle = this.activatedRoute.snapshot.paramMap.get('title');
    console.log(this.qId);
    console.log(this.qTitle);

    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        this.questions = data;
        console.log(this.questions);

      }, (error) => {
        console.log(error);

      }
    );
  }

}
