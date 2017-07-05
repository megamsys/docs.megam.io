---
title: Backup Storage
order: 7
requirements:
  build: vertice
  plan: enterprise
---

MegamVertice  provides service to upload and download backup by using s3 compatible storage.

---

# Getting Started

## Installing minio

1. Minio  supports  NFS. Hence we will use our data store mount point eg: **/mnt/S18TB6HDD/virtual**

2.Create the directory like /usr/share/megam/minio

3.Download the minio binary from the [link] (https://github.com/minio/minio/blob/master/README.md) in /usr/share/megam/minio directory

```
$ cd /usr/share/megam/minio

$ wget https://dl.minio.io/server/minio/release/linux-amd64/minio

$ chmod +x minio

```

## Run minio as systemd service

Create the service file in **/etc/systemd/system**  directory file named as **minio.service**

```

$ cd /etc/systemd/system

$ nano minio.service

#copy the below file into minio.service

[Unit]
Description=Minio server.
After=network.target
After=runlevel2.target
After=runlevel3.target
After=runlevel4.target
After=runlevel5.target
[Service]
ExecStart=/usr/share/detio/minio/minio server --address 188.240.231.84:8085 /mnt/S18TB6HDD/virtual KillMode=process

```

## Get admin access and secret key

```

$ journalctl -u minio.service -f


minio.service - Minio server.
   Loaded: loaded (/etc/systemd/system/minio.service; static; vendor preset: enabled)
   Active: active (running) since Wed 2017-07-05 08:42:19 EEST; 2min 14s ago
 Main PID: 5387 (minio)
   CGroup: /system.slice/minio.service
           └─5387 /usr/share/detio/minio/minio server --address 127.0.0.1:8085 /mnt/S18TB6HDD/virtual

Jul 05 08:42:20 cloud4 minio[5387]: Browser Access:
Jul 05 08:42:20 cloud4 minio[5387]:    http://127.0.0.1:8085
Jul 05 08:42:20 cloud4 minio[5387]: Command-line Access: https://docs.minio.io/docs/minio-client-quickstart-guide
Jul 05 08:42:20 cloud4 minio[5387]:    $ mc config host add myminio http://127.0.0.1:8085 6YSBQTQHF3HP52062XY5 4h5opVTnxqS5JJ4upiMbhqbgeRvBcCow/0qZPe

```

From the URL `http://127.0.0.1:8085 6YSBQTQHF3HP52062XY5 4h5opVTnxqS5JJ4upiMbhqbgeRvBcCow/0qZPe`

* Access key = 6YSBQTQHF3HP52062XY5
* Secret key = 4h5opVTnxqS5JJ4upiMbhqbgeRvBcCow/0qZPe

## Update Nilavu with minio credentials

```
$ cd /var/lib/megam

$ nano site_settings.yml

# Update the following site setting keys
 minio_endpoint: 'http://127.0.0.1:8085'
 minio_region: 'us-east-1'
 minio_access_key: '6YSBQTQHF3HP52062XY5'
 minio_secret_key: '4h5opVTnxqS5JJ4upiMbhqbgeRvBcCow/0qZPe'
 minio_signature_version: 'v4'
 minio_bucket: 'virtual'

 ```

* The minio_bucket name will be the last directory in **/mnt/S18TB6HDD/virtual**.
In our case its *virtual*

## Proxy minio using nginx

Copy the below file into **/etc/nginx/sites-available**


 ```
$ systemctl daemon-reload

$ systemctl stop nginx

$ systemctl start nginx

 ```

 ## Restart Nilavu

```
$ systemctl stop verticenilavu

$ systemctl start verticenilavu

```
