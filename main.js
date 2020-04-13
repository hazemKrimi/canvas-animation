"use strict";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

const colors = ["#fff", "#303030"];

const randomIntFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColors = colors => colors[Math.floor(Math.random() * colors.length)];

class Particle {
    constructor(x, y, radius, color) {
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.color = color,
        this.radians = Math.random() * Math.PI * 2,
        this.velocity = .05,
        this.distanceFromCenter = randomIntFromRange(5, 10)
    }

    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        this.radians += this.velocity;
        this.x = this.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }

    draw(lastPoint) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.radius;
        context.moveTo(lastPoint.x, lastPoint.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }
}

let particles;

const init = () => {
    particles = new Array();
    for (let i = 0; i < 100; i++) {
        const radius = randomIntFromRange(2, 4);
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColors(colors)));
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    context.fillStyle = "darkgray";
    context.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();