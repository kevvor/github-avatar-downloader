var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'kevvor';
var GITHUB_TOKEN = '49f5acd51a788ba6ba32d52770a728be0c348f21';

var inputOwner = process.argv[2];
var inputRepo = process.argv[3];


function getRepoContributors(repoOwner, repoName, callback) {
//Check if arguments have been properly passed from the command line
  if (!repoOwner || !repoName) {
    console.log('To use this program, please pass arguments in the form of: "<owner> <repo>"')
    return;
  }
//Begin program if proper arguments have been passed
  console.log('Welcome to the GitHub Avatar Downloader!\n' + 'Downloading avatar images from:\n' + 'Repo Owner: ' + repoOwner + '\n' + 'Repo Name: ' + repoName);

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'kevvor'
    }
  };
//In case of error, throw the program. Run callback to store JSON information
  request(options, function(err, response, body) {

    if (err) {
      console.log('Error');
      return;
    }

    if (response.statusCode === 200) {
      var json = JSON.parse(body);
      callback(json);
    }
  });
}

function generateFiles(jsonObj) {
//Loop through JSON object, retrieving specified fields (Github username and avatar img)
//Invokes download function and specifies the path
  for (var i = 0; i < jsonObj.length; i++) {
    var img_url = jsonObj[i].avatar_url;
    downloadImagesByURL(img_url, `./avatars/${jsonObj[i]['login']}.jpg`)
  }
  console.log('Download finished!');
}

function downloadImagesByURL (url, filepath) {
//
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

getRepoContributors(inputOwner, inputRepo, generateFiles);



