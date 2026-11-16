/* Domain 4.0 Network Security — objectives 4.1 to 4.3 */
(function () {
  var N = window.N9, P = N.P, M = N.M, O = N.O;

  // ===================== 4.1 Security concepts =====================
  M('n9-terms', 'Security vocabulary', 'CIA, risk, threat, vulnerability, exploit',
    'Pick the term for each description.', ['Confidentiality', 'Integrity', 'Availability', 'Vulnerability', 'Threat', 'Exploit', 'Risk'],
    [['Only authorized people can read the payroll file', 'Confidentiality', 'Encryption, access control.'],
     ['A hash proves the firmware file was not altered', 'Integrity', 'Hashes, signatures.'],
     ['Redundant links keep the website up during a DDoS', 'Availability', 'Uptime.'],
     ['An unpatched SSH service on the edge router', 'Vulnerability', 'A weakness.'],
     ['A criminal group that targets companies in your industry', 'Threat', 'Something that could cause harm.'],
     ['The code or technique that takes advantage of the weakness', 'Exploit', 'Uses the vulnerability.'],
     ['Likelihood × impact of a threat using a vulnerability', 'Risk', 'What you actually manage.']],
    'Threat + vulnerability = risk. You reduce risk by removing vulnerabilities or adding controls.');
  M('n9-aaa', 'Identity and access', 'MFA, SSO, RADIUS, TACACS+, LDAP, SAML, RBAC',
    'Pick the best fit.', ['MFA', 'SSO', 'RADIUS', 'TACACS+', 'LDAP', 'SAML', 'RBAC', 'Least privilege'],
    [['Password plus a code from an authenticator app', 'MFA', 'Two different factor types.'],
     ['Log in once and reach email, HR and CRM without logging in again', 'SSO', 'Single sign-on.'],
     ['Authenticates Wi-Fi 802.1X users; UDP; encrypts only the password', 'RADIUS', 'Network access AAA.'],
     ['Cisco device-admin AAA on TCP 49 that encrypts the whole payload and authorizes each command', 'TACACS+', 'Device administration.'],
     ['Directory protocol for looking up users and groups (Active Directory)', 'LDAP', 'TCP 389 / 636.'],
     ['XML-based exchange of identity assertions for web SSO with cloud apps', 'SAML', 'Identity provider ↔ service provider.'],
     ['Help desk staff get rights by job role, not individually', 'RBAC', 'Role-based access control.'],
     ['An intern gets read access to one share only', 'Least privilege', 'Minimum access needed.']],
    'RADIUS for network access (Wi-Fi, VPN). TACACS+ for device admin. SAML for cloud SSO. LDAP for the directory.');
  M('n9-seg', 'Compliance and segmentation', 'PCI DSS, GDPR, IoT, OT, BYOD',
    'Pick the best fit.', ['PCI DSS', 'GDPR', 'Data locality', 'Segment IoT devices', 'Segment OT/ICS/SCADA', 'Guest network', 'BYOD segment', 'Honeypot'],
    [['Store that processes credit cards must isolate cardholder systems', 'PCI DSS', 'Payment card industry standard.'],
     ['Company handles personal data of people in the EU', 'GDPR', 'EU privacy regulation.'],
     ['Data about German citizens must be stored in Germany', 'Data locality', 'Where data may physically live.'],
     ['Smart TVs and cameras with weak firmware', 'Segment IoT devices', 'Keep them off the corporate VLAN.'],
     ['Factory PLCs controlling physical machines', 'Segment OT/ICS/SCADA', 'Safety-critical, hard to patch.'],
     ['Visitors who need Internet only', 'Guest network', 'Isolated, captive portal.'],
     ['Employees\' personal phones accessing email', 'BYOD segment', 'Limited, policy-controlled access.'],
     ['Fake server that exists only to attract and study attackers', 'Honeypot', 'Deception technology.']],
    'Segmentation enforcement limits blast radius: a hacked camera should never be able to reach the payroll server.');

  N.add({ id: '4.1', dom: 4, short: 'Basic network security concepts', title: 'Explain the importance of basic network security concepts',
    goal: 'CIA triad and risk terms, encryption and PKI, IAM (MFA, SSO, RADIUS, TACACS+, LDAP, SAML, RBAC), geofencing, physical security, deception, compliance and segmentation.',
    parts: [
      P('CIA triad and risk terminology', 'Define confidentiality, integrity, availability, and risk, threat, vulnerability and exploit.',
        `<p><b>CIA triad</b> — the three goals of security:</p>
<ul><li><b>Confidentiality</b> — only authorized people see data (encryption, access control).</li>
<li><b>Integrity</b> — data isn't altered without detection (hashing, digital signatures).</li>
<li><b>Availability</b> — systems are up when needed (redundancy, DDoS protection, backups).</li></ul>
<p><b>Terms the exam mixes up:</b></p>
<ul><li><b>Vulnerability</b> — a weakness (unpatched software, default password, open port).</li>
<li><b>Threat</b> — anything that could exploit a weakness (attacker, malware, flood, insider).</li>
<li><b>Exploit</b> — the actual method/code used to take advantage of a vulnerability.</li>
<li><b>Risk</b> — the likelihood a threat exploits a vulnerability × the impact if it does.</li></ul>`,
        [['A hash is used to detect tampering with a file. Which CIA goal?', 'Integrity', ['Confidentiality', 'Availability', 'Non-repudiation only'], 'Hashes prove data is unchanged.'],
         ['A default admin password on a switch is best described as a:', 'Vulnerability', ['Threat', 'Exploit', 'Risk'], 'It is a weakness.']],
        'n9-terms'),
      P('Encryption, certificates and PKI', 'Explain data in transit vs at rest, PKI, certificates and self-signed certificates.',
        `<ul><li><b>Data in transit</b> — moving across a network. Protect with TLS (HTTPS), SSH, IPsec, WPA3.</li>
<li><b>Data at rest</b> — stored on disks, databases, backups. Protect with full-disk or database encryption (e.g. AES-256).</li>
<li><b>Symmetric</b> encryption — one shared key, fast (AES). <b>Asymmetric</b> — public/private key pair (RSA, ECC), used to exchange keys and sign.</li></ul>
<p><b>PKI</b> (public key infrastructure) — the system that issues and trusts certificates:</p>
<ul><li>A <b>certificate</b> binds a public key to an identity (a website, a user) and is signed by a <b>certificate authority (CA)</b>.</li>
<li>Browsers trust a certificate if it chains to a root CA they trust, the name matches and it hasn't expired or been revoked.</li>
<li><b>Self-signed</b> certificates are signed by their own key — fine for labs and internal devices, but browsers show a warning because no trusted CA vouches for them.</li></ul>`,
        [['Encrypting a laptop\'s drive protects which kind of data?', 'Data at rest', ['Data in transit', 'Data in use only', 'Metadata only'], 'Stored data.'],
         ['Why does a browser warn about a self-signed certificate?', 'No trusted CA vouches for it', ['It uses no encryption', 'It is expired by definition', 'It uses UDP'], 'Trust comes from the CA chain.']]),
      P('Identity and access management (IAM)', 'Choose MFA, SSO, RADIUS, TACACS+, LDAP, SAML, RBAC and least privilege.',
        `<p><b>Authentication</b> = proving who you are. <b>Authorization</b> = what you may do. <b>Accounting</b> = logging what you did (AAA).</p>
<ul><li><b>MFA</b> — two or more <i>different</i> factors: something you know, have, are (plus somewhere you are). <b>Time-based</b> one-time passwords (TOTP) change every 30 s.</li>
<li><b>SSO</b> — authenticate once, access many apps.</li>
<li><b>RADIUS</b> — AAA for <b>network access</b> (802.1X Wi-Fi, VPN). UDP 1812/1813; encrypts only the password.</li>
<li><b>TACACS+</b> — Cisco AAA for <b>device administration</b>. TCP 49; encrypts the entire payload; per-command authorization.</li>
<li><b>LDAP</b> — query a directory (Active Directory). 389; LDAPS 636.</li>
<li><b>SAML</b> — XML assertions passing identity from an identity provider to cloud/web apps (web SSO).</li>
<li><b>Least privilege</b> — minimum rights needed. <b>RBAC</b> — rights assigned to roles; users get roles.</li></ul>`,
        [['Which AAA protocol encrypts the entire payload and supports per-command authorization?', 'TACACS+', ['RADIUS', 'LDAP', 'SAML'], 'TCP 49, device admin.'],
         ['A password plus a fingerprint is an example of:', 'MFA', ['SSO', 'RBAC', 'SAML'], 'Know + are.']],
        'n9-aaa'),
      P('Geofencing, physical security and deception', 'Explain geofencing, physical controls, and honeypots/honeynets.',
        `<ul><li><b>Geofencing</b> — allow or deny access based on location (GPS for mobile devices, IP geolocation for logins). Example: block admin logins from outside the country; disable a tablet's camera inside the secure lab.</li>
<li><b>Physical security</b>:
<ul><li><b>Cameras</b> — deter and record (detective control).</li>
<li><b>Locks</b> — doors, racks, cabinets; badge readers that log entry; access control vestibules (mantraps) to stop tailgating.</li></ul></li>
<li><b>Deception technologies</b>:
<ul><li><b>Honeypot</b> — a fake system that looks valuable. Any connection to it is suspicious; it wastes attacker time and reveals their tools.</li>
<li><b>Honeynet</b> — a whole fake network of honeypots.</li></ul></li></ul>
<p>Physical access defeats most network controls — an attacker with a console cable and time owns the switch.</p>`,
        [['Blocking VPN logins that originate from outside the country is an example of:', 'Geofencing', ['Port security', 'Honeypot', 'RBAC'], 'Location-based policy.'],
         ['A decoy server set up to attract and study attackers is a:', 'Honeypot', ['Jump box', 'Proxy', 'Bastion host'], 'Deception technology.']]),
      P('Compliance and network segmentation', 'Apply PCI DSS, GDPR and data locality, and segment IoT, OT, guest and BYOD devices.',
        `<p><b>Audits and regulatory compliance</b>:</p>
<ul><li><b>PCI DSS</b> — rules for anyone handling payment cards: segment the cardholder data environment, encrypt card data, log access, scan regularly.</li>
<li><b>GDPR</b> — EU privacy law for personal data of people in the EU: consent, breach notification, right to erasure.</li>
<li><b>Data locality</b> — laws that require certain data to stay in a specific country/region (matters for cloud region choice).</li></ul>
<p><b>Segmentation enforcement</b> — put risky or sensitive device groups in their own VLANs/subnets with firewall rules between them:</p>
<ul><li><b>IoT / IIoT</b> — cameras, sensors, smart TVs: weak firmware, rarely patched.</li>
<li><b>SCADA / ICS / OT</b> — systems that control physical processes (factories, utilities). Safety-critical; often old and unpatchable — isolate tightly.</li>
<li><b>Guest</b> — Internet only. <b>BYOD</b> — personal devices with limited access.</li></ul>`,
        [['Which standard applies to a store that processes credit cards?', 'PCI DSS', ['GDPR', 'HIPAA', 'SOX'], 'Payment card industry.'],
         ['Why isolate SCADA/ICS networks?', 'They control physical processes and are often hard to patch', ['They need more bandwidth', 'They use IPv6 only', 'They cannot use VLANs'], 'Safety and old software.']],
        'n9-seg')
    ],
    wrap: { recap: ['CIA: confidentiality, integrity, availability.', 'Vulnerability = weakness; threat = possible harm; exploit = method; risk = likelihood × impact.', 'Encrypt in transit (TLS, SSH, IPsec) and at rest (AES). PKI: CA-signed certs; self-signed = untrusted warning.', 'MFA, SSO, RADIUS (network access, UDP), TACACS+ (device admin, TCP 49), LDAP, SAML, RBAC, least privilege.', 'Geofencing, cameras and locks, honeypots/honeynets.', 'PCI DSS, GDPR, data locality. Segment IoT/IIoT, SCADA/ICS/OT, guest and BYOD.'], lab: 'n9-seg' }
  });

  // ===================== 4.2 Attacks =====================
  M('n9-l2atk', 'Name the attack: LAN', 'Layer 2 and address attacks',
    'Pick the attack described.', ['VLAN hopping', 'MAC flooding', 'ARP poisoning', 'DNS poisoning', 'Rogue DHCP server', 'DDoS'],
    [['Attacker sends frames with two 802.1Q tags to reach another VLAN', 'VLAN hopping', 'Double tagging (native VLAN abuse).'],
     ['Attacker negotiates a trunk with a switch port to see all VLANs', 'VLAN hopping', 'Switch spoofing (DTP).'],
     ['Thousands of fake source MACs fill the CAM table so the switch floods everything', 'MAC flooding', 'Switch acts like a hub.'],
     ['Attacker tells hosts "the gateway\'s IP is at MY MAC"', 'ARP poisoning', 'On-path on the LAN.'],
     ['A resolver caches a forged answer sending bank.com to the attacker', 'DNS poisoning', 'Cache poisoning.'],
     ['A device on the LAN hands out leases with the attacker as the default gateway', 'Rogue DHCP server', 'Defense: DHCP snooping.'],
     ['Thousands of compromised devices flood a website', 'DDoS', 'Distributed denial of service.']],
    'Defenses: native VLAN unused + no auto-trunking (VLAN hopping), port security (MAC flooding), DAI (ARP), DNSSEC (DNS), DHCP snooping (rogue DHCP).');
  M('n9-se', 'People and malware', 'Social engineering and malware',
    'Pick the attack described.', ['Phishing', 'Shoulder surfing', 'Tailgating', 'Dumpster diving', 'Evil twin', 'Rogue AP', 'Malware'],
    [['Email pretending to be IT asks users to "verify" their password', 'Phishing', 'Most common.'],
     ['Someone watches a user type a PIN at the badge reader', 'Shoulder surfing', 'Observation.'],
     ['Stranger follows an employee through a secure door', 'Tailgating', 'Defense: access control vestibule.'],
     ['Attacker finds network diagrams in the recycling bin', 'Dumpster diving', 'Shred documents.'],
     ['Fake AP broadcasting the real company SSID to capture logins', 'Evil twin', 'Looks legitimate.'],
     ['Employee plugs an unauthorized consumer AP into a wall jack', 'Rogue AP', 'Backdoor into the LAN.'],
     ['Ransomware encrypts file shares and demands payment', 'Malware', 'Malicious software.']],
    'Technical controls can\'t stop everything — training stops phishing, tailgating and shoulder surfing.');

  N.add({ id: '4.2', dom: 4, short: 'Attacks & their impact', title: 'Summarize various types of attacks and their impact to the network',
    goal: 'DoS/DDoS, VLAN hopping, MAC flooding, ARP and DNS poisoning/spoofing, rogue DHCP/AP, evil twin, on-path, social engineering and malware.',
    parts: [
      P('Denial of service and on-path attacks', 'Explain DoS vs DDoS and how on-path (man-in-the-middle) attacks work.',
        `<ul><li><b>DoS</b> (denial of service) — overwhelm a target so legitimate users can't use it: flood bandwidth, exhaust connection tables (SYN flood), or crash a service.</li>
<li><b>DDoS</b> — the same from <b>many</b> sources at once (a botnet), so you can't just block one IP. <b>Reflection/amplification</b> attacks send small spoofed queries (DNS, NTP) that trigger huge replies at the victim.</li>
<li>Impact: <b>availability</b>. Defenses: upstream/ISP scrubbing, CDN, rate limiting, redundant capacity.</li></ul>
<ul><li><b>On-path attack</b> (formerly man-in-the-middle) — the attacker secretly sits between two parties, reading or altering traffic. Achieved through ARP poisoning, rogue DHCP/gateway, evil twin Wi-Fi or DNS spoofing.</li>
<li>Impact: <b>confidentiality and integrity</b>. Defense: encryption with certificate checking (TLS), DAI, DHCP snooping, WPA3-Enterprise.</li></ul>`,
        [['What makes a DDoS harder to stop than a DoS?', 'It comes from many sources at once', ['It uses encryption', 'It targets only DNS', 'It needs physical access'], 'Botnets.'],
         ['An attacker secretly relays and reads traffic between a user and a server. Which attack?', 'On-path attack', ['DDoS', 'Dumpster diving', 'VLAN hopping'], 'Man-in-the-middle.']]),
      P('Layer 2 attacks: VLAN hopping, MAC flooding, ARP', 'Recognize VLAN hopping, MAC flooding and ARP poisoning/spoofing.',
        `<ul><li><b>VLAN hopping</b> — reaching a VLAN you shouldn't:
<ul><li><b>Switch spoofing</b> — the attacker's device negotiates a trunk (DTP). Fix: hard-set access ports, disable DTP.</li>
<li><b>Double tagging</b> — two 802.1Q tags; the first (native VLAN) is stripped, the second delivers into the target VLAN. Fix: native VLAN set to an unused VLAN.</li></ul></li>
<li><b>MAC flooding</b> — floods fake source MACs until the CAM table is full; the switch then floods all frames like a hub, so the attacker can sniff. Fix: <b>port security</b> (limit MACs per port).</li>
<li><b>ARP poisoning / spoofing</b> — fake ARP replies map the gateway's IP to the attacker's MAC → on-path. Fix: <b>Dynamic ARP Inspection</b> (with DHCP snooping).</li></ul>`,
        [['Flooding a switch with fake MAC addresses makes it:', 'Flood frames out all ports like a hub', ['Shut down every port', 'Drop all broadcasts', 'Encrypt traffic'], 'CAM table overflow.'],
         ['Which defense stops ARP poisoning on a switch?', 'Dynamic ARP Inspection', ['PortFast', 'LACP', 'Jumbo frames'], 'DAI validates ARP against DHCP bindings.']],
        'n9-l2atk'),
      P('DNS attacks and rogue devices', 'Recognize DNS poisoning/spoofing, rogue DHCP, rogue APs and evil twins.',
        `<ul><li><b>DNS poisoning</b> — forged records get into a resolver's <b>cache</b>, so everyone using it is sent to the attacker's IP.</li>
<li><b>DNS spoofing</b> — answering a victim's query with a forged reply before the real one arrives (or editing the hosts file). Defense: <b>DNSSEC</b>, trusted resolvers, DoH/DoT.</li>
<li><b>Rogue DHCP server</b> — hands out leases with the attacker as gateway/DNS (or just breaks addressing). Defense: <b>DHCP snooping</b> (only trusted ports may send offers).</li>
<li><b>Rogue AP</b> — an unauthorized AP connected to the wired network: a backdoor around the firewall. Defense: wireless intrusion prevention (WIPS), 802.1X on ports.</li>
<li><b>Evil twin</b> — an attacker's AP using the <b>same SSID</b> as yours to lure clients and capture credentials. Defense: WPA3-Enterprise with certificate validation, user training.</li></ul>`,
        [['A fake AP broadcasts the company\'s SSID to steal logins. What is it?', 'Evil twin', ['Rogue DHCP', 'Honeypot', 'MAC flooding'], 'Same name, attacker-owned.'],
         ['Which switch feature blocks rogue DHCP servers?', 'DHCP snooping', ['Port mirroring', 'STP', 'PoE'], 'Trusted vs untrusted ports.']]),
      P('Social engineering and malware', 'Identify phishing, dumpster diving, shoulder surfing, tailgating and malware.',
        `<p><b>Social engineering</b> attacks people, not machines:</p>
<ul><li><b>Phishing</b> — fake emails/sites that steal credentials or deliver malware (vishing = voice, smishing = SMS, spear phishing = targeted).</li>
<li><b>Dumpster diving</b> — searching trash for passwords, diagrams, org charts. Defense: shredding.</li>
<li><b>Shoulder surfing</b> — watching someone type a password or PIN. Defense: privacy screens, awareness.</li>
<li><b>Tailgating</b> (piggybacking) — following someone through a secure door. Defense: access control vestibules, badge policies.</li></ul>
<p><b>Malware</b> — malicious software: <b>virus</b> (needs a host file), <b>worm</b> (spreads itself across the network), <b>trojan</b> (disguised as useful software), <b>ransomware</b> (encrypts data for ransom), <b>botnet</b> agents (used in DDoS). Network impact: worms and ransomware spread fast across flat networks — another reason to segment.</p>`,
        [['Someone follows an employee through a badge-controlled door. Which attack?', 'Tailgating', ['Shoulder surfing', 'Phishing', 'Evil twin'], 'Physical social engineering.'],
         ['Which malware spreads across the network on its own?', 'Worm', ['Virus', 'Trojan', 'Phishing kit'], 'Self-propagating.']],
        'n9-se')
    ],
    wrap: { recap: ['DoS/DDoS attack availability; DDoS uses botnets and amplification.', 'On-path = secretly between two parties (via ARP, DHCP, DNS, evil twin).', 'VLAN hopping: switch spoofing (disable DTP) and double tagging (unused native VLAN).', 'MAC flooding → port security. ARP poisoning → DAI.', 'DNS poisoning/spoofing → DNSSEC. Rogue DHCP → DHCP snooping. Rogue AP / evil twin → WIPS, 802.1X, WPA3-Enterprise.', 'Phishing, dumpster diving, shoulder surfing, tailgating; virus, worm, trojan, ransomware.'], lab: 'n9-l2atk' }
  });

  // ===================== 4.3 Defenses =====================
  M('n9-nac', 'Network access control', 'Port security, 802.1X, MAC filtering',
    'Pick the control described.', ['Port security', '802.1X', 'MAC filtering', 'NAC posture check', 'Key management'],
    [['Allow at most 2 MAC addresses on a switch port and shut it on violation', 'Port security', 'Limits MACs per port.'],
     ['Port stays closed until the user authenticates to RADIUS through the switch', '802.1X', 'Supplicant, authenticator, authentication server.'],
     ['Only devices on an approved MAC list may join the AP (easily spoofed)', 'MAC filtering', 'Weak on its own.'],
     ['Laptop without current antivirus is placed in a quarantine VLAN', 'NAC posture check', 'Health-based admission.'],
     ['Rotate, store and revoke the VPN pre-shared keys and certificates securely', 'Key management', 'Keys need a life cycle.']],
    '802.1X roles: supplicant (client) → authenticator (switch/AP) → authentication server (RADIUS).');
  M('n9-zones', 'Zones and filtering', 'Trusted, untrusted, screened subnet, filters',
    'Pick the best fit.', ['Trusted zone', 'Untrusted zone', 'Screened subnet (DMZ)', 'URL filtering', 'Content filtering', 'ACL'],
    [['Internal user and server networks', 'Trusted zone', 'Highest trust.'],
     ['The Internet', 'Untrusted zone', 'No trust.'],
     ['Public web and mail servers reachable from the Internet but isolated from the LAN', 'Screened subnet (DMZ)', 'Between trusted and untrusted.'],
     ['Block access to gambling and known-malicious websites by category', 'URL filtering', 'Based on the address.'],
     ['Block downloads of .exe files and scan pages for malware', 'Content filtering', 'Based on what is inside.'],
     ['Permit TCP 443 to 10.1.1.10 and deny everything else on the interface', 'ACL', 'Ordered permit/deny rules.']],
    'Traffic should flow from more-trusted to less-trusted freely and back only when explicitly allowed.');
  M('n9-d4-wrap', 'Domain 4 mixed review', 'Attack → defense',
    'Each line is an attack or risk. Pick the control that best stops it.', ['Port security', 'DHCP snooping', 'Dynamic ARP Inspection', 'Unused native VLAN + no DTP', 'DNSSEC', 'MFA', '802.1X', 'Screened subnet', 'Security awareness training', 'Disable unused ports'],
    [['MAC flooding', 'Port security', 'Limit MACs per port.'],
     ['Rogue DHCP server', 'DHCP snooping', 'Trusted ports only.'],
     ['ARP poisoning', 'Dynamic ARP Inspection', 'Checks ARP vs bindings.'],
     ['Double-tagging VLAN hopping', 'Unused native VLAN + no DTP', 'Remove the path.'],
     ['DNS cache poisoning', 'DNSSEC', 'Signed records.'],
     ['Stolen password used to log in to the VPN', 'MFA', 'Second factor.'],
     ['Visitor plugs a laptop into a conference room jack', '802.1X', 'Port stays closed until authenticated.'],
     ['Internet-facing web server is compromised and attacker pivots inward', 'Screened subnet', 'Isolate public servers.'],
     ['Phishing emails', 'Security awareness training', 'People are the control.'],
     ['Unused jacks in the lobby are live on the LAN', 'Disable unused ports', 'Basic hardening.']],
    'Every Domain 4 question boils down to: what is the threat, and which control fits it best?');

  N.add({ id: '4.3', dom: 4, short: 'Security features & defenses', title: 'Given a scenario, apply network security features, defense techniques, and solutions',
    goal: 'Device hardening, NAC (port security, 802.1X, MAC filtering), key management, ACLs, URL/content filtering, and trusted/untrusted zones with a screened subnet.',
    parts: [
      P('Device hardening', 'Harden a router and switch: passwords, SSH only, unused ports and services.',
        `<ul><li><b>Change default passwords</b> and usernames on every device; use strong, unique credentials (and AAA/TACACS+ for admins).</li>
<li><b>Disable unused ports</b> — shut them down and move them to an unused "parking" VLAN.</li>
<li><b>Disable unused services</b> — Telnet, HTTP management, CDP/LLDP on edge ports, unused SNMP communities.</li>
<li><b>Encrypted management only</b> — SSH instead of Telnet, HTTPS instead of HTTP, SNMPv3.</li>
<li>Keep firmware patched; save and back up the config; add a login banner.</li></ul>
<pre>enable secret Str0ng!Pass
service password-encryption
line vty 0 4
 transport input ssh
interface range f0/3 - 8
 switchport access vlan 999
 shutdown</pre>
<p>The paired lab has you do exactly this on a router and a switch without breaking the users.</p>`,
        [['Which command allows only SSH on the VTY lines?', 'transport input ssh', ['transport input telnet', 'login local', 'service password-encryption'], 'Blocks Telnet.'],
         ['What should you do with switch ports no one uses?', 'Shut them down and put them in an unused VLAN', ['Leave them in VLAN 1', 'Make them trunks', 'Enable PoE'], 'Basic hardening.']],
        'l-harden'),
      P('NAC: port security, 802.1X, MAC filtering', 'Choose port security, 802.1X, MAC filtering and posture checks, and explain key management.',
        `<p><b>NAC</b> (network access control) decides <i>who and what</i> may connect.</p>
<ul><li><b>Port security</b> — limit MAC addresses per switch port (learned or "sticky"); on violation shut down, restrict or protect. Stops MAC flooding and casual device swaps.</li>
<li><b>802.1X</b> — port-based authentication. Roles: <b>supplicant</b> (client) → <b>authenticator</b> (switch/AP) → <b>authentication server</b> (RADIUS). The port passes only EAP until the user/device authenticates; then it can be placed in a VLAN based on identity.</li>
<li><b>MAC filtering</b> — allow-list of MACs. Easy to spoof — a weak control on its own.</li>
<li><b>Posture assessment</b> — NAC checks device health (patches, antivirus) and quarantines failing devices.</li></ul>
<p><b>Key management</b> — keys and certificates need a life cycle: secure generation, storage (HSM/vault), rotation, and revocation when someone leaves or a key leaks.</p>`,
        [['In 802.1X, which device is the authenticator?', 'The switch or AP', ['The RADIUS server', 'The laptop', 'The DHCP server'], 'It relays EAP to RADIUS.'],
         ['Why is MAC filtering weak by itself?', 'MAC addresses are easy to spoof', ['It needs RADIUS', 'It blocks all traffic', 'It only works on fiber'], 'Anyone can change a MAC.']],
        'n9-nac'),
      P('ACLs: ordered permit and deny rules', 'Write and place an access control list correctly.',
        `<p>An <b>ACL</b> is an ordered list of permit/deny rules on a router, L3 switch or firewall.</p>
<ul><li>Processed <b>top-down</b>; the <b>first match wins</b>; anything not matched hits the <b>implicit deny</b> at the end.</li>
<li><b>Standard ACL</b> (Cisco 1–99) — matches source IP only. Place it <b>close to the destination</b>.</li>
<li><b>Extended ACL</b> (100–199 or named) — matches source, destination, protocol and port. Place it <b>close to the source</b> to drop unwanted traffic early.</li>
<li>Applied to an interface <b>in</b> or <b>out</b>: <code>ip access-group 110 in</code>.</li></ul>
<pre>access-list 110 deny   ip 10.30.0.0 0.0.0.255 10.10.0.0 0.0.255.255
access-list 110 permit tcp 10.30.0.0 0.0.0.255 any eq 443
access-list 110 permit udp 10.30.0.0 0.0.0.255 any eq 53</pre>
<p>Put specific rules above general ones — a broad <code>permit any</code> at the top makes every rule below it useless.</p>`,
        [['What happens to traffic that matches no ACL entry?', 'It is denied by the implicit deny', ['It is permitted', 'It is logged and forwarded', 'It is sent to the DMZ'], 'Every ACL ends with deny all.'],
         ['Where should an extended ACL usually be placed?', 'Close to the source', ['Close to the destination', 'On the ISP router', 'On every interface'], 'Drop it early.']],
        'l-acl'),
      P('Filtering and security zones', 'Use URL/content filtering and design trusted, untrusted and screened-subnet zones.',
        `<ul><li><b>URL filtering</b> — allow/block websites by address or category (gambling, malware, adult).</li>
<li><b>Content filtering</b> — inspect what is inside: block file types, scan for malware, data loss prevention.</li></ul>
<p><b>Zones</b> group interfaces by trust level, and firewall policy controls traffic between them:</p>
<ul><li><b>Trusted</b> — internal networks.</li>
<li><b>Untrusted</b> — the Internet.</li>
<li><b>Screened subnet</b> (formerly DMZ) — public-facing servers (web, mail, reverse proxy). Internet → screened subnet is allowed only for specific services; screened subnet → trusted is tightly restricted. If a public server is hacked, the attacker is still outside the LAN.</li></ul>
<p>The paired lab: build an ordered firewall rule set that must pass seven real tests.</p>`,
        [['Where should a public web server be placed?', 'Screened subnet', ['Trusted zone', 'Voice VLAN', 'Management VLAN'], 'Isolated from the LAN.'],
         ['Blocking all .exe downloads is an example of:', 'Content filtering', ['URL filtering', 'Port security', 'Geofencing'], 'Based on content.']],
        'pb-acl')
    ],
    wrap: { recap: ['Harden: change defaults, SSH/HTTPS/SNMPv3 only, disable unused ports and services, patch, back up.', 'Port security limits MACs; 802.1X = supplicant → authenticator → RADIUS; MAC filtering is weak; posture checks quarantine.', 'Key management: generate, store, rotate, revoke.', 'ACLs: top-down, first match, implicit deny. Standard near destination; extended near source.', 'URL filtering (address/category) vs content filtering (what is inside).', 'Zones: trusted, untrusted, screened subnet for public servers.'], lab: 'n9-zones' }
  });
})();
