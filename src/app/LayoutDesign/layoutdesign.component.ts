import { Component, Input, OnChanges, effect, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ThemeService } from '../../Shared/Services/theme.service';
import { ngifFadeAnimation } from '../../Shared/Animations/animations';

@Component({
    selector: 'layout-design-component',
    templateUrl: './layoutdesign.component.html',
    styleUrls: ['./layoutdesign.component.scss'],
    animations: [ngifFadeAnimation],

})
export class LayoutDesignComponent implements OnChanges {
    @Input() data: any;
    @Output() dataChange: EventEmitter<any> = new EventEmitter();

    layout = [{name:'01', columns:[{name:'01'}]}];
    subdesign = [{name:'01', selected:false, hidden:false}];
    element = {name:'01', selected:false, hidden:false}
    processState = 0

    constructor(public theme: ThemeService) {
        effect(() => {
            let theme = this.theme.themeMode$();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            this.dataChange.emit(this.data);
        }
    }

    addRow() {
        this.layout.push({name:'02', columns:[{name:'01'}]});   
    }
    removeRow() {
        this.layout.push({name:'02', columns:[{name:'01'}]});   
    }
    addCol(row:any) {
        row.columns.push({name:'02'});
    }
    removeCol(row:any) {
        row.columns.push({name:'02'});
    }

    openOptions(selected:any) {
        console.log(`LayoutDesignComponent > openOptions > selected:`, selected)
    }

}
