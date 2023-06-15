import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../Shared/Services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    app = 'design';
    isJsonStr = false;
    headersDialog = false;
    JSONstring = ``;
    framework = '';
    config: any;
    myData: any;
    mainTutorialApp = {
        welcome: false,
        excel: false,
        convert: false,
        json: false,
        edit: false,
        angular: false,
        dark: false,
        feedback: false,
    };

    excelString = `
    Name	Position	Office	Age	Start date
    Airi Satou	Accountant	Tokyo	33	2008/11/28
    Angelica Ramos	Chief Executive Officer (CEO)	London	47	2009/10/09
    Ashton Cox	Junior Technical Author	San Francisco	66	2009/01/12
    Bradley Greer	Software Engineer	London	41	2012/10/13
    Brenden Wagner	Software Engineer	San Francisco	28	2011/06/07
    Brielle Williamson	Integration Specialist	New York	61	2012/12/02
    Bruno Nash	Software Engineer	London	38	2011/05/03
    Caesar Vance	Pre-Sales Support	New York	21	2011/12/12`;

    constructor(public theme: ThemeService, private renderer: Renderer2) {
    }
    ngOnInit(): void {
        this.renderer.addClass(document.body, 'font-nice');
        this.theme.loadTheme(this.renderer);
    }
    ngAfterViewInit() {
        /* this.theme.setContrastForPrimaryButtons(this.theme.themeColor$()); */
    }

    setApp(app: string) {
        this.app = app;
    }

    handleObjectEditorData(data: any) {
        var jsonString: string = JSON.stringify(data, undefined, 4);
        this.JSONstring = jsonString;
    }

    toggleTheme() {
        this.theme.switchThemeMode();
    }

    //  Opend dialog to excel KV pair of MAIN DATA
    openObjectEditDialog(data: string): void {
        console.log('open dialog');
    }

    next(event: any) {
        console.log(event);
        this.mainTutorialApp = event;
    }

    setFramework(frame: any) {
        this.framework = frame;
     /*    setTimeout(function () {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100); */
    }

    // PREVERI TIPE IN KOMENTIRAJ
    createJSON() {
        let data = this.excelString;
        /*  REMOVE MULTIPLE NEW LINES AND REMOVE ALL NEW LINES ON START */
        data = data.replace(/\n\s*\n/g, '\n').replace(/^\s+|\s+$/g, '');
        const { keyArray, falseIndex }: any = this.createArrayOfKeys(data);
        let dataArray: string[][] = this.createArraysOfValues(data, falseIndex);
        let jsonObject: object[] = this.combineKeyValueArraysToJSON(keyArray, dataArray);
        var jsonString: string = JSON.stringify(jsonObject, undefined, 4);
        let array = JSON.parse(jsonString)
        this.myData = array
        this.JSONstring = jsonString;
        this.isJsonStr = this.isJsonString(jsonString);


    }

    createArrayOfKeys(data: any): any {
        let headers = data.split('\n')[0];
        let headersLenght = headers.match(/\t/g).length + 1;
        let keyArray = [];
        let falseIndex = [];

        for (let i = 0; i < headersLenght; i++) {
            let key = headers.split('\t')[i].replace(/\s/g, '_').replace(/\s+$/, '').replace('-', '_').toLowerCase();
            if (key !== '') {
                keyArray.push(key);
            } else {
                falseIndex.push(i);
            }
        }
        return { keyArray, falseIndex };
    }

    createArraysOfValues(data: string, falseIndex: number[]): string[][] {
        let numberOfDataRows = (data.match(/\n/g) || []).length;
        let fullDataArray = [];

        for (let i = 1; i < numberOfDataRows; i++) {
            let dataRow = data.split('\n')[i];
            let dataRowLenght = (dataRow.match(/\t/g) || []).length + 1;
            let oneRowArray = [];
            for (let j = 0; j < dataRowLenght; j++) {
                let data = dataRow.split('\t')[j];
                let pdata = this.detectType(data);
                if (!falseIndex.includes(j)) {
                    oneRowArray.push(pdata);
                }
            }
            fullDataArray.push(oneRowArray);
        }
        return fullDataArray;
    }

    combineKeyValueArraysToJSON(keyArray: string[], dataArray: string[][]): object[] {
        return dataArray.map((row: any) => row.reduce((acc: any, cur: any, i: any) => ((acc[keyArray[i]] = cur), acc), {}));
    }

    // Function checks if string is proper JSON format
    isJSON(data: string): void {
        this.isJsonStr = this.isJsonString(data);
    }

    isJsonString(str: string): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    detectType(n: any) {
        //Is number
        if (!isNaN(parseFloat(n)) && isFinite(n)) {
            return +n;
        } else if (n.toLowerCase() === 'true') {
            return true;
        } else if (n.toLowerCase() === 'false') {
            return false;
        } else {
            return n;
        }
    }
}
