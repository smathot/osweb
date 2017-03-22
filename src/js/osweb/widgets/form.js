/** Class representing an Form widget for showing widgets. */
export default class FormWidget {
    /**
     * Create a form widget object used to show widget elements to the subject.
     * @param {Object} experiment - The experiment item to which the form belongs.
     * @param {String} cols - The unique name of the item.
     * @param {String} rows - The unique name of the item.
     * @param {String} spacing - The script containing the properties of the item.
     * @param {String} margins - The script containing the properties of the item.
     * @param {String} theme - The script containing the properties of the item.
     * @param {Object} item - The item to which the form belongs.
     * @param {String} timeout - The script containing the properties of the item.
     * @param {String} clicks - The script containing the properties of the item.
     */
    constructor(experiment, cols, rows, spacing, margins, theme, item, timeout, clicks) {
        // Set the class private properties.
        this.clicks = clicks;
        this.cols = cols;
        this.experiment = experiment;
        this.height = this.experiment.vars.height;
        this.item = (item !== null) ? item : experiment;
        this.margins = margins;
        this.rows = rows;
        this.spacing = spacing;
        this.span = [];
        this.theme = theme;
        this.timeout = timeout;
        this.widgets = [];
        this.width = this.experiment.vars.width;

        // Calculate the total number ot rows and columns.
        this.colNr = 0;
        for (var i = 0; i < cols.length; i++) {
            this.colNr = this.colNr + Number(cols[i]);
        }
        this.rowNr = 0;
        for (var i = 0; i < rows.length; i++) {
            this.rowNr = this.rowNr + Number(rows[i]);
        }

        // Set the class private properties.
        this._panel = new zebra.ui.Panel({
            background : this.experiment.vars.background,
            height: this.experiment.vars.height, 
            width: this.experiment.vars.width    
        }); 

        // this._themes = new osweb.themes();
    }

    /**
     * Execute and render the form.
     * @param {Object} pFocus_widget - The widget which receives focus (optional).
     */
    _exec(pFocus_widget) {
        // Render the form.
        this.render();

        // Enabled the focus widget.
        if (pFocus_widget !== null) {
            // Focus the HTML TextArea element.
            //pFocus_widget._text_input.focus();
        }
    
        // Set the onset time.
        this.item.set_item_onset();

        // Set the duration parameter.
        if ((this.timeout !== null) && (this.item !== null)) {
            this.item.sleep(this.timeout);
        }
    }

     /** General drawing method for the label widget. */
     render() {
        // render all widgets.
        for (var i =0; i < this.widgets.length; i++) {
            this.widgets[i].render();
        }
    
        // Add the panel to the zebra form
        this.experiment._runner._formCanvas.root.add(this._panel);

        // Hide the experiment canvas, and show the form canvas.
        this.experiment._runner._formContainer.style.display = 'inline';
        this.experiment._runner._renderer.view.style.display = 'none';
    }

    /**
     * Add a widget to a location on the form.
     * @param {Object} widget - The widget to add to the form.
     * @param {Object} pos - The position of the widget.
     * @param {Number} colSpan - The width of the widget.
     * @param {Number} rowSpan - The height of the widget.
     */
    set_widget(widget, pos, colSpan, rowSpan) {
        // Calculate the form width and height minus the margins.
        var form_width = this.experiment.vars.width - Number(this.margins[1]) - Number(this.margins[3]);
        var form_height = this.experiment.vars.height - Number(this.margins[0]) - Number(this.margins[2]);

        // Calculate the position and dimension of the widget on the form.
        var x = Number(this.margins[3]) + Number(this.spacing);
        for (var i = 0; i < Number(pos[0]); i++) {
            x = x + (Number(this.cols[i]) / this.colNr) * form_width;
        }
        var y = Number(this.margins[0]) + Number(this.spacing);
        for (var i = 0; i < Number(pos[1]); i++) {
            y = y + (Number(this.rows[i]) / this.rowNr) * form_height;
        }
        var width = 0;
        var range = Number(Number(pos[0]) + Number(colSpan));
        for (var i = Number(pos[0]); i < range; i++) {
            width = width + Number(this.cols[i]);
        }
        width = (width / this.colNr) * form_width - 2 * Number(this.spacing);
    
        var height = 0;
        var range = Number(Number(pos[1]) + Number(rowSpan));
        for (var i = Number(pos[1]); i < range; i++) {
            height = height + Number(this.rows[i]);
        }
        height = (height / this.rowNr) * form_height - 2 * Number(this.spacing);

        // Set the widget position and dimensions.
        widget._panel.width = Math.round(width);
        widget._panel.height = Math.round(height);
        widget._panel.x = Math.round(x);
        widget._panel.y = Math.round(y);
    
        // Add the widget to the list.
        this.widgets.push(widget);
    }
}
 