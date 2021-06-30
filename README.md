<br />

  <a href="https://its-show-time.netlify.app/">
    <img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/frontend/src/2_objects.png?raw=true" alt="its-logo" align="right">
  </a>

# IT'S SHOW TIME 🎬

  A Full-Stack webApp made using [React](https://reactjs.org/) for front-end and [Django](https://www.djangoproject.com/) for back-end. It uses The Movie Database API ([TMDB](https://www.themoviedb.org/documentation/api)) extensively for fetching the content. Users can view Trending as well as search for specific Movies/Tv Series and filter content by genres. The [JWT](https://jwt.io/) Authentication system safely manages user's accounts. A new user also receives an account-confirmation mail to his/her email-id. Logged-in users have the functionality to add movies and series in their watchlists.

## Table of content 📌

- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Features](#features)
  - [Sign-Up Form](#sign-up-form)
  - [Log-In Form](#log-in-form)
  - [Trending Content](#trending-content)
  - [Filter Content by Genres](#filter-content-by-genres)
  - [Watchlist Overview](#watchlist-overview)
  - [Search](#search)
- [Future Plans](#future-plans)
- [Links](#links)

## Directory Structure🔧

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

## Getting Started🙌

  To run this app on your machine follow the below steps:
  1. Run ``` git clone https://github.com/sudeeep885/Its-Show-Time.git```
  2. Create .env file for django in the root directory and add following values.
``` 
  SECRET_KEY = <your_secret_key_here>
  EMAIL_HOST_USER = <gmail_id_from_which_the_user_will_get_confirmation_mail>
  EMAIL_HOST_PASSWORD = <password_of_above_email_id> 
```
  3. Create a virtual environment if you want. Then run the following commands to start the django server.
```
  pip install -r requirements.txt
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

<br />


## Features✨

### Sign-Up Form
<p align="center">
<img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/samples/signup.PNG?raw=true" height="80%" width="80%"/>
</p>
<br />

### Log-In Form
<p align="center">
<img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/samples/login.JPG?raw=true" height="80%" width="80%" />
</p>
<br />

### Trending Content
<p align="center">
<img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/samples/main.PNG?raw=true" height="80%" width="80%" />
</p>
<br />

### Filter Content by Genres
<p align="center">
<img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/samples/movies.PNG?raw=true" height="80%" width="80%" />
</p>
<br />

### Watchlist Overview
<p align="center">
<img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/samples/watchlist-overview.gif?raw=true" height="80%" width="80%" />
</p>
<br />

### Search
<p align="center">
<img src="https://github.com/sudeeep885/Its-Show-Time/blob/main/samples/search.PNG?raw=true" height="80%" width="80%" />
</p>
<br />

## Future Plans💡
1. <strike>Add age and phone number field.</strike> ✔
2. Add an option to change the account details.
3. Add options to Buy or Rent a movie.
4. Intergrate a payment gateway.
5. Launch a premium membership for users. Premium users will have multiple benefits like receiving emails for new movies/TV Series, discounts on buying/renting a movie etc.

<br />

## Links📝
1. https://material-ui.com/
2. https://www.django-rest-framework.org/
3. https://djoser.readthedocs.io/en/latest/introduction.html
4. https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html
5. https://www.npmjs.com/package/react-alice-carousel
6. https://www.npmjs.com/package/react-infinite-scroll-component
