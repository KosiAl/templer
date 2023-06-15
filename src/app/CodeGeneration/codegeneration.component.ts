import { Component, OnInit, Input, effect } from '@angular/core';
import { AngularHTML } from './codelogic/Angular';
import { AngularMaterialHTML } from './codelogic/AngularMaterial';
import { ngBootstrap } from './codelogic/ngbootstrap';
import { ThemeService } from '../../Shared/Services/theme.service';
/* import { MatSnackBar } from '@angular/material/snack-bar'; */
/* import { Helper } from '../../Shared/Functions/code'; */
/* import { AppConfig } from 'app/core/config/app.config'; */
/* import { FuseConfigService } from '@fuse/services/config'; */
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
let zip = new JSZip();

@Component({
    selector: 'code-generation-component',
    templateUrl: './codegeneration.component.html',
    styleUrls: ['./codegeneration.component.scss'],
})
export class CodeGenerationComponent implements OnInit {
    @Input() data: any;
    @Input() config: any;

    showCode = 'typescript';
    copySuccess = false;

    codeIndex = 0;

    tete = false;

    myHtmlString = ``;
    myTsString = ``;
    myCSSstring = ``;
    fullCompString = `ng generate component table`;
    tutorial = true;
    selectedIndex = 0;

    codeIsDark = {
        html: 'dark',
        ts: 'dark',
        css: 'dark',
    };

    componentName: any = {
        name: 'table',
        prefix: 'app',
    };

    angularSettings: any = {
        prefix: true,
    };

    materialSettings: any = {
        filter: false,
        sort: false,
        paginator: false,
        reorder: false,
        selection: false,
        sHeader: false,
        sFooter: false,
        sLeft: false,
        sRight: false,
        verticalLine: false,
        centerContent: false,
        headerSize: false,
        incJson: false,
        jsonAsFile: false,
        prefix: true,
        strict: false,
    };

    ngboostrapSettings: any = {
        filter: false,
        sort: false,
        paginator: false,
        prefix: true,
    };

    frameTutorial = {
        init: false,
        properties: false,
        incJSON: false,
        button: false,
        sepJSON: false,
        icons: false,
    };

    constructor(
        private angular: AngularHTML,
        private angularMaterial: AngularMaterialHTML,
        private ngBootstrap: ngBootstrap,
        public theme: ThemeService
    ) {
        effect(() => {
            let theme = this.theme.themeMode$();
            if (theme === 'dark') {
                this.codeIsDark.html = 'dark';
                this.codeIsDark.ts = 'dark';
                this.codeIsDark.css = 'dark';
            } else {
                this.codeIsDark.html = 'light';
                this.codeIsDark.ts = 'light';
                this.codeIsDark.css = 'light';
            }
        });

        // Read data from main app componet to load settings as user left them
        /*             if(info.settings) {
                this.materialSettings = info.settings
            }
          */
        // Update component name
        if (localStorage.getItem('frameTutorial') === null) {
            this.frameTutorial.init = true;
        }
        /*  this.nameComponent(this.componentName.name, 'name', 'ang') */
    }

    // MEYBE FIX INPUT DUPLICATED KEY LOGIC

    ngOnInit() {}

    ngOnChanges() {
        console.log(`DialogPrint > ngOnChanges > this.config:`, this.data);
        this.selectedIndex = 1;
        this.tabChange(1);
        this.angularMaterialPrint();
        /*     if(this.tutorial === true) {
            this.selectedIndex = 1
            this.tabChange(1)
            this.angularMaterialPrint()
        } else {
            this.angularPrint();
        }  */
        /*    this.codeIsDark.html = this.config.html
        this.codeIsDark.ts = this.config.ts
        this.codeIsDark.css = this.config.css */
    }

    testme(asas: any) {
        console.log(`DialogPrint > testme > this.config:`, asas);
    }

    downloadZip() {
        zip.file(`${this.componentName.name}/${this.componentName.name}.component.html`, this.myHtmlString);
        zip.file(`${this.componentName.name}/${this.componentName.name}.component.ts`, this.myTsString);
        zip.file(`${this.componentName.name}/${this.componentName.name}.component.scss`, this.myCSSstring);
        if (this.materialSettings.jsonAsFile === true) {
            let jsonFile = `export const data:any[] =\n${this.data}`;
            zip.file(`${this.componentName.name}/mockData.json.ts`, jsonFile);
        }
        let name = this.componentName.name;
        zip.generateAsync({ type: 'blob' }).then(function (blob) {
            saveAs(blob, name);
            zip.remove(name);
        });
    }

    tabChangeCode(val: any) {
        this.codeIndex = val.index;
    }

    triggerSelection(string: any) {
        this.showCode = string;
        console.log('test');
    }

    saveTheme(key: string) {
        if (key === 'html') {
            console.log(this.config);
            if (this.codeIsDark.html === 'light') {
                this.codeIsDark.html = 'dark';
            } else {
                this.codeIsDark.html = 'light';
            }
        }
        if (key === 'ts') {
            if (this.codeIsDark.ts === 'light') {
                this.codeIsDark.ts = 'dark';
            } else {
                this.codeIsDark.ts = 'light';
            }
        }
        if (key === 'css') {
            if (this.codeIsDark.css === 'light') {
                this.codeIsDark.css = 'dark';
            } else {
                this.codeIsDark.css = 'light';
            }
        }
    }

    tabChange(v: any) {
        let index = v.index;
        if (index === 0) {
            this.angularPrint();
        }
        if (index === 1) {
            this.angularMaterialPrint();
        }
        if (index === 2) {
            this.ngBootstrapPrint();
        }
    }

    download(type: string) {
        //you can enter your own file name and extension
        function writeContents(content: any, fileName: any, contentType: any) {
            var a = document.createElement('a');
            var file = new Blob([content], { type: contentType });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        }

        if (type === 'html') {
            writeContents(this.myHtmlString, `${this.componentName.name}.component.${type}`, 'text/plain');
        }
        if (type === 'ts') {
            writeContents(this.myTsString, `${this.componentName.name}.component.${type}`, 'text/plain');
        }
        if (type === 'scss') {
            writeContents(this.myCSSstring, `${this.componentName.name}.component.${type}`, 'text/plain');
        }
    }

    openSnackBar() {
        this.copySuccess = true;
    }

    nameComponent(value: string, key: string, framework: string) {
        this.componentName[key] = value;
        this.fullCompString = `ng generate component ${value}`;
        this.updateFramework(framework);
        console.log(`DialogPrint > nameComponent > this.fullCompString:`, this.fullCompString)
    }

    updateFramework(framework: string) {
        if (framework === 'ang') {
            this.angularPrint();
        }
        if (framework === 'mat') {
            this.angularMaterialPrint();
        }
        if (framework === 'ngb') {
            this.ngBootstrapPrint();
        }
    }

    printFramework(state: any, field: any, framework: string) {
        console.log(state, field, framework);
        if (framework === 'ang') {
            this.angularSettings[field] = state;
            this.angularPrint();
        }
        if (framework === 'mat') {
            this.materialSettings[field] = state;
            if (field === 'jsonAsFile' && state === true) {
                this.materialSettings.incJson = false;
            }
            if (field === 'incJson' && state === true) {
                this.materialSettings.jsonAsFile = false;
            }
            this.angularMaterialPrint();
        }
        if (framework === 'ngb') {
            this.ngboostrapSettings[field] = state;
            this.ngBootstrapPrint();
        }
    }

    angularPrint() {
        /* console.log(this.data) */
        let { html, tscode, csscode } = this.angular.createAngularHTMLTable(this.data, this.angularSettings, this.componentName);
        this.myHtmlString = html;
        this.myTsString = tscode;
        this.myCSSstring = csscode;
    }

    angularMaterialPrint() {
        /* console.log(this.data) */
        let { html, tscode, csscode } = this.angularMaterial.createAngularMaterialHTMLTable(this.data, this.materialSettings, this.componentName);
        this.myHtmlString = html;
        /* console.log(`DialogPrint > angularMaterialPrint > this.myHtmlString:`, this.myHtmlString) */
        this.myTsString = tscode;
        /*         console.log(`DialogPrint > angularMaterialPrint > this.myTsString:`, this.myTsString) */
        this.myCSSstring = csscode;
        /* console.log(`DialogPrint > angularMaterialPrint > this.myCSSstring:`, this.myCSSstring) */
    }

    ngBootstrapPrint() {
        let { html, tscode, csscode } = this.ngBootstrap.createNgBootstrap(this.data, this.ngboostrapSettings, this.componentName);
        this.myHtmlString = html;
        this.myTsString = tscode;
        this.myCSSstring = csscode;
    }
}
