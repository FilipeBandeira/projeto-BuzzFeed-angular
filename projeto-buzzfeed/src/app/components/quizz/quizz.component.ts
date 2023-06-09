import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json" // Import do arquivo anexado, arquivo json na pasta assets

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any // Melhor tipar do que o uso do any
  questionSelected:any

  answers:string[] = [] //Vetor para as respostas selecionadas
  answerSelected:string ="" // Seleção atual

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){ //Pegando informações do json, como ponteiros
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(value:string){ //Método do evento clique das respostas
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){ // Próxima questão, usando ponteiro
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
  }

  async checkResult(anwsers:string[]){ //Checar quais respostas apareceram com mais frequência

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}
