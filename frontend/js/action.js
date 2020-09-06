let ActionGrid = {
     eyedropper(e){
               e.target.style.backgroundColor = "red";
    },
    brush(e){
               e.target.style.backgroundColor = "yellow";
    },
//    e:undefined,
//    eyedropper:()=> true,
//    brush:()=>{
//        let rgb = this.e.style.backgroundColor;
//        let sep = rgb.indexOf(",") > -1 ? "," : " ";
//        rgb = rgb.substr(4).split(")")[0].split(sep);
//                        
//        let r = (+rgb[0]).toString(16),
//        g = (+rgb[1]).toString(16),
//        b = (+rgb[2]).toString(16);
//
//        if (r.length == 1)
//            r = "0" + r;
//        if (g.length == 1)
//            g = "0" + g;
//        if (b.length == 1)
//            b = "0" + b;
//
//        let hex =  "#" + r + g + b;
//                        
//        console.log(hex);
//        return true;
//    }
}