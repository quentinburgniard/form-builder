(function () {
  var elems = document.querySelectorAll('.date');
  var options = {
    autoClose: true,
    firstDay: 1,
    format: 'yyyy/mm/dd'
  }
  M.Datepicker.init(elems, options);
})();