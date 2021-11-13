var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function point(x, y){
    c.beginPath();
    c.arc(x, y, 5, 0, 2 * Math.PI, false);
    c.fill();
}

var c = canvas.getContext('2d');


function sorteiaPonto(){

 do {
     x = Math.trunc(Math.random()*1000);
     y = Math.trunc(Math.random()*1000);
    } while(x > 850 || x < 50 || y > 350 || y < 50);

    var point = [];
    point.push(x, y);
return point;
}


function montador(){
    var array = [];
    var pointsArray = [];
    pointsArray.push(sorteiaPonto());
    pointsArray.push(sorteiaPonto());
    do{
        array = sorteiaPonto();
    } while(array[0] == pointsArray[0][0] && array[0] == pointsArray[1][0])

    pointsArray.push(array);

    return pointsArray;
}


function lines(){
 c.beginPath();
 c.moveTo(pontos[0][0], pontos[0][1]);
 c.lineTo(pontos[1][0], pontos[1][1]);
 c.moveTo(pontos[1][0], pontos[1][1]);
 c.lineTo(pontos[2][0], pontos[2][1]);
 c.moveTo(pontos[2][0], pontos[2][1]);
 c.lineTo(pontos[0][0], pontos[0][1]);
 c.strokeStyle = "blue";
 c.lineWidth = 1;
 c.stroke();
}
// lines();
// var midX1 = (x1 + x2) / 2;
// var midY1 = (y1 + y2) / 2;
// var dx1 = (x2 - x1);
// var dy1 = (y2 - y1);

// var midX2 = (x2 + x3) / 2;
// var midY2 = (y2 + y3) / 2;
// var dx2 = (x3 - x2);
// var dy2 = (y3 - y2);

// var midX3 = (x3 + x1) / 2;
// var midY3 = (y3 + y1) / 2;
// var dx3 = (x1 - x3);
// var dy3 = (y1 - y3);


function mediatriz(x1, y1, x2, y2){
    var midX = (x1 + x2) / 2;
    var midY = (y1 + y2) / 2;
    var dx = (x2 - x1);
    var dy  = (y2 - y1);

    c.beginPath()
    c.moveTo(midX, midY);
    c.lineTo(midX + 10*dy, midY - 10*dx);
    c.lineTo(midX - 10*dy, midY + 10*dx);
    c.strokeStyle = "green";
    c.lineWidth = 1;
    c.stroke();
}

// mediatriz(midX1, midY1, dx1, dy1);
// mediatriz(midX2, midY2, dx2, dy2);
// mediatriz(midX3, midY3, dx3, dy3);

function fitCircleToPoints(x1, y1, x2, y2, x3, y3) {
    var x, y, u;
    const slopeA = (x2 - x1) / (y1 - y2); // slope of vector from point 1 to 2
    const slopeB = (x3 - x2) / (y2 - y3); // slope of vector from point 2 to 3
    if (slopeA === slopeB)  { return } // Slopes are same thus 3 points form striaght line. No circle can fit.
    if(y1 === y2){   // special case with points 1 and 2 have same y 
        x = ((x1 + x2) / 2);
        y = slopeB * x + (((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2));  
    }else
    if(y2 === y3){ // special case with points 2 and 3 have same y 
        x = ((x2 + x3) / 2);
        y = slopeA * x + (((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2));  
    } else{
        x = ((((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2)) - (u = ((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2))) / (slopeA - slopeB);
        y = slopeA * x + u;
    }
    
    return {
        x, y, 
        radius: ((x1 - x) ** 2 + (y1 - y) ** 2) ** 0.5,
        CCW: ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)) >= 0,
    };
}

function Circle(){
c.beginPath();
c.arc(fitCircleToPoints(pontos[0][0], pontos[0][1], pontos[1][0], pontos[1][1], pontos[2][0], pontos[2][1]).x, 
fitCircleToPoints(pontos[0][0], pontos[0][1], pontos[1][0], pontos[1][1], pontos[2][0], pontos[2][1]).y,
fitCircleToPoints(pontos[0][0], pontos[0][1], pontos[1][0], pontos[1][1], pontos[2][0], pontos[2][1]).radius,
0, 2 * Math.PI, false);
c.strokeStyle = "red";
c.lineWidth = 2;
c.stroke();
}

// Circle();

async function animar(){
    c.clearRect(0, 0, innerWidth, innerHeight);
    pontos = montador();
    point(pontos[0][0], pontos[0][1]);
     await sleep(1000);
     point(pontos[1][0], pontos[1][1]);
     await sleep(1000);
     point(pontos[2][0], pontos[2][1]);
     await sleep(1000);
     lines();
     await sleep(1000);

    mediatriz(pontos[0][0], pontos[0][1], pontos[1][0], pontos[1][1]);
     await sleep(1000);
    mediatriz(pontos[1][0], pontos[1][1], pontos[2][0], pontos[2][1]);
     await sleep(1000);
    mediatriz(pontos[2][0], pontos[2][1], pontos[0][0], pontos[0][1]);

     await sleep(1000);

     Circle();

}