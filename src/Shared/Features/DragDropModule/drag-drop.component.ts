import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DragdropService } from './drag-drop.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'drag-drop',
    templateUrl: './drag-drop.component.html',
    styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
    @Output() onImgUpload: EventEmitter<any> = new EventEmitter();

    fileArr: any[] = [];
    imgArr: any[] = [];
    fileObj: any[] = [];
    form: FormGroup;
    msg!: string;
    progress: any = 0;

    constructor(
        public fb: FormBuilder,
        public dragdropService: DragdropService
    ) {
        this.form = this.fb.group({
            avatar: [null],
        });
    }

    ngOnInit() {}

    upload(e: any) {
        console.log('UPLOAD', e);
        const fileListAsArray = Array.from(e);
        fileListAsArray.forEach((item, i) => {
            // @ts-ignore
            item['default'] = false;
            const file = e as HTMLInputElement;
            // @ts-ignore
            const url = URL.createObjectURL(file[i]);
            this.imgArr.push(url);
            this.fileArr.push({ item, url: url });
        });

        this.fileArr.forEach((item) => {
            this.fileObj.push(item.item);
        });

        // Set files form control
        this.form.patchValue({
            avatar: this.fileObj,
        });

        this.form.get('avatar')?.updateValueAndValidity();

        // Upload to server
        /* this.dragdropService
            .addFiles(this.form.value.avatar)
             .subscribe((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        console.log('Request has been made!');
                        break;
                    case HttpEventType.ResponseHeader:
                        console.log('Response header has been received!');
                        break;
                    case HttpEventType.UploadProgress:
                        this.progress = Math.round(
                            // @ts-ignore
                            (event.loaded / event.total) * 100
                        );
                        console.log(`Uploaded! ${this.progress}%`);
                        break;
                    case HttpEventType.Response:
                        console.log('File uploaded successfully!', event.body);
                        setTimeout(() => {
                            this.progress = 0;
                            this.fileArr = [];
                            this.fileObj = [];
                            this.msg = 'File uploaded successfully!';
                        }, 3000);
                }
            }); */

        this.onImgUpload.emit(this.fileArr);
    }
}
