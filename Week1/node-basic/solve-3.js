
// Using yargs 

var argv = require('yargs')
	.usage('Usage: node $0 --l=[num] --b=[num]')
	.demand(['l','b'])

	// It sets the value to the variables given to the command line
	.argv;

var react = require('./rectangle-2');

function solveRect(l,b) {
	console.log("Solving for rectangle with l=" + l + "and b = " + b);

	rect(l,b, function(err,rectangle) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("The Area of a rectangle of dimensions length=" + l + " and breadth = " + b + " is " + rectangle.area());
			console.log("The Perimeter of a rectangle of dimensions length=" + l + " and breadth = " + b + " is " + rectangle.perimeter());
		}
	});
};

solveRect(argv.l,argv.b);	