import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qid: any;
  qTitle: any;
  question: any = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {}
  };
  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qid = this.activatedRoute.snapshot.paramMap.get('qid');
    this.qTitle = this.activatedRoute.snapshot.paramMap.get('title');
    // console.log(this.id);
    this.question.quiz['qid'] = this.qid;
  }

  public doSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      // alert("username is required");
      this.snack.open("content is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      // alert("username is required");
      this.snack.open("option1 is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      // alert("username is required");
      this.snack.open("option2 is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      // alert("username is required");
      this.snack.open("option3 is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      // alert("username is required");
      this.snack.open("option4 is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      // alert("username is required");
      this.snack.open("answer is required", 'ok', { duration: 3000 });
      return;
    }
    this.questionService.addQuestionToQuiz(this.question).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success', 'Question Added', 'success');

        // now blank all the fields

        this.question.content = '',
          this.question.option1 = '',
          this.question.option2 = '',
          this.question.option3 = '',
          this.question.option4 = '',
          this.question.answer = '',
          this.question.quiz = ''
      }, (error) => {
        console.log(error);
        Swal.fire("Error", 'Error in Adding Question', 'error');
      }
    );
  }
}
