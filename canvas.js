let starLimit = 120;
// 100
let colorRange = [ 0, 60, 240 ];
let glowRadiuses = [ .25, .50, .75, 1];
let stars = [];
var colors = ['#3a3586','#aa66cc','#ddeffd','#0a47a1','#ecf0f1','#a2ded0'];
let timeout;
let canvas;

const generateColor = () => {
    let randomIndex = Math.floor(Math.random() * (7 - 1 + 1)) + 1;

    return colors[randomIndex];
}

const generateGlow = () => {
    let randTwo = Math.floor(Math.random() * 10);

    return {
        on : randTwo % 2 === 0 ? true : false,
        direction : randTwo % 2 === 0 ? true : false,
        radius : .25
    }
};

const generateSpeed = () => {
    let randTwo = Math.floor(Math.random() * 10);


    if (randTwo % 2 === 0 && randTwo % 5 === 0) return 'fast'
    if (randTwo % 2 === 0) return 'slow'

    return 'faster'
};

const starFactory = () => {
    let star = {
        x : Math.random() * canvas.offsetWidth,
        y : Math.random() * canvas.offsetHeight,
        radius : Math.random() * 2.5,
        color : generateColor(),
        glow : generateGlow(),
        speed : generateSpeed(),
    };

    return star;
};

const initCanvas = () => {
    stars = [];

    canvas = document.getElementById('starfield');
    let context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for(let i = 0; i < starLimit; i++) {
        x = Math.random() * canvas.offsetWidth;
        y = Math.random() * canvas.offsetHeight;
      
        let star = starFactory(canvas);
        stars.push(star);
    }

    window.requestAnimationFrame(draw);
}

const generateXPositionChange = (star) => {
    if(star.x < canvas.width) {
        star.speed === 'faster' ? star.x += 0.45 
        : star.speed === 'fast' ? star.x += 0.3
        : star.x += .15
    } else {
        star.x = 0;
    }
    return star
};

const increaseGlow = (star) => {
    let currentRadius = star.glow.radius;

    switch ( currentRadius) {
        case .25 : 
            star.radius += .15;
            star.glow.radius = .50;
            break;

        case .50 :
            star.radius += .15;
            star.glow.radius = .75;
            break;

        case .75 :
            star.radius += .15;
            star.glow.radius = 1;
            break;

        case 1 :
            star.glow.direction = 'in';
            break;
    }
    return star;
};

const decreaseGlow = (star) => {
        let currentRadius = star.glow.radius;

        switch ( currentRadius) {
            case 1 : 
                star.radius -= .15;
                star.glow.radius = .75;
                break;
    
            case .75 :
                star.radius -= .15;
                star.glow.radius = .50;
                break;
    
            case .50 :
                star.radius -= .15;
                star.glow.radius = .25;
                break;
    
            case .25 :
                star.glow.direction = 'out';
                break;
        }

        return star;
};

const generateGlowChange = (star) => {
    star.glow.direction === 'out' ? star = increaseGlow(star) : star = decreaseGlow(star);

    return star;
};

const draw = () => {
    let canvas = document.getElementById('starfield'),
    context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    for( let i = 0; i < stars.length ; i ++ ) {
        let star = stars[i];

        star = generateXPositionChange(star, canvas);

        if( star.glow.on ) star = generateGlowChange(star);

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 2 * Math.PI, 360);
        context.fillStyle = star.color;
        context.fill()
    }

    window.requestAnimationFrame(draw);
}

const reset = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    if(timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
        stars = [];
    
        for(i = 0; i < starLimit; i ++) {
            stars.push(starFactory(canvas))
        }
    }, 200)
};

initCanvas();
window.addEventListener('resize', reset);