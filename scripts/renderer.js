class Renderer {
    constructor(scale) {
        this.columns = 64;
        this.rows = 32;
        this.scale = scale;
        this.canvas = document.querySelector("#canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.columns * this.scale;
        this.canvas.height = this.rows * this.scale;//gets real dimensions
        this.display = new Array(this.columns * this.rows);//array for each pixel


    }
    setPixel(x,y) {//pixel modifier
        if (x > this.columns) {
            x -= this.columns;
        }
        else if (x < 0) {
            x += this.columns;
        }
         //pixel wrapping
        if (y > this.rows) {
            y -= this.rows;
        }
        else if (y < 0) {
            y += this.rows;
        } //pixel wrapping
        let pixellocation = x + (y * this.columns);
        this.display[pixellocation] ^= 1; //xor with 1, pixel changes each time
        return !this.display[pixellocation]; //return pixel added or erased, true means erased and false means not erased
    }
    clear() {//reset canvas
        this.display = new Array(this.columns * this.rows);
    }
    render() {// 60 FPS
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear every frame
        for (let i = 0; i < this.columns * this.rows; i++)
        {
            let x = (i % this.columns) * this.scale; //x position of i in canvas
            let y = math.floor(i / this.columns) * this.scale;
            if (this.display[i] == 1) {//if pixel is on, fill pixel
                this.context.fillStyle = '#000000';
                this.context.fillRect(x, y, this.scale, this.scale)//place scaled pixel
            }
            
        }
    }
    testRender() {
        this.setPixel(0, 0);
        this.setPixel(1, 1);
        this.setPixel(0, 2);
        this.setPixel(2, 2);
        this.setPixel(1, 2);
        this.setPixel(0, 3);
        this.setPixel(2, 3);
        this.setPixel(2, 0);
    }
}


export default Renderer;
//graphics rendering