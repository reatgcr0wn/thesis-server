function reload(){
  location.reload();
}

function getContent(timestamp) {
    var queryString = {
        'timestamp': timestamp
    };

    $.ajax({
        type: 'GET',
        url: 'server.php',
        data: queryString,
        success: function(data) {
            var obj = jQuery.parseJSON(data);
            // $('#response').html(obj.data_from_file);
            getContent(obj.timestamp);
            var obj = jQuery.parseJSON(obj.data_from_file);
            changeAdvertising(obj);
        }
    });
}

$(function() {
    getContent();
});

function changeAdvertising(data) {
    console.log(data);
    // switch (interest) {
    //     case '1':
    //         slider.unslider('animate:0');
    //         break;
    //     case '2':
    //         slider.unslider('animate:1');
    //         break;
    //     case '3':
    //         slider.unslider('animate:2');
    //         break;
    //     case '4':
    //         slider.unslider('animate:3');
    //         break;
    //     case '5':
    //         slider.unslider('animate:4');
    //         break;
    //     case '6':
    //         slider.unslider('animate:5');
    //         break;
    //     case '7':
    //         slider.unslider('animate:6');
    //         break;
    //     case '8':
    //         slider.unslider('animate:7');
    //         break;
    //     default:
    // }

    // switch (interest) {
    //   case 'a':
    //       $("#advertising").html("<img src='img/bike.png' width='300px'>")
    //     break;
    //   case 'b':
    //       $("#advertising").html("<img src='img/book.jpg' width='300px'>")
    //     break;
    //   default:
    //
    // }
}
