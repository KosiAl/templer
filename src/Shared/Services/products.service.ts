import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private products = [
        {
            productId: 1002,
            productCategory: 'Category 1',
            productName: 'Product 2',
            productImage: 'https://picsum.photos/400?image=279',
            productStock: false,
            productPrice: '1722.438',
        },
        {
            productId: 1003,
            productCategory: 'Category 1',
            productName: 'Product 3',
            productImage: 'https://picsum.photos/400?image=995',
            productStock: true,
            productPrice: '2733.657',
        },
        {
            productId: 1004,
            productCategory: 'Category 3',
            productName: 'Product 4',
            productImage: 'https://picsum.photos/400?image=216',
            productStock: false,
            productPrice: '3740.660',
        },
        {
            productId: 1005,
            productCategory: 'Category 1',
            productName: 'Product 5',
            productImage: 'https://picsum.photos/400?image=835',
            productStock: true,
            productPrice: '1343.701',
        },
        {
            productId: 1006,
            productCategory: 'Category 3',
            productName: 'Product 6',
            productImage: 'https://picsum.photos/400?image=278',
            productStock: true,
            productPrice: '2389.455',
        },
        {
            productId: 1007,
            productCategory: 'Category 1',
            productName: 'Product 7',
            productImage: 'https://picsum.photos/400?image=982',
            productStock: true,
            productPrice: '1149.221',
        },
        {
            productId: 1008,
            productCategory: 'Category 1',
            productName: 'Product 8',
            productImage: 'https://picsum.photos/400?image=886',
            productStock: true,
            productPrice: '1583.470',
        },
        {
            productId: 1009,
            productCategory: 'Category 2',
            productName: 'Product 9',
            productImage: 'https://picsum.photos/400?image=220',
            productStock: true,
            productPrice: '1733.948',
        },
        {
            productId: 1010,
            productCategory: 'Category 2',
            productName: 'Product 10',
            productImage: 'https://picsum.photos/400?image=534',
            productStock: true,
            productPrice: '3170.041',
        },
        {
            productId: 1011,
            productCategory: 'Category 2',
            productName: 'Product 11',
            productImage: 'https://picsum.photos/400?image=278',
            productStock: true,
            productPrice: '3444.113',
        },
        {
            productId: 1012,
            productCategory: 'Category 3',
            productName: 'Product 12',
            productImage: 'https://picsum.photos/400?image=978',
            productStock: true,
            productPrice: '2611.378',
        },
        {
            productId: 1013,
            productCategory: 'Category 1',
            productName: 'Product 13',
            productImage: 'https://picsum.photos/400?image=407',
            productStock: false,
            productPrice: '2519.078',
        },
        {
            productId: 1014,
            productCategory: 'Category 3',
            productName: 'Product 14',
            productImage: 'https://picsum.photos/400?image=477',
            productStock: true,
            productPrice: '2555.414',
        },
        {
            productId: 1015,
            productCategory: 'Category 2',
            productName: 'Product 15',
            productImage: 'https://picsum.photos/400?image=798',
            productStock: false,
            productPrice: '3383.299',
        },
        {
            productId: 1016,
            productCategory: 'Category 2',
            productName: 'Product 16',
            productImage: 'https://picsum.photos/400?image=936',
            productStock: false,
            productPrice: '2603.676',
        },
        {
            productId: 1017,
            productCategory: 'Category 4',
            productName: 'Product 17',
            productImage: 'https://picsum.photos/400?image=331',
            productStock: true,
            productPrice: '2806.380',
        },
        {
            productId: 1018,
            productCategory: 'Category 4',
            productName: 'Product 18',
            productImage: 'https://picsum.photos/400?image=565',
            productStock: true,
            productPrice: '1368.135',
        },
        {
            productId: 1019,
            productCategory: 'Category 1',
            productName: 'Product 19',
            productImage: 'https://picsum.photos/400?image=518',
            productStock: true,
            productPrice: '3489.639',
        },
        {
            productId: 1020,
            productCategory: 'Category 2',
            productName: 'Product 20',
            productImage: 'https://picsum.photos/400?image=542',
            productStock: true,
            productPrice: '1612.593',
        },
    ];
    //private products = [{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" }, { "productId": 1003, "productCategory": "Category 1", "productName": "Product 3", "productImage": "https://picsum.photos/400?image=995", "productStock": true, "productPrice": "2733.657" }, { "productId": 1004, "productCategory": "Category 3", "productName": "Product 4", "productImage": "https://picsum.photos/400?image=216", "productStock": false, "productPrice": "3740.660" }, { "productId": 1005, "productCategory": "Category 1", "productName": "Product 5", "productImage": "https://picsum.photos/400?image=835", "productStock": true, "productPrice": "1343.701" }, { "productId": 1006, "productCategory": "Category 3", "productName": "Product 6", "productImage": "https://picsum.photos/400?image=278", "productStock": true, "productPrice": "2389.455" }, { "productId": 1007, "productCategory": "Category 1", "productName": "Product 7", "productImage": "https://picsum.photos/400?image=982", "productStock": true, "productPrice": "1149.221" }, { "productId": 1008, "productCategory": "Category 1", "productName": "Product 8", "productImage": "https://picsum.photos/400?image=886", "productStock": true, "productPrice": "1583.470" }, { "productId": 1009, "productCategory": "Category 2", "productName": "Product 9", "productImage": "https://picsum.photos/400?image=220", "productStock": true, "productPrice": "1733.948" }, { "productId": 1010, "productCategory": "Category 2", "productName": "Product 10", "productImage": "https://picsum.photos/400?image=534", "productStock": true, "productPrice": "3170.041" }, { "productId": 1011, "productCategory": "Category 2", "productName": "Product 11", "productImage": "https://picsum.photos/400?image=278", "productStock": true, "productPrice": "3444.113" }, { "productId": 1012, "productCategory": "Category 3", "productName": "Product 12", "productImage": "https://picsum.photos/400?image=978", "productStock": true, "productPrice": "2611.378" }, { "productId": 1013, "productCategory": "Category 1", "productName": "Product 13", "productImage": "https://picsum.photos/400?image=407", "productStock": false, "productPrice": "2519.078" }, { "productId": 1014, "productCategory": "Category 3", "productName": "Product 14", "productImage": "https://picsum.photos/400?image=477", "productStock": true, "productPrice": "2555.414" }, { "productId": 1015, "productCategory": "Category 2", "productName": "Product 15", "productImage": "https://picsum.photos/400?image=798", "productStock": false, "productPrice": "3383.299" }, { "productId": 1016, "productCategory": "Category 2", "productName": "Product 16", "productImage": "https://picsum.photos/400?image=936", "productStock": false, "productPrice": "2603.676" }, { "productId": 1017, "productCategory": "Category 4", "productName": "Product 17", "productImage": "https://picsum.photos/400?image=331", "productStock": true, "productPrice": "2806.380" }, { "productId": 1018, "productCategory": "Category 4", "productName": "Product 18", "productImage": "https://picsum.photos/400?image=565", "productStock": true, "productPrice": "1368.135" }, { "productId": 1019, "productCategory": "Category 1", "productName": "Product 19", "productImage": "https://picsum.photos/400?image=518", "productStock": true, "productPrice": "3489.639" }, { "productId": 1020, "productCategory": "Category 2", "productName": "Product 20", "productImage": "https://picsum.photos/400?image=542", "productStock": true, "productPrice": "1612.593" }];
    //private products = [{ "productId": 1002, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1222, "productCategory": "Category 1", "productName": "Product 2", "productImage": "https://picsum.photos/400?image=279", "productStock": false, "productPrice": "1722.438" },{ "productId": 1020, "productCategory": "Category 2", "productName": "Product 20", "productImage": "https://picsum.photos/400?image=542", "productStock": true, "productPrice": "1612.593" }];

    constructor() {}

    getProducts() {
        return this.products;
    }
}
