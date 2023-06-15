import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipDirective } from '../Directives/tooltip.directive';
import { PopupModule } from '../Popup/popup.module';
import { IconModule } from '../Components/Icons/icon.module';
import { DropdownComponent } from '../Components/Dropdown/dropdown.component';
import { ToggleComponent } from '../Components/Toggle/toggle.component';
import { ContrastDirective } from '../Directives/contrast.directive';

@NgModule({
    declarations: [TooltipDirective, ContrastDirective, DropdownComponent, ToggleComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PopupModule, IconModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, PopupModule, IconModule, TooltipDirective, ContrastDirective, DropdownComponent, ToggleComponent],
})
export class SharedModule {}
