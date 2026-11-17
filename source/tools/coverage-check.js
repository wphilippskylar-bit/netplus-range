const {chromium}=require('/home/claude/.npm-global/lib/node_modules/playwright');
const T={
'1.1':'physical;data link;network;transport;session;presentation;application',
'1.2':'virtual appliance;router;switch;firewall;IDS;IPS;load balancer;proxy;NAS;SAN;access point;controller;CDN;VPN;QoS;TTL',
'1.3':'NFV;VPC;network security group;network security list;internet gateway;NAT gateway;VPN;Direct Connect;public;private;hybrid;SaaS;IaaS;PaaS;scalability;elasticity;multitenancy',
'1.4':'FTP;SFTP;SSH;Telnet;SMTP;DNS;DHCP;TFTP;HTTP;NTP;SNMP;LDAP;HTTPS;SMB;Syslog;SMTPS;LDAPS;SQL Server;RDP;SIP;ICMP;TCP;UDP;GRE;IPsec;AH;ESP;IKE;unicast;multicast;anycast;broadcast',
'1.5':'802.11;cellular;satellite;802.3;single-mode;multimode;direct attach;twinax;coax;plenum;transceiver;Ethernet;Fibre Channel;SFP;QSFP;SC;LC;ST;MPO;RJ11;RJ45;F-type;BNC',
'1.6':'mesh;hybrid;star;hub-and-spoke;spine;leaf;point-to-point;three-tier;core;distribution;access;collapsed core;north-south;east-west',
'1.7':'public;private;APIPA;RFC 1918;loopback;subnet;VLSM;CIDR;class a;class b;class c;class d;class e',
'1.8':'SDN;SD-WAN;application aware;zero-touch;transport agnostic;central policy;VXLAN;data center interconnect;layer 2;zero trust;policy-based authentication;authorization;least privilege;SASE;SSE;infrastructure as code;playbook;template;reusable task;drift;compliance;upgrades;dynamic inventor;version control;central repository;conflict;branch;exhaustion;compatibility;tunneling;dual stack;NAT64',
'2.1':'static;dynamic;BGP;EIGRP;OSPF;administrative distance;prefix length;metric;NAT;PAT;FHRP;VIP;subinterface',
'2.2':'VLAN;VLAN database;SVI;native VLAN;voice VLAN;802.1Q;link aggregation;speed;duplex;spanning tree;MTU;jumbo',
'2.3':'channel width;non-overlapping;regulatory;802.11h;2.4 GHz;5 GHz;6 GHz;band steering;SSID;BSSID;ESSID;mesh;ad hoc;point-to-point;infrastructure;WPA2;WPA3;guest;captive portal;PSK;enterprise;omnidirectional;directional;autonomous;lightweight',
'2.4':'IDF;MDF;rack size;port-side exhaust;intake;patch panel;fiber distribution panel;lockable;UPS;PDU;power load;voltage;humidity;fire suppression;temperature',
'3.1':'physical diagram;logical diagram;rack diagram;cable map;L1;L2;L3;asset inventory;hardware;software;licensing;warranty;IPAM;SLA;heat map;survey;end of life;end of support;patch;bug fix;operating system;firmware;decommission;change management;request;tracking;production;backup configuration;golden',
'3.2':'SNMP;trap;MIB;v2c;v3;community string;authentication;flow data;packet capture;baseline;anomaly;log aggregation;syslog collector;SIEM;API;port mirroring;discovery;ad hoc;scheduled;traffic analysis;performance monitoring;availability monitoring;configuration monitoring',
'3.4':'DHCP;reservation;scope;lease time;option;relay;helper;exclusion;SLAAC;DNSSEC;DoH;DoT;AAAA;CNAME;MX;TXT;NS;PTR;forward zone;reverse zone;authoritative;non-authoritative;primary;secondary;recursive;hosts file;NTP;PTP;NTS',
'3.5':'site-to-site;client-to-site;clientless;split tunnel;full tunnel;SSH;GUI;API;console;jump box;in-band;out-of-band',
'3.3':'RPO;RTO;MTTR;MTBF;cold site;warm site;hot site;active-active;active-passive;tabletop;validation test',
'4.1':'data in transit;data at rest;certificate;PKI;self-signed;MFA;SSO;RADIUS;LDAP;SAML;TACACS+;time-based;least privilege;role-based;geofencing;camera;lock;honeypot;honeynet;risk;vulnerability;exploit;threat;CIA;data locality;PCI DSS;GDPR;IoT;IIoT;SCADA;ICS;OT;guest;BYOD',
'4.2':'DoS;DDoS;VLAN hopping;MAC flooding;ARP poisoning;ARP spoofing;DNS poisoning;DNS spoofing;rogue DHCP;rogue AP;evil twin;on-path;phishing;dumpster diving;shoulder surfing;tailgating;malware',
'4.3':'unused ports;unused services;default password;NAC;port security;802.1X;MAC filtering;key management;ACL;URL filtering;content filtering;trusted;untrusted;screened subnet',
'5.1':'gather information;question users;symptoms;changed;duplicate the problem;multiple problems individually;question the obvious;top-to-bottom;bottom-to-top;divide and conquer;new theory;escalate;plan of action;potential effects;verify full system functionality;preventive measures;document findings;lessons learned',
'5.2':'incorrect cable;single-mode;multimode;cat 5;cat 6;cat 7;cat 8;STP;UTP;crosstalk;interference;attenuation;improper termination;TX/RX;CRC;runts;giants;drops;error-disabled;administratively down;suspended;power budget;incorrect standard;mismatch;signal strength',
'5.3':'loop;root bridge;port roles;port states;incorrect VLAN;ACL;route selection;routing table;default route;pool exhaustion;incorrect default gateway;incorrect IP address;duplicate IP;subnet mask',
'5.4':'congestion;contention;bottleneck;bandwidth;throughput;capacity;latency;packet loss;jitter;interference;channel overlap;signal degradation;insufficient coverage;disassociation;roaming misconfiguration',
'5.5':'protocol analyzer;ping;traceroute;tracert;nslookup;tcpdump;dig;netstat;ipconfig;ifconfig;arp;nmap;LLDP;CDP;speed tester;toner;cable tester;tap;Wi-Fi analyzer;visual fault locator;show mac address-table;show ip route;show interfaces;show running-config;show arp;show vlan;show power'
};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});const p=await b.newPage();
await p.goto('file://'+require('path').resolve(__dirname,'../../index.html')+'');await p.waitForTimeout(1000);
const r=await p.evaluate(T=>{const out=[];const norm=s=>String(s).replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/g,' ').toLowerCase().replace(/[‑–—]/g,'-').replace(/\s+/g,' ');
Object.keys(T).forEach(id=>{const s=COURSE.stages.find(x=>x.obj===id);const text=norm(s.parts.map(p=>p.h+' '+p.html).join(' ')+' '+(s.wrap.recap||[]).join(' '));
const miss=T[id].split(';').filter(t=>{const k=t.toLowerCase();return text.indexOf(k)<0&&text.indexOf(k.replace(/-/g,' '))<0&&text.indexOf(k.replace(/ /g,'-'))<0});if(miss.length)out.push(id+': '+miss.join(' | '))});return out},T);
console.log(r.join('\n')||'all covered');await b.close();})();
