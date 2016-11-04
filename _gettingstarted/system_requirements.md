---
title: System Requirements
order: 1
---

In order to get the most out of a MegamVertice, we recommend you to create a plan with the following features:
  * Performance
  * Scalability
  * High availability

This guide provides comprehensive information in such a way that you can easily architect your deployment and utilize the technologies involved in the management of virtualized resources and their relationship.

# Architecture Overview

We assume that your physical infrastructure adopts a classical cluster-like architecture with a front-end, and a set of hosts where Virtual Machines (VM)/Containers (Docker/OpenVZ) or unikernel will be executed.

![Datacenter architecture view](/img/gettingstarted/vertice_architecture_overview.png){: srcset="/img/gettingstarted/vertice_architecture_overview.png 800w, /img/gettingstarted/vertice_architecture_overview.png 1600w"}
{: .has-screenshot}


## Typical setup:

You need at-least 2 servers to support compute, storage and containers. *Please refer topology section for more details.*

## Hardware Requirements

The basic requirements of structure and type of hardware(a) and operating system(b) for the effective use our product are:

a. Hardware

|                 | CPU (Cores)	| RAM (GB)	| HDD (TB) | SSD    |
|:----------------|:------------|:----------|:---------|:-------|
| Master          | 8/12        |16         |          |240GB > |
| Compute         | 24          |128        | 2 x 1TB >|240GB > |
| Storage         | 8           |16         | 2 x 1TB >|240GB > |
| Slave *optional*| 8/12        |16         |          |160GB   |


b. Operating Systems

Ubuntu 14.04/16.04, Debian 8.5 and *experimental* for CentOS 7.2.

The compute/storage is scalable which means that  you can keep adding on. The storage can be a separate cluster as well.

The compute can be either VMs or Containers(OpenVZ/Docker).

Master is the server where MegamVertice is installed to manage the `compute` and `storage`.

Slave is the fallback node for the Master.

## Topology

The following depicts a 3 Node topology. Additional storage can done in master/slave itself.

The following section details the supported topology models using LVM and Ceph:

### 1. LVM

LVM and its volumes present the approach to build clusters using commodity hardware attached to compute nodes.

![Topology receommended](/img/gettingstarted/vertice_topology_lvm.png){: srcset="/img/gettingstarted/vertice_topology_lvm.png 800w, /img/gettingstarted/vertice_topology_lvm.png 1600w"}
{: .has-screenshot}

Every compute node possesses its own LVM volume.

### 2. Ceph

Ceph paves the way to create Storage area network(SAN) clusters using commodity hardware.

![Topology SAN Like](/img/gettingstarted/vertice_topology_san.png){: srcset="/img/gettingstarted/vertice_topology_san.png 800w, /img/gettingstarted/vertice_topology_san.png 1600w"}
{: .has-screenshot}

In this, any number of disks can be pooled to create a ceph cluster.

In addition two seperate regions (datacenters) can be created with their own ceph cluster (block/object).
