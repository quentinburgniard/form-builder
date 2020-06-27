(function () {
  var action = document.querySelector('#form-builder-action');
  action.className = 'fixed-action-btn';
  var button = document.createElement('button');
  button.classList.add('btn-floating', 'btn-large')
  button.type = 'button';
  var i = document.createElement('i');
  i.className = 'large material-icons';
  i.innerText = 'mode_edit';
  var ul = document.createElement('ul');
  ul.innerHTML = '<li><button type="button" class="btn-floating" onclick="formBuilder.submitForm()"><i class="material-icons">insert_chart</i></button></li>'
  button.appendChild(i);
  action.appendChild(button);
  action.appendChild(ul);

  M.FloatingActionButton.init(action);
})();