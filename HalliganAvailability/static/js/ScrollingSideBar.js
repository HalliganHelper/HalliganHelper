var ShowingToTop = false;

$(function(){
    $("#sidebar-nav li").on('click', function navClicked(){
        var $this = $(this);
        $("#sidebar-nav li").removeClass("active");
        $this.addClass().addClass("active");

    });

    $("#sidebar-nav-holder.vertical-nav").on("gumby.onFixed", function addToTop(){
        var $this = $(this),
            html = '<li id="topLink"> <a href="#" class="skip" gumby-goto="top" gumby-duration="600"><i class="icon icon-up-open"></i>Back to top</li>';

        if(!$this.find("ul li:first-child a i").length){
            $this.find("ul").prepend(html);
            $("#topLink").click(function(){
                $("#sidebar-nav li").removeClass("active");
            });

        }
        Gumby.initialize("skiplink");
    }).on("gumby.onUnfixed", function removeToTop(){
            $(this).find("ul li:first-child").remove();
    });
});