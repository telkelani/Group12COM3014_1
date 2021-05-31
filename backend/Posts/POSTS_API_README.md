# How to use Posts API

## SETUP server  
**The custom input is in bold**
- cd ./backend/Post
- docker build -t **image_name** .
- docker run -p **portyouwant**:4000 -d **image_name** --name=**name_your_container**

- To check if container is running
- docker ps

## SCHEMA (FIELDS)
##### title: String (required)
##### post: String (required)
##### user: String 
##### createdAt: Date

(These examples picked 4000 as the port. Replace this with the port you are using)
## GET REQUESTS (GET)

#### GET POSTS
`http://localhost:<port_you_want>/posts/api/all`

#### GET POST BY ID
`http://localhost:<port_you_want>/posts/api/<post_id>`

#### GET POSTS BY USER
`http://localhost:<port_you_want>/posts/api/user/<user_id>`

#### SEARCH POSTS BY TITLE
`http://localhost:<port_you_want>/posts/api/search?title=<search_title>`

#### SEARCH POSTS BY DATE RANGE
`http://localhost:<port_you_want>/posts/api/search?start_date=<YYYY-MM-DD>&end_date=<YYYY-MM-DD>`

## POST REQUEST (POST)

#### SUBMIT NEW POST
`http://localhost:<port_you_want>/posts/api/newpost`


## DELETE REQUEST (DELETE)

#### DELETE POST BY ID
`http://localhost:<port_you_want>/posts/api/<post_id>`

## UPDATE REQUEST (PATCH)

#### UPDATE POST BY ID
`http://localhost:<port_you_want>/posts/api/<post_id>`





