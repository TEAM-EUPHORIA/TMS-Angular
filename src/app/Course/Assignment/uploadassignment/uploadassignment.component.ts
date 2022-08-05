import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-uploadassignment',
  templateUrl: './uploadassignment.component.html',
  styleUrls: ['./uploadassignment.component.css']
})
export class UploadassignmentComponent {
  fileName = 'Upload Assignment'
  constructor()
  { }

  base64 = '';

  @Output()
  SubmittedAssignment : EventEmitter<any> = new EventEmitter<any>();

  Onsubmit() {
    this.SubmittedAssignment.emit(this.base64);
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    this.fileName = event.target.files[0].name
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.base64 = reader.result.toString();
    };
  }

}
