var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'kevvor';
var GITHUB_TOKEN = '49f5acd51a788ba6ba32d52770a728be0c348f21';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'kevvor'
    }
  };

  request(options, function(err, response, body) {
    if (err) {
      console.log('Error');
      return;
    }

    if (response.statusCode === 200) {
      var json = JSON.parse(body);
      cb(json);
    }
  });
}

function printURLs(jsonObject) {

  for (var i = 0; i < jsonObject.length; i++) {
    var img_url = jsonObject[i].avatar_url;
    downloadImagesByURL(img_url, `./avatars/${jsonObject[i]['login']}.jpg`)
  }
}

function downloadImagesByURL (url, filepath) {

  var options = {
    url: url,
    headers: {
      'User-Agent': 'kevvor'
    }
  };

  request.get(options)
    .on('response', function(response) {
      response.pipe(fs.createWriteStream(filepath));
  })
}

getRepoContributors(process.argv[2], process.argv[3], printURLs);




