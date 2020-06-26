var formBuilder = formBuilder || {};

formBuilder.version = '1.0.0';
formBuilder.debug = formBuilder.debug || false;

formBuilder.addField = function (id, fieldName = '', fieldType, options = []) {
  var div = document.createElement('div');
  div.className = 'input-field';
  var field, label;

  switch (fieldType) {
    case 'email':
    case 'number':
    case 'tel':
    case 'url':
    case 'text':
      field = document.createElement('input');
      field.className = 'validate';
      field.type = fieldType;
      break;
    case 'date':
      field = document.createElement('input');
      field.className = fieldType;
      field.type = 'text';
      break;
    case 'select':
      field = document.createElement('select');
      options.forEach(function (optionName, optionID) {
        option = document.createElement('option');
        if (optionID == 0) option.setAttribute('selected', '');
        option.value = optionID;
        option.innerText = optionName;
        field.appendChild(option);
      });
      break;
    case 'textarea':
      field = document.createElement('textarea');
      field.className = 'materialize-textarea';
      break;
  }

  field.name = id;
  field.className = field.className + ' form-builder-fields';
  label = document.createElement('label');
  label.for = id;
  label.innerText = fieldName;
  div.appendChild(field);
  div.appendChild(label);
  if (field && label) formBuilder.dom.form.appendChild(div);
}

formBuilder.dynamicLoading = function () {
  var prefix = 'file:///home/quentin/form-builder/form-builder-';
  //var prefix = 'https://raw.githubusercontent.com/quentinburgniard/form-builder/master/form-builder-';
  var plugins = formBuilder.config.plugins || [];
  if (document.querySelector('#form-builder-preview')) plugins.push('preview');
  if (document.querySelector('#form-builder-status')) plugins.push('status');
  plugins.forEach(function (plugin) {
    formBuilder.log('Load dynamically ' + plugin);
    var script = document.createElement('script');
    script.src = prefix + plugin + '-' + formBuilder.version + '.js';
    document.head.appendChild(script);
  });
}

formBuilder.init = function () {
  formBuilder.log('Initialisation');

  formBuilder.dom = {};
  formBuilder.dom.form = document.querySelector('#form-builder');
  formBuilder.dom.form.innerHTML = '';
  formBuilder.dom.form.addEventListener('submit', formBuilder.submit);

  var fields = formBuilder.config.fields || [];
  fields.forEach(function (field, id) {
    formBuilder.addField(id, field.name, field.type, field.options);
  });
  formBuilder.dom.fields = formBuilder.dom.form.querySelectorAll('.form-builder-fields');
  
  M.AutoInit();

  var submit = document.createElement('input');
  formBuilder.dom.submit = submit;
  submit.className = 'btn right';
  submit.type = 'submit';
  submit.value = 'Open';
  formBuilder.dom.form.appendChild(submit);

  formBuilder.dynamicLoading();
}

formBuilder.log = function (message) {
  if (formBuilder.debug) {
    var prefix = 'Form Builder ' + formBuilder.version + ' ';
    console.log(prefix + message);
  }
}

formBuilder.getFields = function () {
  formBuilder.dom.fields.forEach(function(field, index) {
    formBuilder.config.fields[index].value = field.value;
  });
  return formBuilder.config.fields;
}

formBuilder.submit = function (event) {
  formBuilder.log('Submit');
  
}

formBuilder.init();