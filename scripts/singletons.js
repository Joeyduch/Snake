console.log("Loaded singletons");

/*
    INPUT
*/

// Managing keyboard input
const keyboard = {
    keysDown: [],
    keysBuffer: [],

    press: function(key) {
        if(this.keysDown.indexOf(key) === -1) this.keysDown.push(key);
        if(this.keysBuffer.indexOf(key) === -1) this.keysBuffer.push(key);
    },

    release: function(key) {
        const keyIndex = this.keysDown.indexOf(key);
        if(keyIndex != -1) this.keysDown.splice(keyIndex, 1);
    },

    isPressed: function(key) {
        return this.keysDown.indexOf(key) != -1 ? true : false;
    },

    getLastPressed: function() {
        const length = this.keysDown.length
        if(length < 1) return null;
        return this.keysDown[length-1];
    },

    clearBuffer: function() {
        this.keysBuffer = [];
        this.keysDown.forEach(key => {
            this.keysBuffer.push(key);
        });
    },

    isBuffered: function(key) {
        return this.keysBuffer.indexOf(key) != -1 ? true : false;
    },

    getLastBuffered: function() {
        const length = this.keysBuffer.length;
        if(length < 1) return null;
        return this.keysBuffer[length-1];
    }
}

window.addEventListener("keydown", event => {
    keyboard.press(event.key.toLowerCase());
});

window.addEventListener("keyup", event => {
    keyboard.release(event.key.toLowerCase());
});





/*
    MATH
*/

// Some useful math stuff not available by Javascript
const m = {
    // min = inclusive | max = exclusive
    wrap: function(number, min, max) {
        if(isNaN(number) || isNaN(min) || isNaN(max)) console.error("Args shall be numbers");
        if(min>max) console.error("Impossible wrap (check min-max args)");

        const shift = -min;
        const range = max - min;

        if(number+shift < 0) return (range - Math.abs(number+shift) % range) - shift;

        return Math.abs(number+shift) % range - shift;
    }
}