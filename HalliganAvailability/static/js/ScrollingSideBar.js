/**
 * Created with PyCharm.
 * User: tyler
 * Date: 11/1/13
 * Time: 1:39 AM
 * To change this template use File | Settings | File Templates.
 */

var ShowingToTop = false;

$(function(){
    var c11 = $("div").find("[data-target='comp11']")[0],
        c15 = $("div").find("[data-target='comp15']")[0],
        c40 = $("div").find("[data-target='comp40']")[0],
        c105 = $("div").find("[data-target='comp105']")[0];


    c11 = $(c11).position().top - 15;
    c15 = $(c15).position().top - 15;
    c40 = $(c40).position().top - 15;
    c105 = $(c105).position().top - 15;


    console.log(c11);
    console.log(c15);
    console.log(c40);
    console.log(c105);

    $(window).scroll(function scrollFunc(){
        var top = $(window).scrollTop();
        console.log(top);
        if(top >= c105){
            console.log('Looking at 105');
            $("#sidebar-nav li").removeClass("active");
        } else if (top >= c40) {
            $("#sidebar-nav li").removeClass("active");
            $("#comp40Nav").addClass("active");
        } else if (top >= c15) {
            $("#sidebar-nav li").removeClass("active");
            $("#comp15Nav").addClass("active");
        } else if (top >= c11){
            $("#sidebar-nav li").removeClass("active");
            $("#comp11Nav").addClass("active");
        }


    });

    /*
    $("#sidebar-nav li").onClick(function navClicked(){
        var $this = $(this);
        $("#sidebar-nav li").removeClass("active");
        $this.addClass().addClass("active");

    });
    */

    $("#sidebar-nav-holder.vertical-nav").on("gumby.onFixed", function addToTop(){
        var $this = $(this),
            html = '<li> <a href="#" class="skip" gumby-goto="top" gumby-duration="600"><i class="icon icon-up-open"></i>Back to top</li>';

        if(!$this.find("ul li:first-child a i").length){
            $this.find("ul").prepend(html);
        }
        Gumby.initialize("skiplink");
    }).on("gumby.onUnfixed", function removeToTop(){
            $(this).find("ul li:first-child").remove();
    });
});