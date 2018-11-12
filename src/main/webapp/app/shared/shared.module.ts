import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { OperrSharedLibsModule, OperrSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { FutureDateValidator } from 'app/shared/util/validators';

@NgModule({
    imports: [OperrSharedLibsModule, OperrSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, FutureDateValidator],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [OperrSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, FutureDateValidator],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperrSharedModule {}
