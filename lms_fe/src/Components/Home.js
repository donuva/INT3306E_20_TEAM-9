import React, { Component }  from 'react';

function Home() {
  return (
    <nav class="navbar navbar-expand-lg navbar-green bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LMS_OFFLINE</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Courses</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Teachers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Payment</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Home;
