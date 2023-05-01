# FAQ

### I want to contribute, how I can achieve it?

1. Join our [Discord](https://discord.com/invite/uJa3KUfFpj).
2. Add your **Github** profile link to dedicated channel.
3. Wait for approval (we'll add you to board with tickets and contributors).
4. Now you can pick any task from [board](https://github.com/users/polubis/projects/1).

### I want to write an article, how I can start?

You need to perform following steps:

1. Find subject for an article.

2. Invent a name for the article - _generally recommended title length is between 50 and 70 characters (max 600 pixels). Longer titles will be truncated when they show up in the search results._

3. Create an example in code if needed. Remember to divide the code so that explaining it is easy for you.

> It is very important. Repository must is stable. If you provide a link to the code and later you'll change the article - you can broke it so be careful.

4. Go to our [editor](https://greenonsoftware.com/blog-creator/), try to understand how this syntax work, and add your own article :). Later you can send markdown to our dedicated [channel](https://discord.com/channels/1090959521364586568/1100664861073088572). Someone will contact you and start reviewing process.

5. Congrats :)! Now you contributed to the project, so if you want we can add you to [authors](https://greenonsoftware.com/authors/). We'll ask you for permissions so don't worry.

### How to run project?

Please make sure you're using following versions of `npm` and `node`. You can try to run app with higher ones, but usually it causes errors.

```yaml
node 16.15.1
npm 8.12.1
```

Now you need to **fetch** repository.

```yaml
# Clones repository.
git clone https://github.com/polubis/WebBlog.git
# Changes directory.
cd WebBlog
# Opens new Visual Studio Code window.
code .
```

Now you need to type following commands:

```yaml
# Installs deps.
npm i --legacy-peer-deps
# Runs application in local server.
npm start
```

Now open [app](http://localhost:8000/) and it should work.

### How to work on task?

1. Create a branch from **develop** which should have just a number in name. Take task number from [board](https://github.com/users/polubis/projects/1).
2. Assign yourself to ticket in **board**, change status to **In Progress**. If you've questions raise them on [this channel](https://discord.com/channels/1090959521364586568/1100672620132843530).
3. After finishing work create a **pull request** against **develop**.
4. You can do anything else and after a while someone will perform **code review**.
5. If everything is fine code will be merged to **develop**.
6. Congrats :)! Now you contributed to the project, so if you want we can add you to [authors](https://greenonsoftware.com/authors/). We'll ask you for permissions so don't worry.

### Why I see an errors after pulling latest changes from develop or after changing branch?

You need stop `gatsby` process in terminal and run commands:

```yaml
# Removes gatsby build files.
npm run clean
# Starts development server.
npm start
```

It may be also caused by change in `package.json` file. So to fix it you need to run following commands:

```yaml
npm run clean
# It adds deps again (maybe someone changed them).
npm i --legacy-peer-deps
npm start
```

Right now it should work. If not, it may be because you have something wrong with `node_modules` and `package.lock.json` file. In that case try to:

1. Delete `node_modules` and `package.lock.json`.
2. Run following commands:

```yaml
npm run clean
npm i --legacy-peer-deps
npm start
```

> Please go to our [Discord](https://discord.com/invite/uJa3KUfFpj) if you still have problems and ask for help in dedicated channel :).
