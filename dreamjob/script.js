var clipboard = new Clipboard('.btn-copy', {
    text: function() {
        return document.querySelector('input[type=hidden]').value;
    }
});
clipboard.on('success', function(e) {
  alert("Copied!");
  e.clearSelection();
});
$("#input-url").val(location.href);
//safari
if (navigator.vendor.indexOf("Apple")==0 && /\sSafari\//.test(navigator.userAgent)) {
   $('.btn-copy').on('click', function() {
var msg = window.prompt("Copy this link", location.href);

});
  }