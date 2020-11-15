const form = document.getElementsByTagName("form")[0];
const PhoneNumber = document.getElementById("الرقم");
const branch = document.getElementById("الفرع");
const area = document.getElementById("المنطقة");
const Branches = {
    مدينة_نصر: ["عباس العقاد",
        "مكرم عبيد",
        "العاشر",
        "الثامن"
    ],
    المهندسين: ["Area 1",
        "Area 2",
        "Area 3"
    ],
    المعادي: ["Area 4",
        "Area 5",
        "Area 6"
    ],
    مصر_الجديدة: [
        "Area 51",
        "Area 2",
        "Area 8"
    ],
    فيصل: [
        "Area 41",
        "Area 45",
        "Area 9"
    ],
    اسكندرية: [
        "Area 35",
        "Area 11",
        "Area 45"
    ],
    حلوان: [
        "Area 35",
        "Area 11",
        "Area 45"
    ],
    المقطم: [
        "Area 74",
        "Area 88",
        "Area 99"
    ],
    اكتوبر: [
        "Area 646",
        "Area 171",
        "Area 151"
    ]
}


form.addEventListener("submit", (e) => {
    if (!(PhoneNumber.value.length == 11 && PhoneNumber.value[0] == 0)) {
        e.preventDefault();
        e.stopPropagation();
        PhoneNumber.classList.add("is-invalid")
    } else {
        PhoneNumber.classList.remove("is-invalid")
    }
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
    form.classList.add('was-validated');


});

branch.addEventListener("change", (event) => {
    area.innerHTML = '<option disabled selected value="">اختر...</option>';
    for (const currArea of Branches[event.target.value]) {
        const option = document.createElement("option");
        option.value = currArea;
        option.innerHTML = currArea;
        area.appendChild(option);
    }
})