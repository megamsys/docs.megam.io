---
title: Backup Storage
order: 7
requirements:


MegamVertice  provides s3 compatible storage to store backups and provide download and upload access.

---

### Abstract process



step 1: Run minio as service. As per the link (https://github.com/minio/minio/blob/master/README.md)
step 2: After successfully installation minio provide's access key, secret key and end point. These all need for communicating MegamVertice.
step 3: Update MegamVertice site-setting.yaml file to establish the communication.
minio_endpoint: '<access end point>'
minio_region: 'us-east-1'
minio_access_key: '<access key>'
minio_secret_key: '<secret key>'
minio_signature_version: 'v4'
minio_bucket: '<bucket name>'
