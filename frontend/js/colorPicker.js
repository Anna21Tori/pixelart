let ColorPicker = {
        stroke:{
        x:0,
        defaultWidth:360,
        defaultHeight:30,
        r:0,
        g:0,
        b:0,
        hsl:[0,0,0],
        pageX:600,
        pageY:600,
        distX:0,
        distY:0
    },
     rgbWheel(repaint = false){
        let c = document.getElementById("rgb-wheel");
        let ctx = c.getContext("2d");
        let canvasInfo = c.getBoundingClientRect();
        ctx.clearRect(0, 0, c.width, c.height);
        let grd = ctx.createLinearGradient(0, 0, c.offsetWidth*0.9, 0);
        grd.addColorStop(0, "rgb(0,255,255)");
        grd.addColorStop("0.2", "rgb(0,0,255)");
        grd.addColorStop("0.4", "rgb(255,0,255)");
        grd.addColorStop("0.6", "rgb(255, 0, 0)");
        grd.addColorStop("0.8", "rgb(255,255,0)");
        grd.addColorStop("0.9", "rgb(0,255,0)");
        grd.addColorStop(1, "rgb(0,255,255)");
        ctx.fillStyle = grd;
        let start = this.stroke.defaultHeight/3
        ctx.fillRect(start, c.height/3, c.width - (2*start), c.height - (2*c.height/3));
        this.drawdefaultView(ctx, canvasInfo, !repaint)
    },
    drawCanvas(){
        let c = document.getElementById("color");
        let ctx = c.getContext("2d");
        let canvasInfo = c.getBoundingClientRect();
        ctx.clearRect(0, 0, c.width, c.height);
        this.convertRGBToHSL();
        let hue = this.stroke.hsl[0];
        console.log("hue:"+ this.stroke.hsl[0]," ", this.stroke.x);
        for(let row=0; row<c.height; row++){
            let grad = ctx.createLinearGradient(0, 0, c.width,c.height);
            grad.addColorStop(0, 'rgb(255, 255, 255)');
            grad.addColorStop("0.0001", 'hsl('+hue+', 100%, '+(100-((100*row)/c.height))+'%)');
            grad.addColorStop(1, 'hsl('+hue+', 0%, '+(100-((100*row)/c.height))+'%)');
            ctx.fillStyle=grad;
            ctx.fillRect(0, row, c.width, 1);
            this.drawColorView(ctx, canvasInfo, 100, 0.4, true);
      }	
    }, 
    drawdefaultView: function(ctx, info, firstDraw = false){
        if(firstDraw)
            this.stroke.x = info.width/2;
        this.drawColorView(ctx, info, this.stroke.x)
        this.drawCanvas();
        if(firstDraw)
            this.rgbWheel(true);
    },
    drawColorView: function(ctx, info, targetX, scale=1, drawDoubleBorder= false){
        ctx.beginPath();
        ctx.lineWidth = (this.stroke.defaultWidth*0.01)*scale;
        ctx.strokeStyle = "rgb(255, 255, 255)"
        ctx.fillStyle = this.getColor(ctx, targetX, info.height/2);
        ctx.arc(targetX, info.height/2, (this.stroke.defaultHeight/3)*scale, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        if(drawDoubleBorder){
             ctx.strokeStyle = "rgb(0, 0,0)" 
             ctx.lineWidth = (this.stroke.defaultWidth*0.001)*scale;
             ctx.arc(targetX, info.height/2, ((this.stroke.defaultHeight/3)*scale)+(this.stroke.defaultWidth*0.01)*scale, 0, 2 * Math.PI);
            ctx.stroke();
        }
    },
    changePosition(number){
        this.stroke.x +=number;
        if(this.stroke.x < 2*this.stroke.defaultHeight/3)
            this.stroke.x = 2*this.stroke.defaultHeight/3;
        if(this.stroke.x > this.stroke.defaultWidth-(2*this.stroke.defaultHeight/3))
            this.stroke.x = this.stroke.defaultWidth-(2*this.stroke.defaultHeight/3);
        this.rgbWheel(true);
        
    },
    getColor(ctx, x, y, width = 1, height = 1){
        let imgData = ctx.getImageData(x, y, width, height);
        this.stroke.r = imgData.data[0];
        this.stroke.g = imgData.data[1];
        this.stroke.b = imgData.data[2];
        console.log("rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")")
        return "rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")";
    },
    convertRGBToHSL(){
        let r = this.stroke.r / 255;
        let g = this.stroke.g / 255;
        let b =this.stroke.b / 255;
 
        let maxColor = Math.max(r,g,b);
        let minColor = Math.min(r,g,b);
        //Calculate L:
        let L = (maxColor + minColor) / 2 ;
        let S = 0;
        let H = 0;
        if(maxColor != minColor){
            //Calculate S:
            if(L < 0.5){
                S = (maxColor - minColor) / (maxColor + minColor);
            }else{
                S = (maxColor - minColor) / (2.0 - maxColor - minColor);
            }
            //Calculate H:
            if(r == maxColor){
                H = (g-b) / (maxColor - minColor);
            }else if(g == maxColor){
                H = 2.0 + (b - r) / (maxColor - minColor);
            }else{
                H = 4.0 + (r - g) / (maxColor - minColor);
            }
        }
 
        L = L * 100;
        S = S * 100;
        H = H * 60;
        if(H<0){
            H += 360;
        }
        this.stroke.hsl = [H, S, L];
} 
}