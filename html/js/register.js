$(document).ready(function() {
    $("#register").click(function(){
      var email = $("#email").val();
      var password = $("#password").val();
        $.post(
          "https://yrp0gdu0i9.execute-api.eu-west-2.amazonaws.com/prod",
          "{\"email\": \"" + email + "\", \"password\": \"" + password + "\"}",
          success,
          'json'
        )
    });
});

function success(data){
  if(data.errorMessage)
    $("#errors").fadeIn(100);
  else {
    $("#form").fadeOut(500);
    $("#success").fadeIn(500);
  }
}
