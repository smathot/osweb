/** Class implementing a python random library. */
osweb.python_random = class PythonRandom {
    /**
     * Create a python AST runner.
     * @param {Object} runner - The runner to which the library belongs.
     */
    constructor(runner) {
        // Set class parameter properties.
        this._runner = runner; // Parent runner attached to the library.
    }

    /** Initialization phase of the python_library class. */
    _initialize() {
        // Insert math library methods into the python interpreter.
        filbert.pythonRuntime.imports['random'] = {};
        filbert.pythonRuntime.imports['random']['random'] = this.random; 
        filbert.pythonRuntime.imports['random']['shuffle'] = this.shuffle; 
   };
    
    random() {
        return Math.random();
    }

    shuffle(x, random) {
        // Fisher-Yates (aka Knuth) Shuffle.
        var currentIndex = x.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = x[currentIndex];
            x[currentIndex] = x[randomIndex];
            x[randomIndex] = temporaryValue;
        }       
        return x;
    }
}
 