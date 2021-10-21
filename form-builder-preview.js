(function () {
  var preview = document.querySelector('#form-builder-preview');
  preview.style.lineHeight = '0';
  preview.style.overflow = 'hidden';
  preview.style.position = 'fixed';
  preview.style.right = '20px';
  preview.style.top = '20px';
  preview.style.zIndex = '2';
  var iframe = document.createElement('iframe');
  var resize = function () {
    var width = window.innerWidth / 3;
    var ratio = width / parseFloat(preview.getAttribute('width'));
    var height = parseFloat(preview.getAttribute('height'));
    height = height * ratio;
    iframe.height = height;
    iframe.width = width;
  }
  iframe.name = 'form-builder-preview';
  iframe.style.border = 'none';
  resize();

  preview.appendChild(iframe);

  var form  = document.createElement('form');
  form.action = formBuilder.dom.form.action + '';
  form.method = 'post';
  form.target = 'form-builder-preview';
  var field = document.createElement('input');
  field.name = 'fields';
  field.value = JSON.stringify(formBuilder.getFields());
  form.appendChild(field);
  form.style.display = 'none';
  document.body.appendChild(form);
  form.submit();

  var refresh = function () {
    field.value = JSON.stringify(formBuilder.getFields());
    form.submit();
  }

  formBuilder.dom.fields.forEach(field => field.addEventListener('change', refresh));
  //window.addEventListener('resize', resize);
})();
