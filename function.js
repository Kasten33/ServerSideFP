function createBook() {
  const newBook = {
    title: prompt("Enter book title:"),
    author: prompt("Enter author name:"),
    date_published: prompt("Enter publish date (YYYY-MM-DD):"),
    ongoing: prompt("Is the book ongoing? (true/false)") === "true",
  };

  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let bookData = document.getElementById("bookID");
      let bookDiv = document.createElement("div");
      bookDiv.setAttribute("data-id", data.id); // set the data-id attribute to the new book's ID
      bookDiv.innerHTML = `
        <h2>${book.title}</h2>
        <h3>Author: ${book.author}</h3>
        <p>Published: ${book.date_published}</p>
        <p>Ongoing: ${book.ongoing}</p>
      `;
      bookData.appendChild(bookDiv);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
let selectedBookId = null;

// Assuming books are rendered as divs with a data-id attribute
document.querySelectorAll(".book").forEach((book) => {
  book.addEventListener("click", function () {
    selectedBookId = this.getAttribute("data-id");
  });
});

function updateBook() {
  const updatedBook = {
    title: prompt("Enter book title:"),
    author: prompt("Enter author name:"),
    date_published: prompt("Enter publish date (YYYY-MM-DD):"),
    ongoing: prompt("Is the book ongoing? (true/false)") === "true",
  };

  fetch(`http://localhost:3000/books/${selectedBookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteBook() {
  fetch(`http://localhost:3000/books/${selectedBookId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getSingleBook() {
  fetch(`http://localhost:3000/books/${selectedBookId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // You can also update the UI here to display the book data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fetchBooks() {
  fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((data) => {
      let bookData = document.getElementById("bookID");
      data.forEach((book) => {
        let bookDiv = document.createElement("div");
        bookDiv.innerHTML = `
          <h2>${book.title}</h2>
          <h3>Author: ${book.author}</h3>
          <p>Published: ${book.date_published}</p>
          <p>Ongoing: ${book.ongoing}</p>
          `;
        bookDiv.addEventListener("click", function () {
          selectedBookId = this.getAttribute("data-id"); // set selectedBookId to the clicked book's ID
        });
        bookData.appendChild(bookDiv);
      });
    });
}
document.querySelector("#Create-btn").addEventListener("click", function () {
  createBook();
});
document.querySelector("#Update-btn").addEventListener("click", function () {
  updateBook();
});
document.querySelector("#Delete-btn").addEventListener("click", function () {
  deleteBook();
});
document
  .querySelector("#getSingleBook-btn")
  .addEventListener("click", function () {
    getSingleBook();
  });
fetchBooks();
