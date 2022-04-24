import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {


  qid: any;
  quiz: any = []
  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.qid = this.activatedRoute.snapshot.paramMap.get("qid");
    console.log(this.qid);
    this.quizService.getActiveQuizById(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);

      }, (error) => {
        console.log(error);
        alert("error in loading quiz data");
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start-quiz/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }
}
