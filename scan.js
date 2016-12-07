var EddystoneBeaconScanner = require('eddystone-beacon-scanner');
var beacons = [];
var selectedBeacon;

EddystoneBeaconScanner.on('found', function(beacon) {
  var time = new Date();
  // console.log('found Eddystone Beacon:'+time+'\n', JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.on('updated', function(beacon) {
  var time = new Date();
  // console.log('updated Eddystone Beacon:'+time+'\n', JSON.stringify(beacon, null, 2));
  beacons.push(beacon);
  // console.log(beacons);
});

EddystoneBeaconScanner.on('lost', function(beacon) {
  var time = new Date();
  console.log('lost Eddystone beacon:' + time + '\n', JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.startScanning(true);

function makeJson(beacon) {
  url = beacon.url
  console.log(beacon);
  var beacondata = url.substr(7, 13);
  var interest = beacondata.substr(0, 1);
  var sex = beacondata.substr(1, 1);
  var fs = require('fs');
  var time = new Date();
  var data = {
    'sex': sex,
    'interest': interest,
    'beacon': beacon
  };

  var postData = JSON.stringify(data, null, '    ');
  requestData(postData);
  // fs.writeFile('web/data.json', JSON.stringify(data, null, '    '));
  selectedBeacon = null;
  beacons = [];
}

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


var callLater = function(fn) {
  setInterval(function() {
    fn();
  }, 3000);
};
callLater(selectBeacon);


function requestData(data) {
  var request = require('request');
  // URL
  var baseUrl = 'http://mocchi.kumo.sfc.keio.ac.jp/eddystone/update-json.php';
  request(baseUrl,{form:data}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }else {
          console.log(error);
        }
})


}
