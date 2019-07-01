document.addEventListener("DOMContentLoaded", function() {	
	getBooks();
});

function getBooks() {
	fetch("http://localhost:3000/books")
		.then(response => response.json())
		.then(json => displayBooks(json));
}

function displayBooks(json) {
	const bookList = document.getElementById("list");
	
	json.forEach(book => {
		const bookItem = document.createElement("li");
		
		bookItem.textContent = book.title;
		bookList.appendChild(bookItem);		
		bookItem.addEventListener("click", function() {
			displayBook(book);
		});
	});
}

function displayBook(book) {
	const bookPanel = document.getElementById("show-panel");
	const bookTitle = document.createElement("h3");
	const bookCover = document.createElement("img");
	const bookDescr = document.createElement("p");
	const bookButton = document.createElement("button");
		
	while (bookPanel.children.length > 0) {
		bookPanel.removeChild(bookPanel.children[0]);
	}
	
	bookTitle.textContent = book.title;
	bookCover.src = book.img_url;
	bookDescr.textContent = book.description;
	bookButton.textContent = "Read Book";
	
	bookPanel.appendChild(bookTitle);
	bookPanel.appendChild(bookCover);
	bookPanel.appendChild(bookDescr);
	
	for (let i = 0; i < book.users.length; i++) {
		const bookUser = document.createElement("h5");
		
		bookUser.textContent = book.users[i].username;
		bookPanel.appendChild(bookUser);
	}
	
	bookPanel.appendChild(bookButton);
	
	bookButton.addEventListener("click", function() {
		updateBookUsers(book);
		}		
	);
}	

function updateBookUsers(book) {	
	for (let i = 0; i < book.users.length; i++) {
		if (book.users[i].id === 1) {
			alert("You read this already!");
			return;
		}
	}
	
	const bookUrl = `http://localhost:3000/books/${book.id}`;
	const bookUsers = book.users
	
	book.users.push({"id": 1, "username": "pouros"});
		
	const configObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({users: book.users})
	};
	
	fetch(bookUrl, configObj)
		.then(response => response.json())
		.then(json => displayBook(book));
}