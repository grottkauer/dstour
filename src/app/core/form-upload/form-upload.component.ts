import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from '../../models/fileupload';
import {UploadfileService} from '../services/uploadfile.service';
import {Attraction} from '../../models/attraction';
import {Observable} from 'rxjs';
import {AttractionsService} from '../services/attractions.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  attractions$: Observable<Attraction[]> = this.attractionsService.getAttractions();

  constructor(private uploadService: UploadfileService,
              private attractionsService: AttractionsService) { }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file, '-LEpfF8ZPUvJwtBYFkBA');
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

}
