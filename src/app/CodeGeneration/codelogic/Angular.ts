import { Injectable } from '@angular/core';

interface Settings {
    prefix: boolean,
}

interface ComponentName {
    name: string,
    prefix: string
}

@Injectable()
export class AngularHTML {

    createAngularHTMLTable(data: string, tableSettings: Settings, comName: ComponentName) {
        let JSONparsed: object[]  = JSON.parse(data)

        let open = {
        table: `<table>`,
        header: `\n\t<thead>`,
        body: `\n\t<tbody>`
        }
        let close = {
        table: `\n</table>`,
        header: `\t</thead>`,
        body: `\t</tbody>`
        }

        let keyArray: string[] = Object.keys(JSONparsed[0])

        let headers: string = this.constuctTableHeaders(keyArray)
        let bodys: string = this.constructTableBody(keyArray)

        let html = `\n\n` + open.table + open.header + headers + close.header + open.body + bodys + close.body + close.table;

        let tscode = this.returnTypeScript(tableSettings, comName, JSONparsed)
        let csscode = '/* NOTHING TO IMPLEMENT */'

        return {html, tscode, csscode}



    }

    constuctTableHeaders(keysArry: string[]): string {
        let stringArray = ``

        for (let i = 0; i < keysArry.length; i++) {
            let startString = `\n\t\t<tr>\n\t\t\t<th>${keysArry[i]}</th>\n`;
            let normalString = `\t\t\t<th>${keysArry[i]}</th>\n`;
            let endString = `\t\t\t<th>${keysArry[i]}</th>\n\t\t</tr>\n`;
            let string = ``

            if(i === 0) {
                string = startString
            } else if (i === keysArry.length - 1) {
                string = endString
            } else {
                string = normalString
            }
            
            stringArray = stringArray+string
        }
        return stringArray
    }

    constructTableBody(headers: string[]): string {
        let stringArray = `\n\t\t<tr *ngFor = "let item of mockData">\n`
        let endString = `\t\t</tr>\n`
        let fillString = ``

        for (let i = 0; i < headers.length; i++) {
            let normalString = `\t\t\t<td>{{item.${headers[i]}}}</td>\n`;
            fillString = fillString+normalString
        }

        let fullString = stringArray + fillString + endString
        return fullString

    }

        /***************************************************************************************************************** */
    /***************************************    TYPESCRIPT PART     ************************************************** */

    returnTypeScript(tableSet: Settings, componentName: ComponentName, data: any): any {

        let comName = this.nameComponent(tableSet, componentName)


        let impSet = {
            component: `import { Component, OnInit } from '@angular/core';\n`
        }

        let imports = impSet.component + `\n`;

        let mockData = `\tmockData: any = []        /* <----  Place your JSON structure here */\n` 
        let component = `@Component({\n\t`+comName.selector+`\n\t`+comName.templater+`\n\t`+comName.styleUrl+`\n})\n\n`
        let expclass = `export class `+ comName.className + ` implements OnInit`+` {\n\n`

        let constructor = `\n\tconstructor() {}\n`
        let onInit = `\n\tngOnInit(): void {}\n`

        let end =`\n}`

        let fullString = imports + component + expclass + mockData + constructor + onInit + end

        return fullString;
        
    }

    nameComponent(tableSet: Settings, comp:ComponentName) {
        const capitalValue = comp.name.charAt(0).toUpperCase() + comp.name.slice(1)
        let prefix = tableSet.prefix ? (comp.prefix)+'-' : ''

        let component = {
            selector: `selector: '${prefix}${comp.name}',`,
            templater: `templateUrl: './${comp.name}.component.html',`,
            styleUrl: `styleUrls: ['./${comp.name}.component.scss']`,
            className: `${capitalValue}Component`
        }

        return component

    }

}
