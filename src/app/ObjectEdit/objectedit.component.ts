import { Component, Input, OnChanges, forwardRef, ViewContainerRef, effect, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../Shared/Services/theme.service';
import { ngifFadeAnimation } from '../../Shared/Animations/animations';

@Component({
    selector: 'object-edit-component',
    templateUrl: './objectedit.component.html',
    styleUrls: ['./objectedit.component.scss'],
    animations: [ngifFadeAnimation],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ObjectEditComponent),
            multi: true,
        },
    ],
})
export class ObjectEditComponent implements OnChanges, ControlValueAccessor {
    @Input() data: any;
    @Output() dataChange: EventEmitter<any> = new EventEmitter();

    headersDialog = false;
    jsonTheme = 'light';
    headers: any;
    stringJSON: any;
    addButton = true;
    error: any = '';
    valueStateOfTypeDropdowns: any = [];

    /* IMPLEMENT FUNCTION TO BLOCK INVALID VALUE IN INPUT FOR OBJECT KEYS */
    // MEYBE FIX INPUT DUPLICATED KEY LOGIC

    constructor(private vcr: ViewContainerRef, public theme: ThemeService) {
        effect(() => {
            let theme = this.theme.themeMode$();
            if (theme === 'dark') {
                this.jsonTheme = 'dark';
            } else {
                this.jsonTheme = 'light';
            }
        });
    }

    onAccept() {
        this.dataChange.emit(this.data);
        this.closeDialog();
    }

    onClose() {
        this.closeDialog();
    }

    ngOnChanges() {
        this.writeValue(this.headersDialog);
        if (this.data) {
            this.headers = Object.keys(this.data[0]);
            this.stringJSON = `\n` + JSON.stringify(this.data[0], undefined, 4) + `\n\n`;
            this.setTypes();
        }
    }

    closeDialog() {
        this.headersDialog = false;
        this.writeValue(this.headersDialog);
    }

    // ControlValueAccessor methods
    writeValue(open: any): void {
        this.headersDialog = open;
        this.onChange(this.headersDialog);
    }

    registerOnChange(fn: (open: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onChange = (open: boolean) => {};
    onTouched = () => {};

    selectValue(selectedType: any) {
        let types = [
            { name: 'Boolean', selected: false },
            { name: 'String', selected: false },
            { name: 'Number', selected: false },
        ];
        types.forEach((typ: any) => {
            if (typ.name === selectedType) {
                typ.selected = true;
            }
        });
        return types;
    }

    saveTheme(key: string) {
        if (key === 'json') {
            if (this.jsonTheme === 'light') {
                this.jsonTheme = 'dark';
                /* this._fuseConfigService.config = { json: 'dark' }; */
            } else {
                this.jsonTheme = 'light';
                /* this._fuseConfigService.config = { json: 'light' }; */
            }
        }
    }

    //  Pre-populate dropdown fields with proper types
    setTypes(): void {
        let types = Object.values(this.data[0]);
        types.forEach((x, i) => {
            let typ = this.detectType(x);
            this.valueStateOfTypeDropdowns[i] = typ;
        });
    }

    //  Detect type of data -> to be used by setTypes function
    detectType(n: any): string {
        //IMPROVE DETECTION
        if (!isNaN(parseFloat(n)) && isFinite(n)) {
            return 'Number';
        } else if (n === 'true' || n === true) {
            return 'Boolean';
        } else if (n === 'false' || n === false) {
            return 'Boolean';
        } else {
            return 'String';
        }
    }

    //  When user selects TYPE of VALUE (in editor), we automaticaly fill random data to full array of objects (MAIN DATA), with proper type
    selectTypeAndGenerateData(type: any, key: string, inx: number): void {
        this.valueStateOfTypeDropdowns[inx] = type;

        if (type.name === 'Number') {
            this.data.forEach((object: object) => {
                Object.assign(object, { [key]: Math.floor(Math.random() * 99900) + 1 });
            });
        }
        if (type.name === 'String') {
            this.data.forEach((object: object) => {
                Object.assign(object, { [key]: Math.random().toString(36).substring(2, 15) });
            });
        }
        if (type.name === 'Boolean') {
            this.data.forEach((object: object) => {
                Object.assign(object, { [key]: Math.random() < 0.5 });
            });
        }
        this.stringJSON = `\n` + JSON.stringify(this.data[0], undefined, 4) + `\n\n`;
    }

    //  Add KEY VALUE pair to main DATA -> Array of objects
    addKVpair(): void {
        this.data.forEach((object: object) => {
            Object.assign(object, { '': '' });
        });
        this.stringJSON = `\n` + JSON.stringify(this.data[0], undefined, 4) + `\n\n`;
        this.headers.push('');
        this.addButton = false;
    }

    // DELETE specific KEY VALUE pair from MAIN DATA
    deleteKey(i: number, hkey: string): void {
        this.valueStateOfTypeDropdowns.splice(i, 1);
        this.data.forEach((x: any) => delete x[hkey]);
        this.headers = Object.keys(this.data[0]);
        this.stringJSON = `\n` + JSON.stringify(this.data[0], undefined, 4) + `\n\n`;

        // IF user leaves new KV pair empty we disable adding of new KV pairs -> also used to display error near input field
        if (i === this.headers.length) {
            this.addButton = true;
        }

        // When we remove KV pair we have to also move error to proper input field
        if (i === this.error) {
            this.error = '';
        } else if (i < this.error) {
            this.error = this.error - 1;
        }
    }

    //  When user types in input box we update keys with new name from imput field, and rewrite MAIN DATA
    changeValue(value: string, inx: number): void {
        let keys = Object.keys(this.data[0]);

        if (!keys.includes(value)) {
            // Assign new value to key
            keys[inx] = value;

            // Apply this change to all objects in MAIN DATA by reconstructing it
            let arrayofArrays: string[][] = this.JSONtoArrysV(this.data);
            let newData = this.KVarraysToJSON(keys, arrayofArrays);
            this.data = newData;

            // If here no error so we clear any previus state that had error "on"
            this.addButton = true;
            this.error = '';

            // Stringifly to make previue
            this.stringJSON = `\n` + JSON.stringify(this.data[0], undefined, 4) + `\n\n`;
        } else {
            // If value from imput matches value from other key, we raise error to users input field and disable adding new KV pairs
            this.addButton = false;
            this.error = inx;
        }

        if (value === '') {
            this.addButton = false;
        }
    }

    //  From two arrays, array of keys and arrar of array values, we create Array of object -> also know as JSON
    KVarraysToJSON(keyArray: string[], dataArray: string[][]): object[] {
        const result = dataArray.map((row: string[]) => row.reduce((acc: any, cur: any, i: any) => ((acc[keyArray[i]] = cur), acc), {}));

        return result;
    }

    //  Deconstruct Array of object->JSON to array of array values
    JSONtoArrysV(data: object[]): string[][] {
        let newDataArray: string[][] = [];

        for (let i = 0; i < data.length; i++) {
            let newRowArray = Object.values(data[i]);
            newDataArray.push(newRowArray);
        }

        return newDataArray;
    }

    //  Create Array of strings with all objeckt keys from fist object in MAIN DATA
    writeHeaders(): void {
        this.headers = Object.keys(this.data[0]);
    }
}
