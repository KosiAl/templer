
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './Notification/notification.component';
import { SimpleNotificationComponent } from './SimpleNotification/simplenotification.component';
import { ConformationComponent } from './Conformation/conformation.component';
import { IconModule } from '../Components/Icons/icon.module';

@NgModule({
    declarations: [ConformationComponent, NotificationComponent,SimpleNotificationComponent],
    imports: [CommonModule,IconModule],
    exports: [ConformationComponent, NotificationComponent,SimpleNotificationComponent],
})
export class PopupModule {}
