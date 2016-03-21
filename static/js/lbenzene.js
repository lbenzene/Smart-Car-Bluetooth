$(document).ready(function(){
/*
    $("li.dropdown").mouseenter(function(){
        setTimeout(function(){
            $(this).children("ul.dropdown-menu")
                .stop(true,true)
                .slideDown("normal");            
        },1000);

    });
    $("li.dropdown").mouseleave(function(){
        $(this).children("ul.dropdown-menu")
            .stop(true,true)
            .slideUp("fast");
    });
*/
    $("div.index-main").mouseenter(function(){
        $(this).children("div.index-img").children(".details").children("a")
            .stop()
            .animate({
                marginTop: '180px',
                opacity: '1'},
                500, "linear");
        $(this).children("div.index-img").children(".details")
            .stop()
            .animate({opacity: 1});
    });

    $("div.index-main").mouseleave(function(){
        $(this).children("div.index-img").children(".details").children("a")
            .stop()
            .animate({
                marginTop: '240px',
                opacity: '0',
                backgroundColor: '#6666CC'},
                500, "linear"); 
        $(this).children("div.index-img").children(".details")
            .stop()
            .animate({opacity: 0});
    });

    // $("div.class-table").children("table").children("tbody")
    // .children("tr").children("td").click(function(){
    //     $(this).toggleClass("active");
    // });
    // 
     
    $("#gotop").css("visibility","hidden");
    // $("#gotop").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function(){
        $(window).scroll(function(){
            if ($(window).scrollTop() > 100){
                $("#gotop").css("visibility","visible");
            } else {
                $("#gotop").css("visibility","hidden");
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#gotop").click(function(){
            $('body,html').animate({scrollTop:0},500);
            return false;
        });
    });

    $("#class td").click(function(){
        if ($(this).data('link')) {
            var slink = document.location.href.replace(/\/[^\/]+\.html#?/g,"/") + $(this).data('link') + ".html";
            var sday = $(this).data('day');
            var scourse = $(this).data('course');
            document.location.href = slink + "?day=" + sday + "&course=" + scourse;
        };
    });
});

function GetXmlHttpObject()
{
    var xmlHttp = null;
    try
    {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e)
    {
        // Internet Explorer
        try
        {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function get_data(o, s) {
  var re = null;
  try {
    re = o.data(s);
  }
  catch (e) {
    re = o.getAttribute("data-"+s);
  }
  return re;
}

// function set_data(o, s, v) {
//   var re = null;
//   try {
//     re = o.data(s);
//   }
//   catch (e) {
//     re = o.getAttribute("data-"+s);
//   }
//   return re;
// }