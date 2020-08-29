(function () {
  var displayCollection = function (button) {
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
      collection.innerHTML += '<a class="btn-floating" onclick="formBuilder.displayCollection(this)"><i class="material-icons">add</i></a>';
    }
  });
})();