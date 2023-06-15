import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
    listenerFn!: () => void;

    @ViewChild('expandMenu') expandMenu!: ElementRef;
    @Input() values: any;
    @Input() selected: any;
    @Input() class: any = '';
    @Input() noBg = false;
    @Output() selectedValue: EventEmitter<any> = new EventEmitter();

    selectedItem = {name:'Please select'}

    openCloseState = false;

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        this.values.forEach((v: any) => {
            if (v.selected) {
                this.selectedItem = v;
            }
        });
        if (this.selected) {
            // find and set selected item in this.values by property name to this.selected = true
            this.values.forEach((v: any) => {
                v.selected = false;
                if (v.name === this.selected) {
                    v.selected = true;
                    this.selectedItem = v;
                }
            });
        }
    }

    openCloseMenu() {
        this.openCloseState = !this.openCloseState;
        if (this.openCloseState) {
            this.startListening();
        } else {
            this.stopListening();
        }
    }

    setSelected(value: any) {
        this.values.forEach((v: any) => {
            v.selected = false;
        });
        value.selected = true;
        this.selectedItem = value;

        this.selectedValue.emit(value);
        this.stopListening();
    }

    startListening() {
        if (this.openCloseState) {
            this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
                if (!this.expandMenu.nativeElement.contains(e.target)) {
                    this.stopListening();
                }
            });
        }
    }

    stopListening() {
        if (this.listenerFn) {
            this.listenerFn();
        }
        this.openCloseState = false;
    }
}
