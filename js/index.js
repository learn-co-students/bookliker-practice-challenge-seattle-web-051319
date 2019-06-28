const bookList = document.getElementById('list')
const showPanel = document.getElementById('show-panel')
document.addEventListener("DOMContentLoaded", function() {});

//This is our fetch to the localhost to get all of the books back
function getBooks() {
  fetch('http://localhost:3000/books')
  .then(response => {
    return response.json()
  })
  .then (json => {
    for (book of json)
      displayBook(book)
  })
}

// Will need to create an li with the book's title
function displayBook(bookObject) {
  const newLi = document.createElement('li')
  newLi.textContent = bookObject.title
  addClickListener(bookObject, newLi)
  bookList.appendChild(newLi)
}

//Will want to add an event listener for each of the books so that we can
//display the book's thumbnail, description, and list of likes
function addClickListener(book, htmlTag) {
  htmlTag.addEventListener('click', () => {
    // We want to clear the div if a user selects a new book
    showPanel.textContent = ''
    displaySingleBook(book)
  })
}

function displaySingleBook(singleBook) {
  const users = document.createElement('ul')
  users.id = 'book-users'
  users.textContent = ''
  for (user of singleBook.users) {
    addBookUser(user, users)
  }

  showPanel.appendChild(displayH2(singleBook))
  showPanel.appendChild(displayImg(singleBook))
  showPanel.appendChild(displayP(singleBook))
  showPanel.appendChild(users)
  showPanel.appendChild(displayButton(singleBook))
}
  // This entire group of functions are used to create the view for a book
  function displayH2(book) {
    const newH2 = document.createElement('h2')
    newH2.textContent = book.title
    return newH2
  }

  function displayImg(book) {
    const newImg = document.createElement('img')
    newImg.src = book.img_url
    return newImg
  }

  function displayP(book) {
    const newP = document.createElement('p')
    newP.textContent = book.description
    return newP
  }

  function addBookUser(user, list) {
    const newUser = document.createElement('li')
    newUser.textContent = user.username
    list.appendChild(newUser)
  }

  function displayButton(book) {
    const newButton = document.createElement('button')
    newButton.textContent = 'Read Book'
    addButtonListener(book, newButton)
    return newButton
  }

function addButtonListener(bookObject, htmlTag) {
  let bookUsers = bookObject.users
  let currentBookUsers = document.getElementById('book-users')

  htmlTag.addEventListener('click', () => {
    //We need to find the user in the bookUsers array and take them out to remove
    //them from
    for (i in bookUsers) {
      if (bookUsers[i].id === 1) {
        delete bookUsers[i]
        const newUsers = bookUsers.filter(Boolean)
        return sendPatchFetch(bookObject.id, newUsers)
      }
    }
    bookUsers.push({id: 1, username: "pouros"})
    const newUsers = bookUsers
    sendPatchFetch(bookObject.id, newUsers)
  })
}

//Abstracting out our patch fetch request as we will need to call it twice
function sendPatchFetch(id, objectCollection) {
  fetch(`http://localhost:3000/books/${id}`,
    {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({users: objectCollection})
    })
  .then(response => response.json())
  .then(json => {
    showPanel.innerText = ""
    displaySingleBook(json)
  })
  .catch(error => {
    console.log(error)
  })
}

getBooks()
