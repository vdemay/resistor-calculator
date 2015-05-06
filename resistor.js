 /**
 * Compiled online with https://facebook.github.io/react/jsx-compiler.html
 */
var SVGResistor = React.createClass({displayName: "SVGResistor",
    valueToColour: function(value) {
        return this.props.bandOptions[value].color;
    },
    renderBand4:function() {
    	if (this.props.resType == "4bands") {
    		return React.createElement("rect", {id: "band4", x: 160, y: 0, rx: 0, width: 7, height: 57, fill: this.valueToColour(this.props.bands[3])})
    	} else {
    		return React.createElement("rect", {id: "band4", x: 160, y: 0, rx: 0, width: 7, height: 57, fill: "#FDF7EB"})
    	}
    },
    renderLines:function() {
        return (
            React.createElement("svg", null, 
            React.createElement("rect", {x: 72, y: 60, rx: 0, width: 3, height: 5, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 0, y: 62, rx: 0, width: 73, height: 3, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 0, y: 62, rx: 0, width: 3, height: 50, fill: "#d1d1d1"}), 

            React.createElement("rect", {x: 102, y: 60, rx: 0, width: 3, height: 15, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 77, y: 72, rx: 0, width: 25, height: 3, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 77, y: 72, rx: 0, width: 3, height: 45, fill: "#d1d1d1"}), 

            React.createElement("rect", {x: 132, y: 60, rx: 0, width: 3, height: 20, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 132, y: 77, rx: 0, width: 20, height: 3, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 150, y: 77, rx: 0, width: 3, height: 30, fill: "#d1d1d1"}), 

            React.createElement("rect", {x: 162, y: 60, rx: 0, width: 3, height: 15, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 162, y: 72, rx: 0, width: 65, height: 3, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 225, y: 72, rx: 0, width: 3, height: 50, fill: "#d1d1d1"}), 

            React.createElement("rect", {x: 212, y: 60, rx: 0, width: 3, height: 5, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 212, y: 62, rx: 0, width: 100, height: 3, fill: "red"}), 
            React.createElement("rect", {x: 297, y: 62, rx: 0, width: 3, height: 50, fill: "red"})
            )
        );
    },
    render: function() {
        return (
            React.createElement("svg", {width: 300, height: 70, version: "1.1", xmlns: "http://www.w3.org/2000/svg"}, 
            React.createElement("rect", {x: 0, y: 26, rx: 5, width: 300, height: 7, fill: "#d1d1d1"}), 
            React.createElement("rect", {x: 50, y: 0, rx: 15, width: 200, height: 57, fill: "#FDF7EB"}), 
            React.createElement("rect", {id: "band1", x: 70, y: 0, rx: 0, width: 7, height: 57, fill: this.valueToColour(this.props.bands[0])}), 
            React.createElement("rect", {id: "band2", x: 100, y: 0, rx: 0, width: 7, height: 57, fill: this.valueToColour(this.props.bands[1])}), 
            React.createElement("rect", {id: "band3", x: 130, y: 0, rx: 0, width: 7, height: 57, fill: this.valueToColour(this.props.bands[2])}), 
             this.renderBand4(), 
            React.createElement("rect", {id: "band5", x: 210, y: 0, rx: 0, width: 7, height: 57, fill: this.valueToColour(this.props.bands[4])})
            )
        );
    }
});

var OhmageIndicator = React.createClass({displayName: "OhmageIndicator",
    printResistance: function() {
        var resistance = parseFloat(this.props.resistance);
        if(resistance >= 1000000) {
            return(resistance / 1000000).toFixed(1) + "MΩ";
        }
        else if(resistance >= 1000){
            return (resistance / 1000).toFixed(1) + "KΩ";
        } else {
            return resistance.toFixed(1) + "Ω";    
        }
    },
    render: function() {
        return (
            React.createElement("div", {id: "resistorValue"}, this.printResistance())
        );
    }
});

var ToleranceIndicator = React.createClass({displayName: "ToleranceIndicator",
    printTolerance: function() {
        return this.props.tolerance === 0 ? "?" : "±" + this.props.tolerance + "%";
    },
    render: function() {
        return (
            React.createElement("span", {id: "toleranceValue"}, this.printTolerance()) 
        );
    }
});

var BandSelector = React.createClass({displayName: "BandSelector",
    getInitialState: function() {
        return {selected: 0};
    },
    handleChange: function() {
        var newValue = this.refs.menu.getDOMNode().value;
        this.setState({selected: newValue});
        this.props.changeHandler(this.props.band - 1, newValue);
    },
    render: function(){
        var that = this;
        var optionNodes = this.props.bandOptions.map(function(option){
            if(that.props.omitOptions.indexOf(option.value) === -1)
                return React.createElement("option", {value: option.value}, option.label);
        });
        return (
            React.createElement("div", {className: "bandOption"}, 
                React.createElement("label", null, this.props.band == 5 ? React.createElement("span", null, "Tolerance"):React.createElement("span", null, "Band ", this.props.band)), 
                React.createElement("select", {ref: "menu", value: this.state.selected, onChange: this.handleChange}, 
                    optionNodes
                )
            )
        );
    }
});

var ResistanceCalculator = React.createClass({displayName: "ResistanceCalculator",
    calculateResistance: function() {
    	if (this.state.resType == "3bands") { // 3 bands
    		//3 bands
    		return ((10 * this.state.bands[0]) + (1  * this.state.bands[1]))
        			* this.bandOptions[this.state.bands[2]].multiplier;
    	} else {
        	return ((100 * this.state.bands[0]) + (10  * this.state.bands[1]) + (1* this.state.bands[2]))
        			* this.bandOptions[this.state.bands[3]].multiplier;
        }
    },
    calculateTolerance: function() {
        return this.bandOptions[this.state.bands[4]].tolerance;
    },

    bandOptions: [
        {value: 0, 	tolerance: 0, 		multiplier:1,				color: "black", 	label: "Black" },
        {value: 1, 	tolerance: 1, 		multiplier:10,				color: "brown", 	label: "Brown"},
        {value: 2, 	tolerance: 2, 		multiplier:100,				color: "red", 		label: "Red"},
        {value: 3, 						multiplier:1000,			color: "orange", 	label: "Orange"},
        {value: 4, 						multiplier:10000,			color: "yellow", 	label: "Yellow"},
        {value: 5, 	tolerance: 0.5, 	multiplier:100000,			color: "green", 	label: "Green"},
        {value: 6, 	tolerance: 0.25, 	multiplier:1000000,			color: "blue", 		label: "Blue"},
        {value: 7, 	tolerance: 0.10, 	multiplier:10000000,		color: "violet", 	label: "Violet"},
        {value: 8, 	tolerance: 0.05, 								color: "grey", 		label: "Grey"},
        {value: 9, 													color: "white", 	label: "White"},
        {value: 10,	tolerance: 5, 		multiplier:0.1,				color: "#FFD700", 	label: "Gold"},
        {value: 11,	tolerance: 10, 		multiplier:0.01,			color: "#C0C0C0", 	label: "Silver"},
    ],

    updateBandState: function(band, value) {
        var state = this.state;
        state.bands[band] = value;
        state.resistance = this.calculateResistance();
        state.tolerance = this.calculateTolerance();
        this.setState(state);
    },
    getInitialState: function() {
        return {bands: [0,0,0,0,0], resistance: 0, tolerance: 0, resType:"3bands"};
    },
    updateType: function(event) {
    	var state = this.state;
        state.resType = event.target.value;
        state.resistance = this.calculateResistance();
        state.tolerance = this.calculateTolerance();
        this.setState(state);
    },
    renderThridBand: function() {
    	if (this.state.resType == "4bands") {
        	return React.createElement(BandSelector, {bandOptions: this.bandOptions, omitOptions: [8,9], band: 4, changeHandler: this.updateBandState})
        } else {
        	return React.createElement("div", null)
        }
    },

    render: function() {
        return (
            React.createElement("div", {className: "resistorComputer"}, 
                React.createElement("div", {className: "resType"}, 
                  React.createElement("label", null, 
                    "My resistor has",  
                    React.createElement("input", {type: "radio", checked: this.state.resType == "3bands" ? true: null, onChange: this.updateType, name: "resType", value: "3bands"}), "3 bands", 
                    React.createElement("input", {type: "radio", checked: this.state.resType == "4bands" ? true: null, onChange: this.updateType, name: "resType", value: "4bands"}), "4 bands"
                  )
                ), 
                React.createElement(BandSelector, {bandOptions: this.bandOptions, omitOptions: [10,11, 12], band: 1, changeHandler: this.updateBandState}), 
                React.createElement(BandSelector, {bandOptions: this.bandOptions, omitOptions: [10,11, 12], band: 2, changeHandler: this.updateBandState}), 
                React.createElement(BandSelector, {bandOptions: this.bandOptions, omitOptions: [10,11, 12], band: 3, changeHandler: this.updateBandState}), 
                this.renderThridBand(), 
                React.createElement(BandSelector, {bandOptions: this.bandOptions, omitOptions: [3,4,9,12], band: 5, changeHandler: this.updateBandState}), 
                React.createElement("div", {className: "resistor"}, 
                    React.createElement(SVGResistor, {bandOptions: this.bandOptions, bands: this.state.bands, resType: this.state.resType})
                ), 
                React.createElement(OhmageIndicator, {resistance: this.state.resistance}), 
                React.createElement("div", {className: "tolerance-area"}, "(", React.createElement(ToleranceIndicator, {tolerance: this.state.tolerance}), ")")

            )
            );
    }
});