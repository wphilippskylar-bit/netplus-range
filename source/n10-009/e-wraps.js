/* Distinct combined wrap-up labs so no objective wrap simply repeats a part's lab. */
(function () {
  var N = window.N9, M = N.M;
  function setWrap(id, lab) { N.objs.forEach(function (o) { if (o.id === id) o.wrap.lab = lab; }); }

  M('n9-sw-wrap', 'Switching ticket review', 'Combined 2.2 scenarios',
    'Each line is a switching requirement or symptom. Pick the fix or feature.', ['Assign the correct access VLAN', 'Match the native VLAN on both ends', 'Allow the VLAN on the trunk', 'Lower root bridge priority on the core', 'Enable PortFast + BPDU guard', 'Match speed/duplex on both ends', 'Enable jumbo frames end to end', 'Configure LACP'],
    [['PC on port 7 lands in the printer subnet', 'Assign the correct access VLAN', 'Wrong access VLAN.'],
     ['CDP warns "native VLAN mismatch" on the uplink', 'Match the native VLAN on both ends', 'Leaks traffic between VLANs.'],
     ['VLAN 30 works on switch A but not across the uplink to switch B', 'Allow the VLAN on the trunk', 'Allowed list.'],
     ['An old closet switch is STP root and traffic takes a slow path', 'Lower root bridge priority on the core', 'Set root on purpose.'],
     ['PCs wait 30 seconds for a link and a user plugged in a home switch', 'Enable PortFast + BPDU guard', 'Edge protection.'],
     ['Late collisions after one side was hard-coded to 100/full', 'Match speed/duplex on both ends', 'Duplex mismatch.'],
     ['iSCSI wants 9000-byte frames but large writes fail', 'Enable jumbo frames end to end', 'Every hop must match.'],
     ['Two server uplinks should act as one 2 Gbps link with failover', 'Configure LACP', '802.3ad.']],
    'This is what the "configure switching" PBQs look like: one symptom, one setting.');
  setWrap('2.2', 'n9-sw-wrap');

  M('n9-phys-wrap', 'Closet walk-through', 'Combined 2.4 decisions',
    'You are inspecting a new IDF. Pick the right action for each finding.', ['Install a UPS', 'Add a second PDU on another circuit', 'Re-mount for hot/cold aisle airflow', 'Add a humidifier/dehumidifier', 'Use clean-agent suppression', 'Install a patch panel', 'Lock the rack and door'],
    [['Equipment reboots during brief power flickers', 'Install a UPS', 'Battery ride-through.'],
     ['Servers have dual power supplies but both plug into one strip', 'Add a second PDU on another circuit', 'A/B feeds.'],
     ['Switch exhaust blows into the intake of the server above it', 'Re-mount for hot/cold aisle airflow', 'Port-side intake/exhaust.'],
     ['Humidity reads 18% and techs get static shocks', 'Add a humidifier/dehumidifier', 'Target 40–60%.'],
     ['Room is protected by wet-pipe sprinklers', 'Use clean-agent suppression', 'Protect electronics.'],
     ['Desk cables plug directly into switch ports', 'Install a patch panel', 'Clean moves/changes.'],
     ['The closet door is propped open next to the lobby', 'Lock the rack and door', 'Physical security.']],
    'Physical problems cause "random" network faults. Check power, heat and humidity before blaming the config.');
  setWrap('2.4', 'n9-phys-wrap');

  M('n9-mon-wrap', 'Monitoring design', 'Combined 3.2 choices',
    'Design monitoring for a 300-user office. Pick the best tool for each need.', ['SNMPv3 polling', 'SNMP traps', 'NetFlow', 'SPAN + packet capture', 'Syslog collector', 'SIEM', 'Availability monitoring'],
    [['Graph CPU and interface utilization every 5 minutes, securely', 'SNMPv3 polling', 'Authenticated, encrypted polling.'],
     ['Get told instantly when a core link goes down', 'SNMP traps', 'Device-initiated.'],
     ['Find the top bandwidth users on the Internet link', 'NetFlow', 'Flow metadata.'],
     ['Prove whether the VoIP server sends a SIP 503', 'SPAN + packet capture', 'Full contents.'],
     ['Keep every device\'s logs in one place for 90 days', 'Syslog collector', 'Log aggregation.'],
     ['Alert when one account fails VPN login 30 times then succeeds from abroad', 'SIEM', 'Correlation.'],
     ['Page on-call when the website stops answering', 'Availability monitoring', 'Up/down checks.']],
    'Most real NOCs run all of these together.');
  setWrap('3.2', 'n9-mon-wrap');

  N.C('n9-dr-wrap', 'DR planning math', 'Combined 3.3 numbers',
    'An online store loses <b>$12,000 per hour</b> of downtime. The business sets RTO = <b>2 hours</b> and RPO = <b>30 minutes</b>. Nightly backups run at 1 a.m. A disk array failed 4 times in 20,000 hours with repairs of 5, 3, 6 and 2 hours.',
    [['Maximum acceptable revenue loss from downtime at the RTO ($)', 24000, '$24,000', '2 h × $12,000.'],
     ['How many minutes of data could you lose with nightly backups in the worst case? (minutes in a day)', 1440, '1440', 'Up to 24 h — far worse than the 30 min RPO.'],
     ['Array MTBF in hours', 5000, '5000', '20,000 ÷ 4.'],
     ['Array MTTR in hours', 4, '4', '(5+3+6+2) ÷ 4.'],
     ['Backups/replication needed at least every how many minutes to meet the RPO?', 30, '30', 'RPO sets the interval.']],
    'Nightly backups can\'t meet a 30-minute RPO; this business needs replication and at least a warm (likely hot) site for a 2-hour RTO.',
    ['MTBF = operating hours ÷ failures; MTTR = total repair ÷ failures.'], 1);
  setWrap('3.3', 'n9-dr-wrap');

  M('n9-svc-wrap', 'Services help desk', 'Combined 3.4 tickets',
    'Pick the setting or record that fixes each ticket.', ['DHCP exclusion', 'DHCP reservation', 'ip helper-address', 'Option 6 (DNS servers)', 'MX record', 'PTR record', 'CNAME record', 'NTP'],
    [['DHCP keeps handing out the router\'s own address', 'DHCP exclusion', 'Exclude static addresses.'],
     ['The label printer must always be 10.1.5.50', 'DHCP reservation', 'Bound to its MAC.'],
     ['New VLAN 40 clients get APIPA; the server is on VLAN 10', 'ip helper-address', 'Relay.'],
     ['Clients get IPs but can only browse by IP address', 'Option 6 (DNS servers)', 'No DNS option set.'],
     ['Email to the new domain bounces: no mail server found', 'MX record', 'Mail exchanger.'],
     ['Mail servers reject us because our IP has no reverse name', 'PTR record', 'Reverse DNS.'],
     ['shop.example.com should simply point at www.example.com', 'CNAME record', 'Alias.'],
     ['Kerberos logins fail because clocks differ by 9 minutes', 'NTP', 'Sync time.']],
    'DHCP gets hosts on the network; DNS lets them find things; NTP keeps logs and authentication honest.');
  setWrap('3.4', 'n9-svc-wrap');

  M('n9-access-wrap', 'Remote access design', 'Combined 3.5 choices',
    'Pick the best fit for each requirement.', ['Site-to-site IPsec VPN', 'Client-to-site VPN, full tunnel', 'Client-to-site VPN, split tunnel', 'Clientless VPN', 'Jump box with MFA', 'Out-of-band console server', 'SSH only'],
    [['Connect a new branch\'s firewall to HQ permanently', 'Site-to-site IPsec VPN', 'Gateway to gateway.'],
     ['Remote staff must have ALL traffic inspected by the corporate firewall', 'Client-to-site VPN, full tunnel', 'Everything through HQ.'],
     ['HQ Internet link is saturated by remote users streaming video over the VPN', 'Client-to-site VPN, split tunnel', 'Only corporate traffic tunneled.'],
     ['Auditor needs browser access to one internal app from their own laptop', 'Clientless VPN', 'No install.'],
     ['Admins must pass through one logged, hardened host to reach any device', 'Jump box with MFA', 'Controlled entry.'],
     ['Reach branch routers even when the WAN is down', 'Out-of-band console server', 'Separate path.'],
     ['Replace Telnet for CLI management', 'SSH only', 'Encrypted.']],
    'Access design balances security (full tunnel, jump box, OOB) against performance and convenience.');
  setWrap('3.5', 'n9-access-wrap');

  M('n9-sec-wrap', 'Security concepts review', 'Combined 4.1',
    'Pick the concept that best fits each control or situation.', ['Confidentiality', 'Integrity', 'Availability', 'MFA', 'TACACS+', 'SAML', 'Geofencing', 'Honeynet', 'Data locality'],
    [['TLS on the HR portal', 'Confidentiality', 'Encryption in transit.'],
     ['Digitally signed firmware images', 'Integrity', 'Tamper detection.'],
     ['Dual ISP links and a DDoS scrubbing service', 'Availability', 'Uptime.'],
     ['Badge plus PIN at the data center door', 'MFA', 'Have + know.'],
     ['Per-command authorization for network admins', 'TACACS+', 'Device administration.'],
     ['Users log into a cloud CRM with their corporate identity', 'SAML', 'Web SSO.'],
     ['Block admin logins from outside the US', 'Geofencing', 'Location-based.'],
     ['A fake network of servers to study intruders', 'Honeynet', 'Deception.'],
     ['Customer records must stay in EU data centers', 'Data locality', 'Regulatory.']],
    'Domain 4.1 questions are mostly about matching a control to the goal it serves.');
  setWrap('4.1', 'n9-sec-wrap');

  M('n9-atk-wrap', 'Incident triage', 'Combined 4.2 identification',
    'Each line is an observation from the SOC. Pick the attack.', ['DDoS', 'MAC flooding', 'ARP poisoning', 'DNS poisoning', 'Rogue DHCP', 'Evil twin', 'VLAN hopping', 'Phishing'],
    [['Web servers receive 40 Gbps of traffic from 60,000 IPs', 'DDoS', 'Distributed flood.'],
     ['Switch MAC table full of random MACs on one port', 'MAC flooding', 'CAM overflow.'],
     ['Two different MACs claim the gateway IP in users\' ARP caches', 'ARP poisoning', 'On-path.'],
     ['Every user of the internal resolver gets a fake IP for the payroll site', 'DNS poisoning', 'Cache poisoned.'],
     ['Clients receive a gateway of 10.1.1.99, which isn\'t a router', 'Rogue DHCP', 'Unauthorized server.'],
     ['A second "CorpWiFi" appears in the parking lot with a stronger signal', 'Evil twin', 'Fake AP.'],
     ['Frames with two 802.1Q tags seen arriving on an access port', 'VLAN hopping', 'Double tagging.'],
     ['Users report an email asking them to re-enter their VPN password', 'Phishing', 'Social engineering.']],
    'Identify the attack first; Domain 4.3 is about choosing the defense.');
  setWrap('4.2', 'n9-atk-wrap');

  M('n9-perf-wrap', 'Performance ticket review', 'Combined 5.4',
    'Pick the most likely cause for each complaint.', ['Bottleneck', 'Congestion', 'High latency', 'Jitter', 'Packet loss', 'Channel overlap', 'Insufficient coverage', 'Roaming misconfiguration'],
    [['Branch on a 50 Mbps link feeding a 1 Gbps LAN is always slow', 'Bottleneck', 'Smallest link limits the path.'],
     ['Everything slows every morning at 9 a.m. when backups and logins collide', 'Congestion', 'Demand > capacity.'],
     ['Remote desktop over a GEO satellite link feels sluggish', 'High latency', '~600 ms RTT.'],
     ['Calls sound robotic though average latency is fine', 'Jitter', 'Variable delay.'],
     ['TCP retransmissions spike and pings show 4% loss', 'Packet loss', 'Drops.'],
     ['Office 2.4 GHz APs set to channels 1, 4, 8', 'Channel overlap', 'Use 1/6/11.'],
     ['No signal in the new east wing', 'Insufficient coverage', 'Add APs.'],
     ['Video calls drop whenever users walk between floors', 'Roaming misconfiguration', 'Mismatched SSIDs/security/VLANs.']],
    'Measure before you fix: ping for latency/loss, iperf for throughput, a Wi-Fi analyzer for RF.');
  setWrap('5.4', 'n9-perf-wrap');

  M('n9-tools-wrap', 'Right tool, first time', 'Combined 5.5',
    'Pick the tool you would reach for first.', ['ipconfig /all', 'ping', 'tracert', 'nslookup', 'netstat', 'Toner probe', 'Cable tester', 'Wi-Fi analyzer', 'show interfaces'],
    [['User says "no Internet" — check their address, gateway and DNS', 'ipconfig /all', 'Start with the host.'],
     ['Is the default gateway answering?', 'ping', 'Reachability.'],
     ['Packets to the cloud app stop somewhere past the firewall', 'tracert', 'Find the hop.'],
     ['Site loads by IP but not by name', 'nslookup', 'DNS.'],
     ['Is the web service actually listening on port 443?', 'netstat', 'Listening sockets.'],
     ['Which patch panel port is jack 3-22?', 'Toner probe', 'Trace the cable.'],
     ['New patch cable causes a link at 100 Mbps only', 'Cable tester', 'Miswire/split pair.'],
     ['Users in the lobby drop off Wi-Fi', 'Wi-Fi analyzer', 'Signal/channel.'],
     ['Switch uplink feels slow — check errors and duplex', 'show interfaces', 'Counters.']],
    'Work from the host outward: config → gateway → path → name → service → cable.');
  setWrap('5.5', 'n9-tools-wrap');

  M('n9-d3-wrap', 'Domain 3 mixed review', 'One item from every objective',
    'Every item comes from a different Domain 3 objective. Pick the answer.', ['Change request with rollback plan', 'Golden configuration', 'SNMPv3', 'Syslog severity 0', 'RPO', 'Hot site', 'ip helper-address', 'DNSSEC', 'Out-of-band management', 'Split tunnel'],
    [['3.1 — First step before upgrading core switch firmware', 'Change request with rollback plan', 'Change management.'],
     ['3.1 — The standard every switch is compared to for drift', 'Golden configuration', 'Baseline.'],
     ['3.2 — Secure polling of device statistics', 'SNMPv3', 'Auth + encryption.'],
     ['3.2 — The most severe log level (Emergency)', 'Syslog severity 0', '0 = Emergency.'],
     ['3.3 — The maximum data loss the business accepts', 'RPO', 'Recovery point.'],
     ['3.3 — DR site that takes over in minutes', 'Hot site', 'Live replica.'],
     ['3.4 — Get DHCP across a router to another subnet', 'ip helper-address', 'Relay.'],
     ['3.4 — Prove DNS answers are genuine', 'DNSSEC', 'Signatures.'],
     ['3.5 — Reach a router when the production network is down', 'Out-of-band management', 'Separate path.'],
     ['3.5 — VPN that sends only corporate traffic through the tunnel', 'Split tunnel', 'Internet goes direct.']],
    'If any of these felt shaky, flip back to that objective before the domain test.');

  M('n9-d5-wrap', 'Domain 5 mixed review', 'Symptom → objective-level fix',
    'Each line comes from a different Domain 5 objective. Pick the best answer.', ['Identify the problem', 'Document findings', 'Attenuation', 'err-disabled', 'PoE budget exceeded', 'Broadcast storm', 'DHCP pool exhaustion', 'Jitter', 'Channel overlap', 'traceroute', 'Toner probe'],
    [['5.1 — First methodology step: question users, find what changed', 'Identify the problem', 'Step 1.'],
     ['5.1 — Last methodology step', 'Document findings', 'Step 7.'],
     ['5.2 — 150 m copper run with errors', 'Attenuation', 'Distance limit.'],
     ['5.2 — Port shut after a port security violation', 'err-disabled', 'Fix cause, bounce port.'],
     ['5.2 — New APs on a switch will not power up', 'PoE budget exceeded', 'Budget used.'],
     ['5.3 — Switch CPUs at 100% and MACs flapping', 'Broadcast storm', 'Layer 2 loop.'],
     ['5.3 — New clients get 169.254.x.x, old ones fine', 'DHCP pool exhaustion', 'Scope full.'],
     ['5.4 — Voice robotic with varying delay', 'Jitter', 'Variable latency.'],
     ['5.4 — 2.4 GHz APs on channels 1, 3, 5', 'Channel overlap', 'Use 1/6/11.'],
     ['5.5 — Find where packets stop along the path', 'traceroute', 'Hop by hop.'],
     ['5.5 — Find which unlabeled cable runs to a jack', 'Toner probe', 'Tone and trace.']],
    'Domain 5 is 24% of the exam — the biggest domain. Make these automatic.');
})();
