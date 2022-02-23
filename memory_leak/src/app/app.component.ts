import { Component } from '@angular/core';
import { QUESTION_CREATION_SERVICE } from 'src/app/services/question-creation.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memory_leak';
  qcs = QUESTION_CREATION_SERVICE;
}
