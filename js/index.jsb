
function getBooks() {
  fetch("http://localhost:3000/books")
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      renderBooks(json)
      console.log(json)
    })
}

 function renderBooks(json) {

   const ul = document.getElementById('list');

    json.forEach(book => {

      const li = document.createElement('li');
      
      li.innerHTML = `<li>${book.title}</li>`;
      // create a custom attribute to bind strings to my li
       li.setAttribute("data-img-url", book.img_url);
       li.setAttribute("data-description", book.description);
       li.setAttribute("data-likes",book.users);
      // li.dataset.imgUrl = book.img_url;
      li.addEventListener("click", bookClickHandler);
      ul.appendChild(li);
   });
}

function bookClickHandler(){
  const showPanel = document.getElementById("show-panel");

  let imgElement = document.createElement("IMG");
  imgElement.setAttribute("src", this.getAttribute("data-img-url"));
  showPanel.appendChild(imgElement);

  let descElement = document.createElement("p");
  descElement.innerText = this.getAttribute("data-description");
  showPanel.appendChild(descElement);

  let userElement = document.createElement("p");
  userElement.innerText = this.getAttribute("data-likes");
  showPanel.appendChild(userElement);


}

document.addEventListener('DOMContentLoaded', function() {

  getBooks();

});
