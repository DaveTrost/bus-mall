// This class adapted from W3Schools
// https://www.w3schools.com/graphics/game_sound.asp
export class Sound {
    constructor(src) {
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = 'none';
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        };
        this.loop = function(){
            this.sound.play();
            this.sound.loop = true;
        };
        this.stop = function(){
            this.sound.pause();
        };
    }
}
