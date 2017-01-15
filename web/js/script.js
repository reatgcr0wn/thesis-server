function getBeaconData(timestamp) {
    var queryString = {
        'timestamp': timestamp
    };

    $.ajax({
        type: 'GET',
        url: 'server_beacon.php',
        data: queryString,
        success: function(data) {
            var obj = jQuery.parseJSON(data);
            // $('#response').html(obj.data_from_file);
            getBeaconData(obj.timestamp);
            var obj = jQuery.parseJSON(obj.data_from_file);
            changeBeaconAdvertising(obj);
        }
    });
}

function getCameraData(timestamp) {
    var queryString = {
        'timestamp': timestamp
    };

    $.ajax({
        type: 'GET',
        url: 'server_camera.php',
        data: queryString,
        success: function(data) {
            var obj = jQuery.parseJSON(data);
            // $('#response').html(obj.data_from_file);
            getCameraData(obj.timestamp);
            var obj = jQuery.parseJSON(obj.data_from_file);
            changeCameraAdvertising(obj);
        }
    });
}

$(function() {
    getBeaconData();
    getCameraData();
});

function changeCameraAdvertising(data) {
    console.log('camera',data);
    $("#right").html(JSON.stringify(data));
}

function changeBeaconAdvertising(data) {
    console.log('beacon',data);
    $("#left").html(JSON.stringify(data));
}
