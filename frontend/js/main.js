let Main = {
    init(){
        this.setEnabled(document.getElementById("brush"));
        let grid = document.getElementById("table");
        this.initGridPaint(grid);
        grid.onclick = (e) => {
            this.actionPaintGrid(e);
        }
        
    },
    initGridPaint(grid){
        for(let i=0;i<50;i++){
            for(let j=0;j<50;j++){
                let col = document.createElement("div");
                col.classList.add("col-div");
                grid.appendChild(col);
            }
        }
    },
    actionPaintGrid(e){
       if(e.target.className == "col-div"){
           let tools = document.getElementsByClassName("tools-paint");
           let action = ActionGrid;
           for(let tool of tools){
               if(tool.style.color != "black")
                 action[tool.id](e);
            }
          
       }
    },
    setEnabled(e){
        this.resetColorToolsPaint();
        e.style.color = "deeppink";
    },
    resetColorToolsPaint(){
        let tools = document.getElementsByClassName("tools-paint");
        for(let tool of tools){
            tool.style.color = "black";
        }
    }
}

