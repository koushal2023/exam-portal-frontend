import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  quizzes: any = [];
  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) { }
  ngOnInit(): void {
    // console.log(this.catId);
    this.activatedRoute.params.subscribe((params) => {
      this.catId = this.activatedRoute.snapshot.paramMap.get("catId");
      if (this.catId == 0) {
        console.log("load all the quiz");
        this.quizService.getAllActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
            ;
          }, (error) => {
            console.log(error);
            alert("error in loading all quizzes");
          }
        );
      } else {
        console.log("load specific quiz");
        this.quizzes = this.quizService.getActiveQuizzesByCatId(this.catId).subscribe(
          (data: any) => {
            console.log(data);
            this.quizzes = data;

          }, (error) => {
            console.log(error);
            alert("error in loading quizzes");
          }
        );
      }
    });
  }

}
