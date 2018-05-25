$(document).ready(function(){

    $('#submitSignin').click(function(){
            $('#auth').hide();
            $('.loader').css( "display", "block" );
            var userAuth = {
                logOpt: "signin",
                email: $('#email').val(),
                password: $('#passWord').val()
            } 
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/UserAuthentication',
                data: userAuth,
                success: function(data) {
                    $('.loader').hide();
                    $('#content').css( "display", "block" );
                    $('#content p').text(JSON.stringify(data));
                    
                    console.log(data);
                }
            });
        
    });

    $('#submitSignup').click(function(){
        $('#auth').hide();
            $('.loader').css( "display", "block" );
            var newUser = {
                email: $('#email').val(),
                password: $('#passWord').val()
            } 
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/Signup',
                data: newUser,
                success: function(data) {
                    $('.loader').hide();
                    $('#content').css( "display", "block" );
                    $('#content p').text(JSON.stringify(data));
                    
                    console.log(data);
                }
            });
    });

    $('#signup').click(function(){
        $('#submitSignin').hide();
        $('#quest').hide();
        $('#submitSignup').css( "display", "block" );
    });

    $('#signout').click(function(){
        $('#content').hide();

        var userAuth = {
            logOpt: "signout"
        } 
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/testApi',
            data: userAuth,
            success: function(data) {
                $('#auth').show();
                $('#submitSignin').show();
                $('#quest').show();
                $('#submitSignup').hide();
                console.log(data);
            },
            error: function(data) {
                $('#auth').show();
                $('#submitSignin').show();
                $('#quest').show();
                $('#submitSignup').hide();
                console.log(data);
            }
        });

        
    });
 
 });