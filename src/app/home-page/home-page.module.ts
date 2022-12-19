import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { CatSectionComponent } from './cat-section/cat-section.component';
import { ImgContainerComponent } from './img-container/img-container.component';
import { BatSectionComponent } from './bat-section/bat-section.component';
import { DogSectionComponent } from './dog-section/dog-section.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SectionContainerComponent,
    CatSectionComponent,
    ImgContainerComponent,
    BatSectionComponent,
    DogSectionComponent,
  ],
  exports: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class HomePageModule { }
