import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private quizService: QuizService, private snack: MatSnackBar, private router: Router, private categoryService: CategoryService) { }
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cid: '',
    }
  };

  categories: any = {};

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (cat: any) => {
        this.categories = cat;
      }, (error) => {
        this.snack.open("error while loading categories", 'ok');
      }
    );
  }


  addQuiz() {
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
    this.quizService.createQuiz(this.quiz).subscribe(
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
