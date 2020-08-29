(function () {
  var formBuilder = window.formBuilder || {};
  var displayCollection = function (button) {
    event.preventDefault();
    button.style.display = 'none';
    button.closest('.form-builder-collection').querySelectorAll('.input-field').forEach(function (field) {
      field.style.display = 'block';
    });
  }
  formBuilder.displayCollection = displayCollection;

  document.querySelectorAll('.form-builder-collection').forEach(function (collection) {
    var empty = true;
    collection.querySelectorAll('.form-builder-fields').forEach(function (field) {
      if (field.value) empty = false;
    });
    if (empty) {
      collection.querySelectorAll('.input-field').forEach(function (field) {
        field.style.display = 'none';
      });
      collection.innerHTML += '<button class="btn-floating" onclick="formBuilder.displayCollection(this)"><i class="material-icons">add</i></a>';
    }
  });
})();