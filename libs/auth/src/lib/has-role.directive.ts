import { computed, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";
import { ProfileStore } from "./profile.store";

@Directive({
    selector: '[hasRole]'
})
export class HasRoleDirectie {

    templateRef = inject(TemplateRef);
    containerRef = inject(ViewContainerRef);
    hasRole = input<string>('');

    profileStore = inject(ProfileStore);

    flag = computed(() => {
        const user = this.profileStore.user();
        if(!user) {
            return false;
        }
        const role = this.hasRole();
        if(!role) {
            return true;
        }
        // TODO not production read ;)
        return user.email.includes(role);
    })

    constructor() {
        effect(() => {
            if(this.flag()) {
                this.containerRef.createEmbeddedView(this.templateRef);
            } else {
                this.containerRef.clear();
            }
        })
    }
}
