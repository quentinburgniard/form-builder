(function () {
  var steps = [
    {
      title: 'Lance Form Builder',
      target: 'form-builder-submit'
    }
  ]

  var discovery = document.createElement('div');
  discovery.id = 'form-builder-discovery';

  for (i = 0; i < steps.length; i++) {
    var step = document.createElement('div');
    step.className = 'tap-target';
    step.setAttribute('data-target', steps[i].target);
    var content = document.createElement('div');
    content.className = 'tap-target-content';
    content.innerHTML = '<h5>' + steps[i].title  + '</h5>';
    step.appendChild(content);
    discovery.appendChild(step);
  }

  document.body.appendChild(discovery);

  var elems = document.querySelectorAll('.tap-target');
  var options = {
    onClose: function() {
      localStorage.setItem('form-builder-discovery', 'disabled')
    }
  }
  M.TapTarget.init(elems, options);
  M.TapTarget.getInstance(document.querySelector('.tap-target')).open();
})();