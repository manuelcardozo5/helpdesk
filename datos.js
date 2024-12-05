function init(){
}

$(document).ready(function() {

});

//Función para iniciar el proceso de inicio de sesión con Google
function startGoogleSignIn(){
    //TODO: Obtener la instancia de autenticación de Google
    const auth = gapi.auth2.getAuthInstance();
     //TODO: Iniciar sesión con Google
     auth.signIn();
}

function handleCredentialResponse(response){
    if(response && response.credential){
        const credentialToken = response.credential;
        
        const decodedToken = JSON.parse(atob(credentialToken.split('.')[1]));
        

        $.ajax({
            url:'controller/usuario.php?op=accesogoogle',
            type:'post',
            data:{usu_correo:decodedToken.email},
            success: function(data){
                console.log(data);
                if(data === "0"){
                    swal("Advertencia!", "Usuario no Registrado", "warning");
                }else if (data==="1"){
                    window.location.href = 'view/Home/'
                }
            }
        });
    }
}

init();