let bubbles = [];
let gravity = new p5.Vector(0, 0.05);
let score = 20;
let timerMax = 120;
let timer = timerMax;
let popSound = new Audio("Pop.mp3");
let backgroundC = 60;
let tSize = 45;
let tScaler = 1;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(backgroundC);
	//bubbles.push(new Bubble(windowWidth/2, windowHeight/2, 20));
	bubbles.push(new Bubble(windowWidth/2, windowHeight - 40, random(10,40)));
	cursor(CROSS);
}

function draw()
{
	background(backgroundC);

	for (let i = 0; i < bubbles.length; i++)
	{
		bubbles[i].applyForce(gravity);
		bubbles[i].update();
		bubbles[i].changeColor();

		if (bubbles[i].lifespan < 0 || bubbles[i].checkEdges())
		{
			score--;
			popSound.play();
			bubbles.splice(i, 1);
		}
		else
			bubbles[i].show();
	}

	if (timer <= 0)
	{
		bubbles.push(new Bubble(windowWidth/2, windowHeight - 40, random(10,40)));//random(40, windowWidth - 40), random(40, windowHeight/2), random(10, 40)));
		timerMax+= random(-5,5);
		timer = timerMax;
	}
	else
		timer--;

	scoreboard();
}

/*function keyPressed()
{
	if (keyCode == 38)
	{
		bubbles.push(new Bubble(random(40, windowWidth - 40), random(40, windowHeight/2), random(10, 40)));
	}
}*/

function mousePressed()
{
	for (let i = 0; i < bubbles.length; i++)
	{
		if (bubbles[i].checkClicked(mouseX, mouseY))
		{
			popSound.play();
			bubbles.splice(i, 1);
			score++;
			break;
		}
		else if (i == bubbles.length - 1)
			score--;
	}
}

function windowResized()
{
	createCanvas(windowWidth, windowHeight);
	background(60);
}

class Bubble
{
	constructor(x,y,rad)
	{
		// Movement Vectors
		this.pos = new p5.Vector(x,y);
		this.vel = new p5.Vector(random(-3,3),random(-7, -9));
		this.acc = new p5.Vector(0,0);

		// Color Variables
		this.r = 0;
		this.b = 256;
		this.g = 256;

		this.rad = rad;
		this.d = this.rad*2;
		this.lifespan = random(250, 350);
	}

	show()
	{
		noFill();
		stroke(this.r,this.b,this.g);
		ellipse(this.pos.x, this.pos.y, this.d, this.d);
	}

	applyForce(force)
	{
		this.acc.add(force);
	}

	update()
	{
		this.vel.add(this.acc);
		this.pos.add(this.vel.x, this.vel.y);
		this.acc.mult(0);

		this.lifespan--;
		this.vel.limit(20);
	}

	changeColor()
	{
		this.r += random(-10,10);
		this.b += random(-10,10);
		this.g += random(-10,10);
	}

	checkClicked(mx, my)
	{
		let d = dist(mx, my, this.pos.x, this.pos.y);

		if (d < this.rad)
		{
			return true;
		}
	}

	checkEdges()
	{
		if ((this.pos.y + this.rad > windowHeight || this.pos.y - this.rad < 0) || (this.pos.x + this.rad > windowWidth || this.pos.x - this.rad < 0))
		{
			return true;
		}
	}
}

function scoreboard()
{
	textSize(25);
	stroke(0,0,0);
	text(score, windowWidth - 40, 40);
	//fill(0);

	if (score <= 0)
	{
		backgroundC = [256,0,0];
		timer = 250000;
		bubbles.splice(0, bubbles.length);
		
		if (tSize >= 45)
			tScaler = 1;
		else if (tSize <= 90)
			tScaler = -1;
		
		tSize += tScaler;
		
		textSize(tSize);
		stroke(0);
		text("You Lost!", windowWidth/2 -tSize, windowHeight/2 -tSize);
	}
	else if (score >= 60)
	{
		backgroundC = [0,256,0];
		timer = 250000;
		
		if (tSize >= 45)
			tScaler = 1;
		else if (tSize <= 90)
			tScaler = -1;
		
		tSize += tScaler;
		
		textSize(tSize);
		stroke(0);
		text("You Won!", windowWidth/2 -tSize, windowHeight/2 -tSize);
	}
}