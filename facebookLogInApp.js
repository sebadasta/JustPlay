


 window.fbAsyncInit = function() {//checks facebook connection onLoad
    FB.init({
      appId      : '728098144022836',
      xfbml      : true,
      version    : 'v2.8'
    });

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {

      //  alert("Face connected true");
        //  window.location.replace("home/home.view2.html");
    //   location.reload(true);

            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;



        } else if (response.status === 'not_authorized') {

      //  alert("Face connected not autori");

        } else {
            // the user isn't logged in to Facebook.
        // alert("Face connected false");

        }


    });

  };




  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


   function fb_login(){

   var email = "";
   var userName = "";
   var userPhoto = "";


    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID
console.log(user_id);

FB.api("/me/picture?width=180&height=180",  function(response) {

userPhoto = response.data.url;

        console.log(userPhoto);// get user photo

});



           FB.api('/me', {fields: 'name,email'}, function(response) {//Get user Data to Store

email = response.email;
userName =  response.name;

  console.log('Good to see you, ' + email + response.name +'.');


$.ajax({//change it
  method: "POST",
  url: "registerMember.php",
  dataType:'json',
  data: { userName: userName, email: email, userPhoto: userPhoto }
})
  .always(function() {

    window.location.replace("home/home.view2.html");

  });


});

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,email'
    });




}



(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());
