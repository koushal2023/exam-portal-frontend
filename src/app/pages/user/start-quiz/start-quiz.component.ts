import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  qid: any;
  questions: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer: any;

  constructor(private activatedroute: ActivatedRoute, private locationSt: LocationStrategy, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.qid = this.activatedroute.snapshot.paramMap.get("qid");
    this.preventBackButton();
    this.loadQuestions();

  }
  loadQuestions() {
    this.questionService.getQuestionsOfQuizforUser(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();

      }, (error) => {
        Swal.fire("Error", "errpr in loading questions of quiz", 'error');
      }
    );
  }
  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      } else if (result.isDenied) {
        Swal.fire('Quiz is not Submitted', '', 'warning')
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    // calculation
    // call to server to check questions
    this.questionService.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      }, (error) => {
        Swal.fire('Error ', 'Something Went Wrong!!', 'error');
      }
    );
  }

  printPage() {
    window.print();
  }
}
