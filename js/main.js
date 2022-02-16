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
  var ulEl = document.createElement('ul');
  var liEl = document.createElement('li');
  var divEl = document.createElement('div');
  var imgEl = document.createElement('img');
  var liEl2 = document.createElement('li');
  var h3El = document.createElement('h3');
  var pEl = document.createElement('p');

  ulEl.className = 'display-flex';
  liEl.className = 'column-half pad-1-left-right pad-1-3-bottom';
  imgEl.className = 'entry-photo border-radius';
  imgEl.setAttribute('src', entryObj.photoUrl);
  liEl2.className = 'column-half pad-1-left-right pad-1-3-bottom';
  h3El.textContent = entryObj.title;
  pEl.textContent = entryObj.notes;

  ulEl.appendChild(liEl);
  ulEl.appendChild(liEl2);
  liEl.appendChild(divEl);
  divEl.appendChild(imgEl);
  liEl2.appendChild(h3El);
  liEl2.appendChild(pEl);

  return ulEl;
}

var $entryList = document.querySelector('div#entry-list');
window.addEventListener('DOMContentLoaded', displayEntries);

function displayEntries(event) {
  for (let i = 0; i < data.entries.length; i++) {
    var $entries = renderEntry(data.entries[i]);
    $entryList.appendChild($entries);
  }
}

var $entryForm = document.querySelector('div#entry-form');
var $entriesView = document.querySelector('div#entries-view');
var $container = document.querySelector('div.container');
$container.addEventListener('click', swapView);

function swapView(event) {
  if (event.target.matches('#new-button')) {
    $entriesView.className = 'hidden';
    $entryForm.className = '';
  } else if (event.target.matches('#save-button')) {
    $entryForm.className = 'hidden';
    $entriesView.className = '';
  } else if (event.target.matches('#nav-entries')) {
    $entryForm.className = 'hidden';
    $entriesView.className = '';
  }
}
