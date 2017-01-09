---
title: Vertice
order: 1
requirements:
  build: vertice
  plan: free
---

In order to faciliate to use our products the following informations are useful:

1. When you are using a single server for effecting all operations the  default configuration suffices.

2. When you are in a position to use separate servers to run MegamVertice or encounter failures while running, the following configurations are to be changed.

The following are the main components which are to be changed:

- *Console (UI - Nilavu)*
- *API - gateway*
- *Omni scheduler - vertice*

### Changing components

The main options to change are in the following files:

1. Change details for the UI               */var/lib/megam/nilavu.conf*
2. Change SSL certificate to enable HTTPS  */etc/nginx/sites-available/default*
3. Change details for the API              */var/lib/megam/verticegateway/gateway.conf*
4. Change details for the Omni scheduler   */var/lib/megam/vertice/vertice.conf*

Go to

```bash

$ cd /var/lib/megam

```

Configure */var/lib/megam/nilavu.conf*
{: .info}

*/var/lib/megam/site_settings.yaml* file is self explanatory, tweak as you wish.

*/var/lib/megam/nilavu.conf*

~~~yaml

## api host that the UI will connect to

http_api = http://localhost:9000/v2

## log streamer that the UI will connect to.
## we need to turn on https, in such case replace it as wss

log_server = ws://localhost:7777/logs

### vnc server that the UI will connect to.
## we need to turn on https, in such case replace it as wss

vnc_server = ws://localhost:8000

## we need to turn on https, in such case replace it as https
google_js_uri = http://www.google.com/jsapi?ext.js

~~~

Configure */etc/nginx/sites-available/default*
{: .info}

~~~yaml

## change server_name to point your server_name
server_name _;

~~~


Enable *HTTPS in Vertice*
{: .info}

##uncomment SSL certificate to point your own SSL certificate
  ssl_certificate /etc/nginx/certs/cloud.atomdeploy.com.cer;
  ssl_certificate_key /etc/nginx/private/cloud.atomdeploy.com.key;

~~~

Configure */var/lib/megam/verticegateway/gateway.conf*
{: .info}


~~~yaml

# We use  cassandra as the db layer
# ~~~~~

# Cassandra
# ~~~~~~~~~
cassandra.host = "localhost"
cassandra.keyspace = "vertice"
# DON'T Change these
cassandra.username = "vertadmin"
cassandra.password = "vertadmin"
cassandra.use_ssl = false

~~~

~~~yaml

# We use NSQ as the messaging layer
# ~~~~~
nsq.url="http://localhost:4151"

# Don't change the nsq.topic names.
nsq.topic.vms="vms"
nsq.topic.containers="containers"

# send messages to NSQ.
nsq.events.muted = false

# don't send events to NSQ if the email id is tour@megam.io
nsq.events.muted_emails = ["tour@megam.io"]

~~~

Import *Vertice Keyspace in Cassandra*
{: .info}

Update the keyspace in Cassandra

To do this, download  the following cql files:

~~~bash

wget -O base.cql https://raw.githubusercontent.com/megamsys/verticegateway/1.5/db/base.cql
wget -O upgrade.cql https://raw.githubusercontent.com/megamsys/verticegateway/1.5/db/1.5.cql
wget -O enterprise.cql https://raw.githubusercontent.com/megamsys/verticegateway/1.5/db/ee.cql

~~~

~~~bash

Update base.cql file in cassandra. Change localhost to your private_ip

 cqlsh localhost -f base.cql

~~~

Enable *password-auth in cassandra*
{: .info}

Open the file */etc/cassandra/cassandra.yaml* in your favourite EDITOR.

Lets use *nano*

~~~bash

$ nano  /etc/cassandra/cassandra.yaml

~~~

- Change authenticator  “AllowAllAuthenticator” to “PasswordAuthenticator”.

- Change authorizer “AllowAllAuthorizer” to “CassandraAuthorizer”

~~~yaml

  # - AllowAllAuthenticator performs no checks - set it to disable authentication.
  # - PasswordAuthenticator relies on username/password pairs to authenticate
  #   users. It keeps usernames and hashed passwords in system_auth.credentials table.
  #   Please increase system_auth keyspace replication factor if you use this authenticator.
  #   If using PasswordAuthenticator, CassandraRoleManager must also be used (see below)
  authenticator: PasswordAuthenticator

  # - AllowAllAuthorizer allows any action to any user - set it to disable authorization.
  # - CassandraAuthorizer stores permissions in system_auth.permissions table. Please
  #   increase system_auth keyspace replication factor if you use this authorizer.
  authorizer: CassandraAuthorizer

~~~


Restart the cassandra (in all operating systems)

~~~bash

$ service cassandra restart

~~~

~~~bash

Upgrade the cql file using cassandra username and password. change localhost to your private_ip

cqlsh localhost -u vertadmin -p vertadmin -f upgrade.cql

cqlsh localhost -u vertadmin -p vertadmin -f enterprise.cql

~~~


Configure */var/lib/megam/vertice/vertice.conf*
{: .info}


~~~yaml

### Welcome to the vertice configuration file.
###
### [meta]
###
### Controls how vertice connects to scylla, nsq

  [meta]
    api = "https://localhost:9000/v2"
    nsqd = ["localhost:4150"]
    scylla = ["localhost"]
    scylla_keyspace = "vertice"
    scylla_username = "vertadmin"
    scylla_password = "vertadmin"

~~~
