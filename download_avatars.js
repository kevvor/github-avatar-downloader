var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'kevvor';
var GITHUB_TOKEN = '49f5acd51a788ba6ba32d52770a728be0c348f21';

function getRepoContributors(repoOwner, repoName, cb) {

  if (!repoOwner || !repoName) {
    console.log('To use this program, please pass arguments in the form of: "<owner> <repo>"')
    return;
  }

  console.log('Welcome to the GitHub Avatar Downloader!\n' + 'Downloading avatar images from:\n' + 'Repo Owner: ' + repoOwner + '\n' + 'Repo Name: ' + repoName);


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
  console.log('Download finished!');

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
    console.log('Downloading avatar images...')
}

getRepoContributors(process.argv[2], process.argv[3], printURLs);




