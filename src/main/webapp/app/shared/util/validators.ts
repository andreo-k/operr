import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Directive({
    selector: '[futureDate][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: FutureDateValidator, multi: true }]
})
export class FutureDateValidator implements Validator {
    validate(c: FormControl) {
        if (moment().isAfter(moment(c.value))) {
            return { futureDate: true };
        }

        return null;
    }
}
