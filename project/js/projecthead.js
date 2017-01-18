/**
 * Created by Administrator on 2017/1/13.
 */
function head() {
   var _ul=document.getElementById("speaker");
   var _timer=0;
   var _top=0;
    (function start() {
        window.clearTimeout(_timer);
        _top-=1;
        if(_top<=-72){
            _ul.style.top=0+"px";
            _top=0;
        }
       if(_top%36==0){
           _timer=window.setTimeout(start,2000);
       }else{
           _timer=window.setTimeout(start,30);
       }
        _ul.style.top=_top+"px";
    })()
    $("#load").mouseenter(function () {
        $("#app").css("display","block")
    })
    $("#load").mouseleave(function () {
        $("#app").css("display","none")
    })
}
function nav() {
    var _ul= $("#nav0")[0];
    for (var i = 1; i < _ul.children.length; i++) {
        _ul.children[i].style.left = i * 80 + "px";
        _ul.children[i].onmouseover = function () {
            this.children[0].style.color = "#b9a782";
            this.children[0].style.borderBottom = "3px solid #b9a782";
            this.children[1].style.display = "block";
        }
        _ul.children[i].onmouseout = function () {
            this.children[0].style.color = "";
            this.children[0].style.borderBottom = ""
            this.children[1].style.display = "none";
        }
    }
}

function opatChange(_opa) {
    var _timer0=0;
    var _img=$("#banner a img ")[0];
    function start(){
        window.clearTimeout(_timer0);
        _img.style.opacity=_opa;
        if(_opa<1){
            _opa+=0.1;
            _time0=window.setTimeout(start,30);
        }
    }
    start();
}
function spanChange(_img,m) {
    var _span=$(".span")[0];
   // var m=parseInt(_img.src.match(/\d+.jpg/g)[0]);
  /*  if(m>1){
        _span.children[m-2].style.backgroundColor="#fff";
        _span.children[m-2].style.border="none";
    }
    if(m==1){
        _span.children[4].style.backgroundColor="#fff";
        _span.children[4].style.border="none";
    }*/
  for(var i=0;i<_span.children.length;i++){
     _span.children[i].style.backgroundColor="#fff";
     _span.children[i].style.border="none";
  }
    _span.children[m-1].style.backgroundColor="#b4a078";
    _span.children[m-1].style.border="4px solid #ccc";
}
function spanchange2() {
    var _span=$(".span")[0];
    var _img=$("#banner a img ")[0];
    var m=parseInt(_img.src.match(/\d+.jpg/g)[0]);
    if(m==1){
        m=5;
    }else{
        m=m-1;
    }
    var _opa=0;
    opatChange(_opa);
    if(m==5){
        _span.children[0].style.backgroundColor="#fff";
        _span.children[0].style.border="none";
    }
    if(m<5){
        _span.children[m].style.backgroundColor="#fff";
        _span.children[m].style.border="none";
    }
    _span.children[m-1].style.backgroundColor="#b4a078";
    _span.children[m-1].style.border="4px solid #ccc";
    _img.src="images/b0"+m+".jpg";
    //changeImage(_img,m);

}
function directionClick(_img,m) {
    var _direction=$("#direction")[0] ;
    _direction.onclick=spanchange2;
    var _direction2=$("#direction2")[0];
    _direction2.onclick=function () {
        if(m==5){
            m=1;
        }else{
            m=m+1;
        }
        var _opa=0;
        opatChange(_opa);
        spanChange(_img,m);
        _img.src="images/b0"+m+".jpg";
    }
}
function changeImage(_img,m) {
    var _span=$(".span")[0];
    var _timer=0;
    function start() {
        window.clearTimeout(_timer);
        _img.src="images/b0"+m+".jpg";
        spanChange(_img,m);
        var  _opa=0.3;
        opatChange(_opa);
        if(m<5){
            m+=1;
        }else{
            m=1
        }
        _timer=window.setTimeout(start,6000);
    }
    start();
}
function banner() {
    var _img=$("#banner a img ")[0];
    var m=parseInt(_img.src.match(/\d+.jpg/g)[0]);
    changeImage(_img,m);
    directionClick(_img,m);
}
function made() {
    var _madepic=$(".madepic img");
   for(var i=0;i<4;i++){
        _madepic.mouseenter(function () {
          $(this).animate({
              width:"105%"
          },"slow")
        })
       _madepic.mouseleave(function () {
           $(this).stop();
           $(this).animate({
               width:"100%"
           },"slow")
       })
   }
}
function newProduct() {
    $.getJSON("json/newpr.json", function (data) {
      // console.log(data);
        for(var i=0;i<data["images"].length;i++){
            $("<img>").attr("src",data["images"][i]).appendTo($("#container"))
        }
        $("#container img").wrap($("<div>"));
        $("<span>").insertAfter($("#container img"))
        for(var n=0;n<data["price"].length;n++){
           $("#container span")[n].innerHTML=data["price"][n];
        }
        if($("#container")[0].offsetLeft>-13780) {
            $("#right").mouseenter(function () {
                $(this).css("background-color", "#b9a782")
            })
            $("#right").mouseleave(function () {
                $(this).css("background-color", "#d0c4af")
            })
        }
        if($("#container")[0].offsetLeft<=0){
            $("#left").css("background-color", "#d0c4af")
        }

        $("#left").click(function () {
           // console.log($("#container")[0].offsetLeft)
            if($("#container")[0].offsetLeft<0) {
                $("#container").animate({left: '+=1060px'}, 200)
                $("#left").mouseenter(function () {
                    $(this).css("background-color", "#b9a782")//有点小bug，首次点击没有效果
                })
                $("#left").mouseleave(function () {
                    $(this).css("background-color", "#d0c4af")
                })
            }
        })
        $("#right").click(function () {
          //  console.log($("#container")[0].offsetLeft)
            if($("#container")[0].offsetLeft>-13780) {
                $("#container").animate({left: '-=1060px'}, 200)
            }
        })
    })
}

