/* Domain 5.0 Network Troubleshooting — objectives 5.1 to 5.5 */
(function () {
  var N = window.N9, P = N.P, M = N.M, O = N.O, Cc = N.C;

  // ===================== 5.1 Methodology =====================
  M('n9-method-match', 'Which step is this?', 'Methodology actions → step',
    'Each line is something a technician does. Pick the methodology step it belongs to.',
    ['1 Identify the problem', '2 Establish a theory', '3 Test the theory', '4 Plan of action', '5 Implement or escalate', '6 Verify functionality', '7 Document'],
    [['Ask the user what changed and try to reproduce the error', '1 Identify the problem', 'Gather information, duplicate the problem.'],
     ['"I think the new ACL is blocking DNS" — question the obvious first', '2 Establish a theory', 'Probable cause.'],
     ['Temporarily remove the ACL entry to see if names resolve', '3 Test the theory', 'Confirm or reject.'],
     ['Schedule the ACL fix in tonight\'s window and note who is affected', '4 Plan of action', 'Identify potential effects.'],
     ['Apply the corrected ACL (or hand to the security team)', '5 Implement or escalate', 'Do it or escalate.'],
     ['Confirm all users resolve names and add a monitoring check', '6 Verify functionality', 'Plus preventive measures.'],
     ['Record cause, fix and outcome in the ticket', '7 Document', 'Findings, actions, outcomes, lessons learned.']],
    'If the theory is wrong at step 3, go back to step 2 with a new theory (or escalate).');

  N.add({ id: '5.1', dom: 5, short: 'Troubleshooting methodology', title: 'Explain the troubleshooting methodology',
    goal: 'The seven CompTIA troubleshooting steps, in order, and what happens inside each one.',
    parts: [
      P('Steps 1–3: identify, theorize, test', 'Carry out the first three methodology steps correctly.',
        `<p><b>1. Identify the problem</b></p>
<ul><li>Gather information; <b>question users</b>; identify <b>symptoms</b>.</li>
<li>Determine if anything has <b>changed</b> (the most common cause!).</li>
<li><b>Duplicate the problem</b> if possible; approach <b>multiple problems individually</b>.</li></ul>
<p><b>2. Establish a theory of probable cause</b></p>
<ul><li><b>Question the obvious</b> (is it plugged in?).</li>
<li>Consider approaches: <b>top-to-bottom / bottom-to-top</b> OSI, <b>divide and conquer</b>.</li></ul>
<p><b>3. Test the theory to determine the cause</b></p>
<ul><li>If confirmed → move to the plan.</li>
<li>If not → <b>establish a new theory or escalate</b>.</li></ul>
<p>Don't skip step 1. Most wasted troubleshooting hours come from fixing the wrong problem.</p>`,
        [['What is the FIRST step of the troubleshooting methodology?', 'Identify the problem', ['Establish a theory', 'Test the theory', 'Document findings'], 'Gather information first.'],
         ['Your theory is tested and proven wrong. What next?', 'Establish a new theory or escalate', ['Implement the fix anyway', 'Document and close', 'Verify functionality'], 'Back to step 2.']]),
      P('Steps 4–7: plan, implement, verify, document', 'Finish a ticket correctly with a plan, verification and documentation.',
        `<p><b>4. Establish a plan of action</b> to resolve the problem and <b>identify potential effects</b> (who loses service? need a change window?).</p>
<p><b>5. Implement the solution or escalate</b> as necessary.</p>
<p><b>6. Verify full system functionality</b> and, if applicable, <b>implement preventive measures</b> (monitoring, config standards, training).</p>
<p><b>7. Document findings, actions, outcomes and lessons learned</b> — throughout the process, not just at the end.</p>
<p><b>Memory aid</b> — "<i>I Eat Tacos Por Infinite Very Delicious</i>": Identify, Establish, Test, Plan, Implement, Verify, Document.</p>
<p>The paired lab: put all seven steps in order from memory.</p>`,
        [['After implementing a fix, what is the next step?', 'Verify full system functionality and implement preventive measures', ['Document findings', 'Establish a new theory', 'Question users'], 'Step 6.'],
         ['Which step includes identifying potential effects of the fix?', 'Establish a plan of action', ['Identify the problem', 'Test the theory', 'Document findings'], 'Step 4.']],
        'pb-method')
    ],
    wrap: { recap: ['1 Identify the problem (gather info, question users, what changed, duplicate it).', '2 Establish a theory (question the obvious; top-down, bottom-up, divide and conquer).', '3 Test the theory (confirmed → plan; not → new theory or escalate).', '4 Plan of action and identify potential effects.', '5 Implement or escalate. 6 Verify and add preventive measures.', '7 Document findings, actions, outcomes and lessons learned.'], lab: 'n9-method-match' }
  });

  // ===================== 5.2 Cabling & physical interfaces =====================
  M('n9-cablefault', 'Cable fault diagnosis', 'Symptom → cause',
    'Pick the most likely cause.', ['Attenuation', 'Crosstalk', 'EMI / interference', 'Improper termination', 'TX/RX transposed', 'Wrong fiber type', 'Wrong cable category'],
    [['130 m copper run; link flaps and errors grow with distance', 'Attenuation', 'Signal weakens over distance (100 m limit).'],
     ['Pairs untwisted too far at the jack; NEXT failures on the cable tester', 'Crosstalk', 'Signal bleeds between pairs.'],
     ['Errors only when the nearby elevator motor runs', 'EMI / interference', 'Use STP or re-route.'],
     ['Tester shows a miswire: pairs crossed at one end', 'Improper termination', 'Re-terminate to T568A/B.'],
     ['Fiber link has light on both strands but never comes up; swapping one pair\'s ends fixes it', 'TX/RX transposed', 'Transmit must meet receive.'],
     ['Multimode patch cord used with single-mode LR optics', 'Wrong fiber type', 'Match fiber to optic.'],
     ['10GBASE-T link only negotiates 1 Gbps over an old run', 'Wrong cable category', 'Needs Cat 6a for 10G at length.']],
    'Physical faults show up as errors and flapping long before they show up as "down."');
  M('n9-counters', 'Read the interface counters', 'CRC, runts, giants, drops, status',
    'Pick what each symptom means.', ['CRC errors', 'Runts', 'Giants', 'Output drops', 'err-disabled', 'Administratively down', 'Late collisions'],
    [['Frames arrive with a bad checksum — usually cabling or interference', 'CRC errors', 'FCS mismatch.'],
     ['Frames smaller than 64 bytes', 'Runts', 'Often collisions or a bad NIC.'],
     ['Frames larger than 1518 bytes on a non-jumbo port', 'Giants', 'MTU mismatch.'],
     ['Port can\'t send fast enough; buffer overflows during congestion', 'Output drops', 'Congestion.'],
     ['Port shut automatically by a security feature (port security, BPDU guard)', 'err-disabled', 'Fix the cause, then shut/no shut.'],
     ['Port turned off with the shutdown command', 'Administratively down', 'Fix: no shutdown.'],
     ['Collisions after the first 64 bytes on a full-duplex link', 'Late collisions', 'Duplex mismatch.']],
    'show interfaces is the first command for any "slow" or "flaky" link complaint.');
  Cc('n9-poe', 'PoE power budget', 'Can this switch power everything?',
    'A 24-port switch has a <b>370 W</b> PoE budget. You plug in 10 IP phones at <b>7 W</b> each, 6 Wi-Fi 6 APs at <b>25 W</b> each and 4 PTZ cameras at <b>30 W</b> each.',
    [['Total PoE draw in watts', 340, '340 W', '70 + 150 + 120.'],
     ['Watts of budget left over', 30, '30 W', '370 − 340.'],
     ['How many more 25 W APs can be added before the budget is exceeded?', 1, '1', '30 ÷ 25 = 1.'],
     ['Maximum watts per port with 802.3at (PoE+) at the switch (PSE)', 30, '30 W', 'af 15.4 W, at 30 W, bt 60/90 W.']],
    'When the budget is exceeded, the switch denies power to the lowest-priority ports. Devices that need 802.3bt will not run on an 802.3at port.',
    ['Add up each device type: count × watts.', '802.3af = 15.4 W, 802.3at = 30 W, 802.3bt = 60 W (Type 3) / 90 W (Type 4).'], 1);

  N.add({ id: '5.2', dom: 5, short: 'Cabling & physical interface issues', title: 'Given a scenario, troubleshoot common cabling and physical interface issues',
    goal: 'Wrong cable/fiber type, signal degradation, termination and TX/RX faults, interface counters, port states, PoE budget and standards, transceiver mismatch and signal strength.',
    parts: [
      P('Cable problems and signal degradation', 'Diagnose wrong cable type, attenuation, crosstalk, interference, bad terminations and TX/RX swaps.',
        `<ul><li><b>Incorrect cable</b> — single-mode vs multimode mixed up; the wrong category for the speed (Cat 5e/6 where 10G at 100 m needs Cat 6a; Cat 7 is shielded 10G; Cat 8 is 25/40G but only to 30 m); UTP near heavy EMI where STP is needed.</li>
<li><b>Signal degradation</b>:
<ul><li><b>Attenuation</b> — signal fades with distance (copper > 100 m, fiber too long or too many splices/bends).</li>
<li><b>Crosstalk</b> — signal bleeds between pairs (NEXT/FEXT), usually from untwisting pairs too far at the termination.</li>
<li><b>Interference (EMI/RFI)</b> — motors, fluorescent lights, power cables.</li></ul></li>
<li><b>Improper termination</b> — wrong pin order, mixed T568A/T568B, split pairs, bad crimp.</li>
<li><b>TX/RX transposed</b> — on fiber, transmit must connect to the other side's receive. Swap the strands at one end.</li></ul>
<p>Tools: a <b>cable tester/certifier</b> for copper; a <b>light meter</b>, <b>VFL</b> or <b>OTDR</b> for fiber (5.5).</p>`,
        [['A copper run is 140 meters and the link keeps dropping. Most likely cause?', 'Attenuation', ['Crosstalk', 'Wrong VLAN', 'DNS'], 'Exceeds the 100 m limit.'],
         ['A new fiber link shows no link; the strands appear swapped. What is the issue?', 'TX/RX transposed', ['Attenuation', 'EMI', 'Duplex mismatch'], 'Transmit must reach receive.']],
        'n9-cablefault'),
      P('Interface counters and port status', 'Read CRC, runt, giant and drop counters, and fix err-disabled, admin-down and suspended ports.',
        `<p><code>show interfaces</code> counters that matter:</p>
<ul><li><b>CRC errors</b> — frames failed the checksum: bad cable, interference, bad NIC/optic, duplex mismatch.</li>
<li><b>Runts</b> (&lt; 64 bytes) and <b>giants</b> (&gt; 1518 bytes without jumbo frames — MTU mismatch).</li>
<li><b>Drops</b> — input/output queue overflows: congestion or an overloaded device.</li>
<li><b>Increasing</b> counters matter; old ones may be historic. Clear them and watch.</li></ul>
<p><b>Port status</b>:</p>
<ul><li><b>Administratively down</b> — someone typed <code>shutdown</code>. Fix: <code>no shutdown</code>.</li>
<li><b>Error-disabled</b> — the switch shut it for a reason (port security violation, BPDU guard, flapping). Fix the cause, then <code>shutdown</code> / <code>no shutdown</code> (or auto-recovery).</li>
<li><b>Suspended</b> — a link-aggregation member that doesn't match the bundle (or LACP not negotiating).</li></ul>`,
        [['A port shows "err-disabled" after someone plugged in a hub. Likely cause?', 'Port security violation', ['Attenuation', 'Wrong DNS server', 'Native VLAN mismatch'], 'Too many MACs.'],
         ['Giants on an interface usually indicate:', 'An MTU mismatch', ['A duplex mismatch', 'Low PoE budget', 'A routing loop'], 'Frames larger than allowed.']],
        'l-layer1'),
      P('PoE and transceiver problems', 'Troubleshoot PoE budget/standard issues and transceiver mismatch or weak signal.',
        `<p><b>Power over Ethernet</b> standards (power at the switch port):</p>
<table><tr><th>Standard</th><th>Name</th><th>Watts</th></tr><tr><td>802.3af</td><td>PoE</td><td>15.4 W</td></tr><tr><td>802.3at</td><td>PoE+</td><td>30 W</td></tr><tr><td>802.3bt</td><td>PoE++</td><td>60 W (Type 3) / 90 W (Type 4)</td></tr></table>
<ul><li><b>Power budget exceeded</b> — the switch has a total PoE budget; once used up, new devices don't power on (or low-priority ports lose power). Symptom: some phones/APs dead, others fine.</li>
<li><b>Incorrect standard</b> — a device needing 802.3bt on an 802.3at switch boots in a limited mode or not at all.</li></ul>
<p><b>Transceivers</b>:</p>
<ul><li><b>Mismatch</b> — wrong speed, wavelength, fiber type, or unsupported vendor optic → no link.</li>
<li><b>Signal strength</b> — check <b>dBm</b> light levels with <code>show interfaces transceiver</code>. Too low (dirty connector, too far, bad splice) or too high (short link with a long-range optic — needs an attenuator).</li></ul>`,
        [['New APs on a switch won\'t power on, but older phones still work. Most likely?', 'PoE power budget exceeded', ['Duplex mismatch', 'DNS failure', 'Wrong SSID'], 'Budget used up.'],
         ['How much power does 802.3at (PoE+) supply per port?', '30 W', ['15.4 W', '60 W', '90 W'], 'af 15.4, at 30, bt 60/90.']],
        'n9-poe')
    ],
    wrap: { recap: ['Wrong cable/fiber type, attenuation (distance), crosstalk (untwisted pairs), EMI, bad termination, TX/RX transposed.', 'Counters: CRC (cabling/duplex), runts, giants (MTU), drops (congestion). Watch increasing counters.', 'Admin down → no shutdown. err-disabled → fix the cause, bounce the port. Suspended → bundle mismatch.', 'PoE af 15.4 W, at 30 W, bt 60/90 W; watch the switch power budget.', 'Transceivers must match; check dBm light levels for weak or hot signal.'], lab: 'n9-counters' }
  });

  // ===================== 5.3 Network service issues =====================
  M('n9-ipfault', 'Addressing faults', 'Symptom → cause',
    'Pick the most likely cause.', ['Address pool exhaustion', 'Incorrect default gateway', 'Duplicate IP address', 'Incorrect subnet mask', 'Incorrect VLAN assignment', 'Missing route'],
    [['New laptops get 169.254.x.x while existing ones work; the scope is a /26 with 62 addresses', 'Address pool exhaustion', 'DHCP scope full.'],
     ['PC reaches local hosts but nothing on other subnets', 'Incorrect default gateway', 'Off-subnet traffic has nowhere to go.'],
     ['Two PCs show "address conflict" warnings and drop off intermittently', 'Duplicate IP address', 'Same IP, two MACs.'],
     ['PC can reach some local hosts but not others in the same subnet', 'Incorrect subnet mask', 'Wrong idea of what is "local."'],
     ['Port shows link, but the PC lands in the printer subnet', 'Incorrect VLAN assignment', 'Wrong access VLAN.'],
     ['Traceroute dies at the core router; that router has no entry for the destination', 'Missing route', 'Routing table problem.']],
    'Check in order: link → VLAN → IP/mask → gateway → DNS. ipconfig/ip addr, ping gateway, ping remote IP, then ping by name.');

  N.add({ id: '5.3', dom: 5, short: 'Network service issues', title: 'Given a scenario, troubleshoot common issues with network services',
    goal: 'STP loops and root problems, wrong VLANs, ACLs, route selection and default routes, DHCP pool exhaustion, wrong gateway, duplicate IP and wrong mask.',
    parts: [
      P('Switching issues: STP and VLANs', 'Troubleshoot loops, root bridge selection, port roles/states and wrong VLAN assignments.',
        `<ul><li><b>Network loop</b> — STP disabled or a loop through an unmanaged switch → <b>broadcast storm</b>: CPU spikes, MAC table flapping, the whole VLAN becomes unusable. Fix: find and break the loop; enable STP and BPDU guard.</li>
<li><b>Root bridge selection</b> — if you never set priorities, the switch with the lowest MAC (often the oldest, slowest) becomes root and traffic takes bad paths. Fix: set the core switch's priority low (e.g. 4096).</li>
<li><b>Port roles and states</b> — a port stuck in <b>blocking</b> isn't broken — STP chose it as the backup. Check with <code>show spanning-tree</code> before "fixing" it.</li>
<li><b>Incorrect VLAN assignment</b> — link is up but the device gets the wrong subnet (or none). Check <code>show vlan brief</code> and the trunk's allowed VLAN list / native VLAN.</li></ul>
<p>The paired lab is a real ticket: three users can't reach the server — find all the faults without hints.</p>`,
        [['A VLAN suddenly has 100% switch CPU and MAC addresses flapping between ports. Likely cause?', 'A Layer 2 loop / broadcast storm', ['DNS failure', 'Expired certificate', 'Wrong NTP server'], 'Classic loop symptoms.'],
         ['An old access switch became the STP root. Best fix?', 'Lower the bridge priority on the core switch', ['Disable STP', 'Raise the core switch\'s priority', 'Remove all trunks'], 'Lowest bridge ID wins.']],
        'l-ts1'),
      P('Routing and ACL issues', 'Troubleshoot routing tables, default routes, route selection and ACLs.',
        `<ul><li><b>Missing or wrong route</b> — <code>show ip route</code>: is the destination there? Via the right next hop? Remember routing is <b>two-way</b>.</li>
<li><b>Default route</b> missing on an edge router → Internet unreachable while internal routes work.</li>
<li><b>Route selection</b> — a more specific (longer prefix) route you forgot about may be pulling traffic the wrong way; or a static route (AD 1) overrides a dynamic one.</li>
<li><b>ACLs</b> — the <b>implicit deny</b> and rule order cause most problems. Check hit counters (<code>show access-lists</code>), direction (in/out) and placement. Ping may work while TCP 443 is blocked.</li></ul>
<p>Use <code>traceroute</code> to see where packets stop, then inspect that hop's routes and ACLs. The paired lab ticket mixes a routing fault, an interface fault and an ACL fault.</p>`,
        [['Users reach internal servers but not the Internet. The edge router\'s table has no 0.0.0.0/0. Fix?', 'Add a default route to the ISP', ['Add a VLAN', 'Change the DNS record', 'Enable PoE'], 'Gateway of last resort.'],
         ['Ping to a server works but HTTPS fails. Which is the most likely cause?', 'An ACL or firewall blocking TCP 443', ['Wrong subnet mask', 'Bad cable', 'Wrong VLAN'], 'ICMP allowed, TCP 443 denied.']],
        'l-ts2'),
      P('Addressing issues', 'Troubleshoot DHCP pool exhaustion, wrong gateway, duplicate IPs and wrong masks.',
        `<ul><li><b>Address pool exhaustion</b> — the DHCP scope is full; new clients get APIPA (169.254.x.x). Fix: bigger scope, shorter lease (guest Wi-Fi), remove stale leases.</li>
<li><b>Incorrect default gateway</b> — local traffic works, remote fails. The gateway must be in the host's own subnet.</li>
<li><b>Duplicate IP address</b> — "address conflict" warnings, intermittent connectivity for both hosts; ARP shows the IP flipping between MACs. Often a static IP inside the DHCP range — use exclusions/reservations.</li>
<li><b>Incorrect IP address / subnet mask</b> — a host with the wrong mask thinks some local hosts are remote (or the reverse), so only part of the subnet works.</li></ul>
<p>Quick checklist: <code>ipconfig /all</code> → ping the gateway → ping a remote IP → ping a name.</p>`,
        [['Several new devices get 169.254.x.x while existing ones work fine. Most likely?', 'DHCP pool exhaustion', ['Wrong DNS server', 'Duplicate MAC', 'STP loop'], 'No addresses left.'],
         ['A host reaches its own subnet but nothing else. Most likely?', 'Wrong default gateway', ['Wrong DNS suffix', 'Bad CRC', 'Native VLAN mismatch'], 'Off-subnet traffic fails.']],
        'n9-ipfault')
    ],
    wrap: { recap: ['Loops → broadcast storm, MAC flapping; fix with STP/BPDU guard. Set the root bridge on purpose.', 'Blocking ports may be correct STP behavior. Wrong VLAN → wrong subnet; check access VLAN, trunk allowed list, native VLAN.', 'Routing: missing route, missing default route, forgotten return path, more specific route winning.', 'ACLs: order, implicit deny, direction, placement; ping working ≠ TCP port allowed.', 'Pool exhaustion → APIPA. Wrong gateway → local only. Duplicate IP → conflicts. Wrong mask → partial reachability.'], lab: 'l-war' }
  });

  // ===================== 5.4 Performance =====================
  M('n9-perf', 'Performance terms', 'Bandwidth, throughput, latency, jitter, loss',
    'Pick the term for each symptom or definition.', ['Bandwidth', 'Throughput', 'Latency', 'Jitter', 'Packet loss', 'Congestion', 'Bottleneck'],
    [['The link is rated at 1 Gbps', 'Bandwidth', 'Theoretical capacity.'],
     ['File copies actually move at 610 Mbps on that link', 'Throughput', 'What you really get.'],
     ['Ping round-trip time to the branch is 85 ms', 'Latency', 'Delay.'],
     ['Voice sounds robotic because delay varies between 10 and 90 ms', 'Jitter', 'Variation in delay.'],
     ['3% of pings get no reply and TCP retransmissions climb', 'Packet loss', 'Lost packets.'],
     ['Too much traffic contends for one link at 9 a.m.', 'Congestion', 'Demand exceeds capacity.'],
     ['10 Gbps LAN feeding a 100 Mbps WAN link', 'Bottleneck', 'Slowest point limits the path.']],
    'Voice/video care most about latency (<150 ms), jitter (<30 ms) and loss (<1%).');
  M('n9-wifits', 'Wireless trouble', 'Symptom → cause',
    'Pick the most likely cause.', ['Channel overlap', 'Interference', 'Insufficient coverage', 'Signal degradation', 'Client disassociation', 'Roaming misconfiguration'],
    [['Three neighboring 2.4 GHz APs are on channels 1, 3 and 6', 'Channel overlap', 'Only 1, 6, 11 are clean.'],
     ['Wi-Fi drops every time the break-room microwave runs', 'Interference', '2.4 GHz noise.'],
     ['Users in the far corner of the warehouse have no signal at all', 'Insufficient coverage', 'Need another AP.'],
     ['Signal is weak behind the new concrete and metal shelving', 'Signal degradation', 'Absorption/reflection.'],
     ['Clients repeatedly get kicked off and must reconnect (or deauth floods)', 'Client disassociation', 'Could be an attack or misconfig.'],
     ['Calls drop when walking between APs that use different SSIDs/security settings', 'Roaming misconfiguration', 'APs must match for seamless roaming.']],
    'Start with a Wi-Fi analyzer: signal strength (RSSI), noise, channel use and how many APs a client can hear.');

  N.add({ id: '5.4', dom: 5, short: 'Performance issues', title: 'Given a scenario, troubleshoot common performance issues',
    goal: 'Congestion and bottlenecks, bandwidth vs throughput vs capacity, latency, packet loss, jitter, and wireless interference, coverage, disassociation and roaming.',
    parts: [
      P('Wired performance: congestion, latency, loss, jitter', 'Diagnose congestion, bottlenecks, latency, packet loss and jitter.',
        `<ul><li><b>Bandwidth</b> = capacity of the link. <b>Throughput</b> = what you actually achieve. <b>Capacity</b> planning keeps peak use below ~70–80%.</li>
<li><b>Congestion / contention</b> — more traffic than the link can carry; queues fill, packets drop. Fixes: more bandwidth, QoS, move traffic (backups at night).</li>
<li><b>Bottleneck</b> — the slowest point in the path limits the whole path (a 100 Mbps uplink, an overloaded firewall).</li>
<li><b>Latency</b> — delay (ms). Distance, queuing, satellite links, overloaded devices.</li>
<li><b>Packet loss</b> — dropped packets: congestion, errors (CRC), bad links. TCP slows down; voice breaks up.</li>
<li><b>Jitter</b> — variation in latency. Kills voice/video. Fix with QoS and jitter buffers.</li></ul>
<p>Measure with ping (latency, loss), iperf/speed tests (throughput), and SNMP/flow tools (utilization, top talkers).</p>`,
        [['Voice calls sound choppy because packet delay varies widely. Which metric?', 'Jitter', ['Bandwidth', 'Throughput', 'MTU'], 'Variation in delay.'],
         ['A 1 Gbps link only moves 400 Mbps in practice. The 400 Mbps is the:', 'Throughput', ['Bandwidth', 'Latency', 'Jitter'], 'Actual achieved rate.']],
        'n9-perf'),
      P('Wireless performance issues', 'Diagnose channel overlap, interference, coverage gaps, disassociation and roaming problems.',
        `<ul><li><b>Interference</b> — non-Wi-Fi sources (microwaves, Bluetooth, cordless phones) and <b>channel overlap</b> with neighboring APs (co-channel and adjacent-channel). Fix: proper channel plan (1/6/11), move to 5/6 GHz, narrower channels.</li>
<li><b>Signal degradation or loss</b> — distance, walls (concrete, metal, glass), reflections. Check RSSI (−67 dBm or better for voice).</li>
<li><b>Insufficient coverage</b> — dead zones; add APs based on a site survey, don't just raise power (clients can't shout back).</li>
<li><b>Client disassociation issues</b> — clients repeatedly dropped: weak signal, mismatched settings, overloaded AP, or a <b>deauthentication attack</b>.</li>
<li><b>Roaming misconfiguration</b> — APs with different SSIDs/security/VLANs or missing fast-roaming (802.11r) settings → calls drop when walking between APs.</li></ul>`,
        [['Neighboring 2.4 GHz APs use channels 1, 2 and 3. What is the problem?', 'Channel overlap', ['Insufficient coverage', 'Jitter on the WAN', 'Wrong SSID'], 'Use 1, 6, 11.'],
         ['Why not fix a coverage gap by just raising AP power to maximum?', 'Clients still can\'t transmit back that far, and interference increases', ['It breaks WPA3', 'APs can\'t change power', 'It changes the SSID'], 'Coverage is two-way.']],
        'n9-wifits')
    ],
    wrap: { recap: ['Bandwidth = capacity; throughput = actual; plan capacity below ~70–80% peak.', 'Congestion and bottlenecks cause drops and delay; fix with capacity, QoS, rescheduling.', 'Latency = delay; jitter = variation; packet loss = drops. Voice: <150 ms, <30 ms jitter, <1% loss.', 'Wireless: interference and channel overlap (use 1/6/11, 5/6 GHz), signal degradation, coverage gaps.', 'Client disassociation (weak signal, overload, deauth attack); roaming needs matching SSID/security/VLAN.'], lab: 'n9-wifits' }
  });

  // ===================== 5.5 Tools =====================
  M('n9-cmd', 'Pick the command', 'Software and CLI tools',
    'Pick the best tool or command.', ['ping', 'traceroute / tracert', 'nslookup / dig', 'tcpdump', 'netstat', 'ipconfig / ip addr', 'arp -a', 'nmap', 'Protocol analyzer'],
    [['Is the gateway reachable, and what is the round-trip time?', 'ping', 'ICMP echo.'],
     ['At which hop do packets to the branch stop?', 'traceroute / tracert', 'Uses TTL expiry.'],
     ['What IP does mail.example.com resolve to, and from which server?', 'nslookup / dig', 'DNS queries.'],
     ['Capture packets on a Linux server\'s eth0 to a file', 'tcpdump', 'CLI capture.'],
     ['Which ports is this server listening on and what connections are open?', 'netstat', 'Sockets.'],
     ['What IP, mask and gateway does this host have?', 'ipconfig / ip addr', 'Local config.'],
     ['Which MAC address does this host have cached for 10.1.1.1?', 'arp -a', 'ARP cache.'],
     ['Which hosts are up on 10.1.1.0/24 and what services do they run?', 'nmap', 'Scanner.'],
     ['Decode a capture to read each TCP flag and DNS field', 'Protocol analyzer', 'Wireshark.']],
    'Classic flow: ipconfig → ping gateway → ping remote → traceroute → nslookup.');
  M('n9-hwtool', 'Pick the hardware tool', 'Toner, tester, TAP, analyzer, VFL',
    'Pick the best tool.', ['Toner probe', 'Cable tester', 'TAP', 'Wi-Fi analyzer', 'Visual fault locator', 'OTDR', 'Speed tester'],
    [['Find which unlabeled cable in a bundle goes to office 212', 'Toner probe', 'Tone and probe.'],
     ['Check a new patch cable for opens, shorts and miswires', 'Cable tester', 'Wiremap.'],
     ['Copy all traffic on a link, including errored frames, to an IDS', 'TAP', 'Inline hardware copy.'],
     ['See channel use, signal strength and noise in the lobby', 'Wi-Fi analyzer', 'RF survey.'],
     ['Shine red laser light to find a break or tight bend in a short fiber patch', 'Visual fault locator', 'VFL.'],
     ['Measure the exact distance to a break in a 12 km fiber', 'OTDR', 'Optical time-domain reflectometer.'],
     ['Confirm the ISP is actually delivering the 500 Mbps you pay for', 'Speed tester', 'iperf/speed test.']],
    'Toner finds, tester verifies, TAP copies, analyzer listens, VFL/OTDR find fiber faults.');
  M('n9-show', 'Device show commands', 'Command → what it tells you',
    'Pick the command that answers each question on a switch/router.', ['show mac-address-table', 'show ip route', 'show interfaces', 'show running-config', 'show arp', 'show vlan', 'show power inline', 'show cdp neighbors / LLDP'],
    [['Which port is MAC 00:1a:2b:3c:4d:5e on?', 'show mac-address-table', 'CAM table.'],
     ['Where will the router send packets for 10.50.0.0/16?', 'show ip route', 'Routing table.'],
     ['Are there CRC errors or drops on Gi0/1?', 'show interfaces', 'Counters + status.'],
     ['What is the current configuration, including ACLs?', 'show running-config', 'Running config.'],
     ['Which MAC does the router have for 192.168.1.20?', 'show arp', 'IP-to-MAC.'],
     ['Which ports are in VLAN 20?', 'show vlan', 'VLAN database + ports.'],
     ['How much PoE is each port drawing and what\'s left in the budget?', 'show power inline', 'PoE.'],
     ['Which device and port is plugged into Gi0/24?', 'show cdp neighbors / LLDP', 'Discovery protocols.']],
    'In the domain wrap-up ticket you will use most of these to find the faults.');

  N.add({ id: '5.5', dom: 5, short: 'Troubleshooting tools & protocols', title: 'Given a scenario, use the appropriate tool or protocol to solve networking issues',
    goal: 'Protocol analyzers, ping, traceroute, nslookup/dig, tcpdump, netstat, ipconfig/ip, arp, nmap, LLDP/CDP, speed testers, hardware tools and device show commands.',
    parts: [
      P('Command-line tools, part 1', 'Use ping, traceroute, nslookup/dig and tcpdump/protocol analyzers.',
        `<ul><li><b>ping</b> — ICMP echo: is it reachable, how much latency/loss? <code>ping -t</code> (Windows) runs continuously; <code>-l</code>/<code>-s</code> sets size (find MTU issues with the DF bit).</li>
<li><b>traceroute</b> (Linux/macOS) / <b>tracert</b> (Windows) — lists every hop by sending packets with increasing TTL; shows where traffic stops or slows. Repeating hops = routing loop.</li>
<li><b>nslookup</b> / <b>dig</b> — query DNS directly: which IP a name resolves to, which server answered, specific record types (<code>dig example.com MX</code>).</li>
<li><b>tcpdump</b> — command-line packet capture: <code>tcpdump -i eth0 port 53 -w dns.pcap</code>.</li>
<li><b>Protocol analyzer</b> (Wireshark) — decodes captures field by field: TCP flags, retransmissions, DNS responses, TLS handshakes.</li></ul>`,
        [['Which tool shows each router hop on the way to a destination?', 'traceroute / tracert', ['ping', 'netstat', 'arp'], 'TTL-based.'],
         ['Which tool queries a specific DNS record type such as MX?', 'dig (or nslookup)', ['tracert', 'tcpdump', 'ipconfig'], 'DNS lookup tools.']],
        'n9-cmd'),
      P('Command-line tools, part 2', 'Use netstat, ipconfig/ifconfig/ip, arp, nmap, LLDP/CDP and speed testers.',
        `<ul><li><b>ipconfig</b> (Windows) / <b>ifconfig</b> (legacy Unix) / <b>ip</b> (Linux: <code>ip addr</code>, <code>ip route</code>) — show and change local IP settings. <code>ipconfig /all</code>, <code>/release</code>, <code>/renew</code>, <code>/flushdns</code>.</li>
<li><b>netstat</b> — listening ports and active connections (<code>netstat -an</code>); spot unexpected listeners.</li>
<li><b>arp</b> — view/clear the ARP cache (<code>arp -a</code>); spot duplicate IPs or ARP spoofing (one IP, changing MAC).</li>
<li><b>nmap</b> — scan for live hosts, open ports, service versions and OS (only on networks you're authorized to scan).</li>
<li><b>LLDP / CDP</b> — neighbor discovery: which device and port is on the other end of this cable (LLDP is the open standard; CDP is Cisco).</li>
<li><b>Speed tester</b> / iperf — measure real throughput end to end.</li></ul>`,
        [['Which command shows which ports a Windows server is listening on?', 'netstat -an', ['arp -a', 'tracert', 'nslookup'], 'Sockets and connections.'],
         ['Which protocol tells you the neighboring switch and port on a multi-vendor network?', 'LLDP', ['CDP', 'SNMP', 'STP'], 'Open-standard discovery.']]),
      P('Hardware tools', 'Choose a toner, cable tester, TAP, Wi-Fi analyzer or visual fault locator.',
        `<ul><li><b>Toner probe</b> (tone generator + probe) — find which cable in a bundle or patch panel goes where.</li>
<li><b>Cable tester</b> — checks wiremap (opens, shorts, miswires, split pairs). A <b>certifier</b> also proves the run meets its category (Cat 6a) for length, loss and crosstalk.</li>
<li><b>TAP</b> (test access point) — hardware inserted inline that copies all traffic to a monitor port, including errors.</li>
<li><b>Wi-Fi analyzer</b> — shows SSIDs, channels, signal strength (RSSI), noise and interference.</li>
<li><b>Visual fault locator (VFL)</b> — bright red laser that glows at breaks or tight bends in short fiber runs.</li>
<li><b>OTDR</b> — finds the distance to a break, splice or bend on long fiber. <b>Light meter</b> measures received power (dBm).</li>
<li><b>Multimeter</b> — voltage/continuity (power, PoE, grounding).</li></ul>`,
        [['A tech must find which unlabeled cable runs to a specific wall jack. Which tool?', 'Toner probe', ['OTDR', 'Wi-Fi analyzer', 'Protocol analyzer'], 'Tone and trace.'],
         ['Which tool shows a break in a short fiber patch cord by glowing red at the fault?', 'Visual fault locator', ['Cable tester', 'Toner', 'Loopback plug'], 'VFL.']],
        'n9-hwtool'),
      P('Device show commands', 'Use show commands to read the MAC table, routes, interfaces, config, ARP, VLANs and PoE.',
        `<table><tr><th>Command</th><th>Answers</th></tr>
<tr><td><code>show mac address-table</code></td><td>Which port a MAC is on</td></tr>
<tr><td><code>show ip route</code></td><td>Routing table, AD/metric, default route</td></tr>
<tr><td><code>show interfaces</code> / <code>show ip interface brief</code></td><td>Status, speed/duplex, errors, drops / quick up-down list</td></tr>
<tr><td><code>show running-config</code></td><td>Current configuration</td></tr>
<tr><td><code>show arp</code></td><td>IP-to-MAC mappings</td></tr>
<tr><td><code>show vlan brief</code></td><td>VLANs and their access ports</td></tr>
<tr><td><code>show power inline</code></td><td>PoE per port and remaining budget</td></tr>
<tr><td><code>show cdp neighbors</code> / <code>show lldp neighbors</code></td><td>What is connected to each port</td></tr></table>
<p>Exam tip: questions often show you the output and ask what's wrong — look for <b>down/down</b>, <b>administratively down</b>, rising <b>CRC</b>, wrong VLAN, or a missing route.</p>`,
        [['Which command shows which VLAN each access port belongs to?', 'show vlan brief', ['show ip route', 'show arp', 'show power inline'], 'VLAN database.'],
         ['Which command quickly lists every interface with its IP and up/down status?', 'show ip interface brief', ['show running-config', 'show mac address-table', 'show cdp neighbors'], 'One line per interface.']],
        'n9-show')
    ],
    wrap: { recap: ['ping (reachability, latency, loss), traceroute/tracert (hops), nslookup/dig (DNS), tcpdump + Wireshark (captures).', 'ipconfig/ifconfig/ip (local config), netstat (ports), arp (cache), nmap (scan), LLDP/CDP (neighbors), speed tests.', 'Toner (find cables), cable tester/certifier, TAP (copy traffic), Wi-Fi analyzer, VFL/OTDR/light meter for fiber.', 'show mac address-table, ip route, interfaces, running-config, arp, vlan, power inline, cdp/lldp neighbors.'], lab: 'n9-show' }
  });
})();
