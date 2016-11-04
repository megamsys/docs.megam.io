---
title: Deploying
order: 1
---

The **MegamVertice Console (UI - Nilavu)** is the main way to launch and manage virtual machines. A command line facility will be issued in our future launch.

---

### Getting Started

Enter MegamVertice Console (UI - nilavu) by typing [https://localhost](https://localhost) in the browser.

Replace *localhost* with *your ip*

### Watch this launch animation

![Deploying Machine](/img/machines/deploy.gif){: srcset="/img/machines/deploy.gif 800w, /img/machines/deploy.gif 1600w"}

### Launch

There are 3 ways to launch.

1. *Marketplaces*
2. *+*
3. *Create VM*

This will open a *new-launcher*.

#### Step 1

Choose *App*

Choose the *region*, *flavor*, HDD or SSD.

#### Step 2

1. Choose the language for your app and the version of the runtime.

2. You can  have your code in GitHub or type a public url.

Please follow the language specific guides.

- [Java](/customapps/java)
- [Php](/customapps/php)
- [Node.js](/customapps/nodejs)

#### Step 3

- Choose SSH Key (or) Root password option.

*SSH Key*

- Create a new sshkey pair
- Use an existing sshkey pair
- Upload your own sshkey pair

*Root password*

- Type a password for accessing the *root* username for the deployed App.

#### Launch your custom app

Click Launch. Voila ! Your App is launched.

Watch the deploy events live and in 30seconds your app should be up.

Your will be redirected to the management page. Go ahead and [Connect into your app](/machines/connecting).
