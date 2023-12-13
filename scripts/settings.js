console.log("Loaded settings");

// HTML Elements references
const element_settings_container = document.getElementById("settings-container");
const element_settings_toggle = document.getElementById("settings-button");
const element_settings_theme = document.getElementById("settings__theme");
const element_settings_speed = document.getElementById("settings__speed");


// settings value-mapping
const settings_theme = {
    "theme_01": {
        colorPlayer: "white",
        colorTrail: "lightgray",
        colorApple: "red",
        backgroundClass: "theme_01__background-color",
    },
    "theme_02": {
        colorPlayer: "blanchedalmond",
        colorTrail: "burlywood",
        colorApple: "forestgreen",
        backgroundClass: "theme_02__background-color",
    },
    "theme_03": {
        colorPlayer: "yellow",
        colorTrail: "orange",
        colorApple: "firebrick",
        backgroundClass: "theme_03__background-color",
    },
}

const settings_speed = {
    "speed_slow": 16,
    "speed_medium": 8,
    "speed_fast": 4,
}


// setTheme function cuz we call it in game.js
const setTheme = (themeString) => {
    game.player.headColor = settings_theme[themeString].colorPlayer;
    game.player.bodyColor = settings_theme[themeString].colorTrail;
    game.apple.color = settings_theme[themeString].colorApple;
    document.querySelector("body").className = settings_theme[themeString].backgroundClass;
}


// Event Listeners for settings Elements
element_settings_toggle.addEventListener("click", event => {
    element_settings_container.className = element_settings_container.className === "" ? "hidden" : "";
});

element_settings_theme.addEventListener("change", event => {
    setTheme(element_settings_theme.value);
});

element_settings_speed.addEventListener("change", event => {
    game.speed = settings_speed[element_settings_speed.value];
});