var dragSrc;
$(function () {
    $(".containerpic .pic").each(function () {
        this.ondragstart = function (ev) {
            $(this).addClass("pic_select");
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.setData("text", ev.target.innerHTML);
            ev.dataTransfer.setDragImage(ev.target, 0, 0);
            dragSrc = this;
        };
        this.ondragend = function (ev) {
            $(this).removeClass("pic_select");
        };
    });
});

function dragstartimg(obj, ev) {
    $(obj).addClass("pic_select");
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text", ev.target.innerHTML);
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    dragSrc = obj;
    obj.ondragend = function (ev) {
        $(obj).removeClass("pic_select");
    };
}
function groupenter(obj, Event) {
    $(obj).addClass("pic_over");
}
function grouppicover(obj, Event) {
    Event.preventDefault(); //阻止默认事件
}
function groupdrop(obj, Event) {
    if (dragSrc) {
        Event.preventDefault(); //阻止默认事件
        var x = document.documentElement.scrollLeft + Event.pageX;
        var y = document.documentElement.scrollTop + Event.pageY;
        var imgwidth = $(dragSrc).attr("offsetWidth");
        var imgheight = $(dragSrc).attr("offsetHeight");

        if (dragSrc.nodeName.toString() == "DIV") {
            $(obj).append("<div class=\"divpic1\" draggable=true ondragstart=\"dragstartimg(this,event)\"; contenteditable=true style=\"position:fixed;left:" + x + "px;top:" + y + "px;\"></div>");
        } else {
            $(obj).append("<img src=" + $(dragSrc).attr("src") + " draggable=true ondragstart=\"dragstartimg(this,event)\"; contenteditable=true style=\"position:fixed;left:" + x + "px;top:" + y + "px;\" />");
            }
         $(dragSrc).remove();
        $(obj).removeClass("pic_over");
        Event.stopPropagation();
    }
    return false;
}
function groupdrop2(obj, Event) {
    if (dragSrc) {
        Event.preventDefault(); //阻止默认事件
        var x = document.documentElement.scrollLeft + Event.pageX;
        var y = document.documentElement.scrollTop + Event.pageY;    
        var imgwidth = $(dragSrc).attr("offsetWidth");
        var imgheight = $(dragSrc).attr("offsetHeight");
        $(obj).append("<img class=\"pic\" src=" + $(dragSrc).attr("src") + " draggable=true ondragstart=\"dragstartimg(this,event)\"; contenteditable=true style=\"position:fixed;left:" + x + "px;top:" + y + "px;\" />");
        $(dragSrc).remove();
        $(obj).removeClass("pic_over");
        Event.stopPropagation();//阻止事件冒泡
    }
    return false;
}