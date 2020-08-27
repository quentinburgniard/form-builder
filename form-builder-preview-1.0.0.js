(function () {
  var preview = document.querySelector('#form-builder-preview');
  preview.classList.add('card', 'hide-on-med-and-down');
  preview.style.height = preview.getAttribute('height');
  preview.style.lineHeight = '0';
  preview.style.overflow = 'hidden';
  preview.style.position = 'fixed';
  preview.style.right = '20px';
  preview.style.top = '20px';
  preview.style.width = preview.getAttribute('width');
  var iframe = document.createElement('iframe');
  iframe.height = preview.getAttribute('height');
  iframe.name = 'form-builder-preview';
  iframe.style.border = 'none';
  iframe.width = preview.getAttribute('width');
  preview.appendChild(iframe);

  var form  = document.createElement('form');
  form.action = formBuilder.dom.form.action + '#toolbar=0';
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
})();