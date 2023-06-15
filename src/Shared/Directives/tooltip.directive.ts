import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';


@Directive({
    selector: '[tooltip]',
})
export class TooltipDirective {
    @Input('tooltip') tooltipTitle: string = '';
    @Input() placement: string = '';
    delay: number = 1000;
    tooltip: HTMLElement | undefined;
    // 호스트 요소와 tooltip 요소 간의 거리
    offset = 10;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter') onMouseEnter() {
        this.show();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.hide();
    }

    @HostListener('click') onClick(){
        this.hide();
    }

    ngOnDestroy(): void {
        this.hide();
    }

    show() {
        this.create();
        this.setPosition();
    /*     setTimeout(() => { */
            this.renderer.addClass(this.tooltip, 'tooltip-fadeIn');
            this.renderer.addClass(this.tooltip, 'ks-tooltipDirective');

     /*    }, 800); */
    }

    hide() {
        if (!this.tooltip) {
            return;
        }
        /* this.renderer.removeClass(this.tooltip, 'ks-tooltipDirective'); */
        this.renderer.removeChild(document.body, this.tooltip);
    }

    create() {
        this.tooltip = this.renderer.createElement('span');

        this.renderer.appendChild(
            this.tooltip,
            this.renderer.createText(this.tooltipTitle) // textNode
        );

        this.renderer.appendChild(document.body, this.tooltip);

    }

    setPosition() {
        const hostPos = this.el.nativeElement.getBoundingClientRect();
        const tooltipPos = this.tooltip ? this.tooltip.getBoundingClientRect() : { width: 0, height: 0 };
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top, left;
        if(this.placement === '') {
            this.placement = 'top'
        }


        if (this.placement === 'top') {
            top = hostPos.top - tooltipPos.height - this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'bottom') {
            top = hostPos.bottom + this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'left') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.left - tooltipPos.width - this.offset;
        }

        if (this.placement === 'right') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.right + this.offset;
        }

        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }
}
