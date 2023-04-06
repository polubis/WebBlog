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
4. Right now you need to create your own `branch` for ticket. Go to project board in `github`, find your ticket which you are assigned to and check name of the ticket. In my case it's - **Add next and previous article buttons#57**. Now you need to type `git checkout -b "57-some-test"`. 

> IMPORTANT -> Please to add at begining number of ticket. It's easier to track later in history of changes.

5. You need to push your local branch to remote. To achieve this just type `git push --set-upstream origin name-of-your-branch`
6. After this you'll see in terminal message about switched to new branch.
7. Start doing your ticket and put some changes in file. You can `stash` them, which means they're prepared to be pushed via `commit`. To stash changes just type `git add .` - this stash all your changed and saved files.
8. Now it's time to push your first `commit` - which means your current stable progress. Do achieve that you need to type command `git commit -m "Your commit message"`.
9. Now it's time to push everything to cloud. Do it via `git push`.
10. When finish all your work, raise pull request on github and assign Adrian Połubiński as reviewer. If you have questions according to any ticket - just ping me directly. After testing cycle tester will add testing scenarios to your branch and confirm that all is working correctly.
11. After this - you contributed to project and we can add you to authors page. If you want to be displayed here, ping directly Adrian Połubiński.

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
