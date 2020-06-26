(function () {
  var dom = {};
  var formBuilder = window.formBuilder || {};
  formBuilder.version = '1.0.0';
  formBuilder.debug = formBuilder.debug || false;

  var addField = function (id, fieldName = '', fieldType, options = []) {
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
    field.classList.add('form-builder-fields', 'validate');
    field.id = 'f' + id;
    label = document.createElement('label');
    label.setAttribute('for', 'f' + id);
    label.innerText = fieldName;
    div.appendChild(field);
    div.appendChild(label);
    if (field && label) dom.form.appendChild(div);
  }

  var dynamicLoading = function () {
    var prefix = 'file:///home/quentin/form-builder/form-builder-';
    //var prefix = 'https://raw.githubusercontent.com/quentinburgniard/form-builder/master/form-builder-';
    var plugins = formBuilder.config.plugins || [];
    //if (!localStorage.getItem('form-builder-discovery')) plugins.push('discovery');
    if (document.querySelector('#form-builder-preview')) plugins.push('preview');
    if (document.querySelector('#form-builder-status')) plugins.push('status');
    plugins.forEach(function (plugin) {
      log('Load dynamically ' + plugin);
      var script = document.createElement('script');
      script.async = true;
      script.src = prefix + plugin + '-' + formBuilder.version + '.js';
      document.head.appendChild(script);
    });
  }

  var init = function () {
    log('Initialisation');
    
    dom.form = document.querySelector('#form-builder');
    dom.form.innerHTML = '';
    dom.form.addEventListener('submit', submit(event));

    var fields = formBuilder.config.fields || [];
    fields.forEach(function (field, id) {
      addField(id, field.name, field.type, field.options);
    });
    dom.fields = dom.form.querySelectorAll('.form-builder-fields');
    
    var submit = document.createElement('input');
    dom.submit = submit;
    submit.className = 'btn right';
    submit.id = 'form-builder-submit';
    submit.type = 'submit';
    submit.value = 'Lancer';
    dom.form.appendChild(submit);

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
    dom.fields.forEach(function(field, index) {
      formBuilder.config.fields[index].value = field.value;
    });
    return formBuilder.config.fields;
  }

  var submit = function (event) {
    event.preventDefault();
    dom.submit.classList.add('disabled');

    var form  = document.createElement('form');
    form  = document.createElement('form');
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
  formBuilder.log = log;

  init();
})();