import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from '../tab3/services/authentication.service';
import { UserDetails, User_role } from '../tab3/userInterface';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isUserLoggedIn: boolean;
  userProfile: UserDetails;
  user_roles: User_role[]
  constructor(
    public _authService: AuthenticationService,
    private permissionsService: NgxPermissionsService,) {

    this.isUserLoggedIn = this._authService.loggedIn();
    if (this.isUserLoggedIn) {
      this.GetUserProfile()
    }
  }
  GetUserProfile() {
    this._authService.userProfile().subscribe(res => {
      this.userProfile = res['data']

      this.user_roles = res['data']['user_roles']
      let roles = []
      for(let i=0; i< this.user_roles.length; i++) {
        roles.push(this.user_roles[i]['name'])
      }

      this.permissionsService.loadPermissions(roles);
    })
  }
}
