console.log("Loaded classes");

// The snake is a player controlled entity that moves, grow, and eventually die :(
class Snake {
    constructor() {
        this.head = [Math.floor(game.rows/2), Math.floor(game.cols/2)]; // current [x,y]
        this.body = [] // [[x,y], [x,y], [x,y]];
        this.direction = [0,0];
        this.defaultColor = "white";
        this.isAlive = true;
    }

    update() {
        if(!this.isAlive) return;

        this.control();
        this.move();

        // Death
        if(this.isSelfColliding()) {
            this.die();
        }
    }

    draw(canvasContext, tileSize, headFillStyle=this.defaultColor, bodyFillStyle=this.defaultColor) {
        canvasContext.fillStyle = headFillStyle;
        canvasContext.fillRect(this.head[0]*tileSize, this.head[1]*tileSize, tileSize, tileSize);

        // vvv draw body vvv
        canvasContext.fillStyle = bodyFillStyle;
        for(let b=0; b<this.body.length; b++) {
            const bodyPart = this.body[b];
            canvasContext.fillRect(bodyPart[0]*tileSize, bodyPart[1]*tileSize, tileSize, tileSize);
        }
    }

    grow() {
        const length = this.body.length;
        if(length === 0) {
            this.body.push([this.head[0]-this.direction[0] , this.head[1]-this.direction[1]])
        }
        else {
            let dirX = this.direction[0];
            let dirY = this.direction[1];
            if(length >= 2) {
                dirX = this.body[length-2][0] - this.body[length-1][0];
                dirY = this.body[length-2][1] - this.body[length-1][1];
            }
            this.body.push([this.body[length-1][0]-dirX , this.body[length-1][1]-dirY]);
        }
    }

    control() {
        const isGoingNowhere = this.direction[0] === 0 && this.direction[1] === 0;
        const isGoingUp = this.direction[0] === 0 && this.direction[1] === -1;
        const isGoingDown = this.direction[0] === 0 && this.direction[1] === 1;
        const isGoingLeft = this.direction[0] === -1 && this.direction[1] === 0;
        const isGoingRight = this.direction[0] === 1 && this.direction[1] === 0;
        switch(keyboard.getLastBuffered()) {
            case "w": {
                if(isGoingLeft || isGoingRight || isGoingNowhere) this.direction = [0, -1];
                break;
            }
            case "s": {
                if(isGoingLeft || isGoingRight || isGoingNowhere) this.direction = [0, 1];
                break;
            }
            case "a": {
                if(isGoingUp || isGoingDown || isGoingNowhere) this.direction = [-1, 0];
                break;
            }
            case "d": {
                if(isGoingUp || isGoingDown || isGoingNowhere) this.direction = [1, 0];
                break;
            }
        }
    }

    move() {
        // body
        for(let b=this.body.length-1; b>=0; b--) {
            if(b === 0) {
                this.body[b][0] = this.head[0];
                this.body[b][1] = this.head[1];
            }
            else {
                this.body[b][0] = this.body[b-1][0];
                this.body[b][1] = this.body[b-1][1];
            }
        }
        // head
        this.head[0] = m.wrap(this.head[0] + this.direction[0], 0, game.rows);
        this.head[1] = m.wrap(this.head[1] + this.direction[1], 0, game.cols);
    }

    isAtPoint(pointX, pointY, isIncludingBody=false) {
        if(this.head[0] === pointX && this.head[1] === pointY) {
            return true;
        }

        if(isIncludingBody) {
            for(let b=0; b<this.body.length; b++) {
                if(this.body[b][0] === pointX && this.body[b][1] === pointY) {
                    return true;
                }
            }
        }

        return false;
    }

    isSelfColliding() {
        for(let b=0; b<this.body.length; b++) {
            if(this.head[0] === this.body[b][0] && this.head[1] === this.body[b][1]) {
                return true;
            }
        }
        return false;
    }

    die() {
        this.isAlive = false;
    }
}





// Very tasty for snakes!
class Apple {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    draw(canvasContext, tileSize, fillStyle="red") {
        canvasContext.fillStyle = fillStyle;
        canvasContext.fillRect(this.x*tileSize, this.y*tileSize, tileSize, tileSize);
    }
}