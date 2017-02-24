$("#tiny-nav a").on("click", function(){
    var path = $(this).attr("data-path");
    var anchor = $("#" + path);
    var position = anchor.position().top;
    $("body").animate({scrollTop: position});
});