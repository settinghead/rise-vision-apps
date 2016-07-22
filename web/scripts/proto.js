$(document).on("click", "body", function() {

// NEW ITEM SELECTORS

    $('input:checkbox').click(function() {
        event.stopPropagation();
    });

    $('.single-item input:checkbox').change(function() {
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


// OVERWRITE SOME RANDOM DURATION FOR PLAYLIST PROTOTYPING
var durationArray = [
    '10 Seconds',
    '180 Seconds',
    'Plays Until Done'
]
function CreatePlaylistSet(cycles) {

    for (i = 0; i < cycles; i++) { 

        $('.editor-playlist-item').each(function() {
                var randomNumber = Math.floor(Math.random() * durationArray.length);
                $('.playlist-item-duration', this ).text( durationArray[randomNumber] );
                randomNumber = '';
            });
        }
}
$('#AddButton').click(function() {
    CreatePlaylistSet(9);
});

// ASSIGN RANDOM PH ITEM AMOUNTS
var itemsAmountArray = [
    '4 Items',
    '18 Items',
    'Empty'
]
function CreateItemAmountsSet() {
    $('.ph-amount').each(function() {
                    // var randomNumber = Math.floor(Math.random() * itemsAmountArray.length);
                    // $('.ph-amount', this ).text( itemsAmountArray[randomNumber] );
                    // randomNumber = '';
                    var rand = Math.floor((Math.random()*3)+1);
                    $('.ph-amount').innerHTML= rand + ' ' + 'Items';
                });
}
$('#addPlaceholderButton').click(function() {
    CreateItemAmountsSet();
});


// UPDATE RADIO SELECTORS

    // $('.folder input:radio').click(function() {

    //     $('.folder input:radio').closest("li").removeClass("folder-extended");
    //     $('.folder input:radio').next().next().addClass("hidden");

    //     if ($(this).is(":checked")) {
    //         $(this).closest("li").addClass("folder-extended", 100, "linear");
    //         $(this).next().next().removeClass("hidden");
    //     } else {
    //         $(this).closest("li").removeClass("folder-extended");
    //         $(this).next().next().addClass("hidden");
    //     }
    // });

});
