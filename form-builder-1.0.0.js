(function () {
  var dom = {};
  var formBuilder = window.formBuilder || {};
  formBuilder.version = '1.0.0';
  formBuilder.debug = formBuilder.debug || false;

  var getField = function (field) {
    var fieldID = field.id || getID(field.name)
    var fieldName = field.name || '';
    var fields = field.fields || [];
    var fieldType = field.type || '';
    var max = field.max || 0;
    var options = field.options || [];
    var htmlWrapper, htmlField, htmlLabel;
    if (fieldType !== 'collection') {
      htmlWrapper = document.createElement('div');
      htmlWrapper.className = 'input-field';
    }

    switch (fieldType) {
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
      case 'text':
        htmlField = document.createElement('input');
        htmlField.type = fieldType;
        break;
      case 'date':
        htmlField = document.createElement('input');
        htmlField.className = fieldType;
        htmlField.type = 'text';
        break;
      case 'select':
        htmlField = document.createElement('select');
        options.forEach(function (optionName, i) {
          option = document.createElement('option');
          if (i == 0) option.setAttribute('selected', '');
          option.value = optionName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          option.value = option.value.toLowerCase();
          option.value = option.value.replace(/\s*/g, '');
          option.innerText = optionName;
          htmlField.appendChild(option);
        });
        break;
      case 'textarea':
        htmlField = document.createElement('textarea');
        htmlField.className = 'materialize-textarea';
        break;
      case 'collection':
        htmlWrapper = document.createElement('div');
        htmlWrapper.id = fieldID;
        for (i = 0; i < max; i++) {
          var htmlCollection = document.createElement('div');
          htmlCollection.className = 'form-builder-collection';
          fields.forEach(function (collectionField) {
            var newCollectionField = {};
            newCollectionField.id = fieldID + '-' + i + '-' + getID(collectionField.name);
            newCollectionField.name = fieldName + ' - ' + collectionField.name;
            newCollectionField.type = collectionField.type;
            htmlCollection.appendChild(getField(newCollectionField));
          });
          htmlWrapper.appendChild(htmlCollection);
        }
        break;
    }
    if (fieldType && fieldType !== 'collection') {
      htmlField.id = fieldID;
      htmlField.classList.add('form-builder-fields', 'validate');
      htmlLabel = document.createElement('label');
      htmlLabel.setAttribute('for', fieldID);
      htmlLabel.innerText = fieldName;
      if (htmlField && htmlLabel) {
        htmlWrapper.appendChild(htmlField);
        htmlWrapper.appendChild(htmlLabel);
      }
    }
    return htmlWrapper;
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

  var init = function () {
    log('Initialisation');

    dom.form = document.querySelector('#form-builder');
    dom.form.innerHTML = '';

    var fields = formBuilder.config.fields || [];
    fields.forEach(function (field) {
      dom.form.appendChild(getField(field));
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

  var getID = function (fieldName) {
    var id = fieldName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    id = id.toLowerCase();
    id = id.replace(/\s*/g, '');
    return id;
  }

  var getFields = function () {
    var fields = {};
    dom.fields.forEach(function (field) {
      var IDs = field.id.split('-');
      if (IDs.length == 1) {
        fields[IDs[0]] = field.value;
      }
      if (IDs.length == 3) {
        fields[IDs[0]] = fields[IDs[0]] || [];
        fields[IDs[0]][IDs[1]] = fields[IDs[0]][IDs[1]] || {};
        fields[IDs[0]][IDs[1]][IDs[2]] = field.value;
      }
    });
    return fields;
  }

  var setFields = function (fields) {
    dom.fields.forEach(function (field) {
      var IDs = field.id.split('-');
      if (IDs.length == 1) {
        field.value = fields[IDs[0]] || '';
      }
      if (IDs.length == 3) {
        field.value = fields[IDs[0]][IDs[1]][IDs[2]] || '';
      }
    });
  }

  var submitForm = function () {
    var form = document.createElement('form');
    form.action = dom.form.action;
    form.method = 'post';
    form.style.display = 'none';
    form.innerHTML = '<input name="fields" value="' + JSON.stringify(getFields()) + '"';
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