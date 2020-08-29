var Main = {
    table: null,
    pixels: [],
    init : function(table){
            this.enabledBrush();
            this.table = document.getElementById("table");
            this.pixels = [];
            for(var i=0; i<50;i++){
                var row = document.createElement("div");
                row.classList.add("row-div");
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
                    row.appendChild(col);
                }
            this.table.appendChild(row);
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
    }
}