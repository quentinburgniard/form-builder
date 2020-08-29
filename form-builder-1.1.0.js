(function () {
  var dom = {};
  var formBuilder = window.formBuilder || {};
  formBuilder.version = '1.1.0';
  formBuilder.debug = formBuilder.debug || false;

  var getField = function (field) {
    var fieldID = field.id || getID(field.name)
    var fieldName = field.name || '';
    var fields = field.fields || [];
    var fieldType = field.type || '';
    var htmlField;
    var htmlLabel = document.createElement('label');
    htmlLabel.setAttribute('for', fieldID);
    htmlLabel.innerText = fieldName;
    var htmlWrapper = document.createElement('div');
    htmlWrapper.className = 'input-field';
    var max = field.max || 0;
    var options = field.options || [];

    switch (fieldType) {
      case 'collection':
        htmlWrapper.id = fieldID;
        htmlWrapper.className = '';
        for (i = 0; i < max; i++) {
          var htmlCollection = document.createElement('div');
          htmlCollection.className = 'form-builder-collection';
          htmlCollection.style.paddingTop = '5px';
          htmlCollection.style.paddingBottom = '5px'
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
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
      case 'date':
        htmlField = document.createElement('input');
        htmlField.className = fieldType;
        htmlField.type = 'text';
        break;
      case 'img':
        htmlField = document.createElement('input');
        htmlField.className = 'form-builder-image';
        htmlField.setAttribute('data-id', fieldID);
        htmlField.type = 'file';
        htmlLabel = document.createElement('div');
        htmlLabel.className = 'btn';
        htmlWrapper.classList.add('file-field');
        var span = document.createElement('span');
        span.innerHTML = fieldName;
        htmlLabel.appendChild(span);
        htmlLabel.appendChild(htmlField);
        htmlWrapper.appendChild(htmlLabel);
        htmlWrapper.innerHTML += '<div class="file-path-wrapper"><input class="file-path" style="color: rgba(0, 0, 0, 0)" type="text"></div>';
        var htmlHiddenField = document.createElement('input');
        htmlHiddenField.className = 'form-builder-fields';
        htmlHiddenField.id = fieldID;
        htmlHiddenField.style.display = 'none';
        dom.form.appendChild(htmlHiddenField);
        break;
      case 'pagination':
        htmlWrapper = document.createElement('li');
        htmlLabel = document.createElement('div');
        htmlLabel.className = 'collapsible-header form-builder-pagination';
        htmlLabel.innerText = fieldName;
        htmlField = document.createElement('div');
        htmlField.className = 'collapsible-body';
        fields.forEach(function (paginationField) {
          htmlField.appendChild(getField(paginationField));
        });
        htmlWrapper.appendChild(htmlLabel);
        htmlWrapper.appendChild(htmlField);
        break;
      case 'select':
        htmlField = document.createElement('select');
        options.forEach(function (optionName, i) {
          option = document.createElement('option');
          if (i == 0) option.setAttribute('selected', '');
          option.value = getID(optionName);
          option.innerText = optionName;
          htmlField.appendChild(option);
        });
        break;
      case 'text':
        htmlField = document.createElement('input');
        htmlField.type = fieldType;
        break;
      case 'textarea':
        htmlField = document.createElement('textarea');
        htmlField.className = 'materialize-textarea';
        break;
    }
    if (fieldType && !/collection|img|pagination/.test(fieldType)) {
      htmlField.id = fieldID;
      htmlField.classList.add('form-builder-fields', 'validate');
      if (htmlField && htmlLabel) {
        htmlWrapper.appendChild(htmlField);
        htmlWrapper.appendChild(htmlLabel);
      }
    }
    return htmlWrapper;
  }

  var dynamicLoading = function () {
    var prefix = 'form-builder-';
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
    var ul = document.createElement('ul');
    ul.className = 'collapsible z-depth-0';
    ul.style.border = '0';
    var fields = formBuilder.config.fields || [];
    fields.forEach(function (field, index) {
      field.index = index;
      ul.appendChild(getField(field));
    });
    dom.form.appendChild(ul);
    dom.fields = dom.form.querySelectorAll('.form-builder-fields');;

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
    id = id.replace(/\W*/g, '');
    return id;
  }

  var getFields = function () {
    var fields = {};
    dom.fields.forEach(function (field) {
      if (field.value) {
        var IDs = field.id.split('-');
        if (IDs.length == 1) {
          fields[IDs[0]] = field.value;
        }
        if (IDs.length == 3) {
          fields[IDs[0]] = fields[IDs[0]] || [];
          fields[IDs[0]][IDs[1]] = fields[IDs[0]][IDs[1]] || {};
          fields[IDs[0]][IDs[1]][IDs[2]] = field.value;
        }
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
        if (fields[IDs[0]] && fields[IDs[0]][IDs[1]]) {
          field.value = fields[IDs[0]][IDs[1]][IDs[2]] || '';
        }
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