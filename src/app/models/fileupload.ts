export class FileUpload {

  key: string;
  name: string;
  url: string;
  file: File;
  attr: string;

  constructor(file: File, attr: string) {
    this.file = file;
    this.attr = attr;
  }

  // constructor(file: File, attr: string) {
  //   this.file = file;
  //   this.attr = attr;
  // }
}
