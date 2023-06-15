import { Injectable } from '@angular/core';

interface Settings {
    filter: boolean,
    sort: boolean,
    paginator: boolean,
    prefix: boolean
}

interface ComponentName {
    name: string,
    prefix: string
}

@Injectable()
export class ngBootstrap {
    createNgBootstrap(data: string, tableSettings: Settings, comName: ComponentName) {
        let html = 'testhtml'
        let tscode = 'testtes'
        let csscode = 'testcss'

        return {html, tscode, csscode}
    }

}