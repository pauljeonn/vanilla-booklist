// Book Class: Represents a Book
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}
// UI Class: Handle UI Tasks
class UI {
	static displayBooks() {
		const StoredBooks = [
			{
				title: 'Book One',
				author: 'John Doe',
				isbn: '3434434',
			},
			{
				title: 'Book Two',
				author: 'Jane Doe',
				isbn: '45545',
			},
		];

		const books = StoredBooks;

		books.forEach((book) => UI.addBookToList(book));
	}

	static addBookToList(book) {
		const list = document.querySelector('#book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

		list.appendChild(row);
	}

	static clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}

	static deleteBook(el) {
		// see if the e.target contains a class called 'delete'
		if (el.classList.contains('delete')) {
			// delete e.target's parent's parent which is <tr> i.e. the entire row
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div, form);
		// vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}
}

// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent acutal submit
	e.preventDefault();

	// Get form values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;

	// Validate
	if (title === '' || author === '' || isbn === '') {
		UI.showAlert('Please fill in all fields!', 'danger');
	} else {
		// Instantiate Book
		const book = new Book(title, author, isbn);

		// Add Book to UI
		UI.addBookToList(book);

		// Clear fields
		UI.clearFields();
	}
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
	// Console log the target and see what it is made of
	console.log(e.target);

	UI.deleteBook(e.target);
});
