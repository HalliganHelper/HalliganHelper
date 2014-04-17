var ShowingToTop = false;
$(function(){
    $("#sidebar-nav-holder.vertical-nav").on("gumby.onFixed", function addToTop(){
        var $this = $(this),
            html = '<li id="topLink"> <a href="#" class="skip" gumby-goto="top" gumby-duration="600"><i class="icon icon-up-open"></i>Back to top</a></li>';

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


$(function(){
    var sidebar = $("#sidebar-nav-holder.vertical-nav");
    html = '<li id="showtas"><a href="#"><i class="icon icon-down-open"></i>Show TAs</a></li>';
    if(!sidebar.find("ul li:first-child a i").length){
        sidebar.find("ul").append(html);
    }

});

$(function() {
    var course = '';
    if(sessionStorage && sessionStorage['currentTab']) {
        console.log(sessionStorage['currentTab']);
        course = sessionStorage['currentTab'];
    } else {
        return;
    }

    $('#sidebar-nav li').removeClass('active');
    $('#' + course + 'Nav').addClass('active');

    course = sessionStorage['currentTab'];
    $('.course').addClass('Hidden');
    $('.courseTA').addClass('Hidden');
    $('#' + course).removeClass('Hidden');
    $('#' + course + 'TA').removeClass('Hidden');

});

$(function(){
    $('#sidebar-nav li').click(function(e){
        var $this = $(this);
        e.preventDefault();
        if (this.id != 'showtas') {
            var course = $this.data('course');
            console.log(course);
            if(sessionStorage){
                sessionStorage['currentTab'] = course;
            }
            $('#sidebar-nav li').removeClass('active');
            $this.addClass('active');
            $('.course').addClass('Hidden');
            $('.courseTA').addClass('Hidden');
            $('#' + course).removeClass('Hidden');
            $('#' + course + 'TA').removeClass('Hidden');
        } else {
            $("html, body").animate({ scrollTop: $(document).height() }, 'fast');
        }
    });
});
