import { trigger, transition, style, animate } from '@angular/animations';
export const ngifFadeAnimation = trigger('ngifFadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('600ms', style({ opacity: 0 }))]
  )
]);