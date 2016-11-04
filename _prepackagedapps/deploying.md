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


We support multiple providers who can provided curated prepackaged apps for the popular open source software like `WordPress`, `OwnCloud`.

The following provers are supported now.

- Vertice
- Bitnami

Prepackaged apps might overlap, which mean both `Vertice  & Bitnami` may have `WordPress`.

### Watch this animation

![Launching App - Bitnami](/img/prepackaged/bitnami.gif){: srcset="/img/prepackaged/bitnami.gif 800w, /img/prepackaged/bitnami.gif 1600w"}

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

1. Start type the letters you wish search. eg: `Word`

2. When 4 (four) or more characters are seen, a search is done.

3. We now return `WordPress`, Click Next.

#### Step 3

- Choose SSH Key (or) Root password option.

*SSH Key*

- Create a new sshkey pair
- Use an existing sshkey pair
- Upload your own sshkey pair

*Root password*

- Type a password for accessing the *root* username for the deployed app.


#### Launch your Machine

Click Launch. Voila ! Your App is launched.

Watch the deploy events live and in 30seconds your app should be up.

Your will be redirected to the management page. Go ahead and [Connect into your app](/machines/connecting).
