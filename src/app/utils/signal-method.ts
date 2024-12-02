import {
    assertInInjectionContext,
    DestroyRef,
    effect,
    inject,
    Injector,
    isSignal,
    Signal,
    untracked,
  } from '@angular/core';
  import { isObservable, noop, Observable, Subject, Subscription, Unsubscribable } from 'rxjs';
  
  export type SignalMethod<Input> = ((
    input: Input | Signal<Input> | Observable<Input>
  ) => Unsubscribable) &
    Unsubscribable;
  
  export function signalMethod<Input>(
    handlerFn: (value: Input) => void,
    config?: { injector?: Injector }
  ): SignalMethod<Input> {
    if (!config?.injector) {
      assertInInjectionContext(signalMethod);
    }
  
    const injector = config?.injector ?? inject(Injector);
    const destroyRef = injector.get(DestroyRef);
  
    const sourceSub = new Subscription();
    destroyRef.onDestroy(() => sourceSub.unsubscribe());
  
    const signalMethodFn = (input: Input | Signal<Input> | Observable<Input>) => {
      if (isSignal(input)) {
        const watcher = effect(
          () => {
            const value = input();
            untracked(() => handlerFn(value));
          },
          { injector }
        );
        const instanceSub = { unsubscribe: () => watcher.destroy() };
        sourceSub.add(instanceSub);
  
        return instanceSub;
      }
  
      if (isObservable(input)) {
        const instanceSub = input.subscribe((value) => handlerFn(value));
        sourceSub.add(instanceSub);
  
        return instanceSub;
      }
  
      handlerFn(input);
      return { unsubscribe: noop };
    };
    signalMethodFn.unsubscribe = sourceSub.unsubscribe.bind(sourceSub);
  
    return signalMethodFn;
  }