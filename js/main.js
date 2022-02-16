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
  var title = '';
  var photoUrl = '';
  var notes = '';
  if (data.editing === null) {
    // var entryObj = {};
    title = $journalEntry.elements.title.value;
    photoUrl = $journalEntry.elements.photoUrl.value;
    notes = $journalEntry.elements.notes.value;
    entryObj.title = title;
    entryObj.photoUrl = photoUrl;
    entryObj.notes = notes;
    entryObj.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(entryObj);
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryList.prepend(renderEntry(entryObj));
    $journalEntry.reset();
  } else if (data.editing !== null) {
    title = $journalEntry.elements.title.value;
    photoUrl = $journalEntry.elements.photoUrl.value;
    notes = $journalEntry.elements.notes.value;
    entryObj.title = title;
    entryObj.photoUrl = photoUrl;
    entryObj.notes = notes;
    entryObj.entryId = data.editing.entryId;
    data.entries[data.entries.length - data.editing.entryId] = entryObj;
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    $journalEntry.reset();
  }
}

function renderEntry(entryObj) {
  var liEl = document.createElement('li');
  var divEl = document.createElement('div');
  var imgEl = document.createElement('img');
  var divEl2 = document.createElement('div');
  var divEl3 = document.createElement('div');
  var h3El = document.createElement('h3');
  var iconEl = document.createElement('i');
  var pEl = document.createElement('p');

  liEl.className = 'display-flex space-between';
  liEl.setAttribute('data-entry-id', entryObj.entryId);
  // console.log(liEl.getAttribute('data-entry-id'));
  divEl.className = 'column-half pad-1-bottom pad-1-right';
  imgEl.className = 'entry-photo border-radius';
  imgEl.setAttribute('src', entryObj.photoUrl);
  divEl2.className = 'column-half pad-1-3-bottom pad-1-left';
  divEl3.className = 'row space-between';
  h3El.className = 'title';
  h3El.textContent = entryObj.title;
  iconEl.className = 'fa-solid fa-pen icon-color';
  pEl.textContent = entryObj.notes;

  liEl.appendChild(divEl);
  liEl.appendChild(divEl2);
  divEl.appendChild(imgEl);
  divEl3.appendChild(h3El);
  divEl3.appendChild(iconEl);
  divEl2.appendChild(divEl3);
  divEl2.appendChild(pEl);

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
var $entriesView = document.querySelector('div#entries-view');
var $container = document.querySelector('div.container');
$container.addEventListener('click', swapView);

function swapView(event) {
  if (event.target.matches('#new-button')) {
    $entriesView.className = 'hidden';
    $entryForm.className = '';
    data.view = 'entry-form';
  } else if (event.target.matches('#save-button')) {
    $entryForm.className = 'hidden';
    $entriesView.className = '';
    data.view = 'entries';
  } else if (event.target.matches('#nav-entries')) {
    $entryForm.className = 'hidden';
    $entriesView.className = '';
    data.view = 'entries';
  }
}

window.addEventListener('DOMContentLoaded', showSameView);

function showSameView(event) {
  if (data.view === 'entry-form') {
    $entryForm.className = '';
    $entriesView.className = 'hidden';
  } else if (data.view === 'entries') {
    $entryForm.className = 'hidden';
    $entriesView.className = '';
  }
}

$entryList.addEventListener('click', editEntry);

function editEntry(event) {
  if (event.target.matches('I')) {
    $entryForm.className = '';
    $entriesView.className = 'hidden';
    var $closestLi = event.target.closest('li');
    var $dataEntryId = $closestLi.getAttribute('data-entry-id');
    data.editing = data.entries[data.entries.length - $dataEntryId];
    $journalEntry.elements.title.value = data.editing.title;
    $journalEntry.elements.photoUrl.value = data.editing.photoUrl;
    $journalEntry.elements.notes.value = data.editing.notes;
    $photo.setAttribute('src', data.editing.photoUrl);
  }
}
