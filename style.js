const newsAPI = "http://localhost:3000/news";
const listNews = document.querySelector(".list-news");
const formTittle = document.querySelector("input[name='title']");
const formDesc = document.querySelector("input[name='desc']");
const formImg = document.querySelector("input[name='img']");
const btnCreate = document.querySelector(".btn-create");
const btnUpdate = document.querySelector(".btn-update");
const btn = document.querySelector(".btn");

async function getNews(API_LINK) {
    const promise = await fetch(API_LINK);
    const data = await promise.json();
    return data;
}
async function renderListNews() {
    const data = await getNews(newsAPI);
    data.forEach((news, index) => {
        listNews.innerHTML += `<div class="col">
        <div class="card-news">
            <div class="thumb"><img src="${news.img_url}" alt="" /></div>
            <h3 class="title">${news.title}</h3>
            <div class="desc">${news.desc}</div>
            <div onclick="deleteNews(${news.id})" class="button">Delete</div>
            <div onclick="editNews(${news.id})" class="button">Edit</div>
        </div>
    </div>`;
    });
}
renderListNews(newsAPI);
btnCreate.addEventListener("click", async function () {
    const dataInput = {
        title: formTittle.value,
        desc: formDesc.value,
        img_url: formImg.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInput),
    };
    const response = await fetch(newsAPI, option);
    renderListNews(newsAPI);
});
async function deleteNews(newsId) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    await fetch(`${newsAPI}/${newsId}`, option);
}
async function editNews(newsId) {
    const data = await getNews(`${newsAPI}/${newsId}`);
    formTittle.value = data.title;
    formDesc.value = data.desc;
    formImg.value = data.img_url;
    btnUpdate.setAttribute("data-id", newsId);
    btn.classList.add("active");
}
btnUpdate.addEventListener("click", async function (e) {
    let newsId = e.target.getAttribute("data-id");
    let formData = {
        title: formTittle.value,
        desc: formDesc.value,
        img_url: formImg.value,
    };
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };
    await fetch(`${newsAPI}/${newsId}`, options);
    formTittle.value = "";
    formDesc.value = "";
    formImg.value = "";
    btn.classList.remove("active");
    renderListNews(newsAPI);
});
