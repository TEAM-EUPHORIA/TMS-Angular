import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-uploadassignment',
  templateUrl: './uploadassignment.component.html',
  styleUrls: ['./uploadassignment.component.css'],
})
export class UploadassignmentComponent {
  constructor() {}

  //Variable to display
  fileName = 'Upload Assignment';

  //Final variable to store the Uploaded assignment
  base64 = '';

  //EventEmitter creation
  @Output()
  SubmittedAssignment: EventEmitter<any> = new EventEmitter<any>();

  //EventEmitter triggering point to parent component
  Onsubmit() {
    this.SubmittedAssignment.emit(this.base64);
  }

  //Function to handle the file upload
  handleUpload(event: any) {
    if (event != null) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) this.base64 = reader.result.toString();
      };
    }
  }
}
