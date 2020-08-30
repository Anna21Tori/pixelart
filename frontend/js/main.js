var Main = {
    table: null,
    pixels: [],
    stroke:{
        x:0,
        defaultWidth:360,
        defaultHeight:30,
        r:0,
        g:0,
        b:0,
        hsl:[0,0,0]
    },
    init : function(table){
            this.enabledBrush();
            this.table = document.getElementById("table");
            this.pixels = [];
            for(var i=0; i<50;i++){
//                var row = document.createElement("div");
//                row.classList.add("row-div");
                for(var j=0; j<50;j++){
                    var col = document.createElement("div");
                    col.classList.add("col-div");
                    this.pixels[this.pixels.length] = this.addNewPixel(j, i, "rgb(255,255,255)");
                   
                    //change color any "pixel" after click
                    col.addEventListener("click", function(){
                        var tools = document.getElementsByClassName("tools-paint");
                        for(var i=0;i<tools.length;i++){
                            if(tools[i].style.color == "deeppink")
                                if(tools[i].id == "brush"){
                                    this.style.background = document.getElementById("color-input").value;
                                    return;
                                }
                        }
                        console.log(this.style.backgroundColor)
                        //convert rgb to hex
                        var rgb = this.style.backgroundColor;
                        var sep = rgb.indexOf(",") > -1 ? "," : " ";
                        rgb = rgb.substr(4).split(")")[0].split(sep);
                        
                        var r = (+rgb[0]).toString(16),
                        g = (+rgb[1]).toString(16),
                        b = (+rgb[2]).toString(16);

                        if (r.length == 1)
                            r = "0" + r;
                        if (g.length == 1)
                            g = "0" + g;
                        if (b.length == 1)
                            b = "0" + b;

                        var hex =  "#" + r + g + b;
                        
                        document.getElementById("color-input").value = hex//this.style.backgroundColor;
                        
                    });
//                    row.appendChild(col);
                    this.table.appendChild(col);
                }
            
            }
         console.log(this.pixels)
        document.cookie = "pixels= ok"//+this.pixels;
    },
    reset : function(){
        this.table.innerHTML = '';
        this.resetColorToolsPaint();
        this.init();
    },
    enabledBrush: function(){
        document.getElementById("brush").style.color = "deeppink";
    },
    resetColorToolsPaint: function(){
        var tools = document.getElementsByClassName("tools-paint");
        for(var i=0;i<tools.length;i++){
            tools[i].style.color = "black";
        }
    },
    setEnabled: function(e){
        this.resetColorToolsPaint();
        e.style.color = "deeppink";
    },
    addNewPixel: function(idC, idR, col){
        return {
        idCol: idC,
        idRow: idR,
        color: col
        }
    },
    initColorPicker: function(){
         window.addEventListener('mousemove', function (e) {
           console.log(e.pageX, e.pageY)
        })
    },
    rgbWheel: function(repaint = false){
        var c = document.getElementById("rgb-wheel");
        var ctx = c.getContext("2d");
        var canvasInfo = c.getBoundingClientRect();
        ctx.clearRect(0, 0, c.width, c.height);
        var grd = ctx.createLinearGradient(0, 0, c.offsetWidth*0.9, 0);
        grd.addColorStop(0, "rgb(0,255,255)");
        grd.addColorStop("0.2", "rgb(0,0,255)");
        grd.addColorStop("0.4", "rgb(255,0,255)");
        grd.addColorStop("0.6", "rgb(255, 0, 0)");
        
        grd.addColorStop("0.8", "rgb(255,255,0)");
        grd.addColorStop("0.9", "rgb(0,255,0)");
        grd.addColorStop(1, "rgb(0,255,255)");

        ctx.fillStyle = grd;
        var start = this.stroke.defaultHeight/3
        ctx.fillRect(start, c.height/3, c.width - (2*start), c.height - (2*c.height/3));
        this.drawdefaultView(ctx, canvasInfo, !repaint)
    },
    drawCanvas: function(){
        var c = document.getElementById("color");
        var ctx = c.getContext("2d");
        var canvasInfo = c.getBoundingClientRect();
        ctx.clearRect(0, 0, c.width, c.height);
        this.convertRGBToHSL();
        var hue = this.stroke.hsl[0];
        console.log("hue:"+ this.stroke.hsl[0]," ", this.stroke.x);
        for(var row=0; row<c.height; row++){
            var grad = ctx.createLinearGradient(0, 0, c.width,c.height);
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
    dragStrokView: function(e){
        console.log(e.clientX, e.clientY);
    },
    changePositionLeft: function(){
        this.stroke.x--;
        if(this.stroke.x < 2*this.stroke.defaultHeight/3)
            this.stroke.x = 2*this.stroke.defaultHeight/3;
        this.rgbWheel(true);
        
    },
    changePositionRight: function(){
        console.log(this.stroke.x);
        this.stroke.x++;
        if(this.stroke.x > this.stroke.defaultWidth-(2*this.stroke.defaultHeight/3))
            this.stroke.x = this.stroke.defaultWidth-(2*this.stroke.defaultHeight/3);
        this.rgbWheel(true);
    },
    getColor: function(ctx, x, y, width = 1, height = 1){
        var imgData = ctx.getImageData(x, y, width, height);
        this.stroke.r = imgData.data[0];
        this.stroke.g = imgData.data[1];
        this.stroke.b = imgData.data[2];
        console.log("rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")")
        return "rgb("+imgData.data[0]+", "+imgData.data[1]+", "+imgData.data[2]+")";
    },
    convertRGBToHSL: function(){
        var r = this.stroke.r / 255;
    var g = this.stroke.g / 255;
    var b =this.stroke.b / 255;
 
    var maxColor = Math.max(r,g,b);
    var minColor = Math.min(r,g,b);
    //Calculate L:
    var L = (maxColor + minColor) / 2 ;
    var S = 0;
    var H = 0;
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