import { AfterViewInit, Component, createNgModule, inject, Injector, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export enum ItemType {
  MAP = 'map',
  TEXT = 'text',
}
const types = Object.entries(ItemType).map(
  entry => ({
    label: entry[0],
    value: entry[1],
  })
)

export interface Item {
  type: ItemType,
  name: string,
  active: boolean,
}

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss']
})
export class ItemsPage implements OnInit, AfterViewInit {

  types = types;

  fb = inject(FormBuilder);

  form = this.fb.group({
    type: [ItemType.TEXT, [Validators.required], []],
    name: ['', [Validators.required]],
    active: [false, []]
  });

  @ViewChild('itemOutlet', {read: ViewContainerRef})
  itemOutlet!: ViewContainerRef;

  @ViewChild('errorMessage')
  errorMessage!: TemplateRef<any>;

  ngAfterViewInit(): void {
    console.log('OUTLET after view INIT', this.itemOutlet, this.errorMessage)

  }

  ngOnInit(): void {
    console.log('OUTLET ON INIT', this.itemOutlet, this.errorMessage)
  }

  injector = inject(Injector);

  async onSubmit() {
    console.log('is valid', this.form.valid)
    console.log('data', this.form.value)
    console.log('OUTLET ON SUBMIT', this.itemOutlet, this.errorMessage)
    this.itemOutlet?.clear();
    if(this.form.valid) {
      // render item
      let comp;
      if(this.form.value.type === ItemType.MAP) {
        const { MapComponent } = await import('./types/map/map.component');
        comp = MapComponent;
        // const ngModuleRef = createNgModule(LazyModule, this.injector);

      } else {
        const { TextComponent } = await import('./types/text/text.component');
        comp = TextComponent;
      }

      const compRef = this.itemOutlet.createComponent(comp, {});

      compRef.instance.item = this.form.value as Item

    } else {
      // render error message
      this.itemOutlet.createEmbeddedView(this.errorMessage);
    }
  }

}
