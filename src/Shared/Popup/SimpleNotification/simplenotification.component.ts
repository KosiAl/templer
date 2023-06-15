import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {ngifFadeAnimation} from '../../Animations/animations';
type messageType = 'Error' | 'Warn' | 'Success';

@Component({
    selector: 's-notification',
    templateUrl: './simplenotification.component.html',
    animations: [ngifFadeAnimation],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SimpleNotificationComponent),
            multi: true
        }
    ]
})
export class SimpleNotificationComponent implements OnChanges, ControlValueAccessor {
    @Input() type: messageType = 'Warn';
    @Input() description: string = '';
    
    timeout: number = 3;
    display: boolean = false;
    timer:any;

    // ControlValueAccessor methods
    writeValue(shouldOpen: boolean): void {
        this.display = shouldOpen;
        if (this.display) {
            let rTime = this.timeout * 1000;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.display = false;
                this.onChange(this.display);
            }, rTime);
        }
    }

    registerOnChange(fn: (shouldOpen: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onChange = (shouldOpen: boolean) => {};
    onTouched = () => {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            // If the type, description, or timeout changes, but shouldOpen does not, call writeValue to update the display state.
            this.writeValue(this.display);
            console.log(`NotificationComponent > ngOnChanges > this.display:`, this.display)
        }
    }
}

