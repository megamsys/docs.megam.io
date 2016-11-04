---
title: Java
order: 2
---


These steps are in continiuation from step2 in the section [deploying](/customapps/deploying).

---

## Step2 continued...

There are 2 ways to launch.

1. *Using a Public Repo URL*
2. *I have a Github account*

### Using a Public Repo URL

If you don't have an id, then type these `Public repo url` in the text box.

[https://github.com/verticeapps/java_jenkins.git](https:/github.com/verticeapps/java_jenkins.git){: target="_blank"}

[https://github.com/verticeapps/java_springwebflow.git](https://github.com/verticeapps/java_springwebflow.git){: target="_blank"}

[https://github.com/verticeapps/java_openmrs.git](https://github.com/verticeapps/java_openmrs.git){: target="_blank"}


### I have a Github id.

Choose your Github repository.

### Adding a build script. *optional*

The *build script* is used to install additional dependencies in the launched application which can contain shell scripts.

For your convenience the sample public repos has baked in build scripts as needed.

The build script needs to be named as *build* and shall reside under the parent root directory.

Now that you have chosen the git repo, [Go to step3 to launch](/customapps/deploying).

### Working with Java App code *optional*

To make changes in the code [verticeapps/java_springwebflow](https://github.com/verticeapps/java_springwebflow.git){: target="_blank"} ensure that
you have the build tools like **git**, **maven**, or **gradle** installed.

```
 cd java_springwebflow

 mvn install

```

### Push your changes to Github *optional*

Once you are done testing the changes, push the changes to Github.

```shell

cd java_springwebflow

git push master
Username for 'https://github.com': verticeuser
Password for 'https://verticeuser@github.com':
To https://github.com/verticeapps/java_springwebflow
1d26d24..5cabacb  master -> master

```
