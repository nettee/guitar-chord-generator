import {SVG} from '@svgdotjs/svg.js';

/**
 * CanvasDrawer implements low-level canvas drawing operations
 * It encapsulates the SVG.js operations to provide a simplified interface
 */
class CanvasDrawer {
    /**
     * Creates a new CanvasDrawer instance
     * @param {HTMLElement} container - A DOM element where the diagram will be rendered
     * @param {number} width - Original width of the canvas
     * @param {number} height - Original height of the canvas
     */
    constructor(container, width, height) {
        this.canvas = this.createCanvas(container, width, height);
    }

    /**
     * Creates the SVG canvas element and configures its initial properties
     * @param {HTMLElement} container - A DOM element where the diagram will be rendered
     * @param {number} width - Original width of the canvas
     * @param {number} height - Original height of the canvas
     * @returns {SVG} - The SVG canvas element
     */
    createCanvas(container, width, height) {
        // Create canvas and add it to the DOM
        const canvas = SVG()
            .addTo(container)
            .size(width, height)
            .viewbox(0, 0, width, height)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Scale according to parent container size, and center
        const parentHeight = container.clientHeight;
        const parentWidth = container.clientWidth;
        const scaleFactor = Math.min(parentHeight / height, parentWidth / width);

        canvas.scale(scaleFactor);
        canvas.translate((parentWidth - width) / 2, (parentHeight - height) / 2);

        return canvas;
    }

    /**
     * Draws text on the canvas
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {string} msg - Text message to display
     * @param {Object} font - Text font options (must include family, size, style, weight)
     * @param {Object} options - Required styling options
     * @param {string|Object} options.stroke - Color string or stroke options object
     * @param {string} options.fill - Fill color
     * @returns {Object} - The text element object
     */
    drawText(x, y, msg, font, options) {
        const text = this.canvas
            .text(`${msg}`)
            .font(font)
            .stroke(options.stroke)
            .fill(options.fill);

        return text.move(x - text.length() / 2, y);
    }

    /**
     * Draws a line on the canvas
     * @param {number} x - Starting X coordinate
     * @param {number} y - Starting Y coordinate
     * @param {number} newX - Ending X coordinate
     * @param {number} newY - Ending Y coordinate
     * @returns {Object} - The line element object
     */
    drawLine(x, y, newX, newY) {
        return this.canvas
            .line(0, 0, newX - x, newY - y)
            .move(x, y);
    }

    /**
     * Draws a rectangle on the canvas
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} width - Rectangle width
     * @param {number} height - Rectangle height
     * @param {Object} options - Optional styling options
     * @param {string} options.fill - Fill color
     * @param {Object} options.stroke - Stroke options (e.g., { width: 1, color: '#000' })
     * @param {number} options.radius - Corner radius
     * @returns {Object} - The rectangle element object
     */
    drawRect(x, y, width, height, options = {}) {
        const rect = this.canvas
            .rect(width, height)
            .move(x, y);
        if (options.fill) {
            rect.fill(options.fill);
        }
        if (options.stroke) {
            rect.stroke(options.stroke);
        }
        if (options.radius) {
            rect.radius(options.radius);
        }
        return rect;
    }

    /**
     * Draws a circle on the canvas
     * @param {number} x - X coordinate of the center
     * @param {number} y - Y coordinate of the center
     * @param {number} radius - Circle radius
     * @param {Object} options - Optional styling options
     * @param {string} options.fill - Fill color
     * @param {Object} options.stroke - Stroke options (e.g., { width: 1, color: '#000' })
     * @returns {Object} - The circle element object
     */
    drawCircle(x, y, radius, options = {}) {
        const circle = this.canvas
            .circle()
            .move(x, y)
            .radius(radius);
        if (options.fill) {
            circle.fill(options.fill);
        }
        if (options.stroke) {
            circle.stroke(options.stroke);
        }
        return circle;
    }
}

/**
 * ChordBox implements the rendering logic for the chord diagrams.
 * This class handles drawing guitar chord diagrams with customizable
 * parameters including strings, frets, positions, and styling.
 */
class ChordBox {
    /**
     * Creates a new ChordBox instance
     * @param {Object} params - Configuration parameters for the chord diagram
     */
    constructor(params) {
        this.params = {
            ...{
                numStrings: 6,
                numFrets: 5,
                x: 0,
                y: 0,
                width: 100,
                height: 120,
                strokeWidth: 1,
                showTuning: true,
                defaultColor: '#666',
                bgColor: '#fff',
                labelColor: '#fff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: undefined,
                fontStyle: 'light',
                fontWeight: '100',
                labelWeight: '100',
            },
            ...params,
        };

        // Setup defaults if not specifically overridden
        ['bridgeColor', 'stringColor', 'fretColor', 'strokeColor', 'textColor'].forEach((param) => {
            this.params[param] = this.params[param] || this.params.defaultColor;
        });

        ['stringWidth', 'fretWidth'].forEach((param) => {
            this.params[param] = this.params[param] || this.params.strokeWidth;
        });

        // Size and shift board
        this.width = this.params.width * 0.75;
        this.height = this.params.height * 0.75;

        // Initialize scaled-spacing
        this.numStrings = this.params.numStrings;
        this.numFrets = this.params.numFrets;
        this.spacing = this.width / this.numStrings;
        this.fretSpacing = this.height / (this.numFrets + 2);

        // Add room on sides for finger positions on 1. and 6. string
        this.x = this.params.x + this.params.width * 0.15 + this.spacing / 2;
        this.y = this.params.y + this.params.height * 0.15 + this.fretSpacing;

        this.metrics = {
            circleRadius: this.width / 20,
            barreRadius: this.width / 25,
            fontSize: this.params.fontSize || Math.ceil(this.width / 8),
            barShiftX: this.width / 28,
            bridgeStrokeWidth: Math.ceil(this.height / 36),
        };

        // Content
        this.position = 0;
        this.positionText = 0;
        this.chord = [];
        this.barres = [];
        this.tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
    }

    /**
     * Main method to draw the chord diagram
     * @param {HTMLElement} container - A DOM element where the chord diagram will be rendered
     * @param {Object} options - Drawing options
     * @param {Array} options.chord - Array of chord fingerings [[string, fret, label], ...]
     * @param {number} options.position - Fret position (for shifted chord diagrams)
     * @param {Array} options.barres - Array of barre chord definitions
     * @param {number} options.positionText - Text position indicator
     * @param {Array} options.tuning - Array of string tuning labels
     */
    draw(container, { chord, position, barres, positionText, tuning }) {
        this.drawer = new CanvasDrawer(container, this.params.width, this.params.height);

        this.doDraw({
            chord, position, barres, positionText, tuning,
        });
    }

    /**
     * Performs the actual drawing of the chord diagram components
     * @param {Object} options - Drawing options
     * @param {Array} options.chord - Array of chord fingerings
     * @param {number} options.position - Fret position
     * @param {Array} options.barres - Array of barre chord definitions
     * @param {number} options.positionText - Text position indicator
     * @param {Array} options.tuning - Array of string tuning labels
     */
    doDraw({ chord, position, barres, positionText, tuning }) {
        this.chord = chord;
        this.position = position || 0;
        this.positionText = positionText || 0;
        this.barres = barres || [];
        this.tuning = tuning || ['E', 'A', 'D', 'G', 'B', 'E'];
        if (this.tuning.length === 0) {
            this.fretSpacing = this.height / (this.numFrets + 1);
        }

        const { spacing } = this;
        const { fretSpacing } = this;

        if (this.position <= 1) {
            // Draw guitar bridge
            const fromX = this.x - (this.params.strokeWidth / 2);
            const fromY = this.y - this.metrics.bridgeStrokeWidth;
            // Draw guitar bridge
            const bridgeWidth = this.x + spacing * (this.numStrings - 1) - fromX + (this.params.strokeWidth / 2);
            const bridgeHeight = this.y - fromY;
            this.drawer.drawRect(fromX, fromY, bridgeWidth, bridgeHeight, {
                fill: this.params.bridgeColor,
                stroke: { width: 0 },
            });
        } else {
            // Draw position number
            this.drawer.drawText(
                this.x - this.spacing / 2 - this.spacing * 0.1, 
                this.y + this.fretSpacing * this.positionText, 
                this.position,
                {
                    family: this.params.fontFamily,
                    size: this.metrics.fontSize,
                    style: this.params.fontStyle,
                    weight: this.params.fontWeight
                },
                {
                    stroke: this.params.textColor,
                    fill: this.params.textColor
                }
            );
        }

        // Draw strings
        for (let i = 0; i < this.numStrings; i += 1) {
            this.drawer.drawLine(this.x + spacing * i, this.y, this.x + spacing * i, this.y + fretSpacing * this.numFrets).stroke({
                width: this.params.stringWidth,
                color: this.params.stringColor,
            });
        }

        // Draw frets
        for (let i = 0; i < this.numFrets + 1; i += 1) {
            this.drawer.drawLine(this.x, this.y + fretSpacing * i, this.x + spacing * (this.numStrings - 1), this.y + fretSpacing * i).stroke({
                width: this.params.fretWidth,
                color: this.params.fretColor,
            });
        }

        // Draw tuning keys
        if (this.params.showTuning && this.tuning.length !== 0) {
            for (let i = 0; i < Math.min(this.numStrings, this.tuning.length); i += 1) {
                this.drawer.drawText(
                    this.x + this.spacing * i, 
                    this.y + this.numFrets * this.fretSpacing + this.fretSpacing / 12, 
                    this.tuning[i],
                    {
                        family: this.params.fontFamily,
                        size: this.metrics.fontSize,
                        style: this.params.fontStyle,
                        weight: this.params.fontWeight
                    },
                    {
                        stroke: this.params.textColor,
                        fill: this.params.textColor
                    }
                );
            }
        }

        // Draw finger positions
        for (let i = 0; i < this.chord.length; i += 1) {
            this.drawFingerPosition({
                string: this.chord[i][0],
                fret: this.chord[i][1],
                label: this.chord.length > 2 ? this.chord[i][2] : undefined,
            });
        }

        // Draw barres
        for (let i = 0; i < this.barres.length; i += 1) {
            this.drawBarre(this.barres[i].fromString, this.barres[i].toString, this.barres[i].fret);
        }
    }

    /**
     * Draws a finger position on the fretboard
     * @param {Object} options - Finger position options
     * @param {number} options.string - String number (1-6, where 1 is the highest pitched string)
     * @param {number|string} options.fret - Fret number or 'x' for muted string
     * @param {string} options.label - Optional label to display inside the finger position
     * @returns {Object} - The ChordBox instance for chaining
     */
    drawFingerPosition({ string, fret, label }) {
        const stringNum = this.numStrings - string;
        const shiftPosition = this.position === 1 && this.positionText === 1 ? this.positionText : 0;

        const mute = fret === 'x';
        const fretNum = fret === 'x' ? 0 : fret - shiftPosition;

        const x = this.x + this.spacing * stringNum;
        let y = this.y + this.fretSpacing * fretNum;

        if (fretNum === 0) {
            y -= this.metrics.bridgeStrokeWidth;
        }

        if (!mute) {
            this.drawer.drawCircle(
                x, 
                y - this.fretSpacing / 2, 
                this.params.circleRadius || this.metrics.circleRadius, 
                {
                    stroke: { color: this.params.strokeColor, width: this.params.strokeWidth },
                    fill: fretNum > 0 ? this.params.strokeColor : this.params.bgColor
                }
            );
        } else {
            this.drawer.drawText(
                x, 
                y - this.fretSpacing, 
                'X',
                {
                    family: this.params.fontFamily,
                    size: this.metrics.fontSize,
                    style: this.params.fontStyle,
                    weight: this.params.fontWeight
                },
                {
                    stroke: this.params.textColor,
                    fill: this.params.textColor
                }
            );
        }

        if (label) {
            const fontSize = this.metrics.fontSize * 0.55;
            const textYShift = fontSize * 0.66;
            this.drawer.drawText(
                x, 
                y - this.fretSpacing / 2 - textYShift, 
                label, 
                {
                    family: this.params.fontFamily,
                    size: fontSize,
                    style: this.params.fontStyle,
                    weight: this.params.labelWeight
                },
                {
                    stroke: {
                        width: 0.7,
                        color: fretNum !== 0 ? this.params.labelColor : this.params.strokeColor,
                    },
                    fill: fretNum !== 0 ? this.params.labelColor : this.params.strokeColor
                }
            );
        }

        return this;
    }

    /**
     * Draws a barre (bar chord representation) across multiple strings
     * @param {number} stringFrom - Starting string number
     * @param {number} stringTo - Ending string number
     * @param {number} theFretNum - Fret number where the barre is placed
     * @returns {Object} - The ChordBox instance for chaining
     */
    drawBarre(stringFrom, stringTo, theFretNum) {
        let fretNum = theFretNum;
        if (this.position === 1 && this.positionText === 1) {
            fretNum -= this.positionText;
        }

        const stringFromNum = this.numStrings - stringFrom;
        const stringToNum = this.numStrings - stringTo;

        const x = this.x + this.spacing * stringFromNum - this.metrics.barShiftX;
        const xTo = this.x + this.spacing * stringToNum + this.metrics.barShiftX;

        const y = this.y + this.fretSpacing * (fretNum - 1) + this.fretSpacing / 4;
        const yTo = this.y + this.fretSpacing * (fretNum - 1) + (this.fretSpacing / 4) * 3;

        this.drawer.drawRect(x, y, xTo - x, yTo - y, {
            fill: this.params.strokeColor,
            radius: this.metrics.barreRadius,
        });

        return this;
    }
}

export {ChordBox};