var formBuilder = formBuilder || {};

formBuilder.version = '1.0.0';
formBuilder.debug = formBuilder.debug || false;

formBuilder.addField = function (fieldID, fieldType) {
  var div = document.createElement('div');
  div.setAttribute('class', 'input-field');
  var input, label;

  switch (fieldType) {
    case 'text':
      input = document.createElement('input');
      input.setAttribute('id', fieldID);
      input.setAttribute('type', 'text');
      label = document.createElement('label');
      label.setAttribute('for', fieldID);
      label.innerText = fieldID;
      break;
    case 'date':
      input = document.createElement('input');
      input.setAttribute('class', fieldType);
      input.setAttribute('id', fieldID);
      input.setAttribute('type', 'text');
      label = document.createElement('label');
      label.setAttribute('for', fieldID);
      label.innerText = fieldID;
      break;
  }

  div.appendChild(input);
  div.appendChild(label);
  formBuilder.wrapper.appendChild(div);
}

formBuilder.dynamicLoading = function () {
  var prefix = 'https://raw.githubusercontent.com/quentinburgniard/form-builder/master/form-builder-';
  var plugins = formBuilder.config.plugins || [];
  if (document.querySelector('#form-builder-status')) plugins.push('status');
  plugins.forEach(function(plugin) {
    var script = document.createElement('script');
    script.src = prefix + plugin + '-' + formBuilder.version + '.js';
    document.head.appendChild(script);
  });
}

formBuilder.init = function () {
  formBuilder.log('Initialisation');
  formBuilder.wrapper = document.querySelector('#form-builder');
  var fields = formBuilder.config.fields || [];
  fields.forEach(field => formBuilder.addField(field.name, field.type));

  formBuilder.dynamicLoading();
}

formBuilder.log = function (message) {
  if (formBuilder.debug) {
    var prefix = 'Form Builder ' + formBuilder.version + ' ';
    console.log(prefix + message);
  }
}

formBuilder.saveFields = function () {

}

formBuilder.init();