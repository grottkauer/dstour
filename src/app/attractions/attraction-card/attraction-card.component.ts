import {Component, Input, OnInit} from '@angular/core';
import {Attraction} from '../../models/attraction';
import {Router} from '@angular/router';
import {UploadfileService} from '../../core/services/uploadfile.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss', './creative.min.css']
})
export class AttractionCardComponent implements OnInit {
  @Input() attraction: Attraction;
  fileUploads: any[];
  isImage = false;
  attrCard = true;

  constructor(private router: Router,
              private uploadService: UploadfileService) {
  }

  ngOnInit() {
    this.loadFiles();
  }

  goToDetail() {
    this.router.navigate(['/dashboard/attractions', this.attraction.key]);
  }

  private loadFiles() {
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploadsByAttr(this.attraction.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log('img: ', this.isImage);
      this.isImage = true;
    });
  }
}
