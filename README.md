# Running the project first time

1. Clone repository

```yaml
  git clone https://github.com/polubis/WebBlog.git
  cd WebBlog
  code .
```

2. Open terminal and type:

```yaml
npm i --legacy-peer-deps
npm start
```

3. If you see an errors please check the version of following packages which are installed globally.

```yaml
node 16.15.1
npm 8.12.1
```

4. Make sure you have same packages versions.


Application is served on development server - `http://localhost:8000/`.

# How to work on task?

1. Open terminal and type `git fetch` -> it downloads all branches from cloud and updates them.
2. Go to `develop` branch, you can achieve it via command `git checkout develop`.
3. Next, type command which takes all updates from `develop` to be sure that nobody pushed anything. Type command `git pull`. Makue sure you are on `develop` branch.
4. Right now you need to create your own `branch` for ticket. Go to project board in `github`, find your ticket which you are assigned to and check name of the ticket. In my case it's - **Add next and previous article buttons#57**. Now you need to type `git checkout -b "57-add-next-and-previous-article"`. 



# FAQ

**(Q)**: Why I see an errors after pulling latest changes from develop or after changing branch?

**(A)**: You need stop `gatsby` process in terminal and run commands:
```yaml
npm run clean
npm start
```

**(Q)**: I did what has been described in above step but still I see an errors. Why?

**(A)**: It may happen because someone added new package to `package.json`. So to fix that you need to type following commands:

```yaml
npm run clean
npm i --legacy-peer-deps
npm start
```
