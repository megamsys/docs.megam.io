---
title: Regions
order: 3
requirements:
  build: vertice
  plan: free
---

Configure */var/lib/megam/regions.yml* to modify the regions to allow an user to choose the region in our product Console (UI - nilavu)

---

~~~yaml

regions:
# The name of the region to launch
  Sydney:
# The flag of the region launched
    flag: '../../images/regions/au.png'
# The billable currency of the region
    currency: '&#128;'
# The cost of the cpu per hour in the billable currency
    cpu_cost_per_hour: '0.01'
# The cost of the ram per hour in the billable currency
    ram_cost_per_hour: '0.02'
# The cost of the storage per hour in the billable currency
    storage_cost_per_hour: '0.01'
# The maximum cpu the region has.
    max_cpu: '10'
# The maximum ram the region has.
    max_ram: '256 GB'
# The maximum storage the region has.
    max_storage: '500 GB'
# The available ip options for the region.
    private_ipv4: true
    public_ipv4: false
    private_ipv6: false
    public_ipv6: false
# Minimum 3 flavors are needed.
    flavors:
# The different types of launch options a customer can choose
    s1.micro: '1 GB,1 Core,24 GB,2 TB,10'
    s1.small: '2 GB,2 Cores,48 GB,4 TB,20'
    s1.medium: '3 GB,4 Cores,96 GB,6 TB,40'

~~~

Multi region support and advanced scaling is available in the enterprise plan
