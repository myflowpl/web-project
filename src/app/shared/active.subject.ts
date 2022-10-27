import { BehaviorSubject, tap } from "rxjs";

export class ActiveSubject extends BehaviorSubject<boolean> {

  get active() {
    return this.getValue();
  }

  private _count = 0;

  get count() {
    return this._count;
  }

  constructor() {
    super(false);
  }

  override next(value: any) {
    throw new Error('Next method is blocked, use tap() function to connect');
  }

  override error(value: any) {
    throw new Error('Next method is blocked, use tap() function to connect');
  }

  override complete() {
    throw new Error('Next method is blocked, use tap() function to connect');
  }

  tap<T>() {
    return tap<T>({
      subscribe: () => super.next(!!++this._count),
      finalize: () => super.next(!!--this._count),
    });
  }
}
