// Sets a array of bubbles
let bubbles = [];

// Vector for gravity
let gravity = new p5.Vector(0, 0.6);

// Scoreboard Variable
let score = 40;

// Timer Variables
let timerMax = 120;
let timer = timerMax;

// Sound object
let popSound = new Audio("Pop.mp3");

// The Default Background
let backgroundC = [60,60,60, 99];

function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(backgroundC);
	bubbles.push(new Bubble(windowWidth/2, windowHeight - 40, random(10,40)));
	
	// Changes the mouse to a crosshair
	cursor(CROSS);
}

function draw()
{
	background(backgroundC);
	
	// Loops through all of the balls and runs their class functions
	for (let i = 0; i < bubbles.length; i++)
	{
		bubbles[i].applyForce(gravity);
		bubbles[i].update();
		bubbles[i].changeColor();
		
		// Checks if bubbles are alive or if it hit the walls
		if (bubbles[i].lifespan < 0 || bubbles[i].checkEdges())
		{
			score--;
			popSound.play();
			bubbles.splice(i, 1);
		}
		else
			bubbles[i].show();
	}
	
	scoreboard();
}

function mousePressed()
{
	// Loops through all the bubbles to check if it was clicked
	for (let i = 0; i < bubbles.length; i++)
	{
		if (bubbles[i].checkClicked(mouseX, mouseY))
		{
			popSound.play();
			bubbles.splice(i, 1);
			score += 3;
			if (timerMax > 20)
				timerMax -= random(2, 5);
			break;
		}
		else if (i == bubbles.length - 1)
		{
			score--;
		}
	}
}

// Resets the canvas when the screen is resized
function windowResized()
{
	createCanvas(windowWidth, windowHeight);
}

// Defines what a bubble is
class Bubble
{
	constructor(x,y,rad)
	{
		// Movement Vectors
		this.pos = new p5.Vector(x,y);
		this.vel = new p5.Vector(random(-9,9),random(-20, -40));
		this.acc = new p5.Vector(0,0);

		// Color Variables
		this.r = 0;
		this.b = 256;
		this.g = 256;
		
		// Size of the bubble
		this.rad = rad;
		this.d = this.rad*2;
		
		// Sets the lifespan to a random time
		this.lifespan = random(75, 150);
	}
	
	// Displays the bubble
	show()
	{
		noFill();
		stroke(this.r,this.b,this.g);
		ellipse(this.pos.x, this.pos.y, this.d, this.d);
	}
	
	// Applies a force to the acceleration
	applyForce(force)
	{
		this.acc.add(force);
	}
	
	// Changes the position and decreases the lifespan
	update()
	{
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		
		// Resets the acceleration
		this.acc.mult(0);

		this.lifespan--;
		this.vel.limit(30);
	}
	
	// Changes Color of the bubble
	changeColor()
	{
		this.r += random(-10,10);
		this.b += random(-10,10);
		this.g += random(-10,10);
	}
	
	// Uses distance formula to check if cordinates where in the circle
	checkClicked(mx, my)
	{
		let d = dist(mx, my, this.pos.x, this.pos.y);

		if (d < this.rad)
		{
			return true;
		}
	}

	// Checks if the bubble has touched or crossed any edges
	checkEdges()
	{
		if ((this.pos.y + this.rad > windowHeight || this.pos.y - this.rad < 0) || (this.pos.x + this.rad > windowWidth || this.pos.x - this.rad < 0))
		{
			return true;
		}
	}
}

// Loads and updates the scoreboard and checks for game completions
function scoreboard()
{
	if (timer <= 0)
	{
		for (let i = random(0, 2); i < 3; i++)
			bubbles.push(new Bubble(windowWidth/2, windowHeight - 40, random(20,40)));
		
		//timerMax+= random(-5,2);
		timer = timerMax;
	}
	else
		timer--;
	
	// Loads the score
	textSize(25);
	stroke(0,0,0);
	text("Score: " + score, windowWidth - 160, 40);
	
	// Checks if you lost
	if (score <= 0)
	{
		backgroundC = [256,0,0];
		timer = 250000;
		bubbles.splice(0, bubbles.length);
		
		textSize(45);
		stroke(0);
		textAlign(CENTER, CENTER);
		text("You Lost!", windowWidth/2, windowHeight/2);
	}
	
	// Checks if you won
	else if (score >= 100)
	{
		backgroundC = [0,256,0];
		timer = 250000;
		
		textSize(45);
		stroke(0);
		textAlign(CENTER, CENTER);
		text("You Won!", windowWidth/2, windowHeight/2);
	}
}