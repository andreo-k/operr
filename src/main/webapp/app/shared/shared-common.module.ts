import { NgModule } from '@angular/core';

import { OperrSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [OperrSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [OperrSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class OperrSharedCommonModule {}
