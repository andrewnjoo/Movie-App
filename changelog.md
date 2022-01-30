2021-01-29

- set padding to 0 for TV container for mobile devices

- install FontAwesome for React

- add user profile icon to NavBar

- change from horizontal scrolling for movies/TV to grid layout


2022-01-28

- set padding to 0 for movie container for mobile devices

- rename app from movieApp to Movie App

2021-11-19

- working on horiz-scroll

2021-11-18

- fix movielist; add TV shows. edit styling; add horizontal scroll. add burger menu.

2021-11-17

- combine login|register navbar into login; rewrite jest tests from profile2 to profile. fixed login | register box overspilling on responsive.

2021-11-16

- replaced donut rating with bottom-right text in LandingPage; edit navbar. moved buttons from top to bottom of LP.

2021-11-15

- swapped out axios with rtk-query in LandingPage

2021-11-12 (redux branch)

- styled profile component;

2021-11-08

- refactor movielist from Class->Functional component; add donut rating

2021-11-07

- movie poster same height - 261px

2021-11-04

- add login/register styling; add modal popup to click on movie poster.

2021-10-30

- add Left-Right key detection to LandingPage; refactored LandingPage from class to functional component.

2021-10-29

- refactored margin on LandingPage, add icon to navbar; changed page deployment from Heroku to Netlify due to speed/loading concerns.

2021-08-14

- Added [buildpack](https://github.com/mars/create-react-app-buildpack) to heroku

2021-08-09

- added user authentication with jwt tokens

2021-08-04

- fixed some logic with react

2021-07-23

- added (adds a new movie) function.

2021-07-18

- installed tailwind in react

# TODO

## high-prio

- app reflashes when routing: how to fix: maybe move to Next.js / SSR

- horizontal scroll to vertical scroll for movies / TV

- create pagination

- add a people page

- add sort by popular | top rated

- improve search bar

- pre-load movies / TV shows

### n2h

- trailer example : <http://api.themoviedb.org/3/movie/566525/videos?api_key=7aa9ec6612579e4bfd39288619de239c>

- add loading spinner during api call | fetch pre-load X page api data

- trailer link (? possible)

- did you mean this movie name popup

- add app stats page - e.g. movies added, number of users, most liked movies etc.

## done

~~hamburger menu for mobile~~

~~refactor LandingPage to save output of API call into state to save time~~

## Color scheme

Primary
#445bf5
dark blue

Secondary
#f5de44
light yellow

Tertiary
#bdc5fb
light blue 