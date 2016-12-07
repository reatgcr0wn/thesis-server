var EddystoneBeaconScanner = require('eddystone-beacon-scanner');
var fs = require('fs');
var beacons = [];
var selectedBeacon;

EddystoneBeaconScanner.on('found', function(beacon) {
    var time = new Date();
    if (beacon.namespace !== undefined) {
        var namespace = beacon.namespace + "";
        var interest = namespace.substr(0, 1);
        var events = 'found';
        var dist = beacon.distance;
        var beaconid = beacon.id;
        var data = {
            'time': time,
            'int': interest,
            'dist':dist,
            'id':beaconid,
            'evt': events
        };
        fs.appendFile('web/beacon.log', JSON.stringify(data, null));
    }
    // console.log('found Eddystone Beacon:'+time+'\n', JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.on('updated', function(beacon) {
    var isNewBeacon = true;
    var time = new Date();
    if (beacon.namespace !== undefined) {
        var namespace = beacon.namespace + "";
        var interest = namespace.substr(0, 1);
        var events = 'update';
        var dist = beacon.distance;
        var beaconid = beacon.id;
        var data = {
            'time': time,
            'int': interest,
            'dist':dist,
            'id':beaconid,
            'evt': events
        };
        fs.appendFile('web/beacon.log', JSON.stringify(data, null));
    }
    // console.log('updated Eddystone Beacon:'+time+'\n', JSON.stringify(beacon, null, 2));

    //既知のBeaconは古い情報を削除
    beacons.forEach(function(e, i, a) {
        if (e.id == beacon.id) {
            beacons.splice( i, 1 ) ;
        }
    })
    beacons.push(beacon);

});

EddystoneBeaconScanner.on('lost', function(beacon) {
    var time = new Date();

    if (beacon.namespace !== undefined) {
        var namespace = beacon.namespace + "";
        var interest = namespace.substr(0, 1);
        var events = 'lost';
        var dist = beacon.distance;
        var beaconid = beacon.id;
        var data = {
            'time': time,
            'int': interest,
            'dist':dist,
            'id':beaconid,
            'evt': events
        };
        fs.appendFile('web/beacon.log', JSON.stringify(data, null));
    }

    // console.log('lost Eddystone beacon:' + time + '\n', JSON.stringify(beacon, null, 2));
});

EddystoneBeaconScanner.startScanning(true);

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
    if (beacon.namespace !== undefined) {
        var namespace = beacon.namespace + "";
        var interest = namespace.substr(0, 1);
        var data = {
            'time': time,
            'interest': interest,
        };
        // console.log(data);
        // var postData = JSON.stringify(data, null, '    ');
        // requestData(postData);
        fs.writeFile('web/data.json', JSON.stringify(data, null, '    '));
        selectedBeacon = null;
        beacons = [];
    }
}

function requestData(data) {
    var request = require('request');
    // URL
    var baseUrl = 'http://mocchi.kumo.sfc.keio.ac.jp/eddystone/update-json.php';
    request(baseUrl, {
        form: data
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
        } else {
            console.log(error);
        }
    })
}
