var request = require('request');

var GITHUB_USER = 'kevvor';
var GITHUB_TOKEN = '49f5acd51a788ba6ba32d52770a728be0c348f21';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://' + GITHUB_USER + ':' + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

}

getRepoContributors('jquery', 'jquery', function (err, result) {
  console.log('Errors:', err);
  console.log('Result:', result);
});