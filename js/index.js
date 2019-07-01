document.addEventListener("DOMContentLoaded", function() {
  loadListeners();
  populate();
});

function loadListeners() {

}



function populate() {
  fetch("http://localhost:3000/books")
  .then(function(resp) {
    return resp.json();
  }).then(function(json) {
    addBooksToView(json);
  });
}

function addBooksToView(data) {
  let list = document.querySelector("#list");
  for (let book of data) {
    let listItem = document.createElement("li");
    listItem.innerText = book.title;
    listItem.addEventListener("click", function () {
      displaySingleBook(book);
    });
    list.appendChild(listItem);
  }
}

function displaySingleBook(book) {
  let showPanel = document.querySelector("#show-panel");
  if (showPanel.firstChild) {
    showPanel.removeChild(showPanel.firstChild);
  }
  showPanel.appendChild(createBookDisplay(book));
}

function createBookDisplay(book) {
  let mainDiv = document.createElement("div")

  let title = document.createElement("h1");
  title.textContent = book.title;
  mainDiv.appendChild(title);

  let image = document.createElement("img");
  image.src = book.img_url;
  mainDiv.appendChild(image);

  let description = document.createElement("p");
  description.textContent = book.description;
  mainDiv.appendChild(description);

  let usersDiv = createUsersDisplay(book.users);
  mainDiv.appendChild(usersDiv);

  let likeButton = document.createElement("button");
  likeButton.textContent = "Read Book";

  mainDiv.appendChild(likeButton);

  likeButton.addEventListener("click", function () {
    // console.log('clicked!')
    likeBook(book);
  })

  return mainDiv;
}

function createUsersDisplay(users) {
  let usersList = document.createElement("ul");

  for (let user of users) {
    let userLi = document.createElement("li");
    userLi.textContent = user.username;
    usersList.appendChild(userLi);
  }
  return usersList;
}

function likeBook(book) {
  let users = book.users;
  for (let user of users) {
    if (user.id === 1) {
      return confirm("You've already liked this book!");
    } 
  }

  users.push({ id: 1, username: "pouros"});

  let configObj = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PATCH',                                                              
    body: JSON.stringify( { users: users } )   
  }

  fetch(`http://localhost:3000/books/${book.id}`, configObj)
  .then(function(response) {
    return response.json();
  }).then(function(object) {
    displaySingleBook(book);
  });
}
