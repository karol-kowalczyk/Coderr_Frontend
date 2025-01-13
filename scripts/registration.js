function checkAuth(){
    if(getAuthToken()){
        window.location.href = "./index.html";
    }
}

function registerSubmit(event){
    password = document.getElementById("password").value;
    repeated_password = document.getElementById("repeated_password").value
    event.preventDefault();
    // if( password     === repeated_password) {
        const data = getFormData(event.target);
        registration(data)
    // } else { 
    //     alert('Passwörter sind nicht identisch.')
    // }

}