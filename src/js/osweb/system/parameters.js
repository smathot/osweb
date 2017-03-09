/** Class representing a parameter processor. */
osweb.parameters = class Parameters {
    /**
     * Create an session class which stores information about the client system.
     * @param {Object} runner - The runner class to which the debugger belongs.
     */
    constructor(runner) {
        // Create and set private properties. 
        this._itemCounter = 0; // Number of active parameter.
        this._parameters = new Array(); // All parameters to process.
        this._runner = runner; // Parent runner attached to the session object.    
    }     

    /** Initialize the parameters class. */
    _initialize() {
        // Check if subject parameter is already defined.
        if (this._runner._subject !== null) {
            // Set the subject number
            this._runner._experiment.set_subject(this._runner._subject);

            // Parameters are processed, next phase.
            this._runner._screen._setupClickScreen();
        } else { 
            // Update inroscreen.
            this._runner._screen._updateIntroScreen('Retrieving input parameters.');

            // Set properties if defined.
            var parameter = {
                dataType: '0',
                defaultValue: '0',
                name: 'subject_nr',
                title: 'Starting the experiment',
                prompt: 'Please enter the subject number',
                promptEnabled: true
            };

            // Add the subject parameter to the parameters list.
            this._parameters.push(parameter);
    
            // Process the Parameters.        
            this._processParameters();
        }    
    }

    /** Process all parameters within the parameter list. */
    _processParameters() {
        // Process all items for which a user input is required.
        if (this._itemCounter < this._parameters.length) {
            // Process a  parameter.
            this._processParameter(this._parameters[this._itemCounter]);
        } else {
            // Transfer the startup info to the context.
            this._transferParameters();
        }
    }

    /**
     * Process a single parameter
     * @param {Object} parameter - The parameter which must be processed.
     */
    _processParameter(parameter) {
        // Check if a user request is required.
        if (parameter.promptEnabled == true) {
            // Create the alertify prompt.
            alertify.prompt( 
                parameter.title, 
                parameter.prompt, 
                parameter.defaultValue, 
                function(evt, value) {
                    // Close the prompt.
                    alertify.prompt().close(); 

                    // Get the response information
                    parameter.response = value;
            
                    // Increase the counter.
                    this._itemCounter++;
            
                    // Continue processing.
                    this._processParameters();
        
                }.bind(this), 
                function() {
                    // Close the prompt.
                    alertify.prompt().close();     

                    // Finalize the introscreen elements.
                    this._runner._exit();
                }.bind(this)
            );
        } else {
            // Assign default value to the Startup item.
            parameter.response = parameter.defaultValue;

            // Increase the counter.
            this._itemCounter++;

            // Continue processing.
            this._processParameters();
        }
    }

    /** Transfer the startup info items to the context. */
    _transferParameters() {
        // Transfer the startup info items to the context.
        for (var i = 0; i < this._parameters.length; i++) {
            // Additional run for subject_nr
            if (this._parameters[i].name == 'subject_nr') {
                this._runner._experiment.set_subject(this._parameters[i].response);
            } else {
                this._runner._experiment.vars.set(this._parameters[i].name, this._parameters[i].response);
            }    
        }
    
        // Parameters are processed, next phase.
        this._runner._screen._setupClickScreen();
    }
}
 