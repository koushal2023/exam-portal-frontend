import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = {};
  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data) => {
        this.quizzes = data;
        console.log(this.quizzes);

      }, (error) => {
        console.log(error);
        Swal.fire("Error!!", "error in loading data", 'error');
      }
    );
  }

  deleteQuiz(qid: any) {
    Swal.fire(
      {
        title: "Are you sure?",
        confirmButtonText: 'Delete',
        showCancelButton: true
      }
    ).then((result) => {
      if (result.isConfirmed) {
        // delete...
        this.quizService.deleteQuiz(qid).subscribe(
          (data) => {
            console.log(data);
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qid);
            Swal.fire("Success !!", "Quiz deleted successfully", 'success');

          }, (error) => {
            console.log(error);
            Swal.fire("Error!!", "Quiz not deleted !!", 'error');
          }
        );
      }

    });
  }
}
