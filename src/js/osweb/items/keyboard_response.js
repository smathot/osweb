/**
 * Class representing a keyboard response item.
 * @extends GenericResponse
 */
osweb.keyboard_response = class KeyboardResponse extends osweb.generic_response {
    /**
     * Create a keyboard response item which waits for a keyboard response.
     * @param {Object} experiment - The experiment item to which the item belongs.
     * @param {String} name - The unique name of the item.
     * @param {String} script - The script containing the properties of the item.
     */
    constructor(experiment, name, script) {
		// Inherited.
		super(experiment, name, script);

        // Definition of public properties. 
        this.description = 'Collects keyboard responses';

        // Definition of private properties. 
        this._flush = 'yes';
        this._keyboard = new osweb.keyboard(this.experiment);

        // Process the script.
        this.from_string(script);
    }

    /** Resets all item variables to their default value. */
    reset() {
        this.auto_response = 'space';
        this.process_feedback = true;
        this.vars.allowed_responses = null;
        this.vars.correct_response = null;
        this.vars.duration = 'keypress';
        this.vars.flush = 'yes';
        this.vars.timeout = 'infinite';
    }

    /** Implements the prepare phase of the Sketschpad. */
    prepare() {
        // Set the internal flush property.
        this._flush = (this.vars.flush) ? this.vars.flush : 'yes';

        // Inherited.	
        super.prepare();
    }

    /** Implements the run phase of the Sketschpad. */
    run() {
        // Inherited.	
        super.run();

        // Record the onset of the current item.
        this.set_item_onset();

        // Flush responses, to make sure that earlier responses are not carried over.
        if (this._flush === 'yes') {
            this._keyboard.flush();
        }

        this.set_sri();
        this.process_response();
    }
}
