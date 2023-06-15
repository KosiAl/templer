import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ngifFadeAnimation } from '../../Shared/Animations/animations'

@Component({
  selector: 'tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  animations: [ ngifFadeAnimation ]
})
export class TutorialComponent implements OnInit {
    @Input() mainTutorial: any;
    @Input() builderTutorial: any;
    @Input() pointer: string;

    @Output() open: EventEmitter<any> = new EventEmitter();

    listOfMainTutorial = ['welcome','excel', 'convert', 'json', 'edit', 'angular', 'dark', 'feedback']
    listOfFrameTutorial = ['init','properties', 'incJSON', 'button', 'sepJSON', 'icons', 'download', 'done']

    index=0

    constructor() {
        this.mainTutorial={welcome: false,excel: false, convert: false, json:false, edit:false, angular:false, dark:false, feedback:false}
        this.builderTutorial={init: false,properties: false, incJSON: false, button:false, sepJSON:false, icons:false}
        this.pointer='B'
    }

    ngOnInit(): void {
      console.log("hellow welcome")

    }

    next(key:any) {
        Object.keys(this.mainTutorial).forEach((v:any) => this.mainTutorial[v] = false)
        let nexInx = this.listOfMainTutorial.indexOf(key) + 1
        let newInx = this.listOfMainTutorial[nexInx]
        this.mainTutorial[newInx] = true
        this.open.emit(this.mainTutorial)
    }

    previous(key:any) {
        Object.keys(this.mainTutorial).forEach((v:any) => this.mainTutorial[v] = false)
        let nexInx = this.listOfMainTutorial.indexOf(key) - 1
        let newInx = this.listOfMainTutorial[nexInx]
        this.mainTutorial[newInx] = true
        this.open.emit(this.mainTutorial)
    }

    close() {
        Object.keys(this.mainTutorial).forEach((v:any) => this.mainTutorial[v] = false)
        localStorage.setItem('mainTutorial', 'no')
        /* window.location.reload(); */
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    nextF(key:any) {
            Object.keys(this.builderTutorial).forEach((v:any) => this.builderTutorial[v] = false)
            let nexInx = this.listOfFrameTutorial.indexOf(key) + 1
            let newInx = this.listOfFrameTutorial[nexInx]
            this.builderTutorial[newInx] = true
            this.open.emit(this.builderTutorial)
    }

    nextIcon() {
        this.index = this.index + 1
        if(this.index === 3) {
            this.nextF('icons')
        }
 
    }

    previousF(key:any) {
        Object.keys(this.builderTutorial).forEach((v:any) => this.builderTutorial[v] = false)
        let nexInx = this.listOfFrameTutorial.indexOf(key) - 1
        let newInx = this.listOfFrameTutorial[nexInx]
        this.builderTutorial[newInx] = true
        this.open.emit(this.builderTutorial)
    }

    closeF() {
        Object.keys(this.builderTutorial).forEach((v:any) => this.builderTutorial[v] = false)
        localStorage.setItem('frameTutorial', 'no')
        /* window.location.reload(); */
    }
}
