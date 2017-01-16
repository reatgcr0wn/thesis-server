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
    $("#right .memo").html(JSON.stringify(data));
    $("#right .gender").html('<img src="img/' +getGenderString(data.gender.value)+ '.png" alt="gender">');
    $("#right .age").html(data.age.value+'歳');
}

function changeBeaconAdvertising(data) {
    console.log('beacon',data);
    $("#left .memo").html(JSON.stringify(data));
    $("#left .gender").html('<img src="img/' +getGenderString(data.gender)+ '.png" alt="gender">');
    $("#left .age").html(data.age+ '歳');
}

function getGenderString(gender){
  if (gender == 1 || gender == 'Male' ) {
    return 'male'
  }else if(gender == 2 || gender == 'Female'){
    return 'female'
  }else {
    return 'other'
  }
}
