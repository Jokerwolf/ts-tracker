const request = require('request');

module.exports = () => request({
  url: 'https://api.foursquare.com/v2/users/self/checkins',
  method: 'GET',
  qs: {
    client_id: 'TAT2TDKMMFVQZJXDGYO50DKFNMRSUBXGCLA5V35STEBLNKJP',
    client_secret: 'JQGWAQO5ZCOWAU00FGKVLIOLS0315CO1D04S1DLK2RDNV55X',
    v: '20190511',
  }
}, function(err, res, body) {
  if (err) {
    console.error(err);
    return err;
  } else {
    console.log(body);
    return body;
  }
});

