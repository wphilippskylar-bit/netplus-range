/* Domain 3.0 Network Operations — objectives 3.1 to 3.5 */
(function () {
  var N = window.N9, P = N.P, M = N.M, O = N.O;

  // ===================== 3.1 Processes & procedures =====================
  M('n9-docs', 'Which document?', 'Diagrams, inventories, IPAM, SLA',
    'Pick the document or tool that answers each question.', ['Physical diagram', 'Logical diagram', 'Rack diagram', 'Cable map', 'Asset inventory', 'IPAM', 'SLA', 'Wireless heat map'],
    [['Which switch port in IDF-2 does desk 214 connect to?', 'Cable map', 'Jack ↔ panel ↔ port.'],
     ['Which subnets and VLANs exist and how do they route?', 'Logical diagram', 'Layer 3 view.'],
     ['Where is each device physically located and how are buildings cabled?', 'Physical diagram', 'Layer 1 view.'],
     ['What is mounted in U12–U14 of rack B?', 'Rack diagram', 'Front/back elevation.'],
     ['When does the warranty on the core switches expire?', 'Asset inventory', 'Hardware, software, licensing, warranty.'],
     ['Is 10.20.30.45 free, and who is using its neighbors?', 'IPAM', 'IP address management.'],
     ['What uptime did the ISP promise, and what credit do we get if they miss it?', 'SLA', 'Service-level agreement.'],
     ['Where is Wi-Fi signal weak in the warehouse?', 'Wireless heat map', 'From a site survey.']],
    'Good documentation turns a 2-hour outage into a 10-minute one.');
  O('n9-change', 'Make a change the right way', 'Order the change-management process',
    'You need to upgrade firmware on the core switches. Put the change process in order.',
    [['Submit a change request: what, why, risk, and rollback plan', 'Request process.'],
     ['Change advisory board reviews and approves it', 'Approval.'],
     ['Back up the current (production) configuration', 'Know-good copy for rollback.'],
     ['Perform the change during the approved maintenance window', 'Minimize user impact.'],
     ['Test and verify the network works as expected', 'Validation.'],
     ['Update the baseline/golden configuration and documentation', 'New known-good state.'],
     ['Close the change ticket with the results', 'Tracking.']],
    'Change management is about predictability: everyone knows what changed, when, and how to undo it.');
  M('n9-lifecycle', 'Life-cycle and configuration terms', 'EOL, EOS, golden config',
    'Pick the term for each description.', ['End of life (EOL)', 'End of support (EOS)', 'Patch / bug fix', 'Firmware update', 'Decommissioning', 'Baseline / golden configuration', 'Backup configuration'],
    [['Vendor stops selling the product', 'End of life (EOL)', 'No new units.'],
     ['Vendor stops issuing security patches for the product', 'End of support (EOS)', 'Plan replacement before this.'],
     ['Small code fix for a known problem in the OS', 'Patch / bug fix', 'Software management.'],
     ['New low-level code for a switch or AP\'s hardware', 'Firmware update', 'Test first.'],
     ['Securely wipe configs and remove the device from inventory and monitoring', 'Decommissioning', 'Sanitize before disposal.'],
     ['Approved standard config that every new switch should match', 'Baseline / golden configuration', 'Compare against drift.'],
     ['Copy of the running config saved off the device last night', 'Backup configuration', 'Restore point.']],
    'EOL = can\'t buy it. EOS = can\'t secure it. Track both in the asset inventory.');

  N.add({ id: '3.1', dom: 3, short: 'Organizational processes & procedures', title: 'Explain the purpose of organizational processes and procedures',
    goal: 'Documentation (diagrams, cable maps, inventory, IPAM, SLA, heat maps), life-cycle management, change management and configuration management.',
    parts: [
      P('Network documentation and diagrams', 'Pick the right diagram or document for a troubleshooting question.',
        `<ul><li><b>Physical diagram</b> — where devices are and how they are cabled (Layer 1): buildings, closets, cable paths.</li>
<li><b>Logical diagram</b> — how traffic flows: subnets, VLANs, routing, firewall zones (Layers 2–3).</li>
<li>Diagrams are often split by layer: <b>L1</b> (cabling), <b>L2</b> (VLANs, trunks, STP), <b>L3</b> (IP subnets, routing).</li>
<li><b>Rack diagram</b> — front/back elevation of each rack: what is in which U, power feeds.</li>
<li><b>Cable map</b> — every wall jack → patch panel port → switch port. Label both ends of every cable.</li></ul>
<p>In the paired lab you document a network yourself with CDP and interface descriptions — the way real engineers fix missing documentation.</p>`,
        [['Which document shows subnets, VLANs and routing between them?', 'Logical diagram', ['Physical diagram', 'Rack diagram', 'Cable map'], 'Logical = how data flows.'],
         ['A tech needs to trace wall jack 3-14 to a switch port. Which document?', 'Cable map', ['SLA', 'Logical diagram', 'IPAM'], 'Jack → panel → port.']],
        'l-docs'),
      P('Inventory, IPAM, SLAs and site surveys', 'Explain asset inventory, IPAM, SLAs and wireless surveys.',
        `<ul><li><b>Asset inventory</b> — every device and license: <b>hardware</b> (model, serial, location), <b>software</b> (versions), <b>licensing</b> (counts, renewals) and <b>warranty</b> (expiry, support contract).</li>
<li><b>IPAM</b> (IP address management) — tracks subnets, assignments, DHCP scopes and DNS records so you don't hand out duplicate IPs.</li>
<li><b>SLA</b> (service-level agreement) — a provider's measurable promises: uptime (e.g. 99.99%), response time, repair time, and penalties if missed.</li>
<li><b>Wireless survey / heat map</b> — walk the site measuring signal (RSSI), noise and interference. The <b>heat map</b> shows coverage holes and overlap. Do a <b>predictive</b> survey before install and a <b>validation</b> survey after.</li></ul>`,
        [['Which tool prevents two admins from assigning the same IP address?', 'IPAM', ['SLA', 'Heat map', 'Rack diagram'], 'IP address management.'],
         ['Which document defines the uptime an ISP guarantees?', 'SLA', ['MOU', 'Cable map', 'Asset inventory'], 'Service-level agreement.']],
        'n9-docs'),
      P('Life-cycle management', 'Plan for EOL/EOS, patches, firmware and decommissioning.',
        `<ul><li><b>End of life (EOL)</b> — the vendor stops selling the product.</li>
<li><b>End of support (EOS)</b> — the vendor stops fixing it, including security patches. Running EOS gear is a real risk; plan replacement before this date.</li>
<li><b>Software management</b>:
<ul><li><b>Patches / bug fixes</b> — fix known issues and vulnerabilities.</li>
<li><b>Operating system</b> upgrades — new features, sometimes new bugs.</li>
<li><b>Firmware</b> — device-level code for switches, APs, NICs. Test in a lab, schedule in a window, keep the previous image for rollback.</li></ul></li>
<li><b>Decommissioning</b> — remove from production, wipe configs/keys and storage, update inventory and monitoring, recycle securely.</li></ul>`,
        [['After which milestone does a vendor stop releasing security patches?', 'End of support (EOS)', ['End of life (EOL)', 'General availability', 'Warranty start'], 'EOS = no more fixes.'],
         ['Before disposing of an old firewall, you should:', 'Wipe its configuration and keys and update the inventory', ['Unplug it only', 'Sell it with the config for reference', 'Leave it in monitoring'], 'Decommission securely.']]),
      P('Change and configuration management', 'Follow a change process and use production, backup and golden configurations.',
        `<p><b>Change management</b> keeps changes from causing surprise outages:</p>
<ol><li><b>Request</b> — what, why, risk, impact, rollback plan, test plan.</li>
<li><b>Approval</b> — often by a change advisory board (CAB).</li>
<li><b>Implement</b> in a scheduled <b>maintenance window</b>.</li>
<li><b>Verify</b>, then <b>document</b> and close the ticket (<b>tracking</b>).</li></ol>
<p><b>Configuration management</b>:</p>
<ul><li><b>Production (running) configuration</b> — what the device is using right now.</li>
<li><b>Backup configuration</b> — saved copies (automated nightly) for fast restore.</li>
<li><b>Baseline / golden configuration</b> — the approved standard. Compare devices to it to spot drift.</li></ul>
<p>On Cisco gear, an unsaved running config is lost on reboot: <code>copy running-config startup-config</code>.</p>`,
        [['What should every change request include in case the change fails?', 'A rollback plan', ['A new IP scheme', 'A heat map', 'An SLA'], 'Know how to undo it.'],
         ['Which configuration is the approved standard used to detect drift?', 'Baseline / golden configuration', ['Running configuration', 'Factory default', 'Startup configuration of a new switch'], 'The known-good standard.']],
        'n9-change')
    ],
    wrap: { recap: ['Physical diagrams = where/cabling; logical = subnets/VLANs/routing; L1/L2/L3 views; rack diagrams; cable maps.', 'Asset inventory: hardware, software, licensing, warranty. IPAM tracks addresses. SLA = measurable promises.', 'Site survey → heat map (predictive before, validation after).', 'EOL = no longer sold; EOS = no longer patched. Patch OS and firmware carefully.', 'Decommission: wipe, remove from inventory and monitoring.', 'Change: request → approve → implement in window → verify → document. Running vs backup vs golden configs.'], lab: 'n9-lifecycle' }
  });

  // ===================== 3.2 Monitoring =====================
  M('n9-snmp', 'SNMP pieces', 'Manager, agent, MIB, traps, versions',
    'Pick the SNMP term for each description.', ['SNMP manager (NMS)', 'SNMP agent', 'MIB', 'OID', 'Trap', 'Community string', 'SNMPv3'],
    [['Monitoring server that polls devices on UDP 161', 'SNMP manager (NMS)', 'Network management station.'],
     ['Software on the switch that answers polls', 'SNMP agent', 'Runs on the device.'],
     ['Database describing every value a device can report', 'MIB', 'Management information base.'],
     ['Numeric identifier of one value, like interface 3 input errors', 'OID', 'Object identifier.'],
     ['Unrequested alert sent by the device to UDP 162', 'Trap', 'Push, not poll.'],
     ['Clear-text shared password used by SNMPv1/v2c', 'Community string', 'Change from "public"/"private".'],
     ['Version that adds user authentication and encryption', 'SNMPv3', 'Use this.']],
    'Poll = manager asks (161). Trap = device tells (162). v2c = community string; v3 = users + auth + encryption.');
  O('n9-syslog', 'Syslog severity', 'Order the levels 0 → 7',
    'Put the syslog severity levels in order from most severe (0) to least severe (7).',
    [['0 Emergency — system unusable', ''], ['1 Alert — act immediately', ''], ['2 Critical', ''], ['3 Error', ''], ['4 Warning', ''], ['5 Notice — normal but significant', ''], ['6 Informational', ''], ['7 Debug', '']],
    'Memory trick: "Every Awesome Cisco Engineer Will Need Ice cream Daily." Logging at level 4 sends 0–4.');
  M('n9-mon', 'Pick the monitoring method', 'Flow, capture, mirroring, SIEM, API',
    'Pick the best method for each question.', ['NetFlow / flow data', 'Packet capture', 'Port mirroring (SPAN)', 'SIEM', 'Syslog collector', 'API integration', 'Baseline + anomaly alerting'],
    [['Which hosts used the most bandwidth yesterday, and on which ports?', 'NetFlow / flow data', 'Who talked to whom, how much.'],
     ['Exactly what was inside the failing TLS handshake?', 'Packet capture', 'Full packet contents.'],
     ['Copy a switch port\'s traffic to an analyzer', 'Port mirroring (SPAN)', 'Feeds IDS/captures.'],
     ['Correlate firewall, server and VPN logs to spot an attack', 'SIEM', 'Correlation + alerting.'],
     ['Central place where every router and switch sends its log messages', 'Syslog collector', 'Log aggregation.'],
     ['Pull interface stats from a cloud firewall into the ticketing system automatically', 'API integration', 'Programmatic access.'],
     ['Get alerted when WAN traffic is 3× higher than normal for this hour', 'Baseline + anomaly alerting', 'Compare to normal.']],
    'Flow data = metadata about conversations. Packet capture = full contents. SIEM = correlated logs.');

  N.add({ id: '3.2', dom: 3, short: 'Network monitoring', title: 'Given a scenario, use network monitoring technologies',
    goal: 'SNMP (traps, MIB, versions, community strings), flow data, packet capture, port mirroring, baselines and alerting, syslog/SIEM, APIs, and monitoring solutions.',
    parts: [
      P('SNMP', 'Explain SNMP polling vs traps, MIBs/OIDs and why SNMPv3 is preferred.',
        `<p><b>SNMP</b> lets a monitoring server (the <b>manager</b> / NMS) read stats from devices running an <b>agent</b>.</p>
<ul><li><b>Polling</b> — the manager asks (GET) on <b>UDP 161</b>: CPU, interface counters, uptime.</li>
<li><b>Traps</b> — the device pushes an alert on <b>UDP 162</b> when something happens (link down, high temp).</li>
<li><b>MIB</b> — the database of everything an agent can report. Each value has an <b>OID</b> (object identifier).</li></ul>
<table><tr><th>Version</th><th>Security</th></tr>
<tr><td>v1 / v2c</td><td><b>Community strings</b> sent in clear text (read-only / read-write). Defaults "public"/"private" must be changed.</td></tr>
<tr><td><b>v3</b></td><td>Usernames with <b>authentication</b> (SHA) and <b>encryption</b> (AES). Use v3.</td></tr></table>`,
        [['Which port receives SNMP traps?', 'UDP 162', ['UDP 161', 'TCP 514', 'UDP 123'], 'Polling 161, traps 162.'],
         ['Which SNMP version adds authentication and encryption?', 'SNMPv3', ['SNMPv1', 'SNMPv2c', 'SNMPv2'], 'v1/v2c use clear-text communities.']],
        'n9-snmp'),
      P('Flow data, packet capture and port mirroring', 'Choose between flow data, full packet capture and port mirroring.',
        `<ul><li><b>Flow data</b> (NetFlow, sFlow, IPFIX) — <b>metadata</b> about each conversation: source/destination IP and port, protocol, bytes, packets, time. Small to store, perfect for "who is eating the bandwidth?" and spotting unusual talkers.</li>
<li><b>Packet capture</b> (Wireshark, tcpdump) — <b>full contents</b> of packets. Best detail for troubleshooting a specific problem, but huge storage and privacy concerns.</li>
<li><b>Port mirroring</b> (SPAN on Cisco) — the switch <b>copies</b> traffic from one or more ports/VLANs to a monitor port where a capture tool or IDS listens.</li>
<li>A <b>TAP</b> is a hardware device placed inline on a cable that copies everything, including errored frames — more complete than SPAN.</li></ul>`,
        [['Which method shows who talked to whom and how much, without full contents?', 'Flow data (NetFlow)', ['Packet capture', 'SNMP trap', 'Syslog'], 'Metadata only.'],
         ['Which switch feature copies a port\'s traffic to an analyzer?', 'Port mirroring (SPAN)', ['Port security', 'PoE', 'LACP'], 'Switched port analyzer.']]),
      P('Baselines, alerting, syslog and SIEM', 'Use baselines to detect anomalies and send logs to syslog and a SIEM.',
        `<ul><li><b>Baseline metrics</b> — what "normal" looks like (bandwidth, CPU, latency) at different times of day/week. You can't spot abnormal without it.</li>
<li><b>Anomaly alerting / notification</b> — alert when a metric leaves the baseline (email, SMS, chat, ticket).</li>
<li><b>Log aggregation</b> — send every device's logs to one place:
<ul><li><b>Syslog collector</b> — receives logs on <b>UDP 514</b> (TCP/TLS 6514 for secure).</li>
<li><b>SIEM</b> (security information and event management) — collects and <b>correlates</b> logs from many sources, alerts on attack patterns, keeps them for compliance.</li></ul></li></ul>
<p><b>Syslog severity</b>: 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug. Lower number = more severe. Setting a level logs that level <i>and everything more severe</i>.</p>`,
        [['Which syslog severity number is the most severe?', '0 (Emergency)', ['7 (Debug)', '3 (Error)', '1 (Alert)'], 'Lower = worse.'],
         ['Which system correlates logs from firewalls, servers and VPNs to detect attacks?', 'SIEM', ['Syslog collector only', 'IPAM', 'NetFlow collector'], 'Correlation is the key word.']],
        'n9-syslog'),
      P('APIs and monitoring solutions', 'Match monitoring goals to discovery, traffic, performance, availability and configuration monitoring.',
        `<ul><li><b>API integration</b> — modern devices and cloud services expose REST APIs. Tools pull stats or push changes automatically (e.g. open a ticket when a link drops).</li></ul>
<p><b>Monitoring solutions</b> (what you are watching for):</p>
<ul><li><b>Network discovery</b> — find what's connected. <b>Ad hoc</b> (run now) or <b>scheduled</b> (every night) scans.</li>
<li><b>Traffic analysis</b> — what applications and hosts use bandwidth (flow data).</li>
<li><b>Performance monitoring</b> — latency, jitter, packet loss, utilization, errors.</li>
<li><b>Availability monitoring</b> — is it up? (ping/ICMP, SNMP, HTTP checks; uptime %).</li>
<li><b>Configuration monitoring</b> — alert when a device config changes or drifts from the golden config.</li></ul>`,
        [['Which monitoring type alerts when a switch config differs from the approved standard?', 'Configuration monitoring', ['Availability monitoring', 'Traffic analysis', 'Discovery'], 'Detects drift.'],
         ['A nightly scan to find new devices on the network is:', 'Scheduled network discovery', ['Ad hoc discovery', 'A packet capture', 'An SNMP trap'], 'Discovery on a schedule.']],
        'n9-mon')
    ],
    wrap: { recap: ['SNMP: manager polls agents on UDP 161; traps to 162; MIB holds OIDs; v2c community strings vs v3 auth + encryption.', 'Flow data = conversation metadata. Packet capture = full contents. SPAN/TAP copy traffic.', 'Baseline normal, then alert on anomalies.', 'Syslog UDP 514 to a collector; SIEM correlates logs. Severity 0 Emergency … 7 Debug.', 'APIs automate monitoring and response.', 'Solutions: discovery (ad hoc/scheduled), traffic analysis, performance, availability, configuration monitoring.'], lab: 'n9-mon' }
  });

  // ===================== 3.3 Disaster recovery =====================
  M('n9-drsite', 'DR sites and HA', 'Cold, warm, hot; active-active, active-passive',
    'Pick the best fit.', ['Cold site', 'Warm site', 'Hot site', 'Active-active', 'Active-passive', 'Tabletop exercise', 'Validation test'],
    [['Space and power only; bring your own hardware; days or weeks to recover', 'Cold site', 'Cheapest, slowest.'],
     ['Hardware in place, data restored from recent backups; hours to recover', 'Warm site', 'Middle ground.'],
     ['Fully running copy with live data replication; minutes to switch', 'Hot site', 'Fastest, most expensive.'],
     ['Two firewalls both pass traffic and share the load', 'Active-active', 'Both working.'],
     ['One firewall handles traffic; the other waits to take over', 'Active-passive', 'Standby.'],
     ['Managers talk through a ransomware scenario around a conference table', 'Tabletop exercise', 'Discussion-based.'],
     ['Actually fail the database over to the DR site on a Saturday', 'Validation test', 'Hands-on proof.']],
    'Choose the DR site by RTO: the shorter the allowed downtime, the hotter (and pricier) the site.');

  N.add({ id: '3.3', dom: 3, short: 'Disaster recovery', title: 'Explain disaster recovery (DR) concepts',
    goal: 'RPO, RTO, MTTR, MTBF; cold/warm/hot sites; active-active vs active-passive; tabletop and validation testing.',
    parts: [
      P('DR metrics: RPO, RTO, MTTR, MTBF', 'Calculate and explain RPO, RTO, MTTR and MTBF.',
        `<ul><li><b>RPO</b> (recovery point objective) — how much <b>data</b> you can afford to lose, measured in time. RPO 15 minutes → you need backups/replication at least every 15 minutes.</li>
<li><b>RTO</b> (recovery time objective) — how long the service can be <b>down</b> before the business is seriously hurt. Drives the type of DR site.</li>
<li><b>MTTR</b> (mean time to repair) — average time to fix a failure. Lower is better.</li>
<li><b>MTBF</b> (mean time between failures) — average uptime between failures of a repairable device. Higher is better. MTBF = total operating time ÷ number of failures.</li></ul>
<p><b>Availability</b> ≈ MTBF ÷ (MTBF + MTTR). "Five nines" (99.999%) allows about <b>5 minutes</b> of downtime per year.</p>
<p>Memory: RP<b>O</b> = <b>O</b>ld data you can lose. RT<b>O</b> = <b>O</b>ut of service time.</p>`,
        [['The business can lose at most 1 hour of data. Which metric is that?', 'RPO', ['RTO', 'MTTR', 'MTBF'], 'Recovery POINT = data.'],
         ['A switch ran 6,000 hours with 3 failures. What is its MTBF?', '2,000 hours', ['18,000 hours', '3 hours', '6,000 hours'], '6000 ÷ 3.']],
        'pb-avail'),
      P('DR sites and high availability', 'Choose a cold, warm or hot site and active-active or active-passive HA.',
        `<table><tr><th>Site</th><th>Has</th><th>Recovery time</th><th>Cost</th></tr>
<tr><td>Cold</td><td>Space, power, connectivity</td><td>Days–weeks</td><td>Low</td></tr>
<tr><td>Warm</td><td>Hardware ready; data from backups</td><td>Hours–days</td><td>Medium</td></tr>
<tr><td>Hot</td><td>Running systems with live replicated data</td><td>Minutes</td><td>High</td></tr></table>
<p>The cloud makes warm/hot sites much cheaper (pay for standby resources only when used).</p>
<p><b>High availability (HA)</b> inside a site:</p>
<ul><li><b>Active-active</b> — both devices handle traffic at once. Better use of hardware; each must be able to carry the full load if the other fails.</li>
<li><b>Active-passive</b> — one works, the other is on standby and takes over on failure. Simpler, but the standby sits idle.</li></ul>`,
        [['Which DR site can take over within minutes with current data?', 'Hot site', ['Cold site', 'Warm site', 'Tape vault'], 'Live replication.'],
         ['Two load balancers both serve traffic all the time. Which HA design?', 'Active-active', ['Active-passive', 'Cold standby', 'Warm site'], 'Both active.']],
        'n9-drsite'),
      P('Testing the DR plan', 'Explain tabletop exercises and validation tests.',
        `<p>A DR plan that has never been tested is a guess.</p>
<ul><li><b>Tabletop exercise</b> — key people walk through a scenario in discussion ("the data center floods — what do we do first?"). No systems touched. Finds gaps in roles, contacts and decisions cheaply.</li>
<li><b>Validation tests</b> — actually exercise the technology: restore backups, fail over to the DR site, switch to the standby firewall, run on generator power. Proves RTO and RPO can really be met.</li></ul>
<p>After every test: document what failed, update the plan, retest. Also update the plan when the network changes — a DR runbook pointing at decommissioned servers is useless.</p>`,
        [['Which test involves discussing a scenario without touching any systems?', 'Tabletop exercise', ['Validation test', 'Failover test', 'Penetration test'], 'Discussion only.'],
         ['Why run a validation test?', 'To prove the systems can really meet the RTO and RPO', ['To avoid documenting the plan', 'To replace backups', 'To lower MTBF'], 'Hands-on proof.']])
    ],
    wrap: { recap: ['RPO = how much data you can lose. RTO = how long you can be down.', 'MTTR = average repair time (lower better). MTBF = average time between failures (higher better).', 'Availability = MTBF ÷ (MTBF + MTTR); five nines ≈ 5 min/year.', 'Cold (space) → warm (hardware + backups) → hot (live replica): faster and pricier.', 'Active-active: both working. Active-passive: one on standby.', 'Tabletop = discussion. Validation = real failover/restores. Update the plan after each test.'], lab: 'n9-drsite' }
  });

  // ===================== 3.4 Network services =====================
  M('n9-dnsts', 'DNS server roles & secure DNS', 'Zones, roles, DNSSEC, DoH/DoT',
    'Pick the term for each description.', ['Recursive resolver', 'Authoritative server', 'Non-authoritative answer', 'Primary (master) zone', 'Secondary zone', 'Reverse zone', 'DNSSEC', 'DoH / DoT', 'Hosts file'],
    [['Chases the answer for a client through root, TLD and domain servers', 'Recursive resolver', 'Your ISP or 8.8.8.8.'],
     ['Holds the real records for a domain and answers from them', 'Authoritative server', 'Source of truth.'],
     ['An answer that came from a resolver\'s cache', 'Non-authoritative answer', 'nslookup shows this.'],
     ['The writable copy of a zone', 'Primary (master) zone', 'Edits happen here.'],
     ['A read-only copy updated by zone transfer', 'Secondary zone', 'Redundancy.'],
     ['Maps IP addresses back to names (in-addr.arpa)', 'Reverse zone', 'Holds PTR records.'],
     ['Signs DNS records so resolvers can verify they weren\'t forged', 'DNSSEC', 'Integrity, not privacy.'],
     ['Encrypts DNS queries inside HTTPS (443) or TLS (853)', 'DoH / DoT', 'Privacy.'],
     ['Local file checked before DNS on most systems', 'Hosts file', 'Static name entries.']],
    'DNSSEC = proves the answer is genuine. DoH/DoT = hides the question from eavesdroppers.');
  M('n9-time', 'Time protocols', 'NTP, PTP, NTS',
    'Pick the time protocol.', ['NTP', 'PTP', 'NTS'],
    [['Standard clock sync for servers and network gear, UDP 123', 'NTP', 'Millisecond accuracy.'],
     ['Sub-microsecond sync for trading floors and industrial/5G gear, with hardware timestamps', 'PTP', 'IEEE 1588.'],
     ['Adds cryptographic authentication to NTP so time can\'t be spoofed', 'NTS', 'Network Time Security.'],
     ['Uses a hierarchy of stratum levels from atomic/GPS clocks', 'NTP', 'Stratum 0, 1, 2…'],
     ['Why logs from 40 devices line up correctly in the SIEM', 'NTP', 'Consistent timestamps.']],
    'Accurate time matters for logs, certificates, Kerberos authentication and troubleshooting.');

  N.add({ id: '3.4', dom: 3, short: 'IPv4 & IPv6 network services', title: 'Given a scenario, implement IPv4 and IPv6 network services',
    goal: 'DHCP (scope, lease, options, reservations, exclusions, relay), SLAAC, DNS (records, zones, roles, DNSSEC, DoH/DoT, hosts file), and NTP/PTP/NTS.',
    parts: [
      P('DHCP: DORA, scopes and options', 'Configure a DHCP scope with exclusions, reservations, lease time and options.',
        `<p><b>DHCP</b> hands out IP settings automatically using <b>DORA</b>: <b>D</b>iscover (client broadcast) → <b>O</b>ffer → <b>R</b>equest → <b>A</b>ck. UDP 67 (server) / 68 (client).</p>
<ul><li><b>Scope</b> (pool) — the range of addresses for one subnet.</li>
<li><b>Exclusions</b> — addresses inside the range DHCP must never hand out (routers, printers with static IPs).</li>
<li><b>Reservations</b> — always give one specific device (by MAC) the same address.</li>
<li><b>Lease time</b> — how long a client keeps the address. Clients renew at 50% (T1). Short leases for guest Wi-Fi; longer for desktops.</li>
<li><b>Options</b> — extra settings: default gateway (option 3), DNS servers (6), domain name (15), TFTP server for IP phones (66/150).</li></ul>
<pre>ip dhcp excluded-address 192.168.10.1 192.168.10.10
ip dhcp pool USERS
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 192.168.10.53</pre>`,
        [['What is the correct order of the DHCP process?', 'Discover, Offer, Request, Acknowledge', ['Request, Offer, Discover, Acknowledge', 'Offer, Discover, Acknowledge, Request', 'Discover, Request, Offer, Acknowledge'], 'DORA.'],
         ['A printer must always receive 192.168.10.50 from DHCP. What do you create?', 'A reservation', ['An exclusion', 'A new scope', 'A shorter lease'], 'Bound to its MAC.']],
        'l-dhcp'),
      P('DHCP relay and SLAAC', 'Relay DHCP across routers with an IP helper and explain IPv6 SLAAC.',
        `<p>DHCP Discover is a <b>broadcast</b>, and routers don't forward broadcasts. If the DHCP server is on another subnet, the router needs a <b>DHCP relay</b>:</p>
<pre>interface g0/1
 ip helper-address 10.1.1.20</pre>
<ul><li>The router turns the broadcast into a <b>unicast</b> to the server and stamps the request with the interface's IP (giaddr) so the server picks the right scope.</li>
<li>Configure the helper on the interface <b>facing the clients</b> (their gateway).</li>
<li>Symptom when it's missing: clients in that VLAN get <b>169.254.x.x</b> (APIPA).</li></ul>
<p><b>SLAAC</b> (IPv6 stateless address autoconfiguration) — the router sends <b>Router Advertisements</b> with the /64 prefix; hosts build their own address (EUI-64 or random) with no DHCP server. <b>DHCPv6</b> can still supply DNS servers (stateless) or full addresses (stateful).</p>`,
        [['Clients on a new VLAN get 169.254.x.x; the DHCP server is on another subnet. Fix?', 'Add ip helper-address on the VLAN\'s gateway interface', ['Add a static route on the clients', 'Enable PortFast', 'Lower the lease time'], 'Relay the broadcast.'],
         ['How does an IPv6 host using SLAAC learn its network prefix?', 'From router advertisements', ['From a DHCPv4 offer', 'From ARP', 'From the hosts file'], 'RA carries the prefix.']],
        'l-relay'),
      P('DNS: how names are resolved', 'Trace a DNS lookup and explain recursive vs authoritative, primary vs secondary, forward vs reverse zones.',
        `<p>A client asks its <b>recursive resolver</b>. The resolver checks its cache; if empty it asks a <b>root</b> server → the <b>TLD</b> server (.com) → the domain's <b>authoritative</b> server, then caches the answer for the record's <b>TTL</b>.</p>
<ul><li><b>Authoritative</b> answer — from the server that holds the zone. <b>Non-authoritative</b> — from a cache.</li>
<li><b>Primary</b> zone — the writable copy. <b>Secondary</b> — read-only copy kept current by <b>zone transfer</b> (TCP 53).</li>
<li><b>Forward zone</b> — name → IP. <b>Reverse zone</b> — IP → name (<code>x.x.x.in-addr.arpa</code>, PTR records).</li>
<li><b>Hosts file</b> — a local name list checked before DNS (<code>/etc/hosts</code>, <code>C:\\Windows\\System32\\drivers\\etc\\hosts</code>). Malware loves to edit it.</li></ul>
<p>The paired lab: point a client at a DNS server and resolve a name with <code>nslookup</code>.</p>`,
        [['A DNS answer that came from a resolver\'s cache is called:', 'Non-authoritative', ['Authoritative', 'Recursive zone', 'Primary'], 'Only the zone owner is authoritative.'],
         ['Which zone type maps IP addresses to names?', 'Reverse zone', ['Forward zone', 'Stub zone', 'Root zone'], 'PTR records live there.']],
        'l-services'),
      P('DNS record types', 'Pick the right DNS record for a need.',
        `<table><tr><th>Record</th><th>Purpose</th><th>Example</th></tr>
<tr><td>A</td><td>Name → IPv4</td><td>www → 203.0.113.10</td></tr>
<tr><td>AAAA</td><td>Name → IPv6</td><td>www → 2001:db8::10</td></tr>
<tr><td>CNAME</td><td>Alias → another name</td><td>shop → www.example.com</td></tr>
<tr><td>MX</td><td>Mail server for the domain (with priority)</td><td>10 mail.example.com</td></tr>
<tr><td>TXT</td><td>Free text: SPF, DKIM, DMARC, domain verification</td><td>v=spf1 …</td></tr>
<tr><td>NS</td><td>Which servers are authoritative for the zone</td><td>ns1.example.com</td></tr>
<tr><td>PTR</td><td>IP → name (reverse lookups)</td><td>10.113.0.203.in-addr.arpa</td></tr>
<tr><td>SOA</td><td>Zone's start of authority: primary server, serial, timers</td><td>—</td></tr>
<tr><td>SRV</td><td>Service location (host + port)</td><td>_ldap._tcp</td></tr></table>
<p>A CNAME can't sit at the zone apex alongside other records, and an MX must point to a name (A/AAAA), not to a CNAME.</p>`,
        [['Which record lists the mail server for a domain?', 'MX', ['PTR', 'CNAME', 'NS'], 'Mail exchanger.'],
         ['Which record holds SPF anti-spoofing data?', 'TXT', ['A', 'SRV', 'AAAA'], 'SPF/DKIM/DMARC live in TXT.'],
         ['Which record maps a name to an IPv6 address?', 'AAAA', ['A', 'PTR', 'MX'], 'Quad-A.']],
        'pb-dns'),
      P('Securing DNS: DNSSEC, DoH, DoT', 'Tell DNSSEC (integrity) from DoH/DoT (privacy).',
        `<p>Plain DNS is unencrypted UDP and unauthenticated — easy to spy on and to spoof.</p>
<ul><li><b>DNSSEC</b> — the zone owner <b>digitally signs</b> records (RRSIG, DNSKEY, DS). Resolvers verify the chain of trust from the root. Stops <b>cache poisoning / spoofed answers</b>. Does <b>not</b> encrypt anything.</li>
<li><b>DoT</b> (DNS over TLS) — encrypts queries on <b>TCP 853</b>. Easy for a network to see (and block) because of the dedicated port.</li>
<li><b>DoH</b> (DNS over HTTPS) — encrypts queries inside normal HTTPS on <b>443</b>. Hard to distinguish from web traffic — great for privacy, harder for corporate filtering.</li></ul>
<p>Exam tip: <i>integrity/authenticity</i> → DNSSEC. <i>Confidentiality/privacy</i> → DoH or DoT.</p>`,
        [['Which technology lets a resolver verify that a DNS answer was not forged?', 'DNSSEC', ['DoH', 'DoT', 'DHCP snooping'], 'Signatures = integrity.'],
         ['DNS over TLS uses which port?', 'TCP 853', ['UDP 53', 'TCP 443', 'UDP 123'], 'DoH uses 443.']],
        'n9-dnsts'),
      P('Time: NTP, PTP, NTS', 'Choose NTP, PTP or NTS for a time-sync requirement.',
        `<ul><li><b>NTP</b> — Network Time Protocol, <b>UDP 123</b>. Hierarchy of <b>strata</b>: stratum 0 = atomic/GPS clock, stratum 1 = server attached to it, stratum 2 syncs from 1, and so on. Millisecond accuracy across a network.</li>
<li><b>PTP</b> — Precision Time Protocol (IEEE 1588). <b>Sub-microsecond</b> accuracy using hardware timestamping in switches/NICs. Used in financial trading, power grids, industrial control, 5G.</li>
<li><b>NTS</b> — Network Time Security. Adds <b>cryptographic authentication</b> to NTP so attackers can't feed false time.</li></ul>
<p>Why time matters: log correlation in a SIEM, certificate validity checks, Kerberos authentication (fails if clocks differ by more than ~5 minutes), and accurate incident timelines.</p>`,
        [['Which protocol gives sub-microsecond accuracy with hardware timestamps?', 'PTP', ['NTP', 'NTS', 'SNMP'], 'Precision Time Protocol.'],
         ['Which adds authentication to NTP?', 'NTS', ['PTP', 'DNSSEC', 'TACACS+'], 'Network Time Security.']],
        'n9-time')
    ],
    wrap: { recap: ['DHCP DORA on UDP 67/68. Scope, exclusions, reservations, lease time, options (gateway 3, DNS 6).', 'Relay with ip helper-address on the client-facing interface; missing relay → APIPA.', 'SLAAC: hosts build IPv6 addresses from router advertisements.', 'Resolver → root → TLD → authoritative. Primary/secondary zones; forward/reverse; hosts file first.', 'A, AAAA, CNAME, MX, TXT, NS, PTR, SOA, SRV.', 'DNSSEC = integrity; DoT 853 / DoH 443 = privacy. NTP 123 (strata), PTP (precise), NTS (authenticated).'], lab: 'l-relay' }
  });

  // ===================== 3.5 Access & management =====================
  M('n9-vpn', 'Pick the VPN', 'Site-to-site, client-to-site, tunnels',
    'Pick the best fit.', ['Site-to-site VPN', 'Client-to-site VPN', 'Clientless VPN', 'Split tunnel', 'Full tunnel'],
    [['Permanent encrypted link joining a branch router to HQ', 'Site-to-site VPN', 'Router to router.'],
     ['Sales staff connect their laptops to the office from hotels', 'Client-to-site VPN', 'Software client.'],
     ['Contractor reaches one internal web app through a browser portal, no software installed', 'Clientless VPN', 'TLS/HTML5 portal.'],
     ['Only corporate traffic uses the VPN; Netflix goes straight out the home Internet', 'Split tunnel', 'Saves bandwidth, less control.'],
     ['All traffic, including web browsing, goes through the company firewall', 'Full tunnel', 'Full inspection, more load.']],
    'Full tunnel = more security and visibility. Split tunnel = better performance and less HQ bandwidth.');
  M('n9-mgmt', 'How do you manage it?', 'SSH, console, API, jump box, OOB',
    'Pick the best management method.', ['SSH', 'Console', 'GUI', 'API', 'Jump box', 'Out-of-band management', 'In-band management'],
    [['Encrypted command-line access over the network', 'SSH', 'TCP 22.'],
     ['Brand-new switch with no IP address yet', 'Console', 'Serial/USB cable.'],
     ['Web dashboard for a firewall', 'GUI', 'HTTPS management.'],
     ['A script pushes VLAN changes to 50 switches', 'API', 'Programmatic.'],
     ['Hardened server admins must log into before reaching any device', 'Jump box', 'Single controlled entry point.'],
     ['Reach a router through a separate cellular/console server even when the production network is down', 'Out-of-band management', 'Separate path.'],
     ['Manage devices over the same network that carries user traffic', 'In-band management', 'Lost if the network is down.']],
    'If you can only reach your gear through the network you are fixing, you will lock yourself out. That is why OOB exists.');

  N.add({ id: '3.5', dom: 3, short: 'Network access & management', title: 'Compare and contrast network access and management methods',
    goal: 'Site-to-site and client-to-site VPNs (clientless, split vs full tunnel), SSH/GUI/API/console, jump boxes, and in-band vs out-of-band management.',
    parts: [
      P('VPN types and tunneling choices', 'Choose site-to-site, client-to-site or clientless VPN and split vs full tunnel.',
        `<ul><li><b>Site-to-site VPN</b> — two gateways (routers/firewalls) build a permanent encrypted tunnel, usually <b>IPsec</b>. Users at either site don't run anything.</li>
<li><b>Client-to-site (remote access) VPN</b> — a user's device runs VPN client software (IPsec or SSL/TLS) to reach the office.</li>
<li><b>Clientless VPN</b> — access through a web browser portal over HTTPS; no client install. Limited to web-based apps.</li></ul>
<table><tr><th></th><th>Split tunnel</th><th>Full tunnel</th></tr>
<tr><td>What goes through the VPN</td><td>Only corporate destinations</td><td>Everything</td></tr>
<tr><td>Pro</td><td>Less HQ bandwidth, faster Internet for users</td><td>All traffic inspected by corporate security</td></tr>
<tr><td>Con</td><td>Home Internet traffic unprotected by corporate controls</td><td>More load and latency</td></tr></table>`,
        [['A VPN where only traffic for corporate networks uses the tunnel is:', 'Split tunnel', ['Full tunnel', 'Site-to-site', 'Clientless'], 'Internet traffic goes direct.'],
         ['Which VPN needs no software on the user\'s device?', 'Clientless (browser-based)', ['Client-to-site IPsec', 'Site-to-site', 'Full tunnel'], 'HTTPS portal.']],
        'n9-vpn'),
      P('Management methods and out-of-band access', 'Pick SSH, console, GUI or API access and explain jump boxes and in-band vs out-of-band.',
        `<p><b>Connection methods:</b></p>
<ul><li><b>SSH</b> (TCP 22) — encrypted CLI. Replace Telnet everywhere.</li>
<li><b>Console</b> — physical serial/USB cable. Works with no IP config; used for initial setup and recovery.</li>
<li><b>GUI</b> — web interface over HTTPS.</li>
<li><b>API</b> — REST/NETCONF for automation and integration.</li></ul>
<ul><li><b>Jump box / jump host</b> — one hardened, logged, MFA-protected server that admins must go through to reach management interfaces. Shrinks the attack surface.</li>
<li><b>In-band management</b> — managing devices over the production network. Cheap, but if the network breaks, you lose access.</li>
<li><b>Out-of-band (OOB) management</b> — a separate path: dedicated management network, console servers, or a cellular modem. Still works when production is down.</li></ul>`,
        [['A WAN outage cut off SSH to a remote router. What would still let you in?', 'Out-of-band management (console server/cellular)', ['In-band SSH', 'A split tunnel', 'SNMPv2c'], 'Separate path.'],
         ['Admins must log in to one hardened server before reaching any device. What is it?', 'Jump box', ['Proxy server', 'DMZ', 'Honeypot'], 'Single controlled entry point.']],
        'n9-mgmt')
    ],
    wrap: { recap: ['Site-to-site = gateway to gateway (IPsec). Client-to-site = user software. Clientless = browser portal.', 'Split tunnel: only corporate traffic in the VPN. Full tunnel: everything inspected.', 'SSH 22 (never Telnet), console for no-IP/recovery, GUI over HTTPS, APIs for automation.', 'Jump box = one hardened, logged entry point for admins.', 'In-band shares production; out-of-band survives outages.'], lab: 'n9-mgmt' }
  });
})();
