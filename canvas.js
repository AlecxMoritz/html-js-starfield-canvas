
const getRandom = (min, max) => {
    return Math.floor(Math.random() * ( max - min + 1)) + min;
}
starLimit = 200,
colorRange = [ 0, 60, 240 ],
stars = [];

const initCanvas = () => {
    let canvas = document.getElementById('starfield'),
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for(let i = 0; i < starLimit; i++) {
        
        x = Math.random() * canvas.offsetWidth;
        y = Math.random() * canvas.offsetHeight;
        
        radius = Math.random() * 1.5;
        hue = colorRange[getRandom(0, colorRange.length -1)];
        sat = getRandom(50, 100);
        context.beginPath();
    
        context.arc(x, y, radius, 0, 360);
        context.fillStyle = `hsl(${hue}, ${sat}%,88%)`;
    
        context.fill();
    
        let star = {
            x : Math.random() * canvas.offsetWidth,
            y : Math.random() * canvas.offsetHeight,
            hue : hue,
            sat : sat,
            radius : radius,
            hsl : `hsl(${hue}, ${sat}%,88%)`
        }

        stars.push(star);
    }

    window.requestAnimationFrame(draw);
}

const generateXPositionChange = (star, canvas) => {
    if(star.x < canvas.width) {
        star.x += 0.35;
    } else {
        star.x = 0;
    }
    return star
}


const draw = () => {
    let canvas = document.getElementById('starfield'),
    context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    for( let i = 0; i < stars.length ; i ++ ) {
        let star = stars[i];

        star = generateXPositionChange(star, canvas);

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 2 * Math.PI, 360);
        context.fillStyle = star.hsl;
        context.fill()
    }

    window.requestAnimationFrame(draw);
}

initCanvas();
// draw();