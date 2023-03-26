//1. xml http request

// function getUserInfo() {
//   //მთავარი ფუნქციის შექმნა

//   let request = new XMLHttpRequest(); // მოთხოვნის ობიექტის შექმნა
//   // Load event-  რა ივენთი უნდა შესრულდეს მონაცემების წამოსაღებად

//   function warmateba() {
//     // ცალკე ფუქნცია, რა გვინდა რომ მოხდეს load even დროს, თუკი წარმატებით მივალთ, შეგვიძლია ცალკე აღვწეროთ და შემდეგ load even დროს უბრალოდ ამ ფუნქციას გამოვიძახებთ;

//     let response = this.responseText; // ვქმნი ცვლადს, სადაც დაბრუნებულ პასუხს ვინახავთ ტექსტური სახით
//     let responseData = JSON.parse(response); // JSON ფაილის JS ფაილად გარდაქმნა (პარსინგი) და ცვლადში შენახვა - მთლიანი მოსული ინფორმაცია

//     let ul = document.createElement("ul");
//     let li = document.createElement("li");
//     li.textContent = responseData.data[3].email; // ერთი კონკრეტული ობიექტის ამოღება მასივიდან
//     ul.appendChild(li);
//     document.getElementById("ajax-block").appendChild(ul);
//   }

//   // responseData.data.forEach((element) => {// მთლიანი მასივის წამოღება
//   //   let li = document.createElement("li");
//   //   li.textContent = element.first_name + "" + element.last_name;
//   //   li.textContent = `${element.first_name} ${element.last_name}`;
//   //   ul.appendChild(li);
//   //   document.getElementById("ajax-block").appendChild(ul);
//   // });

//   //console.log(response); //ვლოგავთ დაბრუნებულ პასუხს JSON ფაილად
//   //console.log(responseData); //ვლოგავთ დაბრუნებულ გაპარსულ პასუხს JS ფაილად

//   // ფუნქციის შექმნა, თუ წარმატებით მივედი, რა ლოგიკა უნდა მოხდეს, იწერება ამ ფუნქციის ტანში
//   //open method

//   //request.open('method', URL) methods: post(send data, update), get, delete, put(update)

//   //error event

//   function errorRenderLogic() {
//     // ერორის ფუნქცია შევქმენით ცალკე და შემდეგ ამ ფუნქციას ვიძახებთ მეორე ფუნქციაში სადაც error event შევქმენით. შეგვიძლია იქვე გავუწეროთ ლოგიკა, ან ცალკე ფუნქციად გამოვიტანოთ;

//     let p = document.createElement("p");
//     p.textContent = "Server Error";
//     document.getElementById("ajax-block").appendChild(p);
//   }
//   request.addEventListener("load", warmateba); // ამ ფუნქციის ლოგიკა შეგვიძლია ცალკე ფუნქციაში გავიტანოთ
//   request.addEventListener("error", errorRenderLogic); //ვიძახებთ ერორ ფუნქციას, რა უნდა შესრულდეს გაწერილია ამ ფუნქციაში  errorRenderLogic

//   request.open("GET", "https://reqres.in/api/users?page=2"); //რა მეთოდით და სად მივდივარ
//   request.send(); //ვაგზავნი მოთხოვნას
// }

// getUserInfo(); // მთავარი ფუნქციის გამოძახება

//----------------------------------------fetch---------------------------------

//2. fetch აბრუნებს promise, რომ სერვერი როცა გვიპასუხებს, მაშინ შესრულდება ფუქნცია;

//

//----------------------------------------10  lecture-----------------------------------

let mainWrapperDiv = document.getElementById("wraper-posts");
let overlay = document.getElementById("overlay");
let content = document.getElementById("content");
let closeIcon = document.getElementById("close");
let addButton = document.getElementById("add");
let addOverlayContent = document.getElementById("overlay-content");
let form = document.getElementById("add-form-post");
let input = document.getElementById("title");

function postsAjax(url, callback) {
  let requestPost = new XMLHttpRequest();
  requestPost.open("GET", url);

  requestPost.addEventListener("load", function () {
    let data = JSON.parse(requestPost.responseText);
    callback(data);
  });
  requestPost.send();
}

postsAjax("https://jsonplaceholder.typicode.com/posts", function (data) {
  data.forEach((element) => {
    createPostDiv(element);
  });
});

function createPostDiv(item) {
  let divWrapper = document.createElement("div");
  divWrapper.classList.add("post");
  divWrapper.setAttribute("data-id", `${item.id}`);

  let h4Element = document.createElement("h4");
  h4Element.innerText = `${item.id}`;

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${item.title}`;

  //delete method:

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete Post";
  deleteButton.setAttribute("data-id", `${item.id}`);

  divWrapper.appendChild(h4Element);
  divWrapper.appendChild(h2Element);
  divWrapper.appendChild(deleteButton);

  // delete button function
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation(); // შვილის ფუნქცია არ გადადის მშობელ ელემენტზე,აჩერებ

    let buttonId = event.target.getAttribute("data-id"); //უმატებ ატრიბუტს ღილაკს და ინახავ ცალკე
    console.log("buttonId:", buttonId);

    let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${buttonId}`; //იყენებ ღილაკის ატრიბუტს

    console.log("deleteUrl:", deleteUrl);

    fetch(deleteUrl, {
      method: "DELETE",
    }).then(() => divWrapper.remove()); //წაშლის მთლიან დივს
  });

  divWrapper.addEventListener("click", function (event) {
    console.log(event.currentTarget);
    let divId = event.currentTarget.getAttribute("data-id");
    console.log(divId);

    overlay.classList.add("overlayActive");
    let newUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;

    postsAjax(newUrl, function (newData) {
      console.log(newData);
      overlayDescription(newData);
    });
    console.log(newUrl);
  });

  mainWrapperDiv.appendChild(divWrapper);
  console.log(mainWrapperDiv);
}

function overlayDescription(x) {
  let description = document.createElement("p");
  description.innerText = `${x.body}`;

  content.appendChild(description);
}

closeIcon.addEventListener("click", function () {
  overlay.classList.remove("overlayActive");

  content.innerHTML = " ";
});

// post method -პოსტის დამატება

addButton.addEventListener("click", function () {
  addOverlayContent.classList.add("activeAddOverlay");
  input.value = " ";
});
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = {
    title: event.target[0].value,
  };
  //input -ს დააბრუნებს // მთლიანი ტარგეტ არის საბმით ფორმა, ხოლო მის შიგნით 0 ელემენტი არის ინფუთი
  console.log(formData);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData), //გადასცემ ინფორმაციას რომელიც ზემოთ შეინახე formdata-Si
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((addedPost) => {

        createPostDiv(addedPost);// რომ გამოჩნდეს საჭიროა ფუნციის გამოძახება და არგუმენტად გადაცემა პოსტის დამატების 

      addOverlayContent.classList.remove("activeAddOverlay");

      console.log(addedPost);
    });
});
