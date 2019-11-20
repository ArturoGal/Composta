import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseuiAngularLibraryService } from 'firebaseui-angular';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) {
      firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();

  }
  ngOnInit() { }
}
