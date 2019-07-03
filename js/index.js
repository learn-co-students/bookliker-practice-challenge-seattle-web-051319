// document.addEventListener("DOMContentLoaded", function() {});

const url = "http://localhost:3000/books";
const listEl = document.getElementById('list');
const showPanel = document.getElementById('show-panel');

//pull in list of books from local host
function getBooks(){
  fetch(url)
  .then(res => res.json())
  .then(json => displayBook(json))
}

//sets the list of books into an 'li' element and listend for an event. also adds a butoon and an event listener
function displayBook(books){
  for (let book of books){
      const bookContainer = document.createElement('li');
      bookContainer.textContent = book.title;
      bookContainer.addEventListener('click', () => {
        showPanelCall(book)
      })
      listEl.appendChild(bookContainer);
    }
}

//add element to side Show Panel
function showPanelCall(book){
  while (showPanel.firstChild) {
    showPanel.removeChild(showPanel.firstChild);
  }

  const desc = document.createElement("p");
  desc.textContent = book.description

  const img = document.createElement('img');
  img.src = book.img_url;

  const user = createUsersList(book.users);


  const likeButton = document.createElement('button');
  const likeText = document.createTextNode("Like");
  likeButton.appendChild(likeText);
  likeButton.addEventListener('click', () =>{
    console.log("liked")
    addUserToLikesList(book);
  })

  showPanel.appendChild(desc);
  showPanel.appendChild(img);
  showPanel.appendChild(user);
  showPanel.appendChild(likeButton);

}


function createUsersList(users) {
  let usersList = document.createElement("ul");
  usersList.setAttribute('id', 'user-list')

  for (let user of users) {
    let userLi = document.createElement("li");
    userLi.textContent = user.username;
    usersList.appendChild(userLi);
  }
  return usersList;
}

function addUserToLikesList(book){
  const user = book.users;
  user.push({"id": 1, "username": "pouros"})
  console.log(user);
  fetch(url + '/' + book.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      users: user
    })
  })
  .then(res => res.json())
  .then(json => {
    userList = document.getElementById('user-list')
    let userLi = document.createElement("li");
    userLi.textContent = json.users[json.users.length - 1].username;
    userList.appendChild(userLi);
  })
}

// {"id": 1, "username": "pouros"}






getBooks()
