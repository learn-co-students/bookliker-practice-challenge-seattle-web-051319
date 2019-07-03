// Issues: Getting live update on likes

document.addEventListener("DOMContentLoaded", function() {});

const url = "http://localhost:3000/books"
const ul = document.querySelector("#list");


function fetchBooks() {
    fetch(url)
    .then(resp => resp.json())
    .then(json => displayAllBooks(json))
}

function displayAllBooks(books) {
    for(let book of books) {
        displayBook(book)
    }  
}

function displayBook(book){
    const li = document.createElement("li");
    li.textContent = book.title;
    li.addEventListener("click", () => showBook(book));
    ul.appendChild(li);
}

function showBook(book) {
    const card = document.getElementById("show-panel");            
    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }

    const image = document.createElement("img");
    image.src = book.img_url;
    card.appendChild(image)

    const description = document.createElement("p");
    description.textContent = book.description;
    card.appendChild(description);

    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    card.appendChild(likeButton);
    likeButton.addEventListener("click", () => {
        if (!book.users.find(user => user.id == 1)) {
            appendNewLike(book, likedUsers);
        } else { 
            removeLike(book, likedUsers);
        }
        likeBook(book, likedUsers);
    });

    const likedBy = document.createElement("p");
    likedBy.textContent = "Liked by:"
    card.appendChild(likedBy);

    const likedUsers = document.createElement("ul");
    for(let user of book.users) {
        const li = document.createElement("li");
        li.classList.add("user");
        li.textContent = user.username;
        likedUsers.appendChild(li);
    }
    card.appendChild(likedUsers);   
}

function appendNewLike(book, likedUsers) {
    book.users.push({"id":1, "username":"pouros"});

    const newLi = document.createElement("li");
    const userList = book.users; 
    newLi.classList.add("user");
    newLi.textContent = userList[userList.length-1].username;
    likedUsers.appendChild(newLi);
}

function removeLike(book, likedUsers) {
    let i = book.users.indexOf(user => user.id == 1);
    book.users.splice(i, 1);
    
    let listedUsers = document.getElementsByClassName("user");
    for (let user of listedUsers) {
        if (user.textContent == "pouros") {
            likedUsers.removeChild(user);
        }
    }
}
function likeBook(book, users) {
    fetch(`${url}/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }, 
        body: JSON.stringify({
            users: book.users
        })
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(err => err.message)
}



fetchBooks();