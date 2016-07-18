

$(document).on("click", "body", function() {

   

    $('input:checkbox').click(function() {
        event.stopPropagation();
    });

    $('input:checkbox').change(function() {
        if ($(this).is(":checked")) {
            $(this).prev().addClass("selectedBorder", 100, "linear");
        } else {
            $(this).prev().removeClass("selectedBorder", 100, "linear");
        }
    });

    $('input:radio').click(function() {
        event.stopPropagation();
    });

    $('input:radio').change(function() {

        $('input:radio').prev().removeClass("selectedBorder", 100, "linear");
        if ($(this).is(":checked")) {
            $(this).prev().addClass("selectedBorder", 100, "linear");
        } else {
            $(this).prev().removeClass("selectedBorder", 100, "linear");
        }
    });

    $('.folder input:checkbox').change(function() {
        if ($(this).is(":checked")) {
            $(this).closest("li").addClass("folder-extended", 100, "linear");
            $(this).next().next().removeClass("hidden");
        } else {
            $(this).closest("li").removeClass("folder-extended", 100, "linear");
            $(this).next().next().addClass("hidden");
        }
    });
     $('.folder input:radio').click(function() {

        $('.folder input:radio').closest("li").removeClass("folder-extended");
        $('.folder input:radio').next().next().addClass("hidden");

        if ($(this).is(":checked")) {
            $(this).closest("li").addClass("folder-extended", 100, "linear");
            $(this).next().next().removeClass("hidden");
        } else {
            $(this).closest("li").removeClass("folder-extended");
            $(this).next().next().addClass("hidden");
        }
    });

});
