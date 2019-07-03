
const url = "http://localhost:3000/books"
const ul = document.getElementById('list')
const panel = document.getElementById('show-panel')

function getBooks(){
  fetch(url)
    .then(res => res.json())
    .then(json => showBooks(json))
  }

function showBooks(json){
  json.forEach(book =>{
    const li = document.createElement('li')
    li.textContent = `${book.title}`
    ul.appendChild(li)
    li.addEventListener('click', function() {
      clickHandler(book)
      console.log(json)
    })
  })
}

function clickHandler(book){

  const book_image = document.createElement('img')
  const desc = document.createElement('span')
  const likes = document.createElement('p')
  const likeButton = document.createElement('button')

  book_image.src = book.img_url
  desc.textContent = book.description
  likeButton.textContent = 'Like this Book'
  panel.innerHTML = ''
  panel.appendChild(book_image)
  panel.appendChild(desc)
  panel.appendChild(likeButton)
  panel.appendChild(likes)

  for (i = 0; i < book.users.length; i++) {
    const users = document.createElement('p')
    users.textContent = book.users[i].username
    console.log(book.users[i].username)
    panel.appendChild(users)
  }

  likeButton.addEventListener('click', ()=>{
    likeBook(book)
  })
}

function likeBook(book) {
  book.users.push({ id: 1, username: "pouros"})

  fetch(`${url}/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
       users: book.users
    })
  })
    .then(res=>res.json())
    .then(function(object) {
      likeBooks(book);
  });
}

document.addEventListener('DOMContentLoaded', function() {

  getBooks();

});
