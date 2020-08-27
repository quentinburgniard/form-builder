(function () {
  //var script = document.createElement('script');
  //script.src = 'https://cdnjs.cloudflare.com/ajax/libs/blueimp-load-image/5.13.0/load-image.min.js';
  //document.head.appendChild(script);
  document.querySelectorAll('.form-builder-image').forEach(function (field) {
    var fieldID = field.getAttribute('data-id');
    field.onchange = function () {
      var file = field.files[0];
      var reader = new FileReader();
      reader.onload = function () {
        var image = this.result;
        var htmlHiddenField = document.querySelector('.form-builder-fields#' + fieldID);
        htmlHiddenField.value = image;
        htmlHiddenField.dispatchEvent(new Event('change'));
      }
      reader.readAsDataURL(file);
    }
  });
})();