import { Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
    selector: '[contrast]',
})
export class ContrastDirective implements OnChanges {
    @Input('contrast') bgColor!: any;

    constructor(private el: ElementRef) {}

    ngOnChanges() {

        const bgColor = window.getComputedStyle(this.bgColor).backgroundColor;
        console.log(`ContrastDirective > ngOnChanges > this.getContrastColor(bgColor):`, this.getContrastColor(bgColor))
        this.el.nativeElement.style.color = this.getContrastColor(bgColor);
    }

    getContrastColor(rgbString: any): any {
        // Extract the numbers from the rgb string
        const rgb = rgbString
            .substring(rgbString.indexOf('(') + 1, rgbString.lastIndexOf(')'))
            .split(',')
            .map(Number);

        const [r, g, b] = rgb;

        // Calculate the brightness of the color using the YIQ formula
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;

        // If the color is bright, return 'black'. If the color is dark, return 'white'.
        return yiq >= 128 ? 'black' : 'white';
    }
}
