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

let totalReports = 0,
  done = 0,
  other = 0,
  unworthy = 0,
  processing = 0,
  notExist = 0,
  caseNum = 0,
  blankets = 0,
  clothNum = 0,
  meals = 0,
  nasrCity = 0,
  masrElgdeda = 0,
  mohandseen = 0,
  maadi = 0,
  alex = 0,
  october = 0,
  mokatem = 0,
  faisal = 0,
  helwan = 0,
  mohafazat = 0,
  val = 20,
  districts = new Array();

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
      if (data[report].blankets) {
        blankets += parseInt(data[report].blankets, 10);
      }
      if (data[report].meals) {
        meals += parseInt(data[report].meals, 10);
      }
      if (data[report].case_num) {
        caseNum += parseInt(data[report].case_num, 10);
      }
      if (data[report].clothes_num) {
        clothNum += parseInt(data[report].clothes_num, 10);
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

    sortedDistricts.sort(function (a, b) {
      return a[1] - b[1];
    });

    top10Districts = sortedDistricts.slice(
      Math.max(sortedDistricts.length - 10, 0)
    );
    //get percentage of each branch
    nasrCity = Math.round((nasrCity / totalReports) * 100);
    masrElgdeda = Math.round((masrElgdeda / totalReports) * 100);
    mohandseen = Math.round((mohandseen / totalReports) * 100);
    alex = Math.round((alex / totalReports) * 100);
    october = Math.round((october / totalReports) * 100);
    helwan = Math.round((helwan / totalReports) * 100);
    faisal = Math.round((faisal / totalReports) * 100);
    mokatem = Math.round((mokatem / totalReports) * 100);
    maadi = Math.round((maadi / totalReports) * 100);
    mohafazat = Math.round((mohafazat / totalReports) * 100);
  })
  .then(() => {
    document.querySelector("#nasrCityBar").style.width = nasrCity + "%";
    document.querySelector("#nasrCity").innerHTML = `<span>${nasrCity}%</span>`;

    document.querySelector("#elmohandsenBar").style.width = mohandseen + "%";
    document.querySelector(
      "#elmohandsen"
    ).innerHTML = `<span>${mohandseen}%</span>`;

    document.querySelector("#octoberBar").style.width = october + "%";
    document.querySelector("#october").innerHTML = `<span>${october}%</span>`;

    document.querySelector("#masrElgdedaBar").style.width = masrElgdeda + "%";
    document.querySelector(
      "#masrElgdeda"
    ).innerHTML = `<span>${masrElgdeda}%</span>`;

    document.querySelector("#faisalBar").style.width = faisal + "%";
    document.querySelector("#faisal").innerHTML = `<span>${faisal}%</span>`;

    document.querySelector("#helwanBar").style.width = helwan + "%";
    document.querySelector("#helwan").innerHTML = `<span>${helwan}%</span>`;

    document.querySelector("#mokatemBar").style.width = mokatem + "%";
    document.querySelector("#mokatem").innerHTML = `<span>${mokatem}%</span>`;

    document.querySelector("#alexBar").style.width = alex + "%";
    document.querySelector("#alex").innerHTML = `<span>${alex}%</span>`;

    document.querySelector("#maadiBar").style.width = maadi + "%";
    document.querySelector("#maadi").innerHTML = `<span>${maadi}%</span>`;

    document.querySelector("#mohafazatBar").style.width = mohafazat + "%";
    document.querySelector(
      "#mohafazat"
    ).innerHTML = `<span>${mohafazat}%</span>`;

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
  array.forEach((item) => {
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  });
  return map;
};
