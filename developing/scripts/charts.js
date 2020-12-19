var ctx = document.getElementById("myChart").getContext("2d");
var days = [];
var data = [];
for (let index = 0; index < 31; index++) {
  days.push(index);
  data.push(Math.floor(Math.random() * 11));
}
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: days,
    datasets: [
      {
        label: "عدد البلاغات",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "transparent",
        data: data,
      },
    ],
  },

  // Configuration options go here
  options: {},
});
let val = 20;
let totalReports = 0,
  done = 0,
  other = 0,
  unworthy = 0,
  processing = 0,
  notExist = 0;
  caseNum = 0;
  blankets = 0;
  clothNum = 0;
  meals = 0;
  nasrCity = 0;
  masrElgdeda = 0;
  mohandseen = 0;
  maadi = 0;
  alex = 0;
  october = 0;
  mokatem = 0;
  faisal = 0;
  helwan = 0;
  mohafazat = 0;
 let districts = new Array();

var ref = firebase.database().ref();
ref
  .child("reports")
  .once("value", function (snapshot) {
    var data = snapshot.val();
    for (const report in data) {
      switch (data[report].feed_back_type.trim()) {
        case "تم التعامل":
          done++;
          break;
        case "غير مستحق":
          unworthy++;
          break;
        case "":
          processing++;
          break;
        case "مش موجود":
          notExist++;
          break;
        default:
          other++;
      }
      switch (data[report].branch.trim()) {
        case "مدينة_نصر":
          nasrCity++;
          break;
        case "مصر_الجديدة":
          masrElgdeda++;
          break;
        case "المهندسين":
          mohandseen++;
          break;
        case "اسكندرية":
          alex++;
          break;
        case "اكتوبر":
          october++;
          break;
        case "حلوان":
          helwan++;
          break;
        case "فيصل":
          faisal++;
          break;
        case "المقطم":
          mokatem++;
          break;
        case "المعادي":
          maadi++;
          break;
        
        default:
          mohafazat++;
          break;
      }
      if(data[report].blankets){
        blankets+= parseInt(data[report].blankets, 10);
      }
      if(data[report].meals){
        meals+= parseInt(data[report].meals, 10);
      }
      if(data[report].case_num){
        caseNum+= parseInt(data[report].case_num, 10);
      }
      if(data[report].clothes_num){
        clothNum+= parseInt(data[report].clothes_num, 10);
      }

      districts.push(data[report].area);


      totalReports++;
    }
    //get top 10 districts
    districts = getFrequency(districts);
    var sortedDistricts = [];
    for (var item in districts) {
      sortedDistricts.push([item, districts[item]]);
    }

    sortedDistricts.sort(function(a, b) {
      return a[1] - b[1];
    });

    var top10Districts = sortedDistricts.slice(Math.max(sortedDistricts.length - 10, 0));
    
    
    
    //get percentage of each branch
    nasrCity = (nasrCity/totalReports) * 100;
    masrElgdeda =  (masrElgdeda / totalReports) * 100;
    mohandseen = (mohandseen / totalReports) * 100;
    alex = (alex / totalReports) * 100;
    october = (october / totalReports) * 100;
    helwan = (helwan / totalReports) * 100;
    faisal = (faisal / totalReports) * 100;
    mokatem =  (mokatem / totalReports) * 100;
    maadi =  (maadi / totalReports) * 100;
    mohafazat = (mohafazat / totalReports) * 100;
    
    nasrCity = Math.round(nasrCity);
    masrElgdeda = Math.round(masrElgdeda);
    mohandseen = Math.round(mohandseen);
    alex = Math.round(alex);
    october = Math.round(october);
    helwan =  Math.round(helwan);
    faisal =  Math.round(faisal);
    mokatem = Math.round(mokatem);
    maadi = Math.round(maadi);
    mohafazat = Math.round(mohafazat);


  })
  .then(() => {
    var c = Math.PI * (90 * 2);
    // done circle chart
    let donePct = (done / totalReports) * 100;
    document.querySelector("#done-circle").style.strokeDashoffset =
      ((100 - donePct) / 100) * c;
    document
      .querySelector("#done-pct")
      .setAttribute("data-pct", donePct.toFixed());

    // other cricle chart
    let otherPct = (other / totalReports) * 100;
    document.querySelector("#other-circle").style.strokeDashoffset =
      ((100 - otherPct) / 100) * c;
    document
      .querySelector("#other-pct")
      .setAttribute("data-pct", otherPct.toFixed());

    // unworthy cirlce chart
    let unworthyPct = (unworthy / totalReports) * 100;
    document.querySelector("#unworthy-circle").style.strokeDashoffset =
      ((100 - unworthyPct) / 100) * c;
    document
      .querySelector("#unworthy-pct")
      .setAttribute("data-pct", unworthyPct.toFixed());

    // processing cirlce chart
    let processingPct = (processing / totalReports) * 100;
    document.querySelector("#processing-circle").style.strokeDashoffset =
      ((100 - processingPct) / 100) * c;
    document
      .querySelector("#processing-pct")
      .setAttribute("data-pct", processingPct.toFixed());

    // notExist cirlce chart
    let notExistPct = (notExist / totalReports) * 100;
    document.querySelector("#notExist-circle").style.strokeDashoffset =
      ((100 - notExistPct) / 100) * c;
    document
      .querySelector("#notExist-pct")
      .setAttribute("data-pct", notExistPct.toFixed());
  });
  const getFrequency = (array) => {
    const map = {};
    array.forEach(item => {
       if(map[item]){
          map[item]++;
       }else{
          map[item] = 1;
       }
    });
    return map;
 };