(function () {
  formBuilder.localBackup = formBuilder.localBackup || {};
  var formName = formBuilder.config.form.name;
  formName = formName.toLowerCase();
  formName = formName.replace(/\s+/gi, '-');
  formName = formName + '-' + formBuilder.config.form.version;
  var fields = localStorage.getItem('form-builder-' + formName);
  if (fields) fields = JSON.parse(fields);

  var save = function () {
    formBuilder.log('Local Backup Save');
    fields = formBuilder.getFields();
    localStorage.setItem('form-builder-' + formName, JSON.stringify(fields));
  }
  formBuilder.localBackup.save = save;

  var getValue = function (id) {
    var IDs = id.split('-');
    var value = '';
    if (fields) {
      if (IDs.length == 1) {
        value = fields[IDs[0]] || '';
      }
      if (IDs.length == 3) {
        if (fields[IDs[0]] && fields[IDs[0]][IDs[1]] && fields[IDs[0]][IDs[1]][IDs[2]]) {
          return fields[IDs[0]][IDs[1]][IDs[2]];
        }
      }
    }
    return value;
  }
  formBuilder.localBackup.getValue = getValue;

  if (fields) formBuilder.setFields(fields);
  M.updateTextFields();
  document.querySelectorAll('textarea.form-builder-fields').forEach(function (field) {
    M.textareaAutoResize(field);
  });
  formBuilder.dom.form.addEventListener('submit', save);
  formBuilder.dom.fields.forEach(field => field.addEventListener('change', save));
})();