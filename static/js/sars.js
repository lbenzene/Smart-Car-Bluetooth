$("ul#select li:eq(0)").addClass("active");
$("ul#top li:eq(0)").addClass("active");
$("#page1").addClass("active");
$("html, body").animate({scrollTop:top},0); 

var locate = 1;  // tmp和locate的初值貌似要到时候，
var tmp = 1;
var flag = true;
var page_locate = "";
var MIN = 1;
var MAX = 4; // MAX must change
var scrollFunc=function(e){
  if(flag){
    flag = false;
    e=e || window.event; 
    if (e.wheelDelta) {//IE/Opera/Chrome
      tmp = locate;
      flag = 0;
      if (e.wheelDelta > 0) {
        if (locate != MIN) {
          locate -= 1;
          chbg();
          scrollgo();
        } else {
          flag = true;
        }
      } else {  // Here we have to check if the locate less than the MAX
        if (locate != MAX) {
          locate += 1;
          chbg();
          scrollgo();
        } else {
          flag = true;
        }
      }
    } else if (e.detail) {//IE/Opera/Chrome
      tmp = locate;
      flag = 0;
      if (e.detail < 0) {
        if (locate != MIN) {
          locate -= 1;
          chbg();
          scrollgo();
        } else {
          flag = true;
        }
      } else {
        if (locate != MAX) {
          locate += 1;
          chbg();
          scrollgo();
        } else {
          flag = true;
        }
      }
    }
  } else {
    if(e && e.preventDefault){
        e.preventDefault();
    } else {
        window.event.returnValue=false;
    }
    utility.dragScroll = true;
    return false;
  }
}

if(document.addEventListener){ 
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C 
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome 

function chbg(){
  $(document).ready(function(){
    setTimeout(function(){
      $("#background").removeClass("page"+tmp);
      $(".top-bar").removeClass("page"+tmp)
    }, 600);
    setTimeout(function(){
      $("#background").addClass("page"+locate);
      $(".top-bar").addClass("page"+locate)
    }, 600);
    exactive(locate, tmp);
  });
}
// 此处建议修改为 jQuery 的 animate()，否则 no law to see

function scrollgo(){
    page_locate = "#page"+locate;
    $.scrollTo(page_locate,1300);
    setTimeout("flag = true",1500);
}
  /**
   * scroll side and top function
   * @param  {int} l locate
   * @return 
   */
function sst(l) 
{
  tmp = locate;
  locate = l;
  chbg();
  scrollgo();
  exactive(locate, tmp);
}
  /**
   * exactive 
   * @param  l locate t temp
   * @return 
   */
function exactive(l, t) {
  $("ul#select li:eq("+ (t-1) +")").removeClass("active");
  $("ul#select li:eq("+ (l-1) +")").addClass("active");
  $("ul#top li:eq("+ (t-1) +")").removeClass("active");
  $("ul#top li:eq("+ (l-1) +")").addClass("active");
  $("#page"+t).removeClass("active");
  $("#page"+l).addClass("active");
  var tp = 120 + (l-1)*30;
  var tv = tp + "px";
  $("div#select-ball").stop(true,false).animate({top: tv}, 500);
  if (l>1) {
    $("div.top-bar").addClass("display");
  } else{
    $("div.top-bar").removeClass("display");
  };
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

function get_and_change_data_page(o) {
  var l = get_data(o, "page");
  // l = o.getAttribute("data-page");
  sst(l);
}

/**
 * 点击时触发函数， data-* 属性
 */
$(document).ready(function(){
  $("ul#select li a").click(function(){
    get_and_change_data_page($(this));
  });
  $("ul#top li a").click(function(){
    get_and_change_data_page($(this));
  });

  $("ul#select li").mouseenter(function(){
    var p = get_data($(this).children("a"), "page");
    p = 120 + (p-1)*30;
    var tv = p + "px";
    $("div#select-ball").stop(true,false).animate({top: tv}, 500);
  });

  $("ul#select").mouseleave(function(){
    var lt = 120 + (locate-1)*30;
    var tv = lt + "px";
    $("div#select-ball").stop(true,false).animate({top: tv}, 500);
  });  
});
