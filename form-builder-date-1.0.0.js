(function () {
  var elems = document.querySelectorAll('.date');
  var options = {
    autoClose: true,
    firstDay: 1,
    format: 'dd/mm/yyyy'
  }
  M.Datepicker.init(elems, options);
})();