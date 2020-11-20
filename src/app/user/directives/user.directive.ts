import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appUser]'
})
export class UserDirective implements OnInit, OnDestroy {

  private sub = new Subscription();
  private hasView = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.sub = this.userService.user$.subscribe(user => {
      if(user && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef)
        this.hasView = true;
      } else if (!user && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
