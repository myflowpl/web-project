import { ThisReceiver } from '@angular/compiler';
import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  sub: Subscription | undefined;

  constructor(
    private authService: AuthService,

    private templateRef: TemplateRef<any>,

    private containerRef: ViewContainerRef

  ) { }

  ngOnInit(): void {

    this.sub = this.authService.profile$.pipe(
      map(profile => !!profile?.user),
      distinctUntilChanged(),
    ).subscribe(profile => {

      if(profile) {
        this.containerRef.createEmbeddedView(this.templateRef);
      } else {
        this.containerRef.clear();
      }
    })

  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
