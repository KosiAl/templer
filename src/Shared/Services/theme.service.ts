import { Injectable, signal } from '@angular/core';
import { colorList } from '../../Shared/Services/colors';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    colorList = colorList;

    themeColor$ = signal('blue');
    themeMode$ = signal('dark');

    dom: any;

    setThemeColor(color: string) {
        this.themeColor$.set(color);
    }
    setThemeMode(theme: string) {
        this.themeMode$.set(theme);
    }

    loadTheme(dom: any) {
        this.saveDom(dom);
        let themeColor = localStorage.getItem('themeColor');
        if (themeColor) {
            this.changeThemeColor(themeColor);
        } else {
            this.changeThemeColor('theme-blue');
        }

        let themeMode = localStorage.getItem('themeMode');
        if (themeMode) {
            if (themeMode === 'dark') {
                this.setDarkTheme();
            } else {
                this.setLightTheme();
            }
        } else {
            this.setLightTheme();
        }
    }

    switchThemeMode() {
        if (this.themeMode$() === 'dark') {
            this.setLightTheme();
        } else {
            this.setDarkTheme();
        }
    }

    saveDom(dom: any) {
        this.dom = dom;
    }

    setLightTheme() {
        this.dom.removeClass(document.body, 'dark');
        this.dom.removeClass(document.body, 'bgDark');
        this.dom.addClass(document.body, 'bgLight');
        localStorage.setItem('themeMode', 'light');
        this.setThemeMode('light');
    }
    setDarkTheme() {
        this.dom.removeClass(document.body, 'bgLight');
        this.dom.addClass(document.body, 'dark');
        this.dom.addClass(document.body, 'bgDark');
        localStorage.setItem('themeMode', 'dark');
        this.setThemeMode('dark');
    }

    changeThemeColor(upcomingTheme: string) {
        const body = document.getElementsByTagName('body')[0].classList;
        const currentTheme = Array.from(body).find((item) => item.startsWith('theme-')) || 'theme-blue';

        this.dom.removeClass(document.body, currentTheme);
        this.dom.addClass(document.body, upcomingTheme);

        /* SAVE CURRENT THEME TO BROWSER */
        localStorage.setItem('themeColor', upcomingTheme);
        this.setThemeColor(upcomingTheme);
       /*  this.setContrastForPrimaryButtons(upcomingTheme); */
    }

    getCurrentThemeColor(currentTheme: string) {
        let colorName = currentTheme.split('theme-')[1];
        let color = this.colorList.find((color) => color.name === colorName);
        let currentColor = color?.hex ? color.shades[4].hex : '#3b82f6';
        return currentColor;
    }

    setContrastForPrimaryButtons(themeColor:string) {
        const buttons = Array.from(document.querySelectorAll('button'));

        const primaryButtons = buttons.filter(button =>
            Array.from(button.classList).some(className => className.includes('primary')) && !button.disabled
          );

        primaryButtons.forEach((button) => {
            // check if button element is disabled
            if (button.disabled) {
                console.log("disalbed")
            }
        });

        let hexColorString = this.getCurrentThemeColor(themeColor);

        primaryButtons.forEach((button) => {
            // Remove the '#' from the start of the string
            const hex = hexColorString.substring(1);

            // Convert the hexadecimal color to RGB
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            // Calculate the brightness of the color using the YIQ formula
            const yiq = (r * 299 + g * 587 + b * 114) / 1000;

            // If the color is bright, set text color to 'black'. If the color is dark, set text color to 'white'.
            button.style.color = yiq >= 128 ? 'black' : 'white';
        });
    }

    /* UNUSED */
    colorBrightness(color: string) {
        const hex = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || '';
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);
        return brightness;
    }
}
