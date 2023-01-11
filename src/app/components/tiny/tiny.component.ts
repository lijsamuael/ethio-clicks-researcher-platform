import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tiny',
  templateUrl: './tiny.component.html',
  styleUrls: ['./tiny.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TinyComponent implements OnInit {
  descriptionForm!: FormGroup;
  private postInformation: AngularFirestoreCollection | undefined;
  postReplayMessage: any;
  postMessage: any;
  descriptionList!: any;

  tutorials!: Observable<any[]>;
  tutorial!: any[];

  min: any;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    public sanitizer: DomSanitizer
  ) {
    this.descriptionList = sanitizer.bypassSecurityTrustHtml(this.descriptionList)
  }

  ngOnInit(): void {
    this.postInformation = this.firestore.collection('PostDescription');
    this.tutorials = this.firestore
      .collection('PostDescription')
      .valueChanges();

    this.descriptionForm = this.formBuilder.group({
      description: null,
    });

    this.access();

    this.min = '<p style="text-align: center;"><span style="font-size: 36pt; color: rgb(53, 152, 219);"><strong><span style="text-decoration: underline;">Reseach one</span></strong></span></p><p style="text-align: center;"><strong><span style="text-decoration: underline;"><span style="font-size: 24pt; color: rgb(186, 55, 42); text-decoration: underline;">Heart disease prediction Regression model</span></span></strong></p><p style="text-align: left;"><span style="font-size: 18pt; color: rgb(0, 0, 0);">This is the one research that is done in order to do some other things in the mean wile , while at the same time there will be some other issues. and we will do some other things in the way we do not recognize all the tibng.</span></p><p style="text-align: right;"><span style="font-size: 18pt; color: rgb(0, 0, 0);">Samuael,</span></p><p style="text-align: right;"><span style="font-size: 18pt; color: rgb(0, 0, 0);">Thank you,</span></p>'
  }

  send() {
    this.postInformation
      ?.add(this.descriptionForm.value)
      .then((res) => {
        this.postReplayMessage = 'Posted Successfully!';
        this.descriptionForm.reset();
      })
      .catch((err) => {
        alert(err);
      });
    setTimeout(() => {
      this.postReplayMessage = '';
    }, 5000);
  }

  access() {
    this.tutorials = this.firestore
      .collection('PostDescription')
      .snapshotChanges();

    this.tutorials.subscribe((res) => {
      this.descriptionList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        };
      });
    });
  }
}
