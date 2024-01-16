let cardsList = document.querySelector(".cards");
let cards = [];

fetch("http://localhost:3000/books")
  .then((response) => response.json())
  .then((books) => {
    cards = books;
    cards.forEach((book) => {
      cardsList.innerHTML += `
        <div class="cards">
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">
                        <h1>${book.title}</h1>
                        <br> 
                        <p>${book.author}</p>
                    </div>
                    <div class="card-back">
                        <h1>${book.date_published}</h1>
                        <br>
                        <p>${book.ongoing}</p>
                        <br>
                        <button type="button" class="delete-btn" data-id="${book._id}">Delete</button>
                        <br>
                        <button type="button" class="update-btn" data-id="${book._id}">Update</button>
                    </div>
                </div>
            </div>
        </div>`;
    });
    //delete
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const bookId = event.target.dataset.id;

        fetch(`http://localhost:3000/books/${bookId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error))
          .then(() => location.reload());
      });
    });
    //update book
    document.querySelectorAll(".update-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        document.getElementById("update-form").style.display = "block";
        document.getElementById("update-form").dataset.id =
          event.target.dataset.id;
      });
    });

    document
      .getElementById("update-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const bookId = document.getElementById("update-form").dataset.id;
        console.log(bookId);
        const title = document.getElementById("update-title").value;
        const author = document.getElementById("update-author").value;
        const date_published = document.getElementById(
          "update-date_published"
        ).value;
        const ongoing = document.getElementById("update-ongoing").value;

        const updatedBook = { title, author, date_published, ongoing };

        fetch(`http://localhost:3000/books/${bookId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error))
          .then(() => location.reload());
      });

    //create button
    document.getElementById("book-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const date_published = document.getElementById("date_published").value;
      const ongoing = document.getElementById("ongoing").value;

      const book = { title, author, date_published, ongoing };

      fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error))
        .then(() => location.reload());
    });
  });
