function getIconStyleConfig() {
    return {
        light: {
            navModeNotSelected: {
                hover: { gray: 900 },
                default: { gray: 500 },
            },
            navModeSelected: {
                primary: { primary: 600 },
                gray: { primary: 600 },
                default: { default: 600 },
            },
            interactiveHoverEffectNotSelected: {
                hover: {
                    primary: { primary: 800 },
                    default: { default: 800 },
                },
                default: {
                    primary: { gray: 900 },
                    gray: { gray: 900 },
                    default: { gray: 600 },
                },
            },
            interactiveHoverEffectSelected: {
                hover: {
                    primary: { primary: 800 },
                    default: { default: 800 },
                },
                default: {
                    primary: { primary: 800 },
                    gray: { gray: 900 },
                    default: { default: 600 },
                },
            },
            interactiveShape: {
                default: {
                    primary: { primary: 600 },
                    gray: { gray: 900 },
                    default: { default: 600 },
                },
            },
            notInteractiveShape: {
                default: {
                    primary: { primary: 600 },
                    gray: { gray: 900 },
                    default: { default: 600 },
                },
            },
            interactiveNoShape: {
                default: {
                    gray: { gray: 900 },
                    default: { gray: 600 },
                },
            },
            interactiveNoShapeCustomPrimaryColor: {
                hover: {
                    primary: { primary: 600 },
                    default: { default: 600 },
                },
                default: {
                    primary: { primary: 600 },
                    default: { gray: 900 },
                },
            },
            notInteractiveNoShape: {
                default: {
                    primary: { primary: 600 },
                    gray: { gray: 900 },
                    default: { default: 600 },
                },
            },
        },
        dark: {
            navModeNotSelected: {
                hover: { gray: 100 },
                default: { gray: 400 },
            },
            navModeSelected: {
                primary: { primary: 800 },
                gray: { primary: 800 },
                default: { default: 800 },
            },
            interactiveHoverEffectNotSelected: {
                hover: {
                    primary: { primary: 200 },
                    default: { default: 200 },
                },
                default: {
                    primary: { gray: 100 },
                    gray: { gray: 100 },
                    default: { gray: 100 },
                },
            },
            interactiveHoverEffectSelected: {
                hover: {
                    primary: { primary: 200 },
                    default: { default: 200 },
                },
                default: {
                    primary: { primary: 200 },
                    gray: { gray: 100 },
                    default: { default: 100 },
                },
            },
            interactiveShape: {
                default: {
                    primary: { primary: 200 },
                    gray: { gray: 100 },
                    default: { default: 200 },
                },
            },
            notInteractiveShape: {
                default: {
                    primary: { primary: 200 },
                    gray: { gray: 100 },
                    default: { default: 200 },
                },
            },
            interactiveNoShape: {
                default: {
                    gray: { gray: 100 },
                    default: { gray: 500 },
                },
            },
            interactiveNoShapeCustomPrimaryColor: {
                hover: {
                    primary: { primary: 200 },
                    default: { default: 200 },
                },
                default: {
                    primary: { primary: 200 },
                    default: { gray: 100 },
                },
            },
            notInteractiveNoShape: {
                default: {
                    primary: { primary: 200 },
                    gray: { gray: 100 },
                    default: { default: 200 },
                },
            },
        },
    };
}



/* function applyIconStyle(theme, state, color) {
    const config = getIconStyleConfig()[theme][state];
    if (config[color]) {
        this.iconStyle[`icon-${color}-${config[color]}`] = true;
    } else {
        this.iconColor = this.tailwindToHex(color, config.default);
        this.iconStyle['icon-defined'] = true;
    }
}

function createIcon() {
    this.deleteAllKeys(this.iconStyle);

    const theme = this.theme;
    const color = this.color;
    const isSelected = this.isSelected;
    const isInteractive = this.isInteractive;
    const hasHoverEffect = this.hoverEffect !== '';
    const hasShape = this.shape !== '';

    if (this.navMode) {
        if (!isSelected) {
            applyIconStyle.call(this, theme, 'navModeNotSelected', color);
        } else {
            applyIconStyle.call(this, theme, 'navModeSelected', color);
        }
    } else if (isInteractive && hasHoverEffect) {
        if (!isSelected) {
            applyIconStyle.call(this, theme, 'interactiveHoverEffectNotSelected', color);
        } else {
            applyIconStyle.call(this, theme, 'interactiveHoverEffectSelected', color);
        }
    } else if (isInteractive && hasShape) {
        applyIconStyle.call(this, theme, 'interactiveShape', color);
        this.addHoverEffect();
    } else if (!isInteractive && hasShape) {
        applyIconStyle.call(this, theme, 'notInteractiveShape', color);
    } else if (isInteractive && !hasShape) {
        applyIconStyle.call(this, theme, 'interactiveNoShape', color);
        this.addHoverEffect();
    } else {
        applyIconStyle.call(this, theme, 'notInteractiveNoShape', color);
    }

    this.generateIconSize();
} */