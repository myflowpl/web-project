import { Component, NgModule, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  
})
export class FooterComponent {

}



// OLD < v19 stand alone
// @Component({
//   selector: 'app-footer',
//   imports: [],
//   templateUrl: './footer-main.component.html',
//   styleUrl: './footer-main.component.scss',
//   standalone: true,
// })
// export class FooterOldComponent {

// }

// OLD BEFORE standalone

// @Component({
//   selector: 'footer-main1',
//   template: './footer.component.html',
//   standalone: false,
// })
// export class FooterOldNoStandaloneComponent {}

// @Component({
//   selector: 'footer-main2',
//   template: `
//     <footer1>  
//       <app-footer>
//         <router-outlet>
//           {{ 'my custom name' | name}}
//   `,
//   standalone: false,
// })
// export class FooterForPanelsOldNoStandaloneComponent {}


// @Pipe({name: 'name'})
// export class NamePipe implements PipeTransform {
//   transform(value: any): any {
    
//   }
// }

// @NgModule({
//   imports: [
//     FooterOldComponent,
//     RouterModule,
//     NamePipe,
//   ],
//   declarations: [
//     FooterOldNoStandaloneComponent,
//     FooterForPanelsOldNoStandaloneComponent,
//   ],
//   providers: [],
//   exports: [],
// })
// export class FooterModule {}