import { GeneralService } from './../../../shared/general.service';
import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent {
  showLoader = true;
  status = {type: '', msg: ''};
  constructor(
    private authSrv: AuthService,
    private gs: GeneralService,
    route: ActivatedRoute) {
      route.params.pipe(take(1)).subscribe(({token}) => {
        this.verifyEmail(token);
      });
     }

  verifyEmail(token) {
    this.authSrv.confirmEmail(token).subscribe((res: any) => {
      this.authSrv.storeToken(res.data.data);
      this.status = {type: 'success', msg: 'Your account is verified'};
    }, () => {
      this.status = {type: 'error', msg: 'Confirmation failed an error occured'};
    }).add(() => {
      this.showLoader = false;
    });
  }

}
