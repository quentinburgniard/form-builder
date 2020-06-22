var formBuilder = formBuilder || {};

formBuilder.version = '1.0.0';
formBuilder.debug = formBuilder.debug || true;

formBuilder.addField = function(fieldID, fieldType) {
  var div = document.createElement('div');
  div.setAttribute('class', 'input-field col');
  var input, label;

  switch(fieldType) {
    case 'text':
      input = document.createElement('input');
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

formBuilder.init = function() {
  formBuilder.wrapper = document.querySelector('#form-builder');
  var fields = formBuilder.config.fields || [];
  fields.forEach(field => formBuilder.addField(field.name, field.type));

  if (document.querySelector('#form-builder-status')) {
    var script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/quentinburgniard/form-builder/master/form-builder-status-' + formBuilder.version + '.js';
    document.head.appendChild(script);
  }
}

formBuilder.status = function() {
  formBuilder.wrapper = document.querySelector(formBuilder.config.wrapper) || '';
  var fields = formBuilder.config.fields || [];
  fields.forEach(field => formBuilder.addField(field.name, field.type));
}

formBuilder.log = function(message) {
  if(formBuilder.debug) {
    var prefix = 'Form Builder ' + formBuilder.version + ' ';
    console.log(prefix + message);
  }
}

formBuilder.saveFields = function() {
  
}

formBuilder.init();