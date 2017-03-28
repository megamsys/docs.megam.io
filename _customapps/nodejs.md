---
title: Node.js
order: 3
---

These steps are in continiuation from step2 in the section [deploying](/customapps/deploying).

---

## Step2 continued...

There are 2 ways to launch.

1. *Using a Public Repo URL*
2. *I have a Github account*

### Using a Public Repo URL

If you don't have an id, then type these `Public repo url` in the text box.

[https://github.com/verticeapps/node_etherpad](https://github.com/verticeapps/node_etherpad.git){: target="_blank"}

[https://github.com/verticeapps/travis-web](https://github.com/verticeapps/travis-web.git){: target="_blank"}

[https://github.com/verticeapps/ghost](https://github.com/verticeapps/ghost.git){: target="_blank"}


### I have a Github id.

Choose your Github repository.

### Adding a Procfile. *optional*

The *Procfile*  is a mechanism for declaring what commands are run by your application that is used to install additional build steps in the launched application that is deemed fit for your launched app.

Procfile is used to maintain a start your application.

For your convenience the sample public repos has baked in Procfile as needed.

The *Procfile*  resides under the parent root directory.

Now that you have chosen the git repo, [Go to step3 to launch](/customapps/deploying).

For example,The Procfile is added in [verticeapps/etherpad-lite](https://github.com/verticeapps/etherpad-lite.git){: target="_blank"}

```

  web: sh bin/run.sh --root


```

The Procfile is added in [verticeapps/node_hexo](https://github.com/verticeapps/node_hexo.git){: target="_blank"}

```

web: sh -c 'cd bin ; ./hexo init blog ; cd blog ; npm install ; ../hexo server'

```

The Procfile is added in [verticeapps/node_c9](https://github.com/verticeapps/node_c9.git){: target="_blank"}

```

web: sh -c 'scripts/install-sdk.sh ; node server.js --listen 0.0.0.0 -a vmusername:vmpassword --port 8181'

```

### Working with Node App code *optional*

To make changes in the code [verticeapps/etherpad-lite](https://github.com/verticeapps/etherpad-lite.git){: target="_blank"} ensure that you have the build tools like **git**, **npm**, and **node** installed.

```

 cd etherpad-lite

 npm install

```

### Push your changes to Github *optional*

Once you are done testing the changes, push the changes to Github.


```shell

cd etherpad-lite

git push master
Username for 'https://github.com': verticeuser
Password for 'verticeuser@github.com':
To https://github.com/verticeapps/etherpad-lite.git
1d26d24..5cabacb  master -> master

```
