(function () {
  var action = document.querySelector('#form-builder-action');
  action.className = 'fixed-action-btn';
  action.innerHTML = '<button class="btn-floating btn-large" type="button"><i class="large material-icons">launch</i></button><ul><li><button type="button" class="btn-floating" onclick="formBuilder.submitForm()"><i class="material-icons">file_download</i></button></li></ul>';
  M.FloatingActionButton.init(action);
})();