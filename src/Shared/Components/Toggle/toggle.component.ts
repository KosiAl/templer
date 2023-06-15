import { Component, Input,EventEmitter, Output, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'toggle',
    templateUrl: './toggle.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true,
        },
    ],
})
export class ToggleComponent implements OnChanges, ControlValueAccessor {
    @Input() description: string = '';
    @Output() changes = new EventEmitter<any>();

    onOffState: boolean = false;
    timer: any;

    // ControlValueAccessor methods
    writeValue(inputProp: boolean): void {
        this.onOffState = inputProp
        this.onChange(inputProp);
    }

    handleChange() {
        this.onOffState = !this.onOffState;
        this.changes.emit(this.onOffState);
        this.writeValue(this.onOffState);
    }
    registerOnChange(fn: (inputProp: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onChange = (inputProp: boolean) => {
        
    };
    onTouched = () => {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            // do something
        }
    }
}
