import { Component, OnInit } from '@angular/core';
import {UploadfileService} from '../services/uploadfile.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-listupload',
  templateUrl: './listupload.component.html',
  styleUrls: ['./listupload.component.scss']
})
export class ListuploadComponent implements OnInit {

  fileUploads: any[];

  constructor(private uploadService: UploadfileService) { }

  ngOnInit() {
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

}
