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
        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        console.log(this.questions);
        this.startTimer();

      }, (error) => {
        console.log(error);
        Swal.fire("Error", "errpr in loading questions of quiz", 'error');
      }
    );
  }
  // to prevent back button , back button will not work after user start the quiz
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
      /* Read more about isConfirmed, isDenied below */
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
    this.isSubmit = true;
    this.questions.forEach((q: any) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }
      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    console.log("correct Answers" + this.correctAnswers);
    console.log("marks got" + this.marksGot);
    console.log("attempted" + this.attempted);

    console.log(this.questions);

  }
}
