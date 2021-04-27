import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateAvailableEvent as UAE } from '@angular/service-worker';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export interface AppData {
  version: string;
  changelog: string;
}
export interface Version {
  hash: string;
  appData?: AppData;
}
export interface UpdateAvailableEvent extends UAE {
  type: 'UPDATE_AVAILABLE';
  current: Version;
  available: Version;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.dialog.html',
  styleUrls: ['./update.dialog.scss']
})
export class UpdateDialog implements OnInit, OnDestroy {

  destroy$$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateAvailableEvent,
  ) {}
  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
  ngOnInit(): void {
  }

//   ngOnInit2(): void {
//     this.typy = EnumToSelectItem(TypWartosciEnum);

//     const jednostki$ = this.jednostkiApi.Pobierz().pipe(
//       map(({dane}) => dane.map(j => ({ value: j.id, label: j.nazwa }))
//     );
//     const slowniki$ = this.slownikiApi.Pobierz().pipe(
//       map(res => res.slowniki.dane.map<SelectItem>(s => ({ label: s.nazwa, value: s.i    d })))
//     );
//     this.dane$ = forkJoin({
//        jednostki: jednostki$,
//        slowniki: slowniki$
//      })
//      .pipe(
//        takeUntil(this.destroy$$),
//        tap(({jednostki, slowniki}) => {
//         this.jednostki = jednostki;
//         this.slowniki = slowniki;
//         if (this.featureService.erp != null) {
//           this.zamienERPNaSelectItem();
//         }
//         super.ngOnInit();
//        })
//        )
//     //  .subscribe(res => {
//     //    this.jednostki = res.jednostki;
//     //    this.slowniki = ;


//     //    super.ngOnInit();
//     //  });
//  }
}
