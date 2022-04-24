import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private snack: MatSnackBar, private router: Router, private categoryService: CategoryService) { }
  qId: any = 0;
  quiz: any;
  categories: any = {};
  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe(
      (cat: any) => {
        this.categories = cat;
      }, (error) => {
        this.snack.open("error while loading categories", 'ok');
      }
    );

    this.qId = this.activatedRoute.snapshot.paramMap.get('qid');
    this.quizService.getQuizById(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
      }, (error) => {
        this.snack.open("error while loading Quiz", 'ok');
      }
    );

  }

  updateQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.snack.open("title is required", 'ok', { duration: 3000 });
      return;
    }
    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this.snack.open("description is required", 'ok');
      return;
    }

    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) {
      this.snack.open("maxMarks is required", 'ok');
      return;
    }

    if (this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null) {
      this.snack.open("numberOfQuestions is required", 'ok');
      return;
    }

    if (this.quiz.category.cid == '' || this.quiz.category.cid == null) {
      this.snack.open("Category is required", 'ok');
      return;
    }
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire("Success !!", "quiz added successfully", "success");
        this.router.navigate(["/admin/quizzes"]);
      },
      (error) => {
        Swal.fire("Error !!", "quiz not added please try again", "error");
      }
    );
  }

}
