import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;

  questions: any = {};
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

  // deleteQuestion(quesId: any) {
  //   this.questionService.deleteQuestionOfQuiz(quesId).subscribe(
  //     (data) => {
  //       console.log(data);
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   );
  // }


  deleteQuestion(quesId: any) {
    Swal.fire(
      {
        title: "Are you sure, want to delete this question?",
        confirmButtonText: 'Delete',
        showCancelButton: true
      }
    ).then((result) => {
      if (result.isConfirmed) {
        // delete...
        this.questionService.deleteQuestionOfQuiz(quesId).subscribe(
          (data) => {
            console.log(data);
            this.questions = this.questions.filter((question: any) => question.quesId != quesId);
            Swal.fire("Success !!", "questions deleted successfully", 'success');

          }, (error) => {
            console.log(error);
            Swal.fire("Error!!", "questions not deleted !!", 'error');
          }
        );
      }

    });
  }


}
