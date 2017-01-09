var Bleacon = require('bleacon');
var fs = require('fs');
var beacons = [];
var selectedBeacon;

var uuid = '00000000000000000000000000000000';

Bleacon.startScanning(uuid); // scan for any bleacons

Bleacon.on('discover', function(beacon) {
  var time = new Date();
  if (beacon.uuid !== undefined) {
      var uuid = beacon.uuid + "";
      var major = beacon.major;
      var minor = beacon.minor;
      var dist = beacon.accuracy;
      // var beaconid = bleacon.id;
      var data = {
          'time': time,
          'uuid': uuid,
          'major': major,
          'minor': minor,
          'dist':dist
      };
      // fs.appendFile('web/beacon.log', JSON.stringify(data, null));
  }

  //既知のBeaconは古い情報を削除
  // beacons.forEach(function(e, i, a) {
  //     if (e.id == beacon.id) {
  //         beacons.splice( i, 1 ) ;
  //     }
  // })
  // console.log(beacon);
  beacons.push(beacon);

});


//どのBeaconの情報を書き込むか
function selectBeacon() {
    if (beacons != [] && beacons != undefined) {
        if (beacons.length > 0) {
            for (var i = 0; i < beacons.length; i++) {
                if (selectedBeacon == null || beacons[i].distance <= selectedBeacon.distance) {
                    selectedBeacon = beacons[i];
                }
            }
            makeJson(selectedBeacon);
        }
    }
}

//3秒に一回選ぶよ
var callLater = function(fn) {
    setInterval(function() {
        fn();
    }, 3000);
};
callLater(selectBeacon);

function makeJson(beacon) {
  var time = Date();
    if (beacon.uuid !== undefined) {
        var uuid = beacon.uuid;
        var major = beacon.major;
        var minor = beacon.minor;

        var data = {
            'time': time,
            'uuid': uuid,
            'major': major,
            'minor': minor
        };
        console.log(data);
        // var postData = JSON.stringify(data, null, '    ');
        // requestData(postData);
        fs.writeFile('web/data.json', JSON.stringify(data, null, '    '));
        selectedBeacon = null;
        beacons = [];
    }
}
