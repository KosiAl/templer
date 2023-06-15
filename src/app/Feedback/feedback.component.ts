import { Component, OnInit, Input } from '@angular/core';
/* import { AngularFirestore } from '@angular/fire/firestore'; */
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [
    trigger(
      'upAnimation', 
      [
        transition(
          ':enter', 
          [
            style({height: 0, opacity: 0}),
            animate('0.5s ease-out', 
                    style({overflow: 'hidden', height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({height: '*', opacity: 1}),
            animate('0.5s ease-out', 
                    style({height: 0, opacity: 0}))
          ]
        )
      ]
    )]
})
export class FeedbackComponent implements OnInit {

    title = new FormControl('', [Validators.required]);
    description = new FormControl('', [Validators.required]);

    bugReport:any = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
    });

    feedback:any = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
    });

    @Input() config:any;

    feedBackTitle = 'Bug report'
    isFeedback = false
    reports= {
    
        bugs: {
            loading:false,
            success: false,
            error: false
        },
        feedback: {
            loading:false,
            success: false,
            error: false
        }
    }

    constructor(/* private db: AngularFirestore, */private fb: FormBuilder) {

    }

    ngOnInit(): void {
        console.log('~ config', this.config)
    }

    sendBugReport() {
        this.reports.bugs.loading = true
        
   /*      this.db.collection('dataCollection').doc('reports').collection('bugs').add({description: this.bugReport.value.description, title: this.bugReport.value.title, timestamp: new Date().getTime()}).then(() => {
            console.log("Document successfully written!");
            this.reports.bugs.loading = false
            this.reports.bugs.success = true
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            this.reports.bugs.loading = false
            this.reports.bugs.error = true
        }); */


    }

    sendFeedback() {
        this.reports.feedback.loading = true

 /*        this.db.collection('dataCollection').doc('reports').collection('feedbacks').add({description: this.feedback.value.description, title: this.feedback.value.title, timestamp: new Date().getTime()}).then(() => {
            console.log("Document successfully written!");
            this.reports.feedback.loading = false
            this.reports.feedback.success = true
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            this.reports.feedback.loading = false
            this.reports.feedback.error = true
        }); */
    }

    toggleFeedback() {
        this.isFeedback = !this.isFeedback
        this.feedBackTitle = 'Bug report'
    }

    closeFeedback() {
        this.isFeedback = false;
        this.reports.bugs.error = false
        this.reports.bugs.loading = false
        this.reports.bugs.success = false
        this.reports.feedback.error = false
        this.reports.feedback.loading = false
        this.reports.feedback.success = false
        this.bugReport.reset()
        this.feedback.reset()
    }

    switchTitle(v:any) {
        let index = v.index
        if(index === 0) {
            this.feedBackTitle = 'Bug report'
        }
        if(index === 1) {
            this.feedBackTitle = 'Send feedback'
        }
    }
}
