let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  loadToys();
  addNewToy();
  addLike();
});

function loadToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(result =>
      result.forEach(element => {
        makeToyCard(element);
      })
    );
}

function makeToyCard(toyObject) {
  const toyCollection = document.getElementById("toy-collection");
  let toyDiv = document.createElement("div");
  toyDiv.class = "card";
  toyDiv.dataset.id = toyObject.id;
  toyDiv.innerHTML = `
  <h2>${toyObject.name}</h2>
  <img src="${toyObject.image}" class="toy-avatar">
  <p class="numLikes">${toyObject.likes}</p>
  <button class="like-button">Like <3</button>`;
  toyCollection.appendChild(toyDiv);
}

function addNewToy() {
  newForm = document.getElementsByClassName("add-toy-form")[0];
  newForm.addEventListener("submit", function() {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newForm.name.value,
        image: newForm.image.value,
        likes: "0"
      })
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        response.json();
      })
      .then(result => console.log(result));
  });
}

function addLike() {
  document.addEventListener("click", function(event) {
    if (event.target.className === "like-button") {
      console.log(event.target);
      let id = event.target.parentNode.dataset.id
      event.target.parentNode.querySelector("p").innerText++
      let likes = event.target.parentNode.querySelector("p").innerText
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ likes })
      };

      fetch(`http://localhost:3000/toys/${id}`, configObj)
        .then(function(response) {
          response.json();
        })
        .then(result => console.log(result));
    }
  });
}
