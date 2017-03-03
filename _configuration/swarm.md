---
title: Swarm
order: 4
requirements:
  build: Jekyll
  plan: Enterprise
  hosting: Any
---

The default configuration assumes that you are running `Swarm Master` in the same server.

![Docker swarm cluster](/img/configuration/docker_clusters.png){: srcset="/img/configuration/docker_clusters.png 800w, /img/configuration/docker_clusters.png 1600w"}
{: .has-screenshot}

The options like networking, regions shall be changed here.

Go to

```bash

$ cd /var/lib/megam

```

Lets configure */var/lib/megam/vertice/vertice.conf*
{: .info}

~~~yaml

###
### [docker]
###
### controls one or many swarm masters for docker containers
###

 [docker]
  provider = "docker"

    # We have two swarm clusters
    [docker.docker]
        enabled = true
        [[docker.docker.region]]
          docker_zone = "Chennai"
          swarm = "tcp://localhost:2375" # Point your swarm ipaddress.
          memory_unit  = "1024"  # basic unit to measure metrics (2048/memory_unit * memory_cost )
          cpu_unit     = "1"
          disk_unit    = "1024"

        [[docker.docker.region]]
          docker_zone = "Sydney"
          swarm = "tcp://localhost:2375"
          memory_unit  = "1024"  # basic unit to measure metrics (2048/memory_unit * memory_cost )
          cpu_unit     = "1"
          disk_unit    = "1024"

~~~
