import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

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
    this.activatedRoute.params.subscribe((params) => {
      this.catId = this.activatedRoute.snapshot.paramMap.get("catId");
      if (this.catId == 0) {
        this.quizService.getAllActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;

          }, (error) => {
            Swal.fire('Error ', 'error in loading all quizzes', 'error');
          }
        );
      } else {
        this.quizzes = this.quizService.getActiveQuizzesByCatId(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;

          }, (error) => {
            Swal.fire('Error ', 'error in loading quizzes', 'error');
          }
        );
      }
    });
  }

}
