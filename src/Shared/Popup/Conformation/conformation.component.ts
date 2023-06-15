import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnChanges,
} from '@angular/core';

@Component({
    selector: 'conformation',
    templateUrl: './conformation.component.html',
})
export class ConformationComponent implements OnInit, OnChanges {
    @Input() type: string = '';
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() confirm: string = '';
    @Input() cancel: string = '';
    @Input() shouldOpen: boolean = false;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    open: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: any): void {
        this.open = this.shouldOpen;
    }

    accept() {
        this.onClose.emit(true);
        this.open = false;
    }

    reject() {
        this.onClose.emit(false);
        this.open = false;
    }
}
