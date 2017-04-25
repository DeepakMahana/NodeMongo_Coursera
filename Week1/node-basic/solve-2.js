
var rect = require('./rectangle-2');

function solveRect(l,b) {

	console.log("Solving for rectangle with l = " + l + " and b = " + b);

	// Callback Function

	rect(l,b, function(err, rectangle){
		if (err) {
			console.log(err);
		}

		// If No Error Then Execute Below Operations

		else {
		console.log("The Area of a rectangle of dimensions length=" + l + " and breadth = " + b + " is " + rectangle.area());
		console.log("The Perimeter of a rectangle of dimensions length=" + l + " and breadth = " + b + " is " + rectangle.perimeter());
	     }
	});
};

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);	
