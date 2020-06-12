
function load_images() {

    enemy_image = new Image;
    enemy_image.src ="Assets/v1.png";
    
    enemy_image2 = new Image;
    enemy_image2.src ="Assets/v2.png";
    
    player_image = new Image;
    player_image.src = "Assets/superhero.png";
    
    gem_image = new Image;
    gem_image.src = "Assets/gemm.png";
    
}

function init() {
    
    canvas =  document.getElementById("mycanvas");
    W = 700;
    H = 400;
    
    canvas.width = W;
    canvas.height = H;
    
    pen = canvas.getContext('2d');
    game_over = false;
    
    e1 = {
        x : 100,
        y : 50,
        w : 60,
        h : 60,
        speed: 10
    };
    e2 = {
        x : 240,
        y : 190,
        w : 60,
        h : 60,
        speed: 30
    };
    e3 = {
        x : 390,
        y : 300,
        w : 60,
        h : 60,
        speed: 20
    };
    e4 = {
        x : 530,
        y : 340,
        w : 60,
        h : 60,
        speed: 35
    };
    
    enemy = [e1,e2,e3,e4];
    
    player = {
        x : 20,
        y : H/2, 
        w : 60,
        h : 60,
        speed : 20,
        moving : false,
        health : 100
    }
    gem = {
        x : W - 80,
        y : H/2, 
        w : 60,
        h : 60
    }
    
    // events
   canvas.addEventListener('mousedown', function(){
       console.log("Mouse");
        player.moving = true;
    });
    canvas.addEventListener('mouseup', function(){
       console.log("Mouse");
        player.moving = false;
    });
}

function isOverlap(rect1,rect2) {
    if(rect1.x < rect2.x + rect2.w &&
       rect1.x + rect1.w > rect2.x &&
       rect1.y < rect2.y + rect2.h &&
       rect1.y + rect1.h > rect2.y)
    {
        return true;
    }
    
    return false;
}

function draw() {
    
    
    
    // clear old frame
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle = "red";
//    pen.fillRect(box.x,box.y,box.w,box.h);
    
    // draw the player
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    
    //draw the gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    for(let i = 0;i<enemy.length;i++) {
        enw = enemy_image2;
        if(i %2 == 0) {
            enw = enemy_image;
        }
        pen.drawImage(enw,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.fillStyle = "white";
    pen.fillText("Score "+ player.health, 10,10);
    
}

function update() {
    
    
    if(player.moving == true) {
        player.x += player.speed;
        player.health += 20;
    }
    
    for(let i = 0;i< enemy.length ;i++) {
        if(isOverlap(player,enemy[i]) && i%2!=0) {
            player.health -= 70;
        } else if(isOverlap(player,enemy[i])){
            player.health -= 50;
        }
        if(player.health < 0) {
            game_over = true;
            alert("Game Over" + player.health);
        }
    }
    
    if(isOverlap(player,gem)) {
       console.log("You won!");
       alert("You won!"+player.health);
       game_over = true;
       
   }
    
    for(let i = 0;i<enemy.length;i++) {
        enemy[i].y += enemy[i].speed;

        if(enemy[i].y > H - enemy[i].h || enemy[i].y < 0 || enemy[i].x < 0 || enemy[i].x > W - enemy[i].w) {

            enemy[i].speed *= -1;

        }
    }
}

function gameloop() {
    
    if(game_over == true) {
        clearInterval(f);
    }
    
    draw();
    update();
    
}

load_images();
init();

var f = setInterval(gameloop,100);