(function () {
  document.addEventListener('form-builder-local-backup-loaded', function(event) {
    console.log('test');
  });
  var parameters = window.location.search.substring(1);
  if (parameters) {
    parameters.split('&').forEach(function (parameter) {
      parameter = parameter.split('=');
      var id = parameter[0];
      var value = parameter[1];
      if (id && value) {
        var field = document.querySelector('.form-builder-fields#' + id);
        if (field) {
          field.value = value;
        }
      }
    });
  }
})();