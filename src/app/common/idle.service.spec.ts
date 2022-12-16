import { TestBed, tick, fakeAsync, flush, discardPeriodicTasks } from '@angular/core/testing';

import { IdleService } from './idle.service';

describe('IdleService', () => {
  let service: IdleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('coutdouwn should be zer by default', () => {
    expect(service.countdown).toBe(0);
  });

  it('coutdouwn should be null after tick', () => {
    service.tick()
    expect(service.countdown).toBe(null);
  });

  it('coutdouwn should be 3 sec after 3000ms', fakeAsync(() => {
    service.tick()
    tick(2999);
    expect(service.countdown).toBe(null);
    tick(1);
    expect(service.countdown).toBe(3);
    tick(1000)
    expect(service.countdown).toBe(2);

    discardPeriodicTasks();
  }));

  it('coutdouwn should be 0 after 6s', fakeAsync(() => {
    service.tick()
    let c: any = null;
    service.countdown$.subscribe(count => (c = count))
    tick(3000);
    expect(c).toBe(3);
    tick(3000);
    expect(c).toBe(0);

    discardPeriodicTasks();
  }));

  it('coutdouwn should reset after tick', fakeAsync(() => {
    service.tick()
    tick(3000);
    expect(service.countdown).toBe(3);
    service.tick()
    expect(service.countdown).toBe(null);
    tick(4000)
    expect(service.countdown).toBe(2);

    discardPeriodicTasks();
  }));

});
