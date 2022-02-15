/* global data */
/* exported data */

var $photoUrl = document.querySelector('input[name="photoUrl"]');
var $photo = document.querySelector('#photo');
$photoUrl.addEventListener('input', updatePhotoPreview);

function updatePhotoPreview(event) {
  $photo.setAttribute('src', $photoUrl.value);
}

var $journalEntry = document.querySelector('#journal-entry');

$journalEntry.addEventListener('submit', createEntry);
// var nextEntryId = 0;
function createEntry(event) {
  event.preventDefault();
  var entryObj = {};
  var title = $journalEntry.elements.title.value;
  var photoUrl = $journalEntry.elements.photoUrl.value;
  var journalEntry = $journalEntry.elements.journalEntry.value;
  entryObj.title = title;
  entryObj.photoUrl = photoUrl;
  entryObj.journalEntry = journalEntry;
  // console.log('entryObj: ', entryObj);
}
