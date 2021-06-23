# Problem Statement
1. There are Users and Blogs, and any user can comment on any blog.
2. Create a sample database.
3. Consider all users who have commented on the same blog as friends ( 1st level friend).
4. A friend is 2nd level friend if he has commented on a blog where a 1st level a friend has also commented but has not commented on any common blog.
5. Example - Blog1 has the comment of {User1, User2}, Blog2 has the comment of {User1, User3} here User2 and User3 are 2nd level friend if There is no blog which has the comment of User2 and User3.
6. Similar to above there can be third level friend and k-th level friend ( LinkedIn shows this kind of friend level) Create a REST api GET /users/<userId>/level/<levelNo> which should give list of all friends of that level for given userId (ex- /users/1234/level/1 for first level friend)
# Technology Used
* Node.js v-14.15.5
* npm v-6.14.11
* MongoDb
* REST API
# Installation
* Clone the repository into your machine.
* Open the cloned folder into the command prompt.
* run the following command for installing the 
  required packages.
``
npm install
*Finally run the following command to run the project.

```bash
node index.js
```

or (if nodemon is installed)
```bash
nodemon
```
# Usage
* To get the list of users enter the following URL into the browser.
```bash
http://localhost:8080/api/users
```
* To get the users' friends of some particular level enter the following URL.
```bash
http://localhost:8080/api/users/<user id>/level/<level no.>
```
example:-
```bash
http://localhost:8080/api/users/60c764f333a20a29382e9ed6/level/4
```

# Explanation

* In this assignment I have created the server using express.js. After that I have implemented the connection with the database.
* When the query is passed to search the friends of a given user of some particular level, the GET request will be called.
* In GET request firstly the user data will be stored in the user object then with the help of that list of user's first level friend will be retrieved.
* If the query is asked for first level friends then the resulting list will be sent as a response on the GET method. If not then, a function named `getFriends` will be called in a loop depending on the level given minus 1. After the loop is completed we will get the list of the user's friends for the given level.

## Database Schema

### User Schema 

```js
name: {
        type: String,
        require: true
    },
commentedBlog: {
        type: Array,
        default: [],
    }
```
### Blog Schema

```js 
content: {
      type: String,
      require: true,
    },
commentsBy: {
      type: Array,
      default: [],
    }
```

* In users collection name as well as the list of blogs id on which the user has commented will be stored.
* In blogs collection blog content as well as the list of users name who have commented on this particular blog will be stored.
