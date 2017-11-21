let firstBubble = new bubble();

function setup() { // built-in P5.JS function -=- this runs once
	createCanvas(600, 400); 
}

function draw() { // built-in P5.JS function -=-  automatic loop that repeats forever
	background(0); // give the canvas a black background
	firstBubble.move();
	firstBubble.show();
}

function mousePressed()
{
}

function bubble()
{
	this.pos = new p5.Vector(300,200);
	//this.r = random(0,256);
	//this.g = random(0,256);
	//this.b = random(0,256);
	
	this.show = function()
	{
		stroke(256);//this.r, this.g, this.b); // white outline
		strokeWeight(4); // line width
		noFill();
		ellipse(this.pos.x, this.pos.y, 24, 24); // draw an ellipse/circle
	}
	
	this.move = function()
	{
		this.pos.add(random(-5,5),random(-5,5));
	}
}