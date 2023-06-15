import { Injectable } from '@angular/core';

interface Settings {
    filter: boolean,
    sort: boolean,
    paginator: boolean,
    reorder: boolean,
    selection: boolean,
    sHeader: boolean,
    sFooter: boolean,
    sLeft: boolean,
    sRight: boolean,
    verticalLine: boolean,
    centerContent: boolean,
    headerSize: boolean,
    incJson: boolean,
    jsonAsFile: boolean,
    prefix: boolean,
    strict: boolean
}

interface ComponentName {
    name: string,
    prefix: string
}

@Injectable()
export class AngularMaterialHTML {
    createAngularMaterialHTMLTable(data: string, tableSettings: Settings, comName: ComponentName) {
        let JSONparsed: object[] = JSON.parse(data)
        let keysArray: string[] = Object.keys(JSONparsed[0])
        /* let htmlArray: string = this.createHTMLarray(keysArray); */
        
        let sort = tableSettings.sort ? ' matSort' : '';
        let reorder = tableSettings.reorder ? ` cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="drop($event)"` : ''
        let drag = (tableSettings.reorder?` cdkDrag`:'')
        let stickyHeader = (tableSettings.sHeader?`; sticky: true`:'')
        let stickyFooter = (tableSettings.sFooter?`\n\t\t<tr mat-footer-row *matFooterRowDef="columns; sticky: true"></tr>`:'')
        let ngStickyFooter = (tableSettings.sFooter?`\n\t\t\t<td mat-footer-cell *matFooterCellDef> Total </td>`:'')
        let stickyleft = (tableSettings.selection && tableSettings.sLeft?` sticky`:'')

        let startDiv = `<div class="myTable">\n`
        let filter = tableSettings.filter ? `\t<mat-form-field>\n\t\t<mat-label>Filter</mat-label>\n\t\t<input matInput (keyup)="applyFilter($event)" placeholder="Ex. ium" #input>\n\t</mat-form-field>\n` : ''
        let openTable = `\t<table mat-table [dataSource]="dataSource" class="mat-elevation-z8"${sort}${reorder}>`
        let ngSelect = tableSettings.selection ? `\n\t\t<ng-container matColumnDef="select"${stickyleft}>\n\t\t\t<th mat-header-cell *matHeaderCellDef${drag}>\n\t\t\t\t<mat-checkbox (change)="$event ? masterToggle() : null"\n\t\t\t\t\t[checked]="selection.hasValue() && isAllSelected()"\n\t\t\t\t\t[indeterminate]="selection.hasValue() && !isAllSelected()"\n\t\t\t\t\t[aria-label]="checkboxLabel()">\n\t\t\t\t</mat-checkbox>\n\t\t\t</th>\n\t\t\t<td mat-cell *matCellDef="let row">\n\t\t\t\t<mat-checkbox (click)="$event.stopPropagation()"\n\t\t\t\t\t(change)="$event ? selection.toggle(row) : null"\n\t\t\t\t\t[checked]="selection.isSelected(row)"\n\t\t\t\t\t[aria-label]="checkboxLabel(row)">\n\t\t\t\t</mat-checkbox>\n\t\t\t</td>${ngStickyFooter}\n\t\t</ng-container>`:''    
        let closeTable = `\n\t</table>`
        let filterNoMatch = tableSettings.filter ? `\n\t\t<tr class="mat-row" *matNoDataRow>\n\t\t\t<td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>\n\t\t</tr>` : ''
        let headerRowDef = `\n\t\t<tr mat-header-row *matHeaderRowDef="columns${stickyHeader}"></tr>\n\t\t<tr mat-row *matRowDef="let row; columns: columns;"></tr>${stickyFooter}`
        let paginator = tableSettings.paginator ? `\n\t<mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>` : ''
        let endDiv = `\n</div>`

        let ngContainer: string = this.ngContainers(keysArray, tableSettings) 
        let tscode = this.returnTypeScript(tableSettings, comName, JSONparsed)
        let csscode = this.returnCSS(tableSettings)

        let html = `\n\n`+startDiv + filter + openTable + ngSelect + ngContainer + headerRowDef + filterNoMatch + closeTable + paginator + endDiv;
        return {html, tscode, csscode}
    
    }

    //  Function creates array structure to be used in HTML for Angular Material
    createHTMLarray(array: string[]): string {
        let string = ``;
        for (let i = 0; i < array.length; i++) {
            let startString;
            if(array.length-1 === i) {
                startString = `'${array[i]}'`;
            } else {
                startString = `'${array[i]}',`;
            }
            string = string + startString
        }
        return string
    }

    ngContainers(headerArray: string[], settings: Settings): string {
        let stringArray = ``
        
        for (let i = 0; i < headerArray.length; i++) {
            let prettyHeader = headerArray[i].replace(/_/g, ' ').replace(/-/g, ' ').trim()
            let colName = prettyHeader.charAt(0).toUpperCase() + prettyHeader.slice(1)
            let stickyFooter = ((settings.sFooter && i === 0)?`\n\t\t\t<td mat-footer-cell *matFooterCellDef> Total </td>`:'') + ((settings.sFooter && i !== 0)?`\n\t\t\t<td mat-footer-cell *matFooterCellDef></td>`:'')
            let specialSticky = settings.selection ? ((settings.sFooter)?`\n\t\t\t<td mat-footer-cell *matFooterCellDef></td>`:'') : stickyFooter;
            let stickyLeft = (( !settings.selection && settings.sLeft && i === 0) ? ' sticky' : '');
            let stickyRight = ((settings.sRight && i === headerArray.length-1) ? ' stickyEnd' : '');


            let startString = `\n\t\t<ng-container matColumnDef="${headerArray[i]}"${stickyLeft}${stickyRight}>\n\t\t\t<th mat-header-cell *matHeaderCellDef${(settings.sort? ' mat-sort-header' :'')}${(settings.reorder?` cdkDrag`:'')}> ${colName} </th>\n\t\t\t<td mat-cell *matCellDef="let `+ (settings.selection? 'element' :'row') +`"> {{`+ (settings.selection? 'element' :'row') +`.${headerArray[i]}}} </td>${specialSticky}\n\t\t</ng-container>`;

            stringArray = stringArray + startString

        }
        return stringArray
    }


    /***************************************************************************************************************** */
    /***************************************    TYPESCRIPT PART     ************************************************** */

    returnTypeScript(tableSet: Settings, componentName: ComponentName, data: any): any {
        let keysArray: string[] = Object.keys(data[0])
        let keysArrayString = this.createHTMLarray(keysArray)

        let comName = this.nameComponent(tableSet, componentName)

        let core = {
            iViewChild: ((tableSet.sort || tableSet.paginator)? ', ViewChild':''),
            afterViewInit: ((tableSet.sort || tableSet.paginator)? ', AfterViewInit':'')
        }

        let impSet = {
            component: `import { Component, OnInit${core.iViewChild}${core.afterViewInit} } from '@angular/core';\n`,
            matDataTable: `import { MatTableDataSource } from '@angular/material/table';\n`,
            sort: `import { MatSort } from '@angular/material/sort';\n`,
            paginator: `import { MatPaginator } from '@angular/material/paginator';\n`,
            reorder: `import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';\n`,
            selection: `import { SelectionModel } from '@angular/cdk/collections';\n`,
            jsonAsFile: `import { data } from './mockData.json';\n`
        }

        let viewChilds = {
            paginator: `\t@ViewChild(MatPaginator) paginator`+(tableSet.strict? '!' :'')+`: MatPaginator;\n`,
            sort: `\t@ViewChild(MatSort) sort`+(tableSet.strict? '!' :'')+`: MatSort;\n` 
        }

        let ngAfterView = {
            sort: `\t\tthis.dataSource.sort = this.sort;\n`,
            paginator: `\t\tthis.dataSource.paginator = this.paginator;\n`
        }

        let declares = {
            dataSource: `\tdataSource = new MatTableDataSource(mockData);\n`,
            columns: `\tcolumns: string[] = [${(tableSet.selection?`'select', `:'')}${keysArrayString}];\n`,
            selection: `\tselection = new SelectionModel<any>(true, []);\n`,
        }
        
        

        let paginatorAddon = `\n\n\t\tif (this.dataSource.paginator) {\n\t\t\tthis.dataSource.paginator.firstPage();\n\t\t}`

        let imports = impSet.component + impSet.matDataTable + (tableSet.sort?impSet.sort:'') + (tableSet.paginator?impSet.paginator:'') + (tableSet.reorder?impSet.reorder:'') + (tableSet.selection?impSet.selection:'') + (tableSet.jsonAsFile?impSet.jsonAsFile:'') + `\n`;

        let mockData2 = tableSet.incJson?`const mockData: any = ${JSON.stringify(data, undefined, 4)}\n\n`:`const mockData: any = []        /* <----  Place your JSON structure here */\n\n`
        let mockData = tableSet.jsonAsFile?`const mockData: any = data\n\n`: mockData2
        let component = `@Component({\n\t`+comName.selector+`\n\t`+comName.templater+`\n\t`+comName.styleUrl+`\n})\n\n`
        let expclass = `export class `+ comName.className + ` implements OnInit`+ ((tableSet.sort || tableSet.paginator)?', AfterViewInit':'') +` {\n\n`

        let viewChild = (tableSet.sort?(viewChilds.sort):'') + (tableSet.paginator?(viewChilds.paginator):'') + ((tableSet.sort || tableSet.paginator)?`\n`:'')
        let declare = declares.columns + declares.dataSource + (tableSet.selection?(declares.selection):'')

        let constructor = `\n\tconstructor() {}\n`
        let onInit = `\n\tngOnInit(): void {}\n`
        
        let ngAfterViewInit = ((tableSet.sort || tableSet.paginator)? `\n\tngAfterViewInit() {\n`+(tableSet.sort?ngAfterView.sort :'') + (tableSet.paginator?ngAfterView.paginator :'')+`\t}\n`:'')
        let filterFunction = `\tapplyFilter(event: Event) {\n\t\tconst filterValue = (event.target as HTMLInputElement).value;\n\t\tthis.dataSource.filter = filterValue.trim().toLowerCase();`+(tableSet.paginator?paginatorAddon:'') + `\n\t}\n`
        let dragFunction = `\tdrop(event: CdkDragDrop<string[]>) {\n\t\tmoveItemInArray(this.columns, event.previousIndex, event.currentIndex);\n\t}\n`
        let selectFunctions = `\tisAllSelected() {\n\t\tconst numSelected = this.selection.selected.length;\n\t\tconst numRows = this.dataSource.data.length;\n\t\treturn numSelected === numRows;\n\t}\n\n\tmasterToggle() {\n\t\tthis.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));\n\t}\n\n\tcheckboxLabel(row?: any): string {\n\t\tif (!row) {\n\t\t\t`+'return `${this.isAllSelected() ?'+`'select' : 'deselect'}`+' all;`'+`\n\t\t}\n\t\t`+'return `${this.selection.isSelected(row) ? '+`'deselect' : 'select'} row`+' ${row.position + 1}`;'+`\n\t}\n`

        let functions = ((tableSet.filter || tableSet.reorder || tableSet.selection)?((tableSet.filter?`\n`+filterFunction:'')+(tableSet.reorder?`\n`+dragFunction :'')+(tableSet.selection?`\n`+selectFunctions :'')+`\n`):'')

        let end =`}`

        let fullString = `\n\n`+imports + mockData + component + expclass + viewChild + declare + constructor + onInit + ngAfterViewInit + functions + end

        return fullString;
        
    }

    nameComponent(tableSet: Settings, comp:ComponentName) {
        console.log(`AngularMaterialHTML > nameComponent > tableSet:`, tableSet)
        console.log(tableSet.prefix)
        const capitalValue = comp.name.charAt(0).toUpperCase() + comp.name.slice(1)
        console.log(`AngularMaterialHTML > nameComponent > capitalValue:`, capitalValue)
        let prefix = tableSet.prefix ? (comp.prefix)+'-' : ''
        console.log(`AngularMaterialHTML > nameComponent > prefix:`, prefix)


        let component = {
            selector: `selector: '${prefix}${comp.name}',`,
            templater: `templateUrl: './${comp.name}.component.html',`,
            styleUrl: `styleUrls: ['./${comp.name}.component.scss']`,
            className: `${capitalValue}Component`
        }

        return component

    }

    /***************************************************************************************************************** */
    /**********************************************    CSS PART     ************************************************** */

    returnCSS(tableSet: Settings): any {
        let matCel = {
            textAllign: (tableSet.centerContent?`\n\t\ttext-align: center;`:''),
            vBorder: (tableSet.verticalLine?`\n\t\tborder-right: 1px solid #e0e0e0;`:'')
        }

        let matHeaderCel = {
            font: (tableSet.headerSize?`\n\t\tfont-size: 16px;`:''),
            textAllign: (tableSet.centerContent?`\n\t\ttext-align: center;`:''),
            vBorder: (tableSet.verticalLine?`\n\t\tborder-right: 1px solid #e0e0e0;`:'')
        }

        let myTableSet = {
            height:((!(tableSet.paginator) && (tableSet.sFooter || tableSet.sHeader))?`\n\theight: 400px;`:''),
            width: (tableSet.sLeft || tableSet.sRight?`\n\twidth: 750px;`:`\n\twidth: 90%;`),
            maxWidth: `\n\tmax-width: 100%;`,
            overflow: `\n\toverflow: auto;`
        }

        let trueCenter = (tableSet.sort && tableSet.centerContent?`\n\n\t::ng-deep .mat-sort-header-container {\n\t\tjustify-content: center;\n\t\tleft: 10px;\n\t}`:'')
        
        
        let table = (tableSet.sLeft || tableSet.sRight?`\n\ttable {\n\t\twidth: 1100px;\n\t}`:`\n\ttable {\n\t\twidth: 100%;\n\t}`)
        
        let matHeaderCell = (tableSet.verticalLine || tableSet.centerContent || tableSet.headerSize?`\n\n\t.mat-header-cell {${matHeaderCel.font}${matHeaderCel.textAllign}${matHeaderCel.vBorder}\n\t}`:'')
        let matCell = (tableSet.verticalLine || tableSet.centerContent?`\n\n\t.mat-cell {${matCel.textAllign}${matCel.vBorder}\n\t}`:'')
        let matFormField = (tableSet.filter?`\n\n\t.mat-form-field {\n\t\tfont-size: 16px;\n\t\twidth: 20%;\n\t}`:'')

        let css = `\n\n.myTable {${myTableSet.height}${myTableSet.width}${myTableSet.maxWidth}${myTableSet.overflow}\n${table}${matHeaderCell}${matCell}${trueCenter}${matFormField}\n}`

        
        return css
    }
}
