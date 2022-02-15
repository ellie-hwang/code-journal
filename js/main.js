/* global data */
/* exported data */

var $photoUrl = document.querySelector('input[name="photoUrl"]');
var $photo = document.querySelector('#photo');
$photoUrl.addEventListener('input', updatePhotoPreview);

function updatePhotoPreview(event) {
  $photo.setAttribute('src', $photoUrl.value);
}
