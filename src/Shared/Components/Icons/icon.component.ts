import { Component, Input, OnInit, OnChanges, effect } from '@angular/core';
import { colorList, possibleColors } from '../../Services/colors';
import { ThemeService } from '../../Services/theme.service';

type tEmpty = '';
type tSizes = tEmpty | 'lg' | 'sm';
type tShape = tEmpty | 'rounded' | 'circle';
type nShades = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type sShades = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type tShades = nShades | sShades;

type IconNames =
    | tEmpty
    | 'add'
    | 'edit'
    | 'delete'
    | 'select'
    | 'location'
    | 'camera'
    | 'copy'
    | 'minus'
    | 'addProduct'
    | 'download'
    | 'theme'
    | 'test'
    | 'settings'
    | 'invoice'
    | 'orders'
    | 'products'
    | 'help'
    | 'logout'
    | 'burger'
    | 'close'
    | 'warn'
    | 'rightArrow'
    | 'home';
type IconPrefix = tEmpty | 'i-' | 'ir-' | 'ic-';
type DynamicIcons = {
    [P in IconPrefix]: {
        [N in IconNames]: `${P}${N}`;
    };
}[IconPrefix][IconNames];

@Component({
    selector: 'icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit, OnChanges {
    @Input() name: DynamicIcons = '';
    @Input() isSelected: boolean = false;
    @Input() color: possibleColors = '';
    @Input() shape: tShape = '';
    @Input() size: tSizes = '';
    @Input() navMode: boolean = false;
    @Input() themeInput = '';

    theme = 'light';
    isInteractive = false;
    hoverEffect = '';

    backgroundColor = '#000000';
    iconColor = '#000000';
    iconColorHover = '#000000';

    frameStyle: any = {};
    iconStyle: any = {};

    constructor(public themeService: ThemeService) {
        effect(() => {
            if (this.themeInput === '') {
                this.theme = this.themeService.themeMode$();
                this.drawIcons();
            }
        });
    }

    ngOnInit() {
        this.drawIcons();
    }

    ngOnChanges() {
        if (this.themeInput !== '') {
            this.theme = this.themeInput;
            this.drawIcons();
        }
        this.assignIconRole();
        this.applyPreconfiguredColorsToSpecialIcons();
        if (this.navMode || (this.isInteractive && this.isSelected) || (this.isInteractive && !this.isSelected)) {
            this.drawIcons();
        }
    }

    drawIcons() {
        this.createIconFrame();
        this.createIcon();
        /* this.logAll(); */
    }

    logAll() {
        console.log('*************************************');
        console.log('this.name', this.name);
        console.log('this.isSelected', this.isSelected);
        console.log('COLOR', this.color);
        console.log('SHAPE', this.shape);
        console.log('SIZE', this.size);
        console.log('THEME', this.theme);
        console.log('this.isisInteractive', this.isInteractive);
        console.log('*************************************');
        console.log('');
        console.log('');
    }

    assignIconRole() {
        if (this.name.includes('i-')) {
            let iconName = this.name.replace('i-', '');
            this.name = iconName as DynamicIcons;
            this.isInteractive = true;
        } else if (this.name.includes('ic-')) {
            let iconName = this.name.replace('ic-', '');
            this.name = iconName as DynamicIcons;
            this.isInteractive = true;
            this.hoverEffect = 'c';
        } else if (this.name.includes('ir-')) {
            let iconName = this.name.replace('ir-', '');
            this.name = iconName as DynamicIcons;
            this.isInteractive = true;
            this.hoverEffect = 'r';
        } else {
            this.isInteractive = this.isInteractive;
        }
    }

    applyPreconfiguredColorsToSpecialIcons() {
        if (this.color === '') {
            this.color = 'gray';
        }
        if (this.color === 'gray' && this.isInteractive) {
            if (this.name === 'add' || this.name === 'select') {
                this.color = 'green';
            } else if (this.name === 'delete') {
                this.color = 'red';
            } else if (this.name === 'edit') {
                this.color = 'blue';
            }
        }
    }

    deleteAllKeys(obj: any) {
        Object.keys(obj).forEach((key) => {
            delete obj[key];
        });
    }

    createIconFrame() {
        this.deleteAllKeys(this.frameStyle);
        let className;
        if (this.theme === 'light') {
            this.backgroundColor = this.tailwindToHex(this.color, 200);
        } else {
            this.backgroundColor = this.tailwindToHex(this.color, 900);
        }
        if (this.hoverEffect === 'r') {
            className = this.generateIconFrameClass({
                theme: this.theme,
                shape: 'rounded',
                color: this.color,
            });
            className = className + '-hover';
        } else if (this.hoverEffect === 'c') {
            className = this.generateIconFrameClass({
                theme: this.theme,
                shape: 'circle',
                color: this.color,
            });
            className = className + '-hover';
        } else {
            className = this.generateIconFrameClass({
                theme: this.theme,
                shape: this.shape,
                color: this.color,
            });
        }
        this.frameStyle[className] = true;
        if (!this.navMode && !(this.shape === '' && this.hoverEffect === '')) {
            this.generateIconFrameSize();
        }
        if (this.isInteractive && this.hoverEffect === '' && this.color === 'gray') {
            this.addHoverEffect();
        }
    }

    generateIconFrameSize() {
        this.frameStyle[this.size === '' ? 'icon-frame-size-md' : 'icon-frame-size-' + this.size] = true;
    }

    generateIconFrameClass(options: any) {
        let className = 'icon-frame';

        // Theme
        if (options.theme === 'light') {
            className += '-light';
        } else if (options.theme === 'dark') {
            className += '-dark';
        }

        // Shape
        if (options.shape.length !== 0) {
            className += `-${options.shape}`;
        } else {
            return '';
        }

        // Color
        if (options.color === 'primary') {
            className += `-primary`;
        } else {
            className += `-default`;
        }

        return className;
    }

    createIcon() {
        this.deleteAllKeys(this.iconStyle);
        if (this.navMode && !this.isSelected) {
            /* console.log('NAV MODE AND NOT SELECTED'); */
            if (this.theme === 'light') {
                // HOVER
                this.iconColorHover = this.tailwindToHex('gray', 900);
                this.iconStyle['icon-hover-defined'] = true;
                // DEFAULT
                this.iconColor = this.tailwindToHex('gray', 500);
                this.iconStyle['icon-defined'] = true;
            } else {
                // HOVER
                this.iconColorHover = this.tailwindToHex('gray', 100);
                this.iconStyle['icon-hover-defined'] = true;
                // DEFAULT
                this.iconColor = this.tailwindToHex('gray', 400);
                this.iconStyle['icon-defined'] = true;
            }
        } else if (this.navMode && this.isSelected) {
            /* console.log('NAV MODE AND SELECTED'); */
            if (this.theme === 'light') {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-600'] = true;
                } else if (this.color === 'gray') {
                    this.iconStyle['icon-primary-600'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-800'] = true;
                } else if (this.color === 'gray') {
                    this.iconStyle['icon-primary-800'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 800);
                    this.iconStyle['icon-defined'] = true;
                }
            }
        } else if (this.isInteractive && this.hoverEffect !== '' && !this.isSelected) {
            /* console.log('isInteractive AND SPECIAL'); */
            if (this.theme === 'light') {
                // HOVER
                if (this.color === 'primary') {
                    this.iconStyle['icon-hover-primary-800'] = true;
                } else {
                    this.iconColorHover = this.tailwindToHex(this.color, 800);
                    this.iconStyle['icon-hover-defined'] = true;
                }
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-gray-900'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex('gray', 900);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex('gray', 600);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // HOVER
                if (this.color === 'primary') {
                    this.iconStyle['icon-hover-primary-200'] = true;
                } else {
                    this.iconColorHover = this.tailwindToHex(this.color, 200);
                    this.iconStyle['icon-hover-defined'] = true;
                }
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-gray-100'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex('gray', 100);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex('gray', 100);
                    this.iconStyle['icon-defined'] = true;
                }
            }
        } else if (this.isInteractive && this.hoverEffect !== '' && this.isSelected) {
            /* console.log('isInteractive AND SPECIAL AND SELECTED'); */
            if (this.theme === 'light') {
                // HOVER
                if (this.color === 'primary') {
                    this.iconStyle['icon-hover-primary-800'] = true;
                } else {
                    this.iconColorHover = this.tailwindToHex(this.color, 800);
                    this.iconStyle['icon-hover-defined'] = true;
                }
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-600'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // HOVER
                if (this.color === 'primary') {
                    this.iconStyle['icon-hover-primary-200'] = true;
                } else {
                    this.iconColorHover = this.tailwindToHex(this.color, 200);
                    this.iconStyle['icon-hover-defined'] = true;
                }
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-500'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 500);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 500);
                    this.iconStyle['icon-defined'] = true;
                }
            }
        } else if (this.isInteractive && this.shape !== '') {
            /* console.log('isInteractive AND SHAPE'); */
            if (this.theme === 'light') {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-600'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 900);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-200'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 100);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 200);
                    this.iconStyle['icon-defined'] = true;
                }
            }
            this.addHoverEffect();
        } else if (!this.isInteractive && this.shape !== '') {
            /* console.log('NOT isInteractive AND SHAPE'); */
            if (this.theme === 'light') {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-600'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 900);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-200'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 100);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 200);
                    this.iconStyle['icon-defined'] = true;
                }
            }
        } else if (this.isInteractive && this.shape === '' && this.color === 'gray') {
            /* console.log('isInteractive AND NO SHAPE'); */
            if (this.theme === 'light') {
                // DEFAULT
                if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 900);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // DEFAULT
                if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 100);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 500);
                    this.iconStyle['icon-defined'] = true;
                }
            }
            this.addHoverEffect();
        } else if (this.isInteractive && this.shape === '' && this.color !== 'gray') {
            /* console.log('isInteractive AND NO SHAPE AND CUSTOM OR PRIMARY COLOR'); */
            if (this.theme === 'light') {
                // HOVER
                if (this.color === 'primary') {
                    this.iconStyle['icon-hover-primary-600'] = true;
                } else {
                    this.iconColorHover = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-hover-defined'] = true;
                }
                // DEFAULT
                if (this.isSelected && this.color === 'primary') {
                    this.iconStyle['icon-primary-600'] = true;
                } else if (this.isSelected && this.color !== 'primary') {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex('gray', 900);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // HOVER
                if (this.color === 'primary') {
                    this.iconStyle['icon-hover-primary-500'] = true;
                } else {
                    this.iconColorHover = this.tailwindToHex(this.color, 500);
                    this.iconStyle['icon-hover-defined'] = true;
                }
                // DEFAULT
                if (this.isSelected && this.color === 'primary') {
                    this.iconStyle['icon-primary-600'] = true;
                } else if (this.isSelected && this.color !== 'primary') {
                    console.log('CO');
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    console.log('else');
                    this.iconColor = this.tailwindToHex('gray', 100);
                    this.iconStyle['icon-defined'] = true;
                }
            }
        } else {
            /* console.log('NOT isInteractive AND NO SHAPE -- ELSE'); */
            if (this.theme === 'light') {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-600'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 900);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 600);
                    this.iconStyle['icon-defined'] = true;
                }
            } else {
                // DEFAULT
                if (this.color === 'primary') {
                    this.iconStyle['icon-primary-500'] = true;
                } else if (this.color === 'gray') {
                    this.iconColor = this.tailwindToHex(this.color, 100);
                    this.iconStyle['icon-defined'] = true;
                } else {
                    this.iconColor = this.tailwindToHex(this.color, 500);
                    this.iconStyle['icon-defined'] = true;
                }
            }
        }
        this.generateIconSize();
    }

    generateIconSize() {
        this.iconStyle[this.size === '' ? 'icon-size-md' : 'icon-size-' + this.size] = true;
    }

    addHoverEffect() {
        this.frameStyle['icon-hover'] = true;
    }
    /*    removeHoverEffect() {
        this.frameStyle['icon-hover'] = false;
    } */

    tailwindToHex(colorName: possibleColors, shade: tShades) {
        let hexColor = '';
        if (colorName === '') {
            colorName = 'gray';
        }
        let color = colorList.find((color) => {
            return color.name === colorName;
        });
        let shadeNumber = typeof shade === 'string' ? parseInt(shade) : shade;

        if (color) {
            for (let i = 0; i < color.shades.length; i++) {
                if (color.shades[i].shade === shadeNumber) {
                    hexColor = color.shades[i].hex;
                }
            }
        }
        return hexColor;
    }

    /*     memoize<T>(func: Func<T>): Func<T> {
        const cache: { [key: string]: T } = {};
        return (...args: any[]) => {
            const key = JSON.stringify(args);
            if (cache[key]) {
                return cache[key];
            } else {
                const result = func.apply(this, args);
                cache[key] = result;
                return result;
            }
        };
    } */
}
