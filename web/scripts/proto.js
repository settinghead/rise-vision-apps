$(document).on("click", "body", function () {

  // NEW ITEM SELECTORS
  $('input:checkbox').click(function () {
    event.stopPropagation();
  });

  $('.single-item input:checkbox').change(function () {
    if ($(this).is(":checked")) {
      $(this).prev().addClass("selectedBorder", 100, "linear");
    } else {
      $(this).prev().removeClass("selectedBorder", 100, "linear");
      $('input:checkbox.soloselect').not(this).removeClass(
        "selectedBorder", 100, "linear");
    }
  });
  $('.folder input:checkbox').change(function () {
    if ($(this).is(":checked")) {
      $(this).closest("li").addClass("folder-extended", 100, "linear");
      $(this).next().next().removeClass("hidden");
      $(this).closest("li").addClass("selectedBorder", 100, "linear");
    } else {
      $(this).closest("li").removeClass("folder-extended", 100,
        "linear");
      $(this).next().next().addClass("hidden");
      $(this).closest("li").removeClass("selectedBorder", 100, "linear");
    }
  });

  $('input:checkbox.soloselect').change(function () {
    $('input:checkbox.soloselect').not(this).prop('checked', false);

  });





// SET UP ARRAYS
var durationArray = [
    '10 Seconds',
    '180 Seconds',
    'Plays Until Done'
]
var statusArray = [
        '<a class="text-danger" ng-click="playlistItemFactory.edit(item)"> Expired </a>',
        '<a class="text-danger" ng-click="playlistItemFactory.edit(item)"> Cancelled </a>',
        '<a class="text-danger" ng-click="playlistItemFactory.edit(item)"> 3 Days Left On Trial </a>',
        ' ',
        ' ',
        ' ',
        ' '
]
  var itemsAmountArray = [
    '4 Items',
    '18 Items',
    'Empty'
]

// HIDE STATUS LINES IF EMPTY
function hideDurationsIfStat() {
    $('.playlist-item-status').each(function() {
        if ($(this).children().length < 1) {
            // IF NO STAT, SHOW DURATION
            // $(this).closest('.editor-playlist-item').css('border' , '0');
            $(this).closest('.editor-playlist-item').find('.playlist-item-name').closest('a').show();
        } else {
            //IF HAS STAT, HIDE DURATION
            $(this).closest('.editor-playlist-item').find('.playlist-item-name').closest('a').hide();
            // $(this).closest('.editor-playlist-item').css('border' , '1px solid red');
        }
    });
}

//CREATE RANDOM PLAYLIST ITEMS
function CreatePlaylistSet(cycles) {
    for (i = 0; i < cycles; i++) {
        $('.editor-playlist-item').each(function() {
            var randomNumber = Math.floor(Math.random() * durationArray.length);
            $('.playlist-item-duration', this).text(durationArray[randomNumber]);
            randomNumber = '';
        });
        $('.editor-playlist-item').each(function() {
            var statusRandomNo = Math.floor(Math.random() * statusArray.length);
            $('.playlist-item-status', this).html(statusArray[statusRandomNo]);
            statusRandomNo = '';
            hideDurationsIfStat();
            showRandomSVG();
        });
    }
}


// SHOW ONE RANDOM ICON PER PLAYLIST ITEM
function showRandomSVG() {
   $('.editor-playlist-item').each(function() {
            
            var selectedIconArray = $(this).find('svg-icon'); 
            var randomizedIcon = Math.floor(Math.random() * selectedIconArray.length);

            $( selectedIconArray ).hide();
            $( selectedIconArray[randomizedIcon] ).show();
            selectedIconArray = '';
     });
}

// CREATE RANDOM PH ITEM AMOUNTS
  function CreateItemAmountsSet() {
    $('.ph-amount').each(function () {
      var rand = Math.floor((Math.random() * 3) + 1);
      $('.ph-amount').innerHTML = rand + ' ' + 'Items';
    });
  }


// TRIGGER BUTTONS
  $('#addPlaceholderButton').click(function () {
    CreateItemAmountsSet();
  });
  $('#AddButton').click(function () {
    CreatePlaylistSet(1);
  });


});
