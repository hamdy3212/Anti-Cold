var NAME = document.getElementById("الاسم");
var phoneNumber = document.getElementById("الرقم");
var INPUTADDRESS = document.getElementById("العنوان");
var BRANCH = document.getElementById("الفرع");
var AREA = document.getElementById("المنطقة");
var GENDER = document.getElementById("النوع");
var SEEN = document.getElementById("مشاهدات");
var NOTES = document.getElementById("ملاحظات");
var STATE = document.getElementById("السكن");
var ref = firebase.database().ref();
const form = document.getElementsByTagName("form")[0];

BRANCH.addEventListener("change", (e) => {
    AREA.innerHTML = '<option disabled selected value=""></option>';
    ref.child('Areas').on('value', function (snapshot) {
        var data = snapshot.val();
        for (area of data[e.target.value]) {
            const option = document.createElement("option");
            option.value = area;
            option.innerHTML = area;
            AREA.appendChild(option);
        }
    })
})

form.addEventListener("submit", async (e) => {
    if ((form.checkValidity() === false) ||  phoneNumber.value.length <= 8) {
        phoneNumber.classList.add("is-invalid")
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
    } else {
        phoneNumber.classList.remove("is-invalid");
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var database = firebase.database();
        var reportRef = database.ref().child('reports');
        e.preventDefault();
        var push = await reportRef.push();
        var key = await push.key;
        var data = {
            app: 'WEB',
            name: NAME.value,
            phoneNo: phoneNumber.value,
            address: INPUTADDRESS.value,
            branch: BRANCH.value,
            area: AREA.value,
            gender: GENDER.value,
            seen: SEEN.value,
            notes: NOTES.value,
            state: STATE.value,
            date: date,
            feed_back: '',
            case_num: '',
            feed_back_details: '',
            feed_back_type: '',
            first_feedback: '',
            second_feedback: '',
            help_date: '',
            blankets: '',
            pushid: key,
            meals: '',
            clothes_num: '',
            case_name: '',
            id: '',
        }
        push.set(data);
        location.replace("success.html")
    }

});