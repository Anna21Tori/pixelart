var Main = {
    table: null,
    init : function(table){
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
        this.init();
    },
    paint: function(col){
        col.style.background = document.getElementById("color-input").value;
    }
}