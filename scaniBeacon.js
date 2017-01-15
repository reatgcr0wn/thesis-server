var Bleacon = require('bleacon');
var fs = require('fs');
var beacons = [];
var selectedBeacon;

var uuid = '00000000000000000000000000000000';

Bleacon.startScanning(uuid); // scan for any bleacons

Bleacon.on('discover', function(beacon) {
  if (beacon.uuid !== undefined) {
    var data = parseBeacon(beacon);
    var time = new Date();
    beacons.push(data);

    // Todo log


  }

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
  console.log('makejson');
  var time = Date();
    if (beacon.gender !== undefined) {
        console.log(beacon);
        fs.chmod('web/data_beacon.json', 777);
        fs.chmod('log/beaconlog.json', 777);
        fs.writeFile('web/data_beacon.json', JSON.stringify(beacon, null, '    '));
        fs.appendFile('log/beaconlog.json', ',');
        fs.appendFile('log/beaconlog.json', JSON.stringify(beacon));
        selectedBeacon = null;
        beacons = [];
    }
}

function parseBeacon(beacon) {
  var data = {};
  var major_prefix = ( '000000000000000' + beacon.major.toString(2) ).slice( -16 );
  var minor_prefix = ( '000000000000000' + beacon.minor.toString(2) ).slice( -16 );

  var gender_prefix = major_prefix.substr(0,2);
  var age_prefix = major_prefix.substr(2,7);
  var hobby_major = major_prefix.substr(9,7);
  var hobby_minor = minor_prefix;

  var hobby_prefix = hobby_major + hobby_minor;

  data.time = Date();
  // data.uuid = beacon.uuid;
  data.gender = parseInt(gender_prefix,2);
  data.age = parseInt(age_prefix,2);
  data.distance = beacon.accuracy;
  data.hobby = []
  for (var i = 0; i < hobby_prefix.length; i++) {
    data.hobby.push(hobby_prefix.charAt(i));
  }

  return data;
}
