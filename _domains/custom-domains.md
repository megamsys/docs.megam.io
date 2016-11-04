---
title: Custom Domains
order: 1
requirements:
  build: vertice
  plan: free  
---

Give your apps launched with your unique domain name.

To add a custom domain:

---

### Purchase a domain

from a domain registrar (e.g.  [iwantmyname](https://iwantmyname.com/))

### Configure your domain

Configuration instructions are shown after adding a domain. There are two choices:

* Route53 DNS (recommended)
* MegamVertice DNS (coming soon)

### Route53 DNS

To configure your domain with *MegamVertice*:

1. Ensure you are using *Route53 DNS*, otherwise [click here](https://aws.amazon.com/route53/)
2. Go to your domain registrar's *DNS Server Settings* or *Nameservers*
3. Type the nameservers *Route53 DNS* in domain registrar's *DNS Server Settings* or *Nameservers*
4. Save the changes

### Configure API - gateway

Go to

```bash

$ cd /var/lib/megam

```

Configure */var/lib/megam/verticegateway/gateway.conf*
{: .info}


~~~yaml

## organization/domain registered
################################
org    = "megamdev"
domain = "megambox.com"

~~~

### Configure Omni scheduler - vertice

Configure */var/lib/megam/vertice/vertice.conf*
{: .info}


~~~yaml

  ####
  ### [dns]
  ###
  ### Controls how the dns endpoints are configured.
  ### The default dns supported is Route53.
  ###

  [dns]
    enabled = true
    access_key = "aws_access_key"
    secret_key = "aws_secret_key"

~~~

Restart `verticegateway` and `vertice`.
