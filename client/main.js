/**
- [ ] Dom Manipulation (hide/show, empty, append)
- [ ] Event Handling (form, button, dll)
- [ ] Ajax (i.g. get, post, put, patch, delete)
*/

$(document).ready(function () {
  if (localStorage.getItem("access_token")) {
    afterLogin();
  } else {
    beforeLogin();
  }

  $("#nav-logout").click(logoutHandler);
  $("#login-form").submit(loginHandler);
});

function beforeLogin() {
  $("#nav-addMovie").hide();
  $("#nav-logout").hide();
  $("#nav-login").show();
  $("#home-page").hide();
  $("#form-login").show();
}

function afterLogin() {
  $("#nav-addMovie").show();
  $("#nav-logout").show();
  $("#nav-login").hide();
  $("#home-page").show();
  $("#form-add-movie").hide();
  $("#form-login").hide();

  fetchMovies();
}

function logoutHandler(e) {
  localStorage.clear();
  beforeLogin();
}

function loginHandler(e) {
  e.preventDefault();
  // dapetin value dari form
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/login",
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      localStorage.access_token = data.access_token;
      //   localStorage.setItem("access_token", data.access_token);
      afterLogin();
    })
    .fail((err) => {
      // notif ke user bahwa loginnya gagal
      console.log(err);
    })
    .always(() => {
      $("#login-email").val("");
      $("#login-password").val("");
    });
}

function fetchMovies() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/movies",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(({ data }) => {
      // untuk mengosongkan child
      $("#moviecard-container").empty();
      data.forEach((movie) => {
        $("#moviecard-container").append(`
            <div class="col-3">
                <div class="card">
                <img
                    src="${movie.poster}"
                    class="card-img-top"
                    alt=""
                />
                <div class="card-body">
                    <h5 class="card-title">
                    ${movie.title}
                    <span class="badge badge-dark">${movie.year}</span>
                    </h5>
                    <p class="card-text">${movie.genre}</p>
                    <button class="btn btn-primary" onClick="deleteMovie(${movie.id})">Delete</button>
                </div>
                </div>
            </div>
        `);
      });
    })
    .fail((err) => console.log(err));
}

function deleteMovie(idMovie) {
  //   console.log(idMovie);
  $.ajax({
    type: "DELETE",
    url: "http://localhost:3000/movies/" + idMovie,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(() => {
      // delete cuma yang tadi di click
      fetchMovies();
    })
    .fail((err) => {
      console.log(err);
    });
}
