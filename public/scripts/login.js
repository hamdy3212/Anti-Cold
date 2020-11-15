var usern = document.getElementById("email");
var pass = document.getElementById("password");
var users = [];
var password;
const submit = document.getElementById("submitBtn");
var ref = firebase.database().ref().child("AdminAccount").on('child_added', function (snapshot) {
    var data = snapshot.val();
    if (snapshot.key != "password") {
        users.push(data);
    }
    if (snapshot.key == "password") {
        password = data;
    }
});
submit.addEventListener("click", (e) => {
    e.preventDefault();
    var flag = false;
    for (var i = 0; i < users.length; i++) {
        if (usern.value == users[i] && pass.value == password) {
            flag = true;
            break;
        } else {
            flag = false;
        }
    }
    if (flag == true) {
        location.replace("grid.html");
    } else {
        window.alert("خطأ في كلمة السر او المستخدم");
    }
} );
