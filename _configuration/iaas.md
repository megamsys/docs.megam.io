---
title: IaaS
order: 2
requirements:
  build: vertice
  plan: free
---

In order to faciliate to use our products the following information is useful:

The following IaaS provider is supported.

1. OpenNebula

Configure region, cluster, network  and VCPU here.

Go to

```bash

$ cd /var/lib/megam

```

Configure */var/lib/megam/vertice/vertice.conf*
{: .info}

~~~yaml

  ###
  ### [deployd]
  ###
  ### Controls how the deployer endpoints are configured. These are the primary mechanism to
  ### deploy on the cloud. The default option is to support opennebula.
  ###

  [deployd]
    provider = "one"

      [deployd.one]
        enabled = true
        vcpu_percentage = "3"

          [[deployd.one.region]]
            one_zone = "chennai"
            one_datastore_id = "100"
            one_endpoint = "http://localhost:2633/RPC2"
            one_user     = "oneadmin"
            one_password = "onepass"
            one_template = "megam"
            vcpu_percentage = "10"

              [[deployd.one.region.cluster]]
                enabled = true
                cluster_id = "101"
                storage_hddtype = "hdd"     # storage type should be hdd/ssd
                vnet_pri_ipv4   = ["ipv4-pri"]
                vnet_pub_ipv4   = ["pub2_ipv4"]
                vnet_pri_ipv6   = ["pri_ipv6"]
                vnet_pub_ipv6   = ["pub_ipv6"]


              [[deployd.one.region.cluster]]
                enabled = false
                cluster_id = "100"
                storage_hddtype = "hdd"     # storage type should be hdd/ssd
                vnet_pri_ipv4   = ["ipv4-pri-a"]
                vnet_pub_ipv4   = ["pub2_ipv4-a"]
                vnet_pri_ipv6   = ["pri_ipv6-a"]
                vnet_pub_ipv6   = ["pub_ipv6-a"]


          [[deployd.one.region]]
            one_zone = "sydney"
            one_endpoint = "http://127.0.0.1:2633/RPC2"
            one_user     = "oneadmin"
            one_password = "onepass"
            one_template = "megam"
            vcpu_percentage = "10"

              [[deployd.one.region.cluster]]
                enabled = false
                cluster_id = "100"
                storage_hddtype = "hdd"     # storage type should be hdd/ssd
                vonecloud = false
                vnet_pri_ipv4   = ["ipv4-pri-b"]
                vnet_pub_ipv4   = ["pub2_ipv4-b"]
                vnet_pri_ipv6   = ["pri_ipv6-b"]
                vnet_pub_ipv6   = ["pub_ipv6-b"]


              [[deployd.one.region.cluster]]
                enabled = false
                cluster_id = "101"
                storage_hddtype = "hdd"     # storage type should be hdd/ssd
                vnet_pri_ipv4   = ["ipv4-pri-c"]
                vnet_pub_ipv4   = ["pub2_ipv4-c"]
                vnet_pri_ipv6   = ["pri_ipv6-c"]
                vnet_pub_ipv6   = ["pub_ipv6-c"]


~~~
