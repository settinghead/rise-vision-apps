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
var statusArray = [
    '<a class="text-danger" target="_blank" href="https://store.risevision.com/product-status/331c8dbba05c262590d3b00c533a9e7cbe50ad5a" >Expired<span class="btn btn-danger btn-xs icon-right">BUY</span></a>',
    '<a class="text-danger" target="_blank" href="https://store.risevision.com/product-status/331c8dbba05c262590d3b00c533a9e7cbe50ad5a">Cancelled<span class="btn btn-danger btn-xs icon-right">BUY</span></a>',
    '<a class="text-danger" target="_blank" href="https://store.risevision.com/product-status/331c8dbba05c262590d3b00c533a9e7cbe50ad5a">3 Days Left On Trial<span class="btn btn-danger btn-xs icon-right">BUY</span></a>',
    ' ',
    ' '
]
function CreatePlaylistSet(cycles) {

    for (i = 0; i < cycles; i++) { 
        $('.editor-playlist-item').each(function() {
                var randomNumber = Math.floor(Math.random() * durationArray.length);
                $('.playlist-item-duration', this ).text( durationArray[randomNumber] );
                randomNumber = '';
            });
         $('.editor-playlist-item').each(function() {
                 var statusRandomNo = Math.floor(Math.random() * statusArray.length);
                 $('.playlist-item-status', this ).html( statusArray[statusRandomNo] );
                 statusRandomNo = '';
            });
        }
}

// OVERWRITE SOME RANDOM ICONS


// ASSIGN RANDOM PH ITEM AMOUNTS
var itemsAmountArray = [
    '4 Items',
    '18 Items',
    'Empty'
]
function CreateItemAmountsSet() {
    $('.ph-amount').each(function() {
                    var rand = Math.floor((Math.random()*3)+1);
                    $('.ph-amount').innerHTML= rand + ' ' + 'Items';
                });
}



// TRIGGER BUTTONS
$('#addPlaceholderButton').click(function() {
    CreateItemAmountsSet();
});
$('#AddButton').click(function() {
    CreatePlaylistSet(9);
});


});
