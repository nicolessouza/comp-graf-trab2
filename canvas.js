var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.beginPath();
// c.moveTo(550, 200);
// c.lineTo(550, 350);
// c.lineTo(750, 350);
// c.closePath();

const timer = ms => new Promise(res => setTimeout(res,ms))

function triangle(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;

    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x, this.y + 150);
    c.lineTo(this.x + 200, this.y + 150);
    c.closePath();
    
    // the fill color
    c.fillStyle = this.color;
    c.fill();
}



function square(x, y, degrees){
    this.x = x;
    this.y = y;
    this.degrees = degrees;

    this.draw = function(cor){
        this.cor = cor;

        c.save();

        c.beginPath();
        // move the rotation point to the center of the rect
        c.translate(this.x+50/2, this.y+50/2 );
        // rotate the rect
        c.rotate(degrees*Math.PI/180);
    
        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        c.rect( -50/2, -50/2, 50,50);

        c.lineWidth = 2;
        c.strokeStyle = "black";
        c.stroke();
        c.fillStyle=this.cor;
        c.fill();
    
        // restore the context to its untranslated/unrotated state
        c.restore();
    }

    this.update = function(xfinal, yfinal, cor){
        degrees = -53.1;

        
        if (this.x > xfinal){
            this.x -= 2;
        } else if (this.x < xfinal){
            this.x += 2;
        } else{
            if (this.y > yfinal){
                this.y -= 2;
            } else if (this.y < yfinal){
                this.y += 2;
            // } else{
            //     this.x = xfinal;
            //     this.y = yfinal;
            // }
            } 
        }
        this.draw(cor);

}
}

function Square(X, Y, L, degrees){
    this.X = X;
    this.Y = Y;
    this.L = L;
    this.degrees = degrees;

    this.make = function(){
        var squareArray = [];
        var y = this.Y;
        for (var i = 0; i < this.L; i++){
            var x = this.X;
            for (var j = 0; j < this.L; j++){
            squareArray.push(new square(x, y, degrees));
            x += 50;
            }
        y += 50;
        }
    return squareArray;
    }
    

    this.update = function(){
        if(degrees > -53.1){
        degrees -= 0.3;
        this.make();
    }
}

}


function hipo(x, y, degrees){
    this.x = x;
    this.y = y;
    this.degrees = degrees;

    this.draw = function(cor){
        this.cor = cor;

        c.save();

        c.beginPath();
        // move the rotation point to the center of the rect
        c.translate(this.x+50/2, this.y+50/2 );
        // rotate the rect
        c.rotate(degrees*Math.PI/180);
    
        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        c.rect( -50/2, -50/2, 50,50);

        c.lineWidth = 2;
        c.strokeStyle = "black";
        c.stroke();
        c.fillStyle=this.cor;
        c.fill();
    
        // restore the context to its untranslated/unrotated state
        c.restore();
    }

    this.update = function(xfinal, yfinal, cor){
        this.cor = cor;
        degrees = 0;

        if (this.x > xfinal){
            this.x -= 2;
        } else if (this.x < xfinal){
            this.x += 2;
        } else{
            if (this.y > yfinal){
                this.y -= 2;
            } else if (this.y < yfinal){
                this.y += 2;
            } 
        }
        this.draw(cor) 
      }
}

function Hipo(X, Y, L, degrees){
    this.X = X;
    this.Y = Y;
    this.L = L;
    this.degrees = degrees;


    this.make = function(){
        var Y = this.Y;
        var X = this.X;
        var squareArray = [];


        for (var i = 0; i < this.L; i++){
            var x = X;
            var y = Y;
            for (var j = 0; j < this.L; j++){
                squareArray.push(new hipo(x, y, degrees));
                x += 40;
                y += 30;
            }
        X += 30
        Y -= 40
        }

    return squareArray;
    }

     this.update = function(){
         if (degrees < 0){
         degrees += 0.3;
         }
         this.make();
     }
}


 function Draw(lista, color){
     this.lista = lista;
     this.color = color;

     for (i = 0; i < lista.length; i++){
     lista[i].draw(this.color);
     }
 }

 // versão funcionando



// Square(550, 350, 4, "yellow");
// a square

// Draw(Hipo(200, 200, 3), "magenta");

// drawRotatedSquare(560,170,50,-53.1, "yellow");
// drawRotatedSquare(560 + 40 ,170 + 30,50,-53.1, "blue");

// quar1 = new Hipo(560, 170, 5, -53.1);
// quar1.update();
function montarFigura(){
quad1 = new Hipo(560, 170, 5, -53.1);
quad2 = new Hipo(560, 170, 5, -53.1);
cat1 = new Square(400, 200, 3, 0);
cat11 = new Square(400, 200, 3, 0);
cat2 = new Square(550, 350, 4, 0);
cat22 = new Square(550, 350, 4, 0);
quadrinho1 = cat1.make();
quadrinho2 = cat2.make();
quadrinho = quad2.make();

myStopFunction1();
myStopFunction2();
}


function animate1() {
    //   requestAnimationFrame(animate1);
      c.clearRect(0, 0, innerWidth, innerHeight);
      Draw(quad1.make(), "rgba(255,255,0,0.5)");
      triangle(550, 200, "pink");
    //Draw(cat1.make(), "rgba(0,200,0,0.5)");
      Draw(cat22.make(), "white");
      Draw(cat11.make(), "white");
      


        if(cat2.make()[0].degrees > -53.1){
            Draw(cat2.make(), "rgba(0,0,255,0.5)");
            Draw(cat1.make(), "rgba(0,200,0,0.5)");
            cat2.update();
            cat1.update();
        }

         else{
            quadrinho2[15].update(750,250, "rgba(0,0,255,0.5)");
            for (var j = 0; j < 3; j++){
                for (var i = 0; i < 5; i++){
                    quadrinho2[i + 5*j].update((620 + 40*i) + 30*j, (90 + 30*i) - 40*j, "rgba(0,0,255,0.5)");
                    
                }
                 }
        

                 for (var j = 0; j < 2; j++){
                    for (var i = 0; i < 5; i++){
                        quadrinho1[i + 5*j].update((560 + 40*i) + 30*j, (170 + 30*i) - 40*j, "rgba(0,200,0,0.5)");
                    }
                  }
          }
    }

   var anima1;
   function animar1() {
       montarFigura();
       myStopFunction2();
       anima1 = setInterval(animate1, 10);
   }

   var anima2;
   function animar2() {
        montarFigura();
        myStopFunction1();
       anima2 = setInterval(animate3, 10);
   }

   function myStopFunction1() {
    clearInterval(anima1);
    clearInterval(anima2);
    c.clearRect(0, 0, innerWidth, innerHeight);
    Draw(quad1.make(), "rgba(255,255,0,0.5)");
    triangle(550, 200, "pink");
    Draw(cat11.make(), "rgba(0,200,0,0.5");
    Draw(cat22.make(), "rgba(0,0,200,0.5)");
  }

  function myStopFunction2() {
    clearInterval(anima1);
    clearInterval(anima2);
    c.clearRect(0, 0, innerWidth, innerHeight);
    Draw(quad1.make(), "rgba(255,255,0,0.5)");
    triangle(550, 200, "pink");
    Draw(cat11.make(), "rgba(0,200,0,0.5");
    Draw(cat22.make(), "rgba(0,0,200,0.5)");
  }

    // function animate2(){
      
    //     requestAnimationFrame(animate2);

    //     c.clearRect(0, 0, innerWidth, innerHeight);
    //     Draw(quad1.make(), "rgba(255,255,0,0.5)");
    //     triangle(550, 200, "yellow");
    //     Draw(cat11.make(), "white");
    //     Draw(cat2.make(), "rgba(0,0,255,0.5)");


  
    //         if(cat1.make()[0].degrees > -53.1){
    //            Draw(cat1.make(), "rgba(0,200,0,0.5)");
    //            cat1.update();
    //           }
  
    //           else{
    //               for (var j = 0; j < 2; j++){
    //                for (var i = 0; i < 5; i++){
    //                    quadrinho1[i + 5*j].update((560 + 40*i) + 30*j, (170 + 30*i) - 40*j, "rgba(0,200,0,0.5)");
    //                }
    //          }
              
    //           }
          
        
    //     }

        function animate3() {
            c.clearRect(0, 0, innerWidth, innerHeight);
            // montarFigura();
            triangle(550, 200, "pink");
            Draw(cat11.make(), "rgba(0,200,0,0.5");
            Draw(cat22.make(), "rgba(0,0,200,0.5)");
            Draw(quad1.make(), "white");
        
        
            if (quad2.make()[0].degrees < 0){
            Draw(quad2.make(), "rgba(255,255,0,0.5)");
            quad2.update();
            }
        
            else{
        
                for (var i = 0; i < 3; i++){
                    for (var j = 0; j < 3; j++){
                    quadrinho[j + 3*i].update(400 + 50*j, 200 + 50*i, "rgba(255,255,0,0.5)");
                    }
                }
        
                for (var k = 0; k < 4; k++){
                    for (var p = 0; p < 4; p++){
                    quadrinho[9 + (p + 4*k)].update(550 + 50*p, 350 + 50*k, "rgba(255,255,0,0.5)");
                    }
                }
                
        
            }
        }
        
montarFigura();