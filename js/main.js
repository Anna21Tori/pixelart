var Main = {
    table: null,
    init : function(table){
            this.enabledBrush();
            this.table = document.getElementById("table");
            for(var i=0; i<50;i++){
                var row = document.createElement("div");
                row.classList.add("row-div");
                for(var j=0; j<50;j++){
                    var col = document.createElement("div");
                    col.classList.add("col-div");
                    //change color any "pixel" after click
                    col.addEventListener("click", function(){
                        this.style.background = document.getElementById("color-input").value;
                    });
                    row.appendChild(col);
                }
            this.table.appendChild(row);
            }
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
    }
}