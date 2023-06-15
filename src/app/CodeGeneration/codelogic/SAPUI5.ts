import { Injectable } from '@angular/core';

@Injectable()
export class SAPUI5HTML {

    createSAPUI5HTMLTable(data:any) {
        let JSONparsed: object[]  = JSON.parse(data)

        let imports = `<!-- IMPORTS -->\nxmlns:mvc="sap.ui.core.mvc"\nxmlns="sap.m"\nxmlns:form="sap.ui.layout.form"\nxmlns:core="sap.ui.core"\nxmlns:table="sap.ui.table"\nxmlns:f="sap.f"\n<!-- IMPORTS -->\n\n\n`

        let open = {
            page: `<f:DynamicPage>`,
            content: `\n\t<f:content>`,
            table: `\n\t\t<table:Table id="myTable"\n\t\t\trows="{oDataModel>/}"\n\t\t\tvisibleRowCountMode="Auto"\n\t\t\tenableCellFilter="true"\n\t\t\trowHeight="48"\n\t\t\talternateRowColors="true"\n\t\t\tselectionMode="MultiToggle"\n\t\t\tshowColumnVisibilityMenu="true">`,
            extensionFull:`\n\t\t\t<table:extension>\n\t\t\t\t<Bar>\n\t\t\t\t\t<contentLeft>\n\t\t\t\t\t\t<Button icon="sap-icon://action-settings"\n\t\t\t\t\t\ttooltip="Tooltip"/>\n\t\t\t\t\t</contentLeft>\n\t\t\t\t</Bar>\n\t\t\t</table:extension>`,
            columns:`\n\t\t\t<table:columns>`
        }

        let dynamic = {
            column:``,
        }

        let close = {
            page: `\n</f:DynamicPage>`,
            content: `\n\t</f:content>`,
            table: `\n\t\t</table:Table>`,
            columns:`\n\t\t\t</table:columns>`
        }

        let keyArray: string[] = Object.keys(JSONparsed[0])

        dynamic.column = this.constuctTableColums(keyArray)

        let angularhtml = imports + open.page + open.content + open.table + open.extensionFull + open.columns + dynamic.column + close.columns + close.table + close.content + close.page;

        return angularhtml
    }

    constuctTableColums(keysArry: string[]): string {
        let stringArray = ``

        for (let i = 0; i < keysArry.length; i++) {
            let string = `\n\t\t\t\t<table:Column\n\t\t\t\t\tautoResizable="true"\n\t\t\t\t\tfilterProperty="${keysArry[i]}"\n\t\t\t\t\tsortProperty="${keysArry[i]}">\n\t\t\t\t\t<Label text="${keysArry[i]}" />\n\t\t\t\t\t<table:template >\n\t\t\t\t\t\t<Text text="{oDataModel>${keysArry[i]}}" />\n\t\t\t\t\t</table:template>\n\t\t\t\t</table:Column>`;         
            stringArray = stringArray+string
        }
        return stringArray
    }
}
