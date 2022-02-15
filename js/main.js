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
function createEntry(event) {
  var entryObj = {};
  var title = $journalEntry.elements.title.value;
  var photoUrl = $journalEntry.elements.photoUrl.value;
  var notes = $journalEntry.elements.notes.value;
  entryObj.title = title;
  entryObj.photoUrl = photoUrl;
  entryObj.notes = notes;
  entryObj.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $photo.setAttribute('src', '');
  title = '';
  photoUrl = '';
  notes = '';
}
