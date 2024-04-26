const showBtn = document.querySelector(".transaction__display");
const transactionSct = document.querySelector(".transaction");
const transactionHdr = document.querySelector(".transaction__header");
const transactionItems = document.querySelector(".transaction__items");
const transactionSearch = document.querySelector(".transaction__search");
const transactionSubtitles = document.querySelector(".transaction__subtitles");
const ascSortPrice = document.querySelector(".transaction__price .arrow-down");
const descSortPrice = document.querySelector(".transaction__price .arrow-up");
const ascSortDate = document.querySelector(".transaction__date .arrow-down");
const descSortDate = document.querySelector(".transaction__date .arrow-up");

let allTransactiondata = [];
let searchInput = [];
const filters = {
  searchItems: "",
};
let newTags = [];
showBtn.addEventListener("click", async () => {
  showHeader();
  await axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      allTransactiondata = res.data;

      renderTransactions(res.data, filters);
    })
    .catch((err) => console.log(err));
});

async function renderTransactions(_transactions, _filter) {
  if (_filter.searchItems) {
    await axios
      .get("http://localhost:3000/transactions?refId_like", {
        params: {
          q: _filter.searchItems,
        },
      })
      .then((res) => {
        // console.log(res.data);
        showTransaction(res.data);
      })
      .catch((err) => console.log(err));
  } else {
    showTransaction(allTransactiondata);
  }
}

function showHeader() {
  transactionItems.innerHTML = "";
  transactionSearch.style.visibility = "visible";
  transactionSubtitles.style.visibility = "visible";
  transactionItems.style.visibility = "visible";
}

function showTransaction(_transactions) {
  _transactions.forEach((item, index) => {
    const transactionItem = document.createElement("div");
    transactionItem.classList.add("transaction__item");
    transactionItem.innerHTML = `
    <span>${item.id}</span>
    <span>
    ${item.type}
    
    
    </span>
   <span>${item.price}</span> 
    <span>${item.refId} </span>
    <span>
    ${new Date(item.date).toLocaleString("fa", {
      dateStyle: "short",
    })}</span>`;

    transactionItems.appendChild(transactionItem);
    if (item.type.includes("برداشت از حساب"))
      transactionItem.style.color = "#de9e46";
  });
}

function searchTransaction() {
  transactionSearch.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    transactionItems.innerHTML = "";
    // console.log(filters.searchItems);
    renderTransactions(allTransactiondata, filters);
  });
}

async function descendPrice() {
  transactionItems.innerHTML = "";
  await axios
    .get("http://localhost:3000/transactions?_sort=price&_order=desc")
    .then((res) => {
      showTransaction(res.data);
    })
    .catch((err) => console.log(err));
}

async function ascendPrice() {
  transactionItems.innerHTML = "";

  await axios
    .get("http://localhost:3000/transactions?_sort=price&_order=asc")
    .then((res) => {
      showTransaction(res.data);
    })
    .catch((err) => console.log(err));
}

async function descendDate() {
  transactionItems.innerHTML = "";

  await axios
    .get("http://localhost:3000/transactions?_sort=date&_order=desc")
    .then((res) => {
      showTransaction(res.data);
    })
    .catch((err) => console.log(err));
}

async function ascendDate() {
  transactionItems.innerHTML = "";

  await axios
    .get("http://localhost:3000/transactions?_sort=date&_order=asc")
    .then((res) => {
      showTransaction(res.data);
    })
    .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", (event) => {
  searchTransaction();
  ascSortPrice.addEventListener("click", descendPrice);
  descSortPrice.addEventListener("click", ascendPrice);

  ascSortDate.addEventListener("click", descendDate);
  descSortDate.addEventListener("click", ascendDate);
});
