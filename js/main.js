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

var $entryFormHeading = document.querySelector('h2#entry-form-heading');

function createEntry(event) {
  event.preventDefault();
  var entryObj = {};
  var title = '';
  var photoUrl = '';
  var notes = '';
  if (data.editing === null) {
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
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryObj.entryId) {
        data.entries[i] = entryObj;
      }
    }
    data.editing = null;
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    $closestLi.replaceWith(renderEntry(entryObj));
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
var $viewContainer = document.querySelector('div#view-container');
$viewContainer.addEventListener('click', swapView);
var $navBarDiv = document.querySelector('div#nav-bar');
$navBarDiv.addEventListener('click', swapViewEntries);

function swapView(event) {
  if (event.target.matches('#new-button')) {
    $entriesView.className = 'hidden';
    $entryForm.className = '';
    data.view = 'entry-form';
    data.editing = null;
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    $journalEntry.reset();
  } else if (event.target.matches('#save-button')) {
    $entryForm.className = 'hidden';
    $entriesView.className = '';
    data.view = 'entries';
  }
}

function swapViewEntries(event) {
  if (event.target.matches('#nav-entries')) {
    $entryFormHeading.textContent = 'New Entry';
    $entryForm.className = 'hidden';
    $entriesView.className = '';
    data.view = 'entries';
    data.editing = null;
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
var $closestLi = null;

function editEntry(event) {
  if (event.target.matches('I')) {
    $entryFormHeading.textContent = 'Edit Entry';
    $entryForm.className = '';
    $entriesView.className = 'hidden';
    $closestLi = event.target.closest('li');
    var $dataEntryId = $closestLi.getAttribute('data-entry-id');
    $dataEntryId = JSON.parse($dataEntryId);
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $dataEntryId) {
        data.editing = data.entries[i];
      }
    }
    $journalEntry.elements.title.value = data.editing.title;
    $journalEntry.elements.photoUrl.value = data.editing.photoUrl;
    $journalEntry.elements.notes.value = data.editing.notes;
    $photo.setAttribute('src', data.editing.photoUrl);
  }
}

$entriesView.addEventListener('click', deleteEntryOption);
var $deleteButton = document.querySelector('#delete-button');

function deleteEntryOption(event) {
  if (event.target.matches('I')) {
    $deleteButton.className = '';
  } else {
    $deleteButton.className = 'visibility-hidden';
  }
}

$deleteButton.addEventListener('click', showDialogueBox);
var $modal = document.querySelector('#modal');

function showDialogueBox(event) {
  $modal.className = 'black-bg';
}

var $cancelButton = document.querySelector('#cancel-button');
$cancelButton.addEventListener('click', hideModal);

function hideModal(event) {
  $modal.className = 'black-bg hidden';
}

var $confirmButton = document.querySelector('#confirm-button');
$confirmButton.addEventListener('click', deleteEntry);

function deleteEntry(event) {
  var $entryDelete = 0;
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      $entryDelete = i;
    }
  }
  data.entries.splice($entryDelete, 1);
  var $liElementList = document.querySelectorAll('li');
  for (let i = 0; i < $liElementList.length; i++) {
    if (JSON.parse($liElementList[i].getAttribute('data-entry-id')) === data.editing.entryId) {
      $liElementList[i].remove();
    }
  }
  data.editing = null;
  $entryForm.className = 'hidden';
  $entriesView.className = '';
  data.view = 'entries';
  $modal.className = 'black-bg hidden';
}
