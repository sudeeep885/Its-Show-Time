<br />

  <a href="https://its-show-time.netlify.app/">
    <img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/frontend/src/2_objects.png?raw=true" alt="its-logo" align="right">
  </a>

# IT'S SHOW TIME

<p>
  A Full-Stack webApp made using React for front-end and Django for back-end. It uses The Movie Database API extensively for fetching the content. Users can view Trending as well as search for specific Movies/Tv Series and filter content by genres. The JWT Authentication system safely manages user's accounts. A new user also receives a acoount-confirmation mail to his/her email-id. Logged-in users have the functionality to add movies and series in their watchlists.
</p>

## Table of content

- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Features](#features)
  - [Sign-Up Form](#sign-up-form)
  - [Log-In Form](#log-in-form)
  - [Trending Content](#trending-content)
  - [Filter Content by Genres](#filter-content-by-genres)
  - [Watchlist Overview](#watchlist-overview)
  - [Search](#search)
- [To Add List](#to-add-list)
- [Links](#links)

## Directory Structure

```
├── ItsShowTime/
│   ├── settings.py
│   └── urls.py
│
├── backend/
│   ├── models.py
│   ├── serializers.py
│   └── views.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├──components/
│   │   ├──config/
│   │   ├──hooks/
│   │   ├──pages/
│   │   ├──Apps.js
│   │   └──index.js
│   └── package.json
│
└── manage.py
```

## Getting Started

  To run this app on your machine follow the below steps:
  1. Run ``` git clone https://github.com/sudeeep885/Its-Show-Time.git```
  2. Create .env file for django in the root directory and add following values.
``` 
  SECRET_KEY = <your_secret_key_here>
  EMAIL_HOST_USER = <gmail_id_from_which_the_user_will_get_confirmation_mail>
  EMAIL_HOST_PASSWORD = <password_of_above_email_id> 
```
  3. Run the following commands to start the django server.
```
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
```

  4. CD into frontend directory and create another .env file for react and add following values.
``` 
  REACT_APP_API_KEY = <your_the_movie_database_api_key>
  REACT_APP_BACKEND_BASE_URL = http://127.0.0.1:8000/auth/
```
  5. Run ```npm run start``` to start the server for react.


## Features

#### Sign-Up Form

#### Log-In Form

#### Trending Content

#### Filter Content by Genres

#### Watchlist Overview

#### Search

## To Add List

## Links
