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

[https://github.com/verticeapps/java_petclinic.git](https://github.com/verticeapps/java_petclinic.git){: target="_blank"}

[https://github.com/verticeapps/java_springwebflow.git](https://github.com/verticeapps/java_springwebflow.git){: target="_blank"}

[https://github.com/verticeapps/java_openmrs.git](https://github.com/verticeapps/java_openmrs.git){: target="_blank"}


### I have a Github id.

Choose your Github repository.

### Adding a Procfile. *optional*

The *Procfile*  is a mechanism for declaring what commands are run by your application that is used to install additional build steps in the launched application that is deemed fit for your launched app.

Procfile is used to maintain a start your application.

For your convenience the sample public repos has baked in Procfile as needed.

The *Procfile*  resides under the parent root directory.

Now that you have chosen the git repo, [Go to step3 to launch](/customapps/deploying).

For example,The Procfile is added in [verticeapps/java_petclinic](https://github.com/verticeapps/java_petclinic.git){: target="_blank"}

```

  web: sh -c 'systemctl start tomcat'


```
This Procfile content is same for all java application.

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
