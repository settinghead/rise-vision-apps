$(document).on("click", "body", function() {

            $('input:checkbox').click(function() {
                event.stopPropagation();
            });

            $('.singleitem input:checkbox').change(function() {
                if ($(this).is(":checked")) {
                    $(this).prev().addClass("selectedBorder", 100, "linear");
                } else {
                    $(this).prev().removeClass("selectedBorder", 100, "linear");
                    $('input:checkbox.soloselect').not(this).removeClass("selectedBorder", 100, "linear");  
                }
            });

            $('.folder input:checkbox').change(function() {
                if ($(this).is(":checked")) {
                    $(this).closest("li").addClass("folder-extended", 100, "linear");
                    $(this).next().next().removeClass("hidden");
                    $(this).closest("li").addClass("selectedBorder", 100, "linear");
                } else {
                    $(this).closest("li").removeClass("folder-extended", 100, "linear");
                    $(this).next().next().addClass("hidden");
                    $(this).closest("li").removeClass("selectedBorder", 100, "linear");
                }
            });

            $('input:checkbox.soloselect').change(function() {
                $('input:checkbox.soloselect').not(this).prop('checked', false);  

            });



    //  $('input:radio').click(function() {
    //     event.stopPropagation();
    // });

    // $('input:radio').change(function() {

       
    // });

   

    //  $('.folder input:checkbox').change(function() {
    //     if ($(this).is(":checked")) {
    //         $(this).prev().removeClass("selectedBorder");
    //         $(this).prev().prev().addClass("selectedBorder", 100, "linear");
    //     } else {
    //         $(this).prev().removeClass("selectedBorder",);
    //         $(this).prev().prev().removeClass("selectedBorder", 100, "linear");
    //     }
    // });

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
