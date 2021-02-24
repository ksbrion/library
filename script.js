let form = document.getElementById("addBook");
let divForm = document.getElementById("divForm");
let submitButton = document.getElementById("submit");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

let addButton = document.getElementById("addButton");
addButton.onclick = function(){
    divForm.style.display="block";
}

let span = document.getElementsByClassName("close")[0];
span.onclick = function(){
    divForm.style.display="none";
}

window.onclick = function(event) {
    if (event.target == divForm) {
      divForm.style.display = "none";
    }
  }

container = document.querySelector('#container');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = function(){
        (this.read === 'No') ? this.read='Yes' : this.read = 'No';
        libraryCards();
    }
   
} 

function addBookToLibrary() {
    let book = getEntry();
    myLibrary.push(book);
    addBook.reset();
    divForm.style.display = "none";
    libraryCards()
}

function libraryCards(){
    removeAllChildNodes(container);
    for (i=0; i<myLibrary.length; i++){
        let bookDiv = document.createElement("div");
        bookDiv.setAttribute(`data-x`,`${i}`);
        bookDiv.classList.add('cards');

        let titleLabel = document.createElement("div");
        titleLabel.appendChild(document.createTextNode(`Title:`));
        let bookTitle = document.createElement("div");
        bookTitle.appendChild(document.createTextNode(`${myLibrary[i]['title']}`));

        let authorLabel = document.createElement("div");
        authorLabel.appendChild(document.createTextNode(`Author:`));
        let bookAuthor = document.createElement("div");
        bookAuthor.appendChild(document.createTextNode(`${myLibrary[i]['author']}`));

        let pagesLabel = document.createElement("div");
        pagesLabel.appendChild(document.createTextNode(`Pages:`));
        let bookPages = document.createElement("div");
        bookPages.appendChild(document.createTextNode(`${myLibrary[i]['pages']}`));

        let readLabel = document.createElement("div");
        readLabel.appendChild(document.createTextNode(`Finished reading?`));
        let bookRead = document.createElement("div");
        bookRead.appendChild(document.createTextNode(`${myLibrary[i]['read']}`));

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add('buttonDiv')
        let buttonEdit = document.createElement("button");
        buttonEdit.appendChild(document.createTextNode(`Edit`));
        buttonEdit.setAttribute(`data-x`,`${i}`);
        buttonEdit.addEventListener('click', editCard)
        let buttonDelete = document.createElement("button");
        buttonDelete.appendChild(document.createTextNode(`Delete`));
        buttonDelete.setAttribute(`data-x`,`${i}`);
        buttonDelete.addEventListener('click', deleteCard);
        let buttonRead = document.createElement("button");
        buttonRead.appendChild(document.createTextNode(`Read Toggle`));
        buttonRead.setAttribute(`data-x`,`${i}`);
        buttonRead.addEventListener('click', read);

        buttonDiv.appendChild(buttonEdit);
        buttonDiv.appendChild(buttonRead);
        buttonDiv.appendChild(buttonDelete);
        

        titleLabel.classList.add('labels');
        authorLabel.classList.add('labels');
        pagesLabel.classList.add('labels');
        readLabel.classList.add('labels');

        bookTitle.classList.add('user-input');
        bookAuthor.classList.add('user-input');
        bookPages.classList.add('user-input');
        bookRead.classList.add('user-input');

        bookDiv.appendChild(buttonDiv); 
        bookDiv.appendChild(titleLabel); 
        bookDiv.appendChild(bookTitle); 
        bookDiv.appendChild(authorLabel);   
        bookDiv.appendChild(bookAuthor); 
        bookDiv.appendChild(pagesLabel); 
        bookDiv.appendChild(bookPages); 
        bookDiv.appendChild(readLabel);      
        bookDiv.appendChild(bookRead);  
        container.appendChild(bookDiv);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function deleteCard(e){
    let bookDelete = parseInt(e.target.getAttribute('data-x'));
    myLibrary.splice(bookDelete,1)
    libraryCards()
}

function read(e){
    let bookRead = parseInt(e.target.getAttribute('data-x'));
    myLibrary[bookRead].toggleRead();
}

function editCard(e){
    let bookEdit= parseInt(e.target.getAttribute('data-x'));
    divForm.style.display="block";
    submitButton.style.display="none";
    let editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode(`Edit Card`));
    editButton.setAttribute(`data-x`,`${bookEdit}`);
    editButton.setAttribute(`id`,`edit`);
    editButton.addEventListener('click', editEntry);
    editButton.classList.add('submit');
    form.appendChild(editButton);

    document.getElementById("title").value =myLibrary[bookEdit]['title'];
    document.getElementById("author").value =myLibrary[bookEdit]['author'];
    document.getElementById("pages").value =myLibrary[bookEdit]['pages'];
    document.getElementById("readToggle").checked = (myLibrary[bookEdit]['read'] === "Yes");
}

function editEntry(e){
    let bookEdit= parseInt(e.target.getAttribute('data-x'));
    let book = getEntry();
    for (var prop in myLibrary[bookEdit]) {
        if (Object.prototype.hasOwnProperty.call(myLibrary[bookEdit], prop)) {
        myLibrary[bookEdit][prop] = book[prop];
        
        }
    }
    addBook.reset();
    libraryCards();
    form.removeChild(document.getElementById("edit"));
    divForm.style.display = "none";
    submitButton.style.display="block";
    

}

function getEntry(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let readCheckBox = document.getElementById("readToggle");
    let read = (readCheckBox.checked) ? 'Yes' : 'No';
    if(title === "" || author === "" || pages ==="") return;
    let book =  new Book(title, author, pages, read);
    return book;
    
}