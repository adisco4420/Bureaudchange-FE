import { Component } from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    template: `<header class="bg-gradient p-75x" id="home"></header>
                <div class="body"><router-outlet></router-outlet></div>`,
    styles: [`@import "/assets/css/auth.css";`]
})
 export class AuthLayoutComponent {}
