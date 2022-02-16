/* global data */
/* exported data */

var $photoUrl = document.querySelector('input[name="photoUrl"]');
var $photo = document.querySelector('.entry-photo');
$photoUrl.addEventListener('input', updatePhotoPreview);

function updatePhotoPreview(event) {
  $photo.setAttribute('src', $photoUrl.value);
}

var $journalEntry = document.querySelector('#journal-entry');

$journalEntry.addEventListener('submit', createEntry);

function createEntry(event) {
  event.preventDefault();
  var entryObj = {};
  var title = $journalEntry.elements.title.value;
  var photoUrl = $journalEntry.elements.photoUrl.value;
  var notes = $journalEntry.elements.notes.value;
  entryObj.title = title;
  entryObj.photoUrl = photoUrl;
  entryObj.notes = notes;
  entryObj.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryList.prepend(renderEntry(entryObj));
  $journalEntry.reset();
}

function renderEntry(entryObj) {
  var liEl = document.createElement('li');
  var divEl = document.createElement('div');
  var imgEl = document.createElement('img');
  var h3El = document.createElement('h3');
  var pEl = document.createElement('p');

  liEl.className = 'column-half pad-1-left-right pad-1-bottom';
  divEl.className = 'img-container';
  imgEl.className = 'entry-photo border-radius';
  imgEl.setAttribute('src', entryObj.photoUrl);
  h3El.textContent = entryObj.title;
  pEl.textContent = entryObj.notes;

  liEl.appendChild(divEl);
  divEl.appendChild(imgEl);
  liEl.appendChild(h3El);
  liEl.appendChild(pEl);

  return liEl;
}

var $entryList = document.querySelector('ul#entry-list');
window.addEventListener('DOMContentLoaded', displayEntries);

function displayEntries(event) {
  for (let i = 0; i < data.entries.length; i++) {
    var $entries = renderEntry(data.entries[i]);
    $entryList.appendChild($entries);
  }
}

var $entryForm = document.querySelector('div#entry-form');
var $entries = document.querySelector('div#entries');
var $container = document.querySelector('div.container');
$container.addEventListener('click', swapView);

function swapView(event) {
  if (event.target.matches('#new-button')) {
    $entries.className = 'hidden';
    $entryForm.className = '';
  } else if (event.target.matches('#save-button')) {
    $entryForm.className = 'hidden';
    $entries.className = '';
  } else if (event.target.matches('#nav-entries')) {
    $entryForm.className = 'hidden';
    $entries.className = '';
  }
}
