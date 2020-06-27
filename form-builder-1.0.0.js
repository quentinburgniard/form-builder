(function () {
  var dom = {};
  var formBuilder = window.formBuilder || {};
  formBuilder.version = '1.0.0';
  formBuilder.debug = formBuilder.debug || false;

  var addField = function (fieldName = '', fieldType, options = []) {
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
        field.type = fieldType;
        break;
      case 'date':
        field = document.createElement('input');
        field.className = fieldType;
        field.type = 'text';
        break;
      case 'select':
        field = document.createElement('select');
        options.forEach(function (optionName, i) {
          option = document.createElement('option');
          if (i == 0) option.setAttribute('selected', '');
          option.value = optionName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          option.value = option.value.toLowerCase();
          option.value = option.value.replace(/\s*/g, '');
          option.innerText = optionName;
          field.appendChild(option);
        });
        break;
      case 'textarea':
        field = document.createElement('textarea');
        field.className = 'materialize-textarea';
        break;
    }

    field.id = fieldName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    field.id  = field.id.toLowerCase();
    field.id  = field.id.replace(/\s*/g, '');
    field.classList.add('form-builder-fields', 'validate');
    label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.innerText = fieldName;
    div.appendChild(field);
    div.appendChild(label);
    if (field && label) dom.form.appendChild(div);
  }

  var dynamicLoading = function () {
    var prefix = '../form-builder-';
    var plugins = formBuilder.config.plugins || [];
    if (document.querySelector('#form-builder-action')) plugins.push('action');
    //if (!localStorage.getItem('form-builder-discovery')) plugins.push('discovery');
    if (document.querySelector('#form-builder-preview')) plugins.push('preview');
    plugins.forEach(function (plugin) {
      log('Load dynamically ' + plugin);
      var script = document.createElement('script');
      script.async = true;
      script.src = prefix + plugin + '-' + formBuilder.version + '.js';
      document.head.appendChild(script);
    });
  }

  var submitForm = function (event) {
    event.preventDefault();
    dom.submit.classList.add('disabled');

    var form = document.createElement('form');
    form = document.createElement('form');
    form.action = dom.form.action;
    form.method = 'post';
    var field = document.createElement('input');
    field.name = 'fields';
    field.value = JSON.stringify(getFields());
    form.appendChild(field);
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
  }

  var init = function () {
    log('Initialisation');

    dom.form = document.querySelector('#form-builder');
    dom.form.innerHTML = '';

    var fields = formBuilder.config.fields || [];
    fields.forEach(function (field) {
      addField(field.name, field.type, field.options);
    });
    dom.fields = dom.form.querySelectorAll('.form-builder-fields');

    dynamicLoading();

    M.AutoInit();
  }

  var log = function (message) {
    if (formBuilder.debug) {
      var prefix = 'Form Builder ' + formBuilder.version + ' ';
      console.log(prefix + message);
    }
  }

  var getFields = function () {
    var fields = {};
    dom.fields.forEach(function (field) {
      fields[field.id] = field.value;
    });
    return fields;
  }

  var setFields = function (fields) {
    dom.fields.forEach(function (field) {
      field.value = fields[field.id] || '';
    });
  }

  var submitForm = function () {
    var form = document.createElement('form');
    form.action = dom.form.action;
    form.method = 'post';
    var field = document.createElement('input');
    field.name = 'fields';
    field.value = JSON.stringify(getFields());
    form.appendChild(field);
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
  }

  formBuilder.dom = dom;
  formBuilder.getFields = getFields;
  formBuilder.setFields = setFields;
  formBuilder.submitForm = submitForm;
  formBuilder.log = log;

  init();
})();