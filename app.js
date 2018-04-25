//Book Constructor
function Boo(title,author,isbn)
{
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//UI Constructor

function UI(){}

//Add Book to list

UI.prototype.addBookToList = function(book)
{
  //Select tbody
  const list = document.getElementById('book-list');  //<tbody>
  //Create tr element
  const row = document.createElement('tr'); //logging this gives <tr></tr>
  //Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class="delete">X<a></td>
  `;
  //Append row to tbody(list)
  list.appendChild(row);
}


UI.prototype.showAlert = function(message, className)
{
  //Create a div
  const div = document.createElement('div');
  //Add class
  div.className = `alert ${className}`; //alert class is given to div to dissappear it in settimeout
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector('.container');
  //Get form to insert div before form
  const form = document.querySelector('#book-form');
  //Insert div before form
  container.insertBefore(div,form);
  //Dissappear div after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000)
}

//Delete book
UI.prototype.deleteBook = function(target)
{
  if(target.className === 'delete')
  {
    target.parentElement.parentElement.remove(); //a tag is inside td and td is inside tr we want tr
  }
}

//Clear Fields
UI.prototype.clearFields = function()
{
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listners for add book

document.getElementById('book-form').addEventListener('submit',function(e)
{
  //Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //Instantiate Book
  const book = new Book(title,author,isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn === '')
  {
    ui.showAlert('Please fill all fields','error'); //here error is class used for style
  }
  else
  {
    //add book
    ui.addBookToList(book);

    //Clear fields
    ui.clearFields();

    ui.showAlert('Book added','success');
  }



  e.preventDefault();
});

//Event listner for delete book
document.getElementById('book-list').addEventListener('click',function(e){

  //Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  //Show message
  ui.showAlert('Book Removed','success');

  e.preventDefault();
});
