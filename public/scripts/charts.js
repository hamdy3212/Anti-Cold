let reportsNum = 0,
  done = 0,
  other = 0,
  unworthy = 0,
  processing = 0,
  notExist = 0,
  caseNum = 0,
  blankets = 0,
  clothNum = 0,
  meals = 0,
  districts = [],
  branches = {
    nasrCity: { name: "مدينة نصر", reports: 0 },
    mohandseen: { name: "المهندسين", reports: 0 },
    maadi: { name: "المعادي", reports: 0 },
    october: { name: "اكتوبر", reports: 0 },
    masrElgdeda: { name: "مصر الجديدة", reports: 0 },
    alex: { name: "اسكندرية", reports: 0 },
    faisal: { name: "فيصل", reports: 0 },
    helwan: { name: "حلوان", reports: 0 },
    mokatem: { name: "المقطم", reports: 0 },
    mohafazat: { name: "محافظات", reports: 0 },
  },
  reportsPerDay = [],
  days = [],
  reportsInEachDay = [];

var ref = firebase.database().ref();
ref
  .child("reports")
  .once("value", function (snapshot) {
    var data = snapshot.val();
    for (const report in data) {
      const day = new Date(Date.parse(data[report].date));
      reportsPerDay.push(day);

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
          branches.nasrCity.reports++;
          break;
        case "مصر_الجديدة":
          branches.masrElgdeda.reports++;
          break;
        case "المهندسين":
          branches.mohandseen.reports++;
          break;
        case "اسكندرية":
          branches.alex.reports++;
          break;
        case "اكتوبر":
          branches.october.reports++;
          break;
        case "حلوان":
          branches.helwan.reports++;
          break;
        case "فيصل":
          branches.faisal.reports++;
          break;
        case "المقطم":
          branches.mokatem.reports++;
          break;
        case "المعادي":
          branches.maadi.reports++;
          break;
        default:
          branches.mohafazat.reports++;
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
      reportsNum++;
    }
    // get reports per day
    reportsPerDay = getFrequency(reportsPerDay);
    for (const reportPerDay in reportsPerDay) {
      let date = new Date(reportPerDay);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      days.push(day + `-` + month);
      reportsInEachDay.push(reportsPerDay[reportPerDay]);
    }

    // get top 10 districts
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
  })
  .then(() => {
    // reports per day
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
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
            data: reportsInEachDay,
          },
        ],
      },
      // Configuration options go here
      options: {},
    });

    //
    // احصائيات
    document.getElementById("caseNum").innerHTML = `${caseNum}`;
    document.getElementById("reportsNum").innerHTML = `${reportsNum}`;
    document.getElementById("meals").innerHTML = `${meals}`;
    document.getElementById("blankets").innerHTML = `${blankets}`;
    document.getElementById("clothes").innerHTML = `${clothNum}`;
    // الانتهاء من الاحصائيات

    // تقرير الفروع
    const fro3 = document.getElementById("fro3");
    for (const branch in branches) {
      //get percentage of each branch
      branches[branch].reports = Math.round(
        (branches[branch].reports / reportsNum) * 100
      );
      // create progress bar element for each branch
      fro3.innerHTML += `
        <div class="row">
        <div class="col-4">
          <p>${branches[branch].name}</p>
        </div>
        <div class="col-5 p-0 mt-1">
          <div class="progress">
            <div class="progress-bar" style="width:${branches[branch].reports}%"></div>
          </div>
        </div>
        <div class="col-3 p-0">${branches[branch].reports}%</div>
      </div>
`;
    }

    // انتهاء من تقرير الفروع

    // مناطق البلاغات
    const bla8at = document.getElementById("bla8at");

    for (let i = 0; i < 9; i++) {
      bla8at.innerHTML += `
        <div class="row">
          <div class="col-5">
            <p>${top10Districts[9 - i][0]}</p>
          </div>
          <div class="col-4 p-0 mt-1">
            <div class="progress">
              <div class="progress-bar" style="width:${
                top10Districts[9 - i][1]
              }%";></div>
            </div>
          </div>
          <div class="col-3 p-0">${top10Districts[9 - i][1]}</div>
        </div>
        `;
    }
    //

    // عدد البلاغات
    var c = Math.PI * (90 * 2);
    // done circle chart
    let donePct = (done / reportsNum) * 100;
    document.querySelector("#done-circle").style.strokeDashoffset =
      ((100 - donePct) / 100) * c;
    document
      .querySelector("#done-pct")
      .setAttribute("data-pct", donePct.toFixed());

    // other cricle chart
    let otherPct = (other / reportsNum) * 100;
    document.querySelector("#other-circle").style.strokeDashoffset =
      ((100 - otherPct) / 100) * c;
    document
      .querySelector("#other-pct")
      .setAttribute("data-pct", otherPct.toFixed());

    // unworthy cirlce chart
    let unworthyPct = (unworthy / reportsNum) * 100;
    document.querySelector("#unworthy-circle").style.strokeDashoffset =
      ((100 - unworthyPct) / 100) * c;
    document
      .querySelector("#unworthy-pct")
      .setAttribute("data-pct", unworthyPct.toFixed());

    // processing cirlce chart
    let processingPct = (processing / reportsNum) * 100;
    document.querySelector("#processing-circle").style.strokeDashoffset =
      ((100 - processingPct) / 100) * c;
    document
      .querySelector("#processing-pct")
      .setAttribute("data-pct", processingPct.toFixed());

    // notExist cirlce chart
    let notExistPct = (notExist / reportsNum) * 100;
    document.querySelector("#notExist-circle").style.strokeDashoffset =
      ((100 - notExistPct) / 100) * c;
    document
      .querySelector("#notExist-pct")
      .setAttribute("data-pct", notExistPct.toFixed());
    // انتهاء من تقرير الفروع
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
