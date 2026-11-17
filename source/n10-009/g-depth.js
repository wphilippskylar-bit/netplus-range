/* Net+ depth pass: one "On the job" and one "Exam trap" callout per part. D[objective] = [[onTheJob, examTrap], ...] in part order. */
(function () {
  var N = window.N9;
  var D = {
    '1.1': [
      ['When you escalate, name the layer: "Layer 1 is clean, Layer 2 shows the wrong VLAN." It tells the next engineer exactly what you already ruled out.', 'The exam counts from the bottom: Layer 1 is Physical, Layer 7 is Application. A question about "the layer above Network" wants Transport (4), not Data link.'],
      ['A "Layer 3 switch" still switches at Layer 2 inside a VLAN. It only acts at Layer 3 when traffic crosses between VLANs.', 'Access points and bridges are Layer 2 devices, not Layer 1. Only hubs, repeaters, cables and transceivers are pure Layer 1.'],
      ['In a packet capture the MAC addresses change at every router, but the IP addresses stay the same end to end. That is how you tell which hop you captured on.', 'TCP/IP has two common drawings: 4 layers (Network access) and 5 layers (Physical + Data link). CompTIA questions use the 4-layer version.'],
      ['Most real tickets start divide-and-conquer: ping the gateway. Reply = go up the stack (DNS, port, app). No reply = go down (IP settings, VLAN, cable).', 'CRC errors are counted at Layer 2 but are almost always caused at Layer 1 (cable, interference, optic). The exam answer is "check the cabling".']
    ],
    '1.2': [
      ['In small sites one box is often router, firewall, switch and wireless controller at once. Know the roles, because you will be asked which role is failing.', 'A switch separates collision domains; only a router (or a VLAN) separates broadcast domains.'],
      ['Put a new IPS in detect-only mode for a few weeks before you let it block. A false positive that drops payroll traffic is a career-memorable event.', 'IDS vs IPS turns on one word: inline. Inline can block (IPS). A copy of traffic can only alert (IDS).'],
      ['Storage traffic gets its own VLAN or switches. A backup flooding the user VLAN is a classic cause of "the network is slow at 2 a.m."', 'iSCSI is a SAN protocol even though it runs over ordinary Ethernet. "Block-level over IP" = iSCSI = SAN.'],
      ['Traceroute works by sending packets with TTL 1, 2, 3… and reading the "time exceeded" reply from each router. A row of * means that hop does not answer, not always that it is down.', 'TTL is a hop count, not seconds. QoS does not create bandwidth; it only decides who goes first during congestion.']
    ],
    '1.3': [
      ['Most cloud breaches are the customer\'s side of the shared responsibility model: open storage buckets and weak access rules, not the provider being hacked.', 'In every model, including SaaS, the customer still owns its data and user access.'],
      ['Elasticity only saves money if scale-in is configured too. Forgotten test servers running all month are the usual surprise on the bill.', 'Scalability = it can grow. Elasticity = it grows and shrinks automatically. If the question says "automatically" or "on demand", pick elasticity.'],
      ['When a cloud server is unreachable, check in order: route table → NACL (both directions) → security group → the server\'s own firewall.', 'Security groups are stateful (return traffic is automatic). NACLs are stateless (you must allow the reply too). The exam loves this pair.'],
      ['A VPN is usually built the same day as a stop-gap while the direct circuit is being installed, then kept as the backup path.', 'Direct Connect / ExpressRoute are private but not encrypted by default. "Private" and "encrypted" are different properties.']
    ],
    '1.4': [
      ['A firewall log showing a SYN with no SYN-ACK means the packet was dropped or the service is not listening. SYN answered by RST means the host is there but the port is closed.', 'DNS uses both: UDP 53 for normal queries, TCP 53 for zone transfers and large answers.'],
      ['When someone says "open the port", ask: which protocol, which direction, from where to where. Half of bad firewall rules come from skipping those questions.', 'SFTP runs over SSH (22). FTPS is FTP with TLS (989/990). They are different protocols with similar names.'],
      ['Never expose 3389 (RDP) or 445 (SMB) to the Internet. Scanners find them within minutes; put them behind a VPN.', 'SNMP polling is 161 and traps are 162. Syslog is UDP 514. Mixing these up is the most common ports mistake.'],
      ['A site-to-site VPN that will not come up through a firewall is usually missing UDP 500/4500 or protocol 50 (ESP) — not a "port".', 'AH and ESP are IP protocol numbers (51 and 50), not TCP/UDP ports. GRE (47) does not encrypt.'],
      ['Multicast needs switch support (IGMP snooping); without it the switch floods the stream to every port like a broadcast.', 'IPv6 has no broadcast at all. Anycast = many servers share one address and you reach the nearest.']
    ],
    '1.5': [
      ['Starlink-style LEO satellite made satellite usable for voice; classic GEO satellite still has ~600 ms delay. Ask which one before you promise VoIP will work.', '"BASE-T" means twisted pair. SR = short reach on multimode; LR = long reach on single-mode.'],
      ['The 100 m limit includes the patch cords: about 90 m of permanent cable plus 10 m of patch leads.', 'Cat 6 only does 10 Gbps to about 55 m. For 10 Gbps at a full 100 m the answer is Cat 6a.'],
      ['Never look into a fiber or transceiver port: the laser is invisible. Dirty connectors cause most fiber faults — clean before you replace.', 'Mismatch is the exam favourite: single-mode optic on multimode cable (or the reverse) = no or poor link.'],
      ['Many switches refuse third-party optics. Check the vendor compatibility list, and the light levels with show interfaces transceiver, before blaming the cable.', 'SFP = 1G, SFP+ = 10G, SFP28 = 25G, QSFP+ = 40G, QSFP28 = 100G. The physical slot looks the same; the speed does not.'],
      ['Carry LC–LC, LC–SC and a few couplers. Half of "the fiber is dead" calls are the wrong patch lead or transmit plugged into transmit.', 'ST twists on (bayonet), SC is square push-pull, LC is the small one on SFPs. BNC is coax, not fiber.']
    ],
    '1.6': [
      ['Real WANs are hybrids: mesh between data centers, hub-and-spoke to branches, with a cheap backup link at each spoke.', 'Full-mesh links = n(n−1)/2. Do the arithmetic: 6 sites = 15, not 30 or 36.'],
      ['Label uplinks by role (ACC→DIST, DIST→CORE). During an outage nobody has time to work out which cable goes up.', 'Access-layer features: PoE, port security, 802.1X. Routing and policy belong at distribution. The core just forwards fast.'],
      ['East-west traffic never crosses the perimeter firewall, which is why data centers add internal segmentation (micro-segmentation).', 'In spine-and-leaf, spines never connect to spines and leaves never connect to leaves.']
    ],
    '1.7': [
      ['You do not need to convert whole addresses. Memorise the eight mask values (128, 192, 224, 240, 248, 252, 254, 255) and you can subnet anything.', 'Octet values stop at 255. Any address with a 256+ octet in an answer is invalid.'],
      ['Two hosts in the same VLAN with different masks is a real fault: one side thinks the other is remote and sends to the gateway.', 'Usable hosts = 2^n − 2. Forgetting the −2 (network and broadcast) is the most common wrong answer.'],
      ['169.254.x.x on a client is a symptom, not a setting. Go straight to: is DHCP reachable from this VLAN?', '172.16.0.0/12 covers 172.16 through 172.31 only. 172.32.x.x is public.'],
      ['Write the block multiples on scratch paper (0, 32, 64, 96…). It is faster and safer than binary under exam time pressure.', 'The question may ask for the network, the broadcast, the first usable or the last usable address. Read which one before answering.'],
      ['Leave room to grow: if a site has 50 hosts today, a /26 (62) is full by next year. Planners usually size for double.', 'Allocate the largest subnet first. Starting with the small ones leaves blocks that do not line up.'],
      ['The classic lab mistake is a gateway outside the host\'s own subnet. The PC then works locally and nothing else.', 'A router interface is shut down by default; a switch port is not. "administratively down" = type no shutdown.']
    ],
    '1.8': [
      ['SD-WAN let companies replace expensive MPLS with two cheap Internet links plus LTE, steering each app over the best one.', 'The control plane decides, the data plane forwards. "Centralized control plane" = SDN.'],
      ['Zero Trust is a design approach, not a product you buy. It usually starts with MFA everywhere and segmenting the flat network.', 'SASE = SSE + SD-WAN. If the option lists security services only, it is SSE.'],
      ['Treat the repository as the truth. A fix typed directly on a device will be overwritten the next time automation runs.', 'Configuration drift = the device no longer matches its template. A merge conflict = two people edited the same lines.'],
      ['Type IPv6 with :: but log and document the full form when there is any doubt. Only one :: is allowed per address.', '2001:db8::/32 is reserved for documentation, so exam examples use it constantly.'],
      ['A dual-stack host with broken IPv6 often shows up as "some sites are slow": the client tries IPv6 first and waits for it to fail.', 'Link-local (fe80::/10) exists on every IPv6 interface and is never routed. Unique local (fc00::/7) is the RFC 1918 equivalent.']
    ],
    '2.1': [
      ['When traffic takes a surprising path, look for a more specific route first. A forgotten /24 static beats a /16 learned from OSPF every time.', 'Administrative distance compares different sources of the same prefix; metric compares paths inside one protocol. Prefix length is checked before both.'],
      ['Every static route needs a matching route back. Trace from both ends before you call it fixed.', 'A floating static route has a higher AD than the primary so it stays out of the table until the primary disappears.'],
      ['OSPF neighbours stuck forming usually comes down to mismatched area, timers, subnet mask or MTU on the link.', 'BGP is the only EGP on the exam. eBGP has AD 20; iBGP has AD 200.'],
      ['Port forwarding on a home router is static PAT: one outside port mapped to one inside host and port.', 'PAT = many-to-one using ports (the usual meaning of "NAT overload"). Static NAT = one-to-one for servers.'],
      ['If one VLAN works and another does not on router-on-a-stick, check the trunk\'s allowed VLAN list before you touch the router.', 'Each subinterface needs encapsulation dot1q with the VLAN number; without it the subinterface cannot take an IP address.'],
      ['Test failover on purpose in a maintenance window. An FHRP pair that has never failed over is an assumption, not redundancy.', 'HSRP is Cisco-proprietary; VRRP is the open standard. Hosts always point at the virtual IP.']
    ],
    '2.2': [
      ['show mac address-table with a MAC answers "which port is this device on?" in seconds. It is the most-used switch command on a help desk.', 'A switch learns from the source MAC and forwards by the destination MAC.'],
      ['Name every VLAN. "VLAN 30" means nothing during an outage; "SALES" does.', 'Creating a VLAN does not let it talk to other VLANs. Inter-VLAN traffic needs a router or an SVI.'],
      ['Native VLAN mismatch does not bring the trunk down; it quietly leaks traffic between two VLANs. Watch for the CDP warning.', 'The native VLAN is the untagged one. Frames in every other VLAN carry an 802.1Q tag.'],
      ['Set the root bridge on purpose (priority 4096 on the core, 8192 on the backup) the day you build the network.', 'Lower bridge ID wins the root election. A blocking port is STP working, not a fault.'],
      ['If a LAG member shows "suspended", compare speed, duplex and allowed VLANs with the other members: one mismatch drops it from the bundle.', 'Duplex mismatch gives late collisions and CRC errors on a link that still shows up/up.']
    ],
    '2.3': [
      ['More APs at lower power beats fewer APs at full power. Clients have weak radios; coverage has to work in both directions.', 'In 2.4 GHz only channels 1, 6 and 11 avoid overlap. Any answer with 1, 4, 8 or similar is wrong.'],
      ['The slowest client sets the pace: one old 802.11b device forces protection mechanisms that slow everyone on that radio.', '802.11ac (Wi-Fi 5) is 5 GHz only. 802.11n and 802.11ax work in both 2.4 and 5 GHz; only 6E/7 use 6 GHz.'],
      ['Roaming is decided by the client, not the AP. "Sticky" clients hold a weak AP; lowering power and enabling 802.11k/v/r helps.', 'Hiding the SSID is not security. BSSID is the AP radio\'s MAC; ESSID is one name across many APs.'],
      ['Guest Wi-Fi belongs on its own VLAN with client isolation and Internet-only rules. A shared guest password on the corporate VLAN is a finding.', 'Enterprise = 802.1X + RADIUS (per-user). Personal = one shared key (PSK/SAE). WPA3 replaces the PSK handshake with SAE.'],
      ['Mount antennas as designed: ceiling APs upside-down on a wall push the signal the wrong way.', 'Omni = coverage in all directions. Directional (Yagi, patch, dish) = distance in one direction.']
    ],
    '2.4': [
      ['Label both ends of every cable and every patch-panel port the day it is installed. Nobody ever goes back to do it later.', 'MDF = the main room with the demarc. IDF = the per-floor closets. One rack unit = 1.75 inches.'],
      ['A UPS only bridges minutes. Know its runtime at your real load and test the batteries; they usually fail when first needed.', 'Watts = volts × amps. Plan circuits and UPSs for about 80% of their rating.'],
      ['A closet that "randomly" reboots switches every summer afternoon is a cooling problem. Ask for a temperature sensor before replacing hardware.', 'Low humidity → static (ESD). High humidity → condensation and corrosion. Server rooms use clean-agent or pre-action suppression.']
    ],
    '3.1': [
      ['Out-of-date diagrams are worse than none. Update the diagram as part of closing the change ticket, not "later".', 'Physical diagram = cables and locations. Logical diagram = subnets, VLANs and routing.'],
      ['IPAM pays for itself the first time it stops someone assigning a printer the same address as the firewall.', 'An SLA has measurable promises and penalties. A wireless heat map comes from a site survey.'],
      ['Track end-of-support dates in the asset inventory with a 12-month warning; budgets take that long.', 'EOL = no longer sold. EOS = no longer patched. The security risk starts at EOS.'],
      ['The rollback plan must be something you can actually do at 3 a.m.: a saved config and the exact commands, not "restore from backup".', 'Order: request → approval → implement in the maintenance window → verify → document. Approval comes before any change.']
    ],
    '3.2': [
      ['Restrict SNMP by source IP as well as credentials, and never leave the community string as "public".', 'SNMPv3 is the only version with authentication and encryption. Traps are pushed by the device to UDP 162.'],
      ['Flow data answers "who and how much" for weeks at low cost; captures answer "what exactly" for minutes at high cost. Use flow first.', 'SPAN copies traffic for analysis; it does not block or prioritise anything.'],
      ['Time must be correct everywhere (NTP) or log correlation falls apart. It is the first thing to check when timelines do not make sense.', 'Syslog severity: 0 is the worst (Emergency), 7 is Debug. Setting level 4 logs 0 through 4.'],
      ['Alert on what needs action. A dashboard nobody reads and an inbox with 400 alerts a day both mean the real one gets missed.', 'Availability = is it up. Performance = how well. Configuration monitoring = did it change.']
    ],
    '3.3': [
      ['RPO and RTO are business decisions with a price tag. Your job is to say what each target costs to achieve.', 'RPO = data (how far back). RTO = time (how long down). MTBF high is good; MTTR low is good.'],
      ['Active-active only helps if each side can carry the full load alone. Two links at 70% each is not redundancy.', 'Cold = space and power only. Warm = equipment, restore data. Hot = live and replicated.'],
      ['An untested backup is a hope. Restore a real file every month and a whole system at least yearly.', 'Tabletop = talk it through. Validation = actually fail over or restore.']
    ],
    '3.4': [
      ['Short leases on guest Wi-Fi (an hour or two) stop the pool filling with phones that left the building.', 'DORA happens over UDP 67 (server) and 68 (client). A reservation is tied to a MAC address.'],
      ['The helper address goes on the interface facing the clients (their gateway), pointing at the DHCP server. Forgetting it on a new VLAN is routine.', 'Routers do not forward broadcasts. SLAAC needs no DHCP server: the host builds its address from the router advertisement.'],
      ['When "DNS is down" for one user, check their hosts file and their configured DNS server before touching the DNS server.', 'Authoritative = from the server holding the zone. Non-authoritative = from a cache.'],
      ['Lower a record\'s TTL a day before a planned IP change so the old address ages out quickly, then raise it again.', 'MX = mail, CNAME = alias, PTR = reverse, TXT = SPF/DKIM/DMARC, SRV = service location.'],
      ['DoH hides DNS inside ordinary HTTPS, which also hides it from corporate filtering. Many companies force browsers to use the internal resolver.', 'DNSSEC signs answers (integrity) but does not encrypt. DoT uses TCP 853; DoH uses 443.'],
      ['Kerberos logins fail when clocks differ by more than five minutes. "Password is right but login fails" is sometimes a time problem.', 'NTP = UDP 123 with strata. PTP = sub-microsecond precision. NTS = authenticated NTP.']
    ],
    '3.5': [
      ['Full tunnel plus video calls can saturate the head office uplink. That bandwidth cost is why many companies split-tunnel trusted cloud apps only.', 'Site-to-site joins networks; client-to-site joins one device. Clientless means browser-only.'],
      ['Every network needs a way in that does not depend on the network: console server, cellular out-of-band, or at least a documented drive to site.', 'In-band shares the production network. Out-of-band is a separate path that still works when production is down.']
    ],
    '4.1': [
      ['When you propose a control, say which of the three it protects. Budget holders respond to "this keeps the site up" better than to acronyms.', 'A vulnerability is a weakness; a threat is what could use it; an exploit is how; risk is likelihood × impact.'],
      ['Expired certificates cause more outages than attackers. Monitor expiry dates like you monitor disk space.', 'A self-signed certificate still encrypts. What it lacks is a trusted CA vouching for the identity.'],
      ['Admin accounts should be separate from daily accounts. Reading email as a domain admin is how one phishing click becomes a breach.', 'RADIUS: UDP, network access, encrypts only the password. TACACS+: TCP 49, device administration, encrypts everything.'],
      ['Tailgating beats most door technology. Culture ("everyone badges, every time") matters as much as the lock.', 'A honeypot is one decoy system; a honeynet is a network of them.'],
      ['Segmentation is judged by its firewall rules. Separate VLANs with "permit any any" between them are not segmented.', 'PCI DSS = payment cards. GDPR = personal data of people in the EU. Data locality = where data may physically be stored.']
    ],
    '4.2': [
      ['During a DDoS you cannot filter your way out at your own edge: the link is already full. Mitigation happens upstream at the ISP or a scrubbing service.', 'On-path is the current name for man-in-the-middle. DoS has one source; DDoS has many.'],
      ['These attacks need access to your LAN, so the cheapest defence is an access port that is locked down: port security, no trunk negotiation, unused ports shut.', 'Double tagging only works when the attacker sits in the native VLAN — hence "set the native VLAN to an unused VLAN".'],
      ['A rogue DHCP server is often an innocent home router someone plugged in. DHCP snooping stops both the innocent and the malicious kind.', 'Rogue AP = unauthorized AP on your wired network. Evil twin = attacker\'s AP copying your SSID.'],
      ['Report phishing rather than just deleting it. One report lets the security team pull the same email from everyone else\'s inbox.', 'A virus needs a host file and user action; a worm spreads by itself across the network.']
    ],
    '4.3': [
      ['Hardening is a checklist run on every new device before it touches production. Keep it as a template so nothing depends on memory.', 'The secure choices are always: SSH not Telnet, HTTPS not HTTP, SNMPv3 not v2c.'],
      ['Roll out 802.1X in monitor mode first. Enforcing it on day one locks out printers and anything that cannot authenticate.', 'Supplicant = client. Authenticator = switch or AP. Authentication server = RADIUS.'],
      ['Check the hit counters (show access-lists). A rule with zero hits is either unnecessary or sitting below a rule that catches its traffic first.', 'First match wins, and an implicit deny ends every ACL. Standard ACLs filter on source only.'],
      ['Servers in the screened subnet should never be able to start connections into the internal network. That one rule contains most web-server breaches.', 'Screened subnet is the current term for DMZ. URL filtering looks at the address; content filtering looks inside.']
    ],
    '5.1': [
      ['"What changed?" solves more tickets than any tool. Ask the user, then check the change log.', 'You establish a theory before you test it, and you never implement before you have a plan.'],
      ['Write the ticket notes as you go. The next person, often you in six months, needs the cause and the fix, not just "resolved".', 'Verify full functionality comes before documenting. Documentation is always the last step.']
    ],
    '5.2': [
      ['Swap the patch lead first. It is the cheapest test and fixes a surprising share of "bad port" tickets.', 'Attenuation = too long / too weak. Crosstalk = pairs untwisted. EMI = outside electrical noise.'],
      ['Clear the counters, wait five minutes and look again. Only counters that are still rising matter.', 'err-disabled does not fix itself by default: remove the cause, then shutdown / no shutdown.'],
      ['Check the PoE budget before adding cameras or Wi-Fi 6 APs; newer devices draw far more than the phones the switch was sized for.', '802.3af = 15.4 W, 802.3at = 30 W, 802.3bt = 60 or 90 W.']
    ],
    '5.3': [
      ['Loops usually come from an unmanaged switch or a user patching two wall jacks together. BPDU guard on access ports shuts it down in a second.', 'Symptoms of a loop: broadcast storm, high CPU on switches, MAC addresses flapping between ports.'],
      ['Traceroute shows where traffic stops; then check that hop\'s routing table and its ACLs, in that order.', 'Ping working does not prove an application port is open. ICMP and TCP 443 are filtered separately.'],
      ['Ask "is it one user, one VLAN, or everyone?" first. The answer points to the PC, the scope/gateway, or the core.', 'New clients getting 169.254.x.x while existing ones work = DHCP pool exhausted.']
    ],
    '5.4': [
      ['Measure before and after. "It feels faster" is not a fix; a ping, iperf or flow report is.', 'Bandwidth is capacity; throughput is what you actually get. Jitter is variation in delay.'],
      ['Walk the site with an analyzer at the time users complain. Wi-Fi problems are often tied to the lunch-hour microwave or a neighbour\'s new AP.', 'Raising AP power does not fix coverage: the client still cannot transmit back that far.']
    ],
    '5.5': [
      ['Ping the gateway, then a public IP, then a name. Three pings separate local, routing and DNS problems.', 'tracert is Windows; traceroute is Linux/macOS. nslookup and dig query DNS.'],
      ['netstat -ano on Windows adds the process ID so you can find which program owns a suspicious port.', 'ipconfig is Windows; ifconfig is legacy Unix; ip is modern Linux. LLDP is the open standard, CDP is Cisco.'],
      ['Scan (nmap) only networks you are authorized to scan, and tell the security team first: a scan looks like an attack in their console.', 'A toner finds a cable; a tester verifies its wiring; a certifier proves it meets its category.'],
      ['Run show commands before you change anything and paste the output into the ticket. It is your evidence and your rollback reference.', 'show ip interface brief gives status at a glance; "administratively down" means shutdown was configured.']
    ]
  };
  N.objs.forEach(function (o) {
    var d = D[o.id]; if (!d) return;
    o.parts.forEach(function (p, i) {
      var c = d[i]; if (!c) return;
      if (c[0]) p.html += '<div class="callout pro"><b class="k">On the job</b>' + c[0] + '</div>';
      if (c[1]) p.html += '<div class="callout trap"><b class="k">Exam trap</b>' + c[1] + '</div>';
    });
  });
  N.depth = D;
})();
