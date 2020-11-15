var NAME = document.getElementById("الاسم");
var PHONENUMBER = document.getElementById("الرقم");
var INPUTADDRESS = document.getElementById("العنوان");
var BRANCH = document.getElementById("الفرع");
var AREA = document.getElementById("المنطقة");
var GENDER = document.getElementById("النوع");
var SEEN = document.getElementById("مشاهدات");
var NOTES = document.getElementById("ملاحظات");
var STATE = document.getElementById("السكن");
var submitBtn = document.getElementById("submitBtn");
 //window.alert('step 1');

function submitClick() {
  // Get current time
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  var database = firebase.database();
  var reportRef = database.ref().child('reports');
  var data = {
    app: 'WEB',
    name: NAME.value,
    phone_number: PHONENUMBER.value,
    address: INPUTADDRESS.value,
    branch: BRANCH.value,
    area: AREA.value,
    gender: GENDER.value,
    seen: SEEN.value,
    notes: NOTES.value,
    state: STATE.value,
    date: date,
    feed_back_cases_count: '',
    feed_back_type: '',
    feed_back_details: '',
    feed_back_date: ''
  };

  reportRef.push(data);
  //window.alert("step2");

}