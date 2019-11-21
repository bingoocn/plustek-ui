import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.component.html',
  styleUrls: ['./notice-add.component.scss'],
})
export class NoticeAddComponent implements OnInit {
  addNoticeForm;
  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.addNoticeForm = this.formBuilder.group({
      noticeTitle: [ null, [ Validators.required ] ],
      noticeContent: [ null, [ Validators.required ] ],
      noticeAttach:[ null ]
    });
  }
  addAttach(){

  }
  onSubmit(noticeData){
    // for (const i in this.addNoticeForm.controls) {
    //   if (i) {
    //     this.addNoticeForm.controls[ i ].markAsDirty();
    //   }
    // }
    console.warn("提交成功！");
    this.addNoticeForm.reset();
  }
}
