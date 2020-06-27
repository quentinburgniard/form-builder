(function () {
  var formName = formBuilder.config.form.name;
  formName = formName.toLowerCase();
  formName = formName.replace(/\s+/gi, '-');
  formName = formName + '-' + formBuilder.config.form.version;

  var save = function () {
    formBuilder.log('Local Backup Save');
    localStorage.setItem('form-builder-' + formName, JSON.stringify(formBuilder.getFields()));
  }

  var fields = localStorage.getItem('form-builder-' + formName)
  formBuilder.setFields(JSON.parse(fields));
  M.updateTextFields();
  formBuilder.dom.form.addEventListener('submit', save);
  formBuilder.dom.fields.forEach(field => field.addEventListener('change', save));
})();