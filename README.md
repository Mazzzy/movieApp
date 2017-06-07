# movieApp
- Movie app developed using AngularJS, HTML, CSS, Bootstrap, grunt, bower and karma. 
  
A simple movieApp for demonstarting angular features.
It contains login page, dashboard that have movie search facility.
Use of nodejs for login purpose

## It utilizes movie api from https://api.themoviedb.org with some key.
Sample movie search url is : https://api.themoviedb.org/3/search/movie?api_key=<api_key>&language=en-US&query=<movie_name>

- First install packages using 'npm install'
- Then start node server as 'npm start' / 'node server'.
  - It starts server for login api on port 8001
- Then install bower packages using 'bower install'
- Then start grunt server for ui as 'grunt serve'. It starts UI server at http://localhost:9000.
  - If 'grunt serve' doesnt work then try 'grunt serve --force'

Login using test@test.com and test123.
Enjoy :)
