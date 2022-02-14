//Creating the container
var container = document.createElement("div");
container.setAttribute("class", "container-md");

//Creating the Row
var row1 = document.createElement("div");
row1.setAttribute("class", "row");
container.appendChild(row1);

//Creating the col
var col1 = document.createElement("div");
col1.setAttribute("class", "col-12");
row1.appendChild(col1);

//Creating the element
var box = document.createElement("div");
box.setAttribute("class", "box-part");
col1.appendChild(box);

//Creating a second row inside the box
var row2 = document.createElement("div");
row2.setAttribute("class", "row");
box.append(row2);

//Creating the div
var div = document.createElement("div");
div.setAttribute("class", "col-12");
row2.appendChild(div);

//Creating the Table
var table = document.createElement("table");
table.setAttribute("class", "table");
div.appendChild(table);

//Creatig the header
var thead = document.createElement("thead");
thead.setAttribute("class", "thead-dark");
table.appendChild(thead);

//Creating the first Row
var tr1 = document.createElement("tr");

//Creating head in the same row
var th1 = createname("th", "Id");
var th2 = createname("th", "Name");
var th3 = createname("th", "Email");
tr1.append(th1, th3, th2);
thead.appendChild(tr1);

var globalData = [];
var currentPage = 1;
//Creating the Body
var tbody = document.createElement("tbody");
table.append(tbody);
const renderPageData = (pgNo) => {
  currentPage = pgNo;
  const start = (pgNo - 1) * 5,
    end = start + 5; // 1 --->  start 1, end 5, 2 ---> start 6, end 10, 3 ---> start 11, end 15
  const pageData = globalData.slice(start, end);
  tbody.innerHTML = "";
  for (var i in pageData) {
    //Creating the second Row
    var tr2 = document.createElement("tr");
    //Creating the data and append inside the Second row
    var td1 = document.createElement("td");
    td1.innerHTML = pageData[i].id;
    //Creating the data2
    var td2 = document.createElement("td");
    td2.innerHTML = pageData[i].email;
    //Creating the data3
    var td3 = document.createElement("td");
    td3.innerHTML = pageData[i].name;

    tr2.append(td1, td2, td3);
    //Appending the tr2 inside the tBody
    tbody.appendChild(tr2);
  }
};

function getdata() {
  //Create XHR object
  var request = new XMLHttpRequest();
  //Create a connection
  request.open(
    "GET",
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
    true
  );
  //Send a request
  request.send();
  //Successful response
  // travel data need to convert to json format

  request.onload = function () {
    var data = JSON.parse(request.response);
    console.log(data);
    globalData = data;
    for (var i in data.slice(0, 5)) {
      //    console.log("ID:"+ data[i].id)
      if (
        !document.getElementById("id" + i) &&
        !document.getElementById("e" + i) &&
        !document.getElementById("n" + i)
      ) {
        //Creating the second Row
        var tr2 = document.createElement("tr");
        //Creating the data and append inside the Second row
        var td1 = document.createElement("td");
        td1.setAttribute("id", "id" + i);
        //Creating the data2
        var td2 = document.createElement("td");
        td2.setAttribute("id", "e" + i);
        //Creating the data3
        var td3 = document.createElement("td");
        td3.setAttribute("id", "n" + i);
        tr2.append(td1, td2, td3);
        //Appending the tr2 inside the tBody
        tbody.appendChild(tr2);
        //going to print in the document
        document.getElementById("id" + i).innerHTML = data[i].id;
        document.getElementById("e" + i).innerHTML = data[i].email;
        document.getElementById("n" + i).innerHTML = data[i].name;
      }
    }
  };
}
getdata();

// Creating the 2 column in the box
var col2 = document.createElement("div");
col2.setAttribute("class", "col-12");
row2.appendChild(col2);

//Creating the Nav Page
var Nav = document.createElement("nav");
Nav.setAttribute("aria-label", "Page navigation example");
col2.appendChild(Nav);

//Create Ul
var Ul = document.createElement("ul");
Ul.setAttribute("class", "pagination");
Nav.appendChild(Ul);

//Creating the list1
var li1 = document.createElement("li");
li1.setAttribute("class", "page-item");
li1.innerHTML = "";
Ul.appendChild(li1);

//Creating the list2
var li2 = document.createElement("li");

//Creating the name dynamically using functions
function createname(elename, value) {
  var element = document.createElement(elename);
  element.innerHTML = value;
  return element;
}

document.body.append(container);

var pageNav = document.createElement("nav");
var pageUl = document.createElement("ul");
pageUl.style.justifyContent = "center";
pageUl.setAttribute("class", "pagination");

var prevBtnLi = document.createElement("li");
prevBtnLi.setAttribute("class", "page-item");
var prevBtn = document.createElement("button");
prevBtn.setAttribute("class", "page-link");
prevBtn.innerHTML = "Previous";

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) renderPageData(currentPage - 1);
});

pageUl.appendChild(prevBtn);

for (var x = 1; x <= 5; x++) {
  var btnLi = document.createElement("li");
  btnLi.setAttribute("class", "page-item");
  var btn = document.createElement("button");
  btn.setAttribute("class", "page-link");
  btn.setAttribute("value", `${x}`);
  btn.innerHTML = x;
  btn.addEventListener("click", (e) => {
    renderPageData(parseInt(e.target.value));
  });
  pageUl.appendChild(btn);
}

var nxtBtnLi = document.createElement("li");
nxtBtnLi.setAttribute("class", "page-item");
var nxtBtn = document.createElement("button");
nxtBtn.setAttribute("class", "page-link");
nxtBtn.innerHTML = "Next";

nxtBtn.addEventListener("click", () => {
  if (currentPage < 20) renderPageData(currentPage + 1);
});

pageUl.append(nxtBtn);

document.body.append(pageNav);

pageNav.appendChild(pageUl);

document.body.appendChild(pageNav);