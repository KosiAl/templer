import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { FontMontserrat } from './font';

@Injectable({
    providedIn: 'root',
})
export class PdfPrintService {
    constructor(public fontStyle: FontMontserrat) {}

    addFonts() {
        // Set Font for jsPDF
        let fonts = this.fontStyle.getFonts();
        fonts.forEach((font) => {
            function callAddFont() {
                //@ts-ignore
                this.addFileToVFS(font.addFileToVFS, font.font);
                //@ts-ignore
                this.addFont(font.addFontP1, font.addFontP2, font.addFontP3);
            }
            jsPDF.API.events.push(['addFonts', callAddFont]);
        });
    }

    downloadPDF(info: any) {
        // POSITION SETTINGS
        // Column x position
        let colX = {
            itemName: 20,
            price: 125,
            quantity: 155,
            total: 178,
        };
        let rowX = {
            itemName: 20,
            price: 125,
            quantity: 155,
            total: 178,
        };

        // Add fonts to jsPDF
        this.addFonts();
        // Initialize jsPDF
        let doc = new jsPDF();

        // INVOICE HEADER
        doc.setFontSize(24);
        doc.setTextColor(110);
        doc.setFont('Montserrat-Bold', 'bold');
        doc.text('INVOICE', 20, 20);

        doc.setTextColor(0);
        doc.setFont('Montserrat-Light', 'light');
        doc.text('#' + info.orderId, 65, 20);

        // INVOIDE DETAILS
        doc.setFont('Montserrat-Normal', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(90);
        doc.text('INVOICE DATE:', 20, 30);
        doc.setTextColor(0);
        doc.text(info.date, 65, 30);

        doc.setTextColor(90);
        doc.text('DUE DATE:', 20, 36);
        doc.setTextColor(0);
        doc.text('Aug 19, 2022', 65, 36);

        doc.setTextColor(90);
        doc.text('TOTAL DUE:', 20, 42);
        doc.setTextColor(0);
        doc.text('235,000.00 €', 65, 42);

        // USER DETAILS
        doc.setFontSize(12);
        doc.setFont('Montserrat-Normal', 'normal');
        doc.text(info.customer.name, 20, 60);
        doc.setFontSize(12);
        doc.setFont('Montserrat-Light', 'light');
        doc.setTextColor(50);
        doc.text(info.customer.address, 20, 67);
        doc.text(info.customer.email, 20, 74);
        doc.text(info.customer.phone, 20, 81);

        // Black sqaure with rounded corners
        doc.setDrawColor(0);
        doc.setFillColor(15, 23, 42);
        doc.roundedRect(140, 21, 120, 50, 3, 3, 'FD');

        // INFO INSIDE BLACK Sqare
        doc.setTextColor(255);
        doc.setFontSize(12);
        doc.setFont('Montserrat-Normal', 'normal');
        doc.text('Fuse Inc.', 150, 30);
        doc.setFontSize(12);
        doc.setFont('Montserrat-Light', 'light');
        doc.text('2810 Country Club Road', 150, 37);
        doc.text('Cranford, NJ 07016', 150, 44);
        doc.text('+66 123 455 87', 150, 51);
        doc.text('hello@fuseinc.com', 150, 58);
        doc.text('www.fuseinc.com', 150, 65);

        // TABLE ROWS
        doc.setFontSize(12);
        doc.setFont('Montserrat-Normal', 'normal');
        doc.setTextColor(90);
        doc.text('ITEM', colX.itemName, 100);
        doc.text('PRICE', colX.price, 100);
        doc.text('QTY', colX.quantity, 100);
        doc.text('TOTAL', colX.total, 100);

        // LINE CONFIGURATION
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);

        // Check if multi page PDF is needed
        let isMultiPage = false;
        if (info.products.length > 8) {
            isMultiPage = true;
        }
        // FinalHight is needed to properly add content after dynamic table height
        let finalHight = 0;

        // Proces for multipage or single page table generation
        // Functions generate new pages when table is too long and returns final height so that content can be added after table
        if (isMultiPage) {
            finalHight = this.generateMultiPDFPage(doc, info.products, finalHight, rowX);
        } else {
            finalHight = this.generateSingePDFPage(doc, info.products, finalHight, rowX);
        }

        let orderTotalPrice = this.calcualteTotalOrderPrice(info.products);

        // CONTENT AFTER TABLE PRICE SUMMARY
        doc.setFontSize(12);
        doc.setFont('Montserrat-Normal', 'normal');
        doc.setTextColor(90);

        doc.text('SUBTOTAL', 20, finalHight + 10);
        doc.text(orderTotalPrice, rowX.total, finalHight + 10);
        doc.line(20, finalHight + 13, 194, finalHight + 13);

        doc.text('TAX', 20, finalHight + 20);
        doc.text('0 €', rowX.total, finalHight + 20);
        doc.line(20, finalHight + 23, 194, finalHight + 23);

        doc.text('DISCOUNT', 20, finalHight + 30);
        doc.text('0 €', rowX.total, finalHight + 30);
        doc.line(20, finalHight + 33, 194, finalHight + 33);

        doc.setTextColor(0);
        doc.setFontSize(14);
        doc.setFont('Montserrat-Bold', 'bold');
        doc.text('TOTAL', 20, finalHight + 40);
        doc.text(orderTotalPrice, rowX.total, finalHight + 40);

        // FOOTER TEXT
        doc.setFontSize(11);
        doc.text('Please pay within 15 days. Thank you for your business.', 20, finalHight + 63);
        doc.setFontSize(9);
        doc.setTextColor(90);
        doc.setFont('Montserrat-Normal', 'normal');
        doc.text('In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque scelerisque', 20, finalHight + 70);
        doc.text('lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit quam at leo commodo, a', 20, finalHight + 74);
        doc.text('suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia. Mauris placerat sem sit amet velit mollis,', 20, finalHight + 78);
        doc.text('in porttitor ex finibus. Proin eu nibh id libero tincidunt lacinia et eget.', 20, finalHight + 82);

        // SAVE PDF DOCUMENT AND DOWNLOAD
        doc.save('Test.pdf');
    }

    generateSingePDFPage(doc: any, products: any, finalHight: any, rowX: any) {
        let height = finalHight;
        products.forEach((product: any, i: number) => {
            let hightOffset = 100;
            height = this.addNewColumn(doc, i, hightOffset, product, rowX);
        });
        return height;
    }

    generateMultiPDFPage(doc: any, products: any, finalHight: any, rowX: any) {
        let indexAdjust = -1;
        let hightOffset = 100;
        let height = finalHight;
        products.forEach((product: any, i: number) => {
            indexAdjust = indexAdjust + 1;
            let newLineAdj = i + 1;
            height = this.addNewColumn(doc, indexAdjust, hightOffset, product, rowX);

            // SETTINGs FOR SKIPPING TO SECOND PAGE
            if (newLineAdj < 12 && newLineAdj > 8 && products.length === newLineAdj) {
                doc.addPage();
                finalHight = 0;
                height = 20;
                indexAdjust = 0;
                hightOffset = 0;
            } else if (i === 12) {
                doc.addPage();
                height = 20;
                finalHight = 0;
                indexAdjust = 0;
                hightOffset = 0;
            }

            let delitelj = indexAdjust % 20;
            let num = products.length - newLineAdj;

            // SETTINGs FOR SETTING PRELAST AND LAST PAGE
            if (newLineAdj > 15 && delitelj !== 0) {
                let freeSpaces = 20 - delitelj;
                if (num === 0 && freeSpaces < 6) {
                    doc.addPage();
                    finalHight = 0;
                    height = 20;
                    indexAdjust = 0;
                    hightOffset = 0;
                }
                // SETTOINGS FOR MIDDLE PAGES - full data
            } else if (delitelj == 0 && newLineAdj > 15) {
                doc.addPage();
                finalHight = 0;
                height = 20;
                indexAdjust = 0;
                hightOffset = 0;
            }
        });
        return height;
    }

    addNewColumn(doc: any, repetition: number, hightOffset: number, product: any, rowX: any) {
        // THIRD ROW
        let initialLineHeight = hightOffset + 5;
        let calculatedLineHight = initialLineHeight + repetition * 13;
        doc.line(20, calculatedLineHight, 194, calculatedLineHight);

        // TABLE COLUMNS
        let repAdjusted = repetition + 1;
        let defaultColHeight = hightOffset;
        doc.setFont('Montserrat-Normal', 'normal');
        doc.setTextColor(0);
        doc.text(product.name, rowX.itemName, defaultColHeight + repAdjusted * 13);
        doc.setFont('Montserrat-Light', 'light');
        doc.text(product.price + ' €', rowX.price, defaultColHeight + repAdjusted * 13);
        doc.text(product.quantity, rowX.quantity, defaultColHeight + repAdjusted * 13);
        let totalProductsPrice = this.calculateProductTotalPrice(product.price, product.quantity);
        doc.text(totalProductsPrice, rowX.total, defaultColHeight + repAdjusted * 13);
        return calculatedLineHight + 13;
    }

    calcualteTotalOrderPrice(products: any) {
        let totalPrice = 0;
        products.forEach((product: any) => {
            totalPrice = totalPrice + parseFloat(this.calculateProductTotalPrice(product.price, product.quantity));
        });
        return totalPrice.toString() + ' €';
    }

    calculateProductTotalPrice(price: string, quantity: string) {
        let total = parseFloat(price) * parseFloat(quantity);
        return total.toString() + ' €';
    }
}
