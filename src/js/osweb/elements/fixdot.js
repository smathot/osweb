/**
 * Class representing an arrow element.
 * @extends BaseElement
 */
import BaseElement from './base_element.js';
import Styles from '../backends/styles.js';

export default class Fixdot extends BaseElement {
    /**
     * Create an experiment item which controls the OpenSesame experiment.
     * @param {Object} sketchpad - The sketchpad item that owns the visual element.
     * @param {String} script - The script containing properties of the visual element.
     */
    constructor(sketchpad, script) {
        // Create a default property container.
		var defaults = {};
		defaults.color = sketchpad.vars.get('foreground');
		defaults.style = 'default';
		defaults.x = null;
		defaults.y = null;

        // Inherited.
        super(sketchpad, script, defaults);
	}

 	/** Implements the draw phase of an element. */
   	draw() {
		// Inherited.	
        super.draw();

		// Create a styles object containing style information
		var styles = new Styles();
		styles.color = this._properties.color;

		// Draw the fixdot element to the canvas of the sketchpad.
		this.sketchpad.canvas.fixdot(this._properties.x, this._properties.y, 
			this._properties.style, styles);
	}
}
