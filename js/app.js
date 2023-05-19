const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let checkLocalStorage = JSON.parse(localStorage.getItem("list"))
    ? JSON.parse(localStorage.getItem("list"))
    : [];

// SET Local storage ga malumotalarni qo'shish  funksiyasi
const setListToLocalStorage = (arr) => {
    localStorage.setItem("list", JSON.stringify(arr));
};

// objectdagi completed propertisini o'zgartirish funksiyasi

function setComp(id) {
    console.log(checkLocalStorage);
    let arr = checkLocalStorage.map((v, index) => {
        if (id === index) {
            return { ...v, completed: !v.completed };
        } else {
            return v;
        }
    });
    checkLocalStorage = arr;
    setListToLocalStorage(checkLocalStorage);
}

// get time funksiyasi qachon malumotlar qo'shilgan vaqtini listda korsatish

function getDate() {
    let now = new Date();
    let second, minut, hour, day, month, year;
    second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    minut = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    month =
        now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    year = now.getFullYear();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    fullDay.textContent = `${day} ${months[month - 1]} ${year}`;
    hourEl.textContent = hour;
    minuteEl.textContent = minut;
    secondEl.textContent = second;
    return `${second}:${minut}:${hour}   ${day}:${month}:${year} `;
}
setInterval(getDate, 1000);

// listdagi elementlarni ochirish funksiyasi yozildi

const deleteItem = (e) => {
    let newArr = checkLocalStorage.filter((item, i) => {
        return e !== i;
    });
    checkLocalStorage = newArr;
    setListToLocalStorage(checkLocalStorage);
    getListFromLocalStorage();
};

// GET local storage dan ma'lumotlarni olamiz
const getListFromLocalStorage = () => {
    let info = JSON.parse(localStorage.getItem("list"));
    listGroupTodo.innerHTML = "";
    info.forEach((obj, index) => {
        listGroupTodo.innerHTML += `
     <li ondblclick=(setComp(${index})) class="list-group-item">
                    ${obj.title}
                    <div class="wrapper-utils">
                        <span class="time">${obj.time}</span>
                        <i onclick = (deleteItem(${index})) class="fa-solid fa-trash" style="color: #f02d54"></i>
                        <i class="fa-solid fa-pen" style="color: #6dc624"></i>
                    </div>
                </li>
     `;
    });
};

checkLocalStorage.length && getListFromLocalStorage();

// inputga malumot kiritimaganda ko'rastiladiga text ogohlantirish funksiyasi
const showWarnText = (where, text) => {
    let element = document.querySelector(`#${where}`);
    element.textContent = text;
    setTimeout(() => {
        element.textContent = "";
    }, 2000);
};

formCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = formCreate["input-create"].value.trim();
    formCreate.reset();
    if (text.length) {
        checkLocalStorage.push({
            title: text,
            time: getDate(),
            completed: false,
        });
        setListToLocalStorage(checkLocalStorage);
        getListFromLocalStorage();
    } else {
        showWarnText("message-create", `Iltimos ma'lumotni kiriting...`);
    }
});
