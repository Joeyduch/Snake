console.log("Loaded game");

// Some useful constant for some element rendering
CANVAS_ELEMENT_ID = "game";
SCORE_ELEMENT_ID = "score";
SCORE_PB_ELEMENT_ID = "score_pb";



// Where most of the game logic happens
const game = {
    _tickUpdateFrame: 0,

    speed: 8,
    width: 800,
    height: 480,
    tileSize: 32,
    colorBG: "rgb(25,25,25)",

    isPaused: false,
    rows: 0,
    cols: 0,
    score: 0,

    canvas: null,
    context: null,
    scoreElement: null,
    scorePbElement: null,
    player: null,
    apple: null,

    init: function(canvasElementId, scoreElementId, scorePbElementId) {
        if(!canvasElementId || !scoreElementId || !scorePbElementId) {
            console.error("Provide id for canvas and score elements");
            return;
        }

        this.canvas = document.getElementById(canvasElementId);
        this.context = this.canvas.getContext("2d");
        this.scoreElement = document.getElementById(scoreElementId);
        this.scorePbElement = document.getElementById(scorePbElementId);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.rows = Math.ceil(this.width / this.tileSize);
        this.cols = Math.ceil(this.height / this.tileSize);

        this.player = new Snake();
        this.apple = new Apple();

        this.addScore(-this.score);
        this.moveApple();

        if(localStorage.getItem("score_pb")) {
            this.scorePbElement.innerHTML = localStorage.getItem("score_pb");
        }
        if(setTheme) {
            setTheme(element_settings_theme.value);
        }
    },

    update: function() {
        this.player.update();

        // interaction player > apple
        if(this.player.isAtPoint(this.apple.x, this.apple.y)) {
            this.moveApple();
            this.player.grow();
            this.addScore();
        }
        if(!this.player.isAlive && keyboard.isPressed("r")) this.init(CANVAS_ELEMENT_ID, SCORE_ELEMENT_ID, SCORE_PB_ELEMENT_ID);

        // engine
        this.draw();
        keyboard.clearBuffer();
    },

    draw: function() {
        const ctx = this.context;
        // Background
        ctx.clearRect(0,0,this.width, this.height)
        // Objects
        this.player.draw(ctx, this.tileSize);
        this.apple.draw(ctx, this.tileSize);
        // Death text
        if(!this.player.isAlive) {
            ctx.textAlign = "center";
            
            ctx.font = "64px sans-serif";
            ctx.fillStyle = "black";
            ctx.fillText("YOU DIED", this.width/2 +2, this.height/2 +2); // shadow
            ctx.fillStyle = "red";
            ctx.fillText("YOU DIED", this.width/2, this.height/2);

            ctx.font = "32px sans-serif";
            ctx.fillStyle = "black";
            ctx.fillText("Press [R] to restart", this.width/2 +2, this.height - this.height/4 +2); // shadow
            ctx.fillStyle = "red";
            ctx.fillText("Press [R] to restart", this.width/2, this.height - this.height/4);
        }
        
    },

    addScore: function(amount=1) {
        this.score += amount;
        this.scoreElement.innerHTML = this.score;
    },

    moveApple: function() {
        if(!this.apple || !this.player) {
            console.error("game needs an Apple and a Player instance");
            return;
        }

        // make sure apple doesnt spawn on snake
        let newX = Math.floor(Math.random()*this.rows);
        let newY = Math.floor(Math.random()*this.cols);
        while(this.player.isAtPoint(newX, newY, true)) {
            newX = Math.floor(Math.random()*this.rows);
            newY = Math.floor(Math.random()*this.cols);
        }
        this.apple.x = newX;
        this.apple.y = newY;
    }
}





// Main functions
function _start() {
    game.init(CANVAS_ELEMENT_ID, SCORE_ELEMENT_ID, SCORE_PB_ELEMENT_ID);

    window.requestAnimationFrame(() => {_update()});
}


// Main update at full speed
function _update() {
    if(game.isPaused) {
        window.requestAnimationFrame(_update);
        return;
    }

    // Update the game at tick speed
    game._tickUpdateFrame = (game._tickUpdateFrame+1) % game.speed;
    if(game._tickUpdateFrame === 0) game.update();

    window.requestAnimationFrame(_update);
}





// Keep at end, starts the game once everything is loaded
window.addEventListener("load", () => {
    _start();
});