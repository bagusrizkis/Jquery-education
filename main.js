/**
 *  - Dom Manipulation (hide/show, empty, append)
 *  - Event Handling(form, button, dll)
 *  - Ajax (get, post, put, patch, delete)
 *  - C R U D
 */
let baseUrl = "http://localhost:3000";

// ???
$(document).ready(function () {
  // dokumen siap
  //  ?? apakah punya token login
  auth();

  // * login
  $("#login-form").submit(function (e) {
    e.preventDefault();
    // ganti jalanin function
    login();
  });

  // * add movie
  $("#add-movie").submit((event) => {
    event.preventDefault();
    addMovie();
  });

  // * logout
  $("#nav-logout").click(function (e) {
    e.preventDefault();
    logOut();
  });
});

function logOut() {
  localStorage.removeItem("access_token");
  auth();
}

function auth() {
  // disini ngecek login belum
  // token di local storage
  // kapan set token? login
  if (localStorage.getItem("access_token")) {
    // berarti udah login
    $("#form-login").hide();
    $("#home-page").show();
    $("#edit-page").hide();

    // dapetin movie dari server berdasar user login (token)
    fetchMovies();
  } else {
    // berarti belum login
    $("#form-login").show();
    $("#home-page").hide();
    $("#edit-page").hide();
  }
}

function fetchMovies() {
  // request movies
  $.ajax({
    type: "GET",
    url: baseUrl + "/movies",
    // kirim header access_token
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(({ data }) => {
      // kita masukkan ke card -container
      // loop dulu
      // sebelum append dihapus
      $("#moviecard-container").empty();
      for (let i = 0; i < data.length; i++) {
        $("#moviecard-container").append(`
        <div class="col-3">
            <div class="card">
            <img
                src="${data[i].imageUrl}"
                class="card-img-top"
                alt=""
            />
            <div class="card-body">
                <h5 class="card-title">
                ${data[i].title}
                <span class="badge badge-dark">${data[i].releasedYear}</span>
                </h5>
                <p class="card-text">${data[i].genre}</p>
                <button onclick="deleteMovie(${data[i].id})" id="delete-${data[i].id}" type="button" class="btn btn-danger">Delete</button>
                <button onclick="editMovie(${data[i].id})" type="button" class="btn btn-primary">Edit</button>
            </div>
            </div>
        </div>`);
      }
    })
    .fail((err) => {
      console.log(err);
    });
}

function editMovie(id) {
  // TODO
  // [x] buat halaman edit
  // buka halaman edit
  $("#edit-page").show();
  $("#home-page").hide();
  // form input sudah dimasukkin ke valuenya yang datanya berasal dari get Detail
  $.ajax({
    type: "GET",
    url: baseUrl + "/movies/" + id,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  }).done(({ data }) => {
    $("#editTitle").val(data.title);
    $("#editPoster").val(data.imageUrl);
    $("#editGenre").val(data.genre);
    $("#editYear").val(data.releasedYear);
  });
  // tombol save (ama cancel)
  // * edit movie
  $("#edit-movie").submit((event) => {
    event.preventDefault();
    postEdit(id);
  });
}

function postEdit(id) {
  $.ajax({
    type: "PUT",
    url: baseUrl + "/movies/" + id,
    data: {
      title: $("#editTitle").val(),
      imageUrl: $("#editPoster").val(),
      genre: $("#editGenre").val(),
      releasedYear: $("#editYear").val(),
    },
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((resp) => {
      // tampil notif
      auth();
    })
    .fail((err) => {});
}

function deleteMovie(id) {
  // proses delete
  $.ajax({
    type: "DELETE",
    url: baseUrl + "/movies/" + id,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((resp) => {
      // notif
      fetchMovies();
    })
    .fail((err) => {
      console.log(err);
    });
}

//  buat login
function login() {
  // untuk login
  $.ajax({
    type: "POST",
    url: baseUrl + "/users/login",
    data: {
      email: $("#login-email").val(),
      password: $("#login-password").val(),
    },
  })
    .done((response) => {
      //   success
      localStorage.setItem("access_token", response.access_token);
      //   localStorage.access_token = response.access_token;
      auth();
      // kosongin form tadi
    })
    .fail((err) => {
      // err
      // append
    })
    .always(() => {
      // selalu dijalankan
    });
}

function addMovie() {
  // dapetin data dari form
  $.ajax({
    type: "post",
    url: baseUrl + "/movies",
    data: {
      title: $("#inputTitle").val(),
      imageUrl: $("#inputPoster").val(),
      genre: $("#inputGenre").val(),
      releasedYear: $("#inputYear").val(),
    },
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((resp) => {
      fetchMovies();
      alert("data berhasil disimpan");
    })
    .fail((err) => {
      console.log(err);
    });
}
