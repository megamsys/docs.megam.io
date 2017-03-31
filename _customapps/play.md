---
title: Play
order: 5
---

These steps are in continiuation from step2 in the section [deploying](/customapps/deploying).

---

## Step2 continued...

There are 2 ways to launch.

1. *Using a Public Repo URL*
2. *I have a Github account*

### Using a Public Repo URL

If you don't have an id, then type these `Public repo url` in the text box.

[https://github.com/verticeapps/scala_fiddle](https://github.com/verticeapps/scala_fiddle.git){: target="_blank"}

[https://github.com/verticeapps/play-scala-fileupload-example](https://github.com/verticeapps/play-scala-fileupload-example.git){: target="_blank"}

[https://github.com/verticeapps/play-scala-rest-api-example](https://github.com/verticeapps/play-scala-rest-api-example.git){: target="_blank"}


### I have a Github id.

Choose your Github repository.

### Adding a Procfile. *optional*

The *Procfile*  is a mechanism for declaring what commands are run by your application that is used to install additional build steps in the launched application that is deemed fit for your launched app.

Procfile is used to maintain a start your application.

For your convenience the sample public repos has baked in Procfile as needed.

The *Procfile*  resides under the parent root directory.

Now that you have chosen the git repo, [Go to step3 to launch](/customapps/deploying).

For example,The Procfile is added in [verticeapps/scala_fiddle.git](https://github.com/verticeapps/scala_fiddle.git){: target="_blank"}

```

  web: sh server/target/universal/stage/bin/server -Dplay.crypto.secret="QCY?tAnfk?aZ?iwrNwnxIlR6CTf:G3gf:90Latabg@5241ABR5W:1uDFN];Ik@n"


```

The Procfile is added in [verticeapps/play-scala-fileupload-example.git](https://github.com/verticeapps/play-scala-fileupload-example.git){: target="_blank"}

```

web: sh target/universal/stage/bin/fileupload -Dplay.crypto.secret="QCY?tAnfk?aZ?iwrNwnxIlR6CTf:G3gf:90Latabg@5241ABR5W:1uDFN];Ik@n"

```
In all the play application to be start correctly  must give that *-Dplay.crypto.secret= * argument.

### Working with Play App code *optional*

To make changes in the code [verticeapps/scala_fiddle.git](https://github.com/verticeapps/scala_fiddle.git){: target="_blank"} ensure that you have the build tools like **git**, **sbt** installed.

```

 cd scala_fiddle

```

### Push your changes to Github *optional*

Once you are done testing the changes, push the changes to Github.


```shell

cd scala_fiddle

git push master
Username for 'https://github.com': verticeuser
Password for 'verticeuser@github.com':
To https://github.com/verticeapps/scala_fiddle.git
1d26d24..5cabacb  master -> master

```
