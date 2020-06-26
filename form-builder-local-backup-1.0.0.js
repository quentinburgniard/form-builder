(function () {
  function save() {
    formBuilder.log('Local Backup Save');
    formBuilder.getFields();
  }

  formBuilder.dom.form.addEventListener('submit', save);
  formBuilder.dom.fields.forEach(field => field.addEventListener('change', save));
});