/* Domain 2.0 Network Implementation — objectives 2.1 to 2.4 */
(function () {
  var N = window.N9, P = N.P, M = N.M, O = N.O, Cc = N.C;

  // ===================== 2.1 Routing =====================
  M('n9-routesel', 'Which route wins?', 'Prefix length, AD, metric',
    'A router has these routes: <code>10.0.0.0/8 via OSPF [110/20]</code>, <code>10.1.0.0/16 static [1/0]</code>, <code>10.1.5.0/24 via EIGRP [90/3072]</code>, <code>10.1.5.0/24 via OSPF [110/2]</code>, <code>0.0.0.0/0 static [1/0]</code>. Pick the route used for each destination.',
    ['10.0.0.0/8 OSPF', '10.1.0.0/16 static', '10.1.5.0/24 EIGRP', '10.1.5.0/24 OSPF', '0.0.0.0/0 default'],
    [['Packet to 10.1.5.9', '10.1.5.0/24 EIGRP', 'Longest prefix (/24). Two /24s: EIGRP AD 90 beats OSPF 110.'],
     ['Packet to 10.1.200.4', '10.1.0.0/16 static', '/16 is the longest match.'],
     ['Packet to 10.77.1.1', '10.0.0.0/8 OSPF', 'Only the /8 matches.'],
     ['Packet to 8.8.8.8', '0.0.0.0/0 default', 'Nothing else matches.'],
     ['Which 10.1.5.0/24 route is installed in the table?', '10.1.5.0/24 EIGRP', 'Lower AD wins between protocols; metric only compares within one protocol.']],
    'Order of decision: 1) longest prefix, 2) lowest administrative distance, 3) lowest metric.');
  M('n9-dyn', 'Routing protocol picker', 'OSPF, EIGRP, BGP',
    'Pick the routing protocol.', ['OSPF', 'EIGRP', 'BGP', 'Static route'],
    [['Open-standard link-state IGP using areas and cost (AD 110)', 'OSPF', 'Area 0 backbone.'],
     ['Cisco advanced distance-vector IGP with AD 90', 'EIGRP', 'Fast convergence, DUAL.'],
     ['Path-vector protocol that routes between ISPs / autonomous systems', 'BGP', 'The Internet\'s routing protocol.'],
     ['Stub branch with one link to HQ; no protocol overhead wanted', 'Static route', 'Simple default route.'],
     ['Your company connects to two ISPs and must advertise its own public prefix', 'BGP', 'Multihoming.'],
     ['Multi-vendor campus needs a dynamic interior protocol', 'OSPF', 'Open standard.']],
    'IGPs (OSPF, EIGRP) route inside one organization. BGP (an EGP) routes between organizations.');
  M('n9-nat', 'NAT types', 'Static NAT, dynamic NAT, PAT',
    'Pick the NAT type for each scenario.', ['Static NAT', 'Dynamic NAT', 'PAT (NAT overload)'],
    [['Web server 10.1.1.10 must always appear as 203.0.113.10 for inbound traffic', 'Static NAT', 'One-to-one, permanent.'],
     ['200 users share one public IP, told apart by source port', 'PAT (NAT overload)', 'Many-to-one.'],
     ['Inside hosts borrow any free address from a pool of 8 public IPs', 'Dynamic NAT', 'Many-to-many, first come.'],
     ['A home router translating every device to the ISP address', 'PAT (NAT overload)', 'Most common NAT.'],
     ['Mail server needs a fixed public address so MX records work', 'Static NAT', 'Inbound needs a fixed mapping.']],
    'PAT is what most people mean by "NAT." Static NAT is for servers that must be reachable from outside.');
  M('n9-fhrp', 'Gateway redundancy', 'FHRP terms',
    'Pick the term for each description.', ['HSRP', 'VRRP', 'Virtual IP (VIP)', 'Active / master router', 'Standby / backup router'],
    [['Cisco-proprietary first hop redundancy protocol', 'HSRP', 'Hot Standby Router Protocol.'],
     ['Open-standard first hop redundancy protocol', 'VRRP', 'Virtual Router Redundancy Protocol.'],
     ['Address configured as the PCs\' default gateway, shared by two routers', 'Virtual IP (VIP)', 'Not owned by one physical box.'],
     ['Router currently answering for the virtual IP', 'Active / master router', 'HSRP active, VRRP master.'],
     ['Router that takes over when hellos stop', 'Standby / backup router', 'Failover.']],
    'Hosts keep the same gateway address; the routers decide among themselves who answers.');

  N.add({ id: '2.1', dom: 2, short: 'Routing technologies', title: 'Explain characteristics of routing technologies',
    goal: 'Route selection (prefix, AD, metric), static and dynamic routing (OSPF, EIGRP, BGP), NAT/PAT, FHRP with a VIP, and subinterfaces.',
    parts: [
      P('How a router picks a route', 'Use prefix length, administrative distance and metric to predict the chosen route.',
        `<p>A router forwards each packet by looking up its destination in the <b>routing table</b>. If several routes match, it decides in this order:</p>
<ol><li><b>Longest prefix match</b> — the most specific route wins. A /24 beats a /16 beats a /8 beats 0.0.0.0/0.</li>
<li><b>Administrative distance (AD)</b> — if two sources offer the <i>same</i> prefix, the more trusted source wins (lower is better).</li>
<li><b>Metric</b> — if the same protocol offers several paths, the lowest metric (cost, hops, bandwidth/delay) wins. Equal metrics = load sharing (ECMP).</li></ol>
<table><tr><th>Source</th><th>AD</th></tr><tr><td>Directly connected</td><td>0</td></tr><tr><td>Static</td><td>1</td></tr><tr><td>eBGP</td><td>20</td></tr><tr><td>EIGRP</td><td>90</td></tr><tr><td>OSPF</td><td>110</td></tr><tr><td>RIP</td><td>120</td></tr><tr><td>iBGP</td><td>200</td></tr></table>
<p>In <code>show ip route</code>, <code>[110/20]</code> means AD 110, metric 20.</p>`,
        [['Routes 10.0.0.0/8 and 10.1.1.0/24 both exist. Where does 10.1.1.5 go?', 'The 10.1.1.0/24 route', ['The 10.0.0.0/8 route', 'Both, load balanced', 'The default route'], 'Longest prefix wins first.'],
         ['OSPF and EIGRP both offer 172.16.0.0/16. Which is installed?', 'EIGRP (AD 90)', ['OSPF (AD 110)', 'Both', 'Whichever has the lower metric'], 'AD compares different sources.']],
        'n9-routesel'),
      P('Static and default routes', 'Configure static and default routes and know when they make sense.',
        `<p>A <b>static route</b> is typed by an admin: <code>ip route 192.168.2.0 255.255.255.0 10.0.12.2</code> (network, mask, next hop).</p>
<ul><li><b>Pros:</b> no CPU/bandwidth overhead, predictable, secure (nothing to spoof).</li>
<li><b>Cons:</b> does not adapt to failures, does not scale.</li>
<li><b>Default route</b> (gateway of last resort): <code>ip route 0.0.0.0 0.0.0.0 &lt;ISP next hop&gt;</code> — used when nothing more specific matches. Perfect for stub branches.</li>
<li><b>Floating static route</b> — a backup static with a higher AD (e.g. 200). It only enters the table if the primary route disappears.</li></ul>
<p><b>Routing is two-way:</b> the most common lab mistake is adding a route to the far network on R1 but forgetting the return route on R2. Pings then fail even though packets arrive.</p>`,
        [['What does ip route 0.0.0.0 0.0.0.0 203.0.113.1 create?', 'A default route', ['A host route', 'A floating static route', 'An OSPF route'], 'Matches every destination.'],
         ['R1 has a route to LAN B but pings from LAN A to LAN B fail. Most likely?', 'R2 has no route back to LAN A', ['STP is blocking', 'The cable is crossover', 'DNS is down'], 'Return path missing.']],
        'l-static'),
      P('Dynamic routing: OSPF, EIGRP, BGP', 'Compare OSPF, EIGRP and BGP and pick one for a scenario.',
        `<p>Dynamic protocols share routes automatically and reroute around failures.</p>
<table><tr><th></th><th>OSPF</th><th>EIGRP</th><th>BGP</th></tr>
<tr><td>Type</td><td>Link-state IGP</td><td>Advanced distance-vector IGP</td><td>Path-vector EGP</td></tr>
<tr><td>Metric</td><td>Cost (bandwidth)</td><td>Bandwidth + delay</td><td>Path attributes (AS path…)</td></tr>
<tr><td>AD</td><td>110</td><td>90 (internal)</td><td>20 eBGP / 200 iBGP</td></tr>
<tr><td>Standard</td><td>Open</td><td>Cisco (now published)</td><td>Open</td></tr>
<tr><td>Use</td><td>Enterprise, multi-vendor</td><td>Cisco shops</td><td>Between ISPs/organizations</td></tr></table>
<ul><li><b>OSPF</b> uses <b>areas</b>; area 0 is the backbone. Every router in an area shares the same link-state map and runs Dijkstra's SPF.</li>
<li><b>BGP</b> connects <b>autonomous systems</b> (AS numbers) — it runs the Internet and is used when you connect to two ISPs (multihoming).</li>
<li><b>Convergence</b> = time for all routers to agree after a change. Faster = less outage.</li></ul>`,
        [['Which routing protocol connects different autonomous systems on the Internet?', 'BGP', ['OSPF', 'EIGRP', 'RIP'], 'Path-vector EGP.'],
         ['Which OSPF area is the backbone?', 'Area 0', ['Area 1', 'Area 100', 'Any area'], 'All areas connect to area 0.']],
        'n9-dyn'),
      P('NAT and PAT', 'Choose static NAT, dynamic NAT or PAT for a scenario.',
        `<p><b>NAT</b> rewrites IP addresses as packets cross a router/firewall — usually private RFC 1918 inside ↔ public outside.</p>
<ul><li><b>Static NAT</b> — one inside address ↔ one public address, permanently. Used for servers that must be reachable from the Internet.</li>
<li><b>Dynamic NAT</b> — inside hosts take addresses from a public <b>pool</b>, first come first served. Runs out when the pool is empty.</li>
<li><b>PAT</b> (port address translation, "NAT overload") — many inside hosts share <b>one</b> public IP; the router tracks each flow by a unique source port. This is what every home router does.</li></ul>
<p><b>NAT terms:</b> <i>inside local</i> = the private address; <i>inside global</i> = the public address it becomes.</p>
<p>NAT saves IPv4 addresses and hides internal addressing, but it breaks true end-to-end connectivity (some VPNs need NAT-T; inbound connections need static mappings or port forwards).</p>`,
        [['Many internal hosts share one public IP using different source ports. Which type?', 'PAT', ['Static NAT', 'Dynamic NAT', 'NAT64'], 'NAT overload.'],
         ['A web server must always be reachable at the same public address. Which type?', 'Static NAT', ['PAT', 'Dynamic NAT', 'APIPA'], 'Fixed one-to-one mapping.']],
        'n9-nat'),
      P('Subinterfaces and router-on-a-stick', 'Route between VLANs on one router link using 802.1Q subinterfaces.',
        `<p>Hosts in different VLANs are in different subnets, so they need a router. With <b>router-on-a-stick (ROAS)</b>, one physical router port connects to a switch <b>trunk</b> and is split into <b>subinterfaces</b>, one per VLAN:</p>
<pre>interface g0/0.10
 encapsulation dot1q 10
 ip address 192.168.10.1 255.255.255.0
interface g0/0.20
 encapsulation dot1q 20
 ip address 192.168.20.1 255.255.255.0</pre>
<ul><li>Each subinterface's IP is the <b>default gateway</b> for its VLAN.</li>
<li>The switch port facing the router must be a <b>trunk</b>; the physical router port must be <code>no shutdown</code>.</li>
<li>ROAS is cheap but all inter-VLAN traffic shares one link. Larger sites use a <b>Layer 3 switch with SVIs</b> instead.</li></ul>`,
        [['Which command tags a router subinterface for VLAN 30?', 'encapsulation dot1q 30', ['switchport access vlan 30', 'vlan 30', 'ip helper-address 30'], 'Subinterfaces need 802.1Q encapsulation.'],
         ['The switch port connected to a router-on-a-stick must be:', 'A trunk', ['An access port in VLAN 1', 'Shut down', 'A routed port'], 'It carries every VLAN.']],
        'l-roas'),
      P('First hop redundancy (FHRP) and VIPs', 'Explain how HSRP/VRRP keep a default gateway alive with a virtual IP.',
        `<p>A PC has <b>one</b> default gateway. If that router dies, the PC is cut off — even if a second router exists.</p>
<p><b>FHRP</b> fixes this: two (or more) routers share a <b>virtual IP (VIP)</b> and virtual MAC. PCs use the VIP as their gateway.</p>
<ul><li>One router is <b>active</b> (HSRP) / <b>master</b> (VRRP) and answers for the VIP. The other is <b>standby / backup</b>.</li>
<li>They exchange hellos. If the active router stops, the standby takes over the VIP within seconds — hosts change nothing.</li>
<li><b>HSRP</b> = Cisco proprietary. <b>VRRP</b> = open standard. (GLBP, also Cisco, adds load balancing.)</li>
<li><b>Preemption</b> lets the preferred router take the role back when it recovers.</li></ul>
<p>The term VIP also appears with load balancers: the one address clients use for a whole server pool.</p>`,
        [['Which open-standard protocol shares a virtual default gateway between routers?', 'VRRP', ['HSRP', 'BGP', 'LACP'], 'HSRP is Cisco-only.'],
         ['What do PCs use as their default gateway with an FHRP?', 'The virtual IP', ['The active router\'s real IP', 'The standby router\'s IP', 'The DNS server'], 'The VIP moves; the PCs do not care.']],
        'n9-fhrp')
    ],
    wrap: { recap: ['Route choice: longest prefix → lowest AD → lowest metric.', 'AD: connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120.', 'Static/default routes for stubs; floating static = backup with higher AD. Routing must work both ways.', 'OSPF link-state (areas, area 0, cost); EIGRP Cisco; BGP between autonomous systems.', 'Static NAT one-to-one for servers; dynamic NAT from a pool; PAT many-to-one by port.', 'Router-on-a-stick: dot1q subinterfaces on a trunk. FHRP (HSRP/VRRP): shared VIP gateway.'], lab: 'l-float' }
  });

  // ===================== 2.2 Switching =====================
  M('n9-stp', 'Spanning tree roles and states', 'STP vocabulary',
    'Pick the STP term for each description.', ['Root bridge', 'Root port', 'Designated port', 'Blocking / discarding', 'Forwarding', 'BPDU'],
    [['The switch with the lowest bridge ID (priority, then MAC)', 'Root bridge', 'Center of the tree.'],
     ['On a non-root switch, the port with the best path toward the root', 'Root port', 'One per non-root switch.'],
     ['The forwarding port on each segment toward the leaves', 'Designated port', 'One per segment.'],
     ['A redundant port that receives BPDUs but forwards no user traffic', 'Blocking / discarding', 'This is how loops are prevented.'],
     ['Port state that sends and receives user frames', 'Forwarding', 'Normal operation.'],
     ['The message switches exchange to build the tree', 'BPDU', 'Bridge protocol data unit.']],
    'Lower priority wins root (default 32768). Set the root on purpose — do not let the oldest switch win by having the lowest MAC.');
  M('n9-swfeat', 'Interface settings', 'Native VLAN, voice VLAN, LACP, duplex, MTU',
    'Pick the setting that fixes or provides each item.', ['Native VLAN', 'Voice VLAN', 'Link aggregation (LACP)', 'Full duplex', 'Jumbo frames (MTU 9000)', 'SVI'],
    [['Untagged frames on an 802.1Q trunk are placed here', 'Native VLAN', 'Must match on both ends.'],
     ['IP phone and PC share one switch port, but phone traffic goes to its own VLAN', 'Voice VLAN', 'Tagged voice, untagged data.'],
     ['Bundle four 1G links into one logical 4G link with failover', 'Link aggregation (LACP)', '802.3ad.'],
     ['Switch link shows late collisions and slow speed after a manual setting', 'Full duplex', 'Duplex mismatch — set both ends the same (or both auto).'],
     ['iSCSI storage network wants fewer, larger frames', 'Jumbo frames (MTU 9000)', 'Every device in the path must support it.'],
     ['Layer 3 switch needs a gateway address for VLAN 20', 'SVI', 'interface vlan 20.']],
    'Most switching tickets come down to: wrong VLAN, trunk/native mismatch, duplex mismatch, or STP.');

  N.add({ id: '2.2', dom: 2, short: 'Switching technologies', title: 'Given a scenario, configure switching technologies and features',
    goal: 'MAC learning, VLANs and SVIs, access vs trunk, native and voice VLANs, spanning tree, link aggregation, speed/duplex, MTU and jumbo frames.',
    parts: [
      P('How a switch learns and forwards', 'Explain MAC learning, flooding and forwarding.',
        `<p>A switch builds a <b>MAC address table</b> (CAM table) by reading the <b>source MAC</b> of every frame it receives and noting the port.</p>
<ul><li><b>Known unicast</b> — destination MAC is in the table → send out that one port only.</li>
<li><b>Unknown unicast</b> — not in the table yet → <b>flood</b> out every port in the VLAN except the one it came in on.</li>
<li><b>Broadcast</b> (ff:ff:ff:ff:ff:ff) → always flooded within the VLAN.</li>
<li>Entries age out (commonly 300 seconds) if a host goes quiet.</li></ul>
<p>Each switch port is its own <b>collision domain</b>; the whole VLAN is one <b>broadcast domain</b>. Routers (and VLANs) split broadcast domains.</p>
<p>See it on a switch with <code>show mac address-table</code>.</p>`,
        [['How does a switch learn which port a host is on?', 'From the source MAC address of frames it receives', ['From the destination MAC', 'From ARP replies only', 'From DHCP'], 'Source MAC + ingress port.'],
         ['What does a switch do with a frame for an unknown destination MAC?', 'Floods it out all ports in the VLAN except the source port', ['Drops it', 'Sends it to the router', 'Sends it back'], 'Unknown unicast flooding.']]),
      P('VLANs and SVIs', 'Create VLANs, assign access ports, and give a VLAN a gateway with an SVI.',
        `<p>A <b>VLAN</b> splits one physical switch into separate logical networks (separate broadcast domains). Each VLAN normally maps to one IP subnet.</p>
<pre>vlan 10
 name USERS
interface f0/1
 switchport mode access
 switchport access vlan 10</pre>
<ul><li>VLANs are stored in the <b>VLAN database</b> (<code>show vlan brief</code>). Usable IDs 1–4094; VLAN 1 is the default.</li>
<li>Hosts in different VLANs <b>cannot talk without a router</b> or Layer 3 switch.</li>
<li>An <b>SVI</b> (switched virtual interface) is a virtual routed interface for a VLAN on a Layer 3 switch: <code>interface vlan 10</code> → <code>ip address 192.168.10.1 255.255.255.0</code>. It becomes that VLAN's gateway. On an L2 switch, one SVI is used just for management.</li></ul>
<p>Why VLANs: security (keep guests off servers), smaller broadcast domains, and grouping users by role rather than location.</p>`,
        [['What does a VLAN create?', 'A separate broadcast domain', ['A separate collision domain only', 'A WAN link', 'A new MAC address'], 'One VLAN = one broadcast domain.'],
         ['On a Layer 3 switch, what provides the gateway for VLAN 20?', 'An SVI (interface vlan 20)', ['A trunk port', 'The native VLAN', 'A BPDU'], 'Switched virtual interface.']],
        'l-vlans'),
      P('Trunks, 802.1Q, native and voice VLANs', 'Configure a trunk and explain tagging, the native VLAN and the voice VLAN.',
        `<ul><li><b>Access port</b> — belongs to one VLAN, frames are untagged (PCs, printers).</li>
<li><b>Trunk port</b> — carries <b>many VLANs</b> between switches (or to a router/AP). Each frame gets an <b>802.1Q tag</b> (4 bytes, 12-bit VLAN ID).</li>
<li><b>Native VLAN</b> — the one VLAN that crosses the trunk <b>untagged</b>. It must <b>match on both ends</b> or traffic leaks between VLANs. Best practice: change it from VLAN 1 to an unused VLAN.</li>
<li><b>Allowed VLANs</b> — limit what crosses a trunk: <code>switchport trunk allowed vlan 10,20</code>.</li>
<li><b>Voice VLAN</b> — an access port can carry a PC (untagged, data VLAN) and an IP phone (tagged, voice VLAN) at once: <code>switchport voice vlan 50</code>.</li></ul>
<pre>interface g0/1
 switchport mode trunk
 switchport trunk native vlan 999</pre>`,
        [['Which standard adds a VLAN tag to frames on a trunk?', '802.1Q', ['802.1X', '802.3af', '802.11ac'], 'Dot1Q tagging.'],
         ['What must match on both ends of a trunk?', 'The native VLAN', ['The hostname', 'The port number', 'The MAC address'], 'Mismatch leaks traffic between VLANs.'],
         ['A phone and a PC share one port. Which feature keeps phone traffic separate?', 'Voice VLAN', ['Native VLAN', 'STP', 'Port channel'], 'Tagged voice + untagged data.']],
        'l-trunk'),
      P('Spanning Tree Protocol', 'Explain how STP elects a root and blocks redundant links to stop loops.',
        `<p>Redundant switch links are good — until frames loop forever. Ethernet frames have <b>no TTL</b>, so a loop causes a <b>broadcast storm</b> that takes the network down in seconds.</p>
<p><b>STP (802.1D)</b> builds a loop-free tree:</p>
<ol><li>Elect a <b>root bridge</b>: lowest bridge ID = <b>priority</b> (default 32768) then lowest MAC.</li>
<li>Each other switch picks one <b>root port</b> (lowest cost toward the root).</li>
<li>Each segment gets one <b>designated port</b>.</li>
<li>Everything else is <b>blocked</b> (discarding) — kept as a backup.</li></ol>
<p>Classic port states: blocking → listening → learning → forwarding (≈30–50 s). <b>RSTP (802.1w)</b> converges in about a second. Switches exchange <b>BPDUs</b> to do all this.</p>
<p>Protect it: <b>PortFast</b> on edge ports (PCs go straight to forwarding), <b>BPDU guard</b> to shut a PortFast port that hears a BPDU, <b>root guard</b> to stop a rogue switch becoming root.</p>`,
        [['How is the STP root bridge chosen?', 'Lowest bridge ID (priority, then MAC)', ['Highest IP address', 'Most ports', 'Newest switch'], 'Lower is better.'],
         ['Why do Ethernet loops cause broadcast storms?', 'Frames have no TTL, so they circulate forever', ['Switches run out of IPs', 'DHCP leases expire', 'VLAN tags are removed'], 'STP prevents it.']],
        'n9-stp'),
      P('Link aggregation, speed/duplex and MTU', 'Configure link aggregation and fix duplex and MTU problems.',
        `<ul><li><b>Link aggregation</b> (802.3ad/LACP, Cisco EtherChannel / port channel) bundles several physical links into one logical link: more bandwidth and failover, and STP treats it as one link (no blocking). Members must match <b>speed, duplex and VLAN settings</b>.</li>
<li><b>Speed and duplex</b> — leave both ends on auto, or hard-set <b>both</b> ends the same. Hard-setting one side and leaving the other on auto causes a <b>duplex mismatch</b>: late collisions, CRC errors, terrible throughput.</li>
<li><b>MTU</b> — the largest payload a frame carries. Standard Ethernet = <b>1500 bytes</b>.</li>
<li><b>Jumbo frames</b> — MTU up to ~<b>9000</b> bytes; fewer frames, less overhead. Used on storage (iSCSI) and VM migration networks. <b>Every device in the path</b> must support the same MTU, or large packets get dropped.</li></ul>`,
        [['One end is hard-set to 100/full and the other is on auto. Likely result?', 'Duplex mismatch with late collisions and errors', ['A faster link', 'STP blocks the port', 'The link becomes a trunk'], 'Auto falls back to half duplex.'],
         ['What is the standard Ethernet MTU?', '1500 bytes', ['9000 bytes', '576 bytes', '64 bytes'], 'Jumbo frames go up to ~9000.'],
         ['Which protocol negotiates a link aggregation bundle?', 'LACP', ['STP', 'CDP', 'VRRP'], 'IEEE 802.3ad.']],
        'n9-swfeat')
    ],
    wrap: { recap: ['Switches learn source MACs, forward known unicast, flood unknown unicast and broadcast.', 'VLAN = broadcast domain = usually one subnet. SVI = routed interface for a VLAN.', 'Access = one untagged VLAN. Trunk = many VLANs with 802.1Q tags. Native VLAN must match. Voice VLAN for phones.', 'STP: lowest bridge ID is root; root ports, designated ports, the rest blocked. RSTP is fast. PortFast + BPDU guard on edge ports.', 'LACP bundles links (matching settings). Duplex mismatch = late collisions.', 'MTU 1500; jumbo ~9000 end to end.'], lab: 'n9-swfeat' }
  });

  // ===================== 2.3 Wireless =====================
  M('n9-chan', 'Bands and channels', '2.4, 5, 6 GHz decisions',
    'Pick the best answer for each.', ['1, 6, 11', '2.4 GHz', '5 GHz', '6 GHz', '20 MHz', '80 MHz', 'Band steering', '802.11h (DFS/TPC)'],
    [['Non-overlapping channels in the 2.4 GHz band (US)', '1, 6, 11', 'Only three.'],
     ['Band with the best range through walls but the most interference', '2.4 GHz', 'Longer wavelength.'],
     ['Band that needs Wi-Fi 6E or Wi-Fi 7 clients', '6 GHz', 'Newest, cleanest band.'],
     ['Channel width to use in a crowded office with many APs', '20 MHz', 'More non-overlapping channels.'],
     ['Channel width for maximum speed in a quiet home', '80 MHz', 'Wider = faster, fewer channels.'],
     ['AP nudges dual-band clients from 2.4 GHz to 5 GHz', 'Band steering', 'Better throughput.'],
     ['Rule set that makes 5 GHz APs avoid radar and limit power', '802.11h (DFS/TPC)', 'Regulatory impact.'],
     ['Band with many non-overlapping channels and less range', '5 GHz', 'Common enterprise band.']],
    'Wider channels = more speed but fewer clean channels. Dense deployments use narrow channels.');
  M('n9-ant', 'Antennas and AP types', 'Omni vs directional, autonomous vs lightweight',
    'Pick the best fit.', ['Omnidirectional antenna', 'Directional antenna', 'Autonomous AP', 'Lightweight AP', 'Mesh', 'Point-to-point'],
    [['Cover an open office evenly in all directions', 'Omnidirectional antenna', '360° coverage.'],
     ['Long hallway or link to a building across the parking lot', 'Directional antenna', 'Focused beam (Yagi, patch, parabolic).'],
     ['A single AP in a small shop configured on its own web page', 'Autonomous AP', 'Stand-alone.'],
     ['An AP that gets its config from a wireless LAN controller', 'Lightweight AP', 'Controller-based.'],
     ['APs relay traffic for each other wirelessly where cabling is impossible', 'Mesh', 'Wireless backhaul.'],
     ['Two directional antennas bridging two buildings', 'Point-to-point', 'Wireless bridge.']],
    'Omni for coverage, directional for distance. Autonomous for one AP, lightweight + controller for many.');
  M('n9-wlan-design', 'Design the WLAN', 'Combined 2.3 scenarios',
    'Pick the best choice for each requirement.', ['WPA3-Enterprise', 'WPA3-Personal (SAE)', 'Captive portal guest SSID', 'Channels 1, 6, 11', '5 GHz with 20/40 MHz channels', 'Directional antenna', 'Wireless LAN controller'],
    [['Corporate laptops authenticate with each user\'s own credentials via RADIUS', 'WPA3-Enterprise', '802.1X per user.'],
     ['Small office without a RADIUS server wants the strongest passphrase security', 'WPA3-Personal (SAE)', 'SAE replaces the PSK handshake.'],
     ['Visitors accept terms of use before getting Internet only', 'Captive portal guest SSID', 'Isolated guest network.'],
     ['Plan for 2.4 GHz APs side by side', 'Channels 1, 6, 11', 'Avoid overlap.'],
     ['High-density lecture hall', '5 GHz with 20/40 MHz channels', 'Many clean channels.'],
     ['Cover a 300 m warehouse aisle from one end', 'Directional antenna', 'Focused beam.'],
     ['Manage 120 APs and roaming centrally', 'Wireless LAN controller', 'Lightweight APs.']],
    'Good WLANs start with a site survey, then channel plan, then security per user group.');

  N.add({ id: '2.3', dom: 2, short: 'Wireless devices & technologies', title: 'Given a scenario, select and configure wireless devices and technologies',
    goal: 'Bands, channels and widths, 802.11 standards, SSIDs and network types, WPA2/WPA3 and guest access, antennas, and AP types.',
    parts: [
      P('Bands, channels and channel width', 'Choose a band, channel plan and channel width for a site.',
        `<table><tr><th>Band</th><th>Range</th><th>Channels</th><th>Notes</th></tr>
<tr><td>2.4 GHz</td><td>Longest</td><td>Only <b>1, 6, 11</b> don't overlap (US)</td><td>Crowded: Bluetooth, microwaves</td></tr>
<tr><td>5 GHz</td><td>Medium</td><td>Many (20+)</td><td>Some need <b>DFS</b> (radar avoidance)</td></tr>
<tr><td>6 GHz</td><td>Shortest</td><td>Many wide clean channels</td><td>Wi-Fi 6E / Wi-Fi 7 only</td></tr></table>
<ul><li><b>Channel width</b>: 20, 40, 80, 160 (320 in Wi-Fi 7) MHz. Wider = faster, but fewer non-overlapping channels and more interference. Busy offices use 20/40 MHz.</li>
<li><b>Regulatory impacts</b>: each country sets allowed channels and power. <b>802.11h</b> adds <b>DFS</b> (move off channels when radar is detected) and <b>TPC</b> (transmit power control) for 5 GHz.</li>
<li><b>Band steering</b>: the AP encourages dual-band clients onto 5/6 GHz.</li></ul>`,
        [['Which 2.4 GHz channels do not overlap in the US?', '1, 6 and 11', ['1, 5 and 9', '1, 7 and 13', '2, 6 and 10'], 'Only three.'],
         ['Which amendment requires 5 GHz APs to avoid radar channels?', '802.11h', ['802.11ac', '802.1X', '802.11b'], 'DFS and TPC.']],
        'n9-chan'),
      P('802.11 standards', 'Match each 802.11 standard to its band, generation name and speed.',
        `<table><tr><th>Standard</th><th>Wi-Fi name</th><th>Band(s)</th><th>Max (theoretical)</th></tr>
<tr><td>802.11a</td><td>—</td><td>5 GHz</td><td>54 Mbps</td></tr>
<tr><td>802.11b</td><td>—</td><td>2.4 GHz</td><td>11 Mbps</td></tr>
<tr><td>802.11g</td><td>—</td><td>2.4 GHz</td><td>54 Mbps</td></tr>
<tr><td>802.11n</td><td>Wi-Fi 4</td><td>2.4 + 5 GHz</td><td>600 Mbps (MIMO)</td></tr>
<tr><td>802.11ac</td><td>Wi-Fi 5</td><td>5 GHz</td><td>~6.9 Gbps (MU-MIMO)</td></tr>
<tr><td>802.11ax</td><td>Wi-Fi 6 / 6E</td><td>2.4 + 5 (+ 6 GHz for 6E)</td><td>~9.6 Gbps (OFDMA)</td></tr>
<tr><td>802.11be</td><td>Wi-Fi 7</td><td>2.4 + 5 + 6 GHz</td><td>~46 Gbps (320 MHz, MLO)</td></tr></table>
<p><b>MIMO</b> = multiple antennas/streams. <b>MU-MIMO</b> = several clients at once. <b>OFDMA</b> (Wi-Fi 6) splits a channel among many clients — great for dense areas.</p>`,
        [['Which standard is Wi-Fi 6?', '802.11ax', ['802.11ac', '802.11n', '802.11be'], 'ax = Wi-Fi 6/6E.'],
         ['802.11ac operates in which band?', '5 GHz only', ['2.4 GHz only', '2.4 and 5 GHz', '6 GHz'], 'Wi-Fi 5 is 5 GHz.']],
        'd-wifi'),
      P('SSIDs and wireless network types', 'Tell SSID, BSSID and ESSID apart and identify infrastructure, ad hoc, mesh and point-to-point networks.',
        `<ul><li><b>SSID</b> — the network name users see ("Corp-WiFi").</li>
<li><b>BSSID</b> — the MAC address of one AP radio serving that SSID. Each AP has its own.</li>
<li><b>ESSID</b> (extended service set) — the same SSID broadcast by many APs so clients can <b>roam</b> between them.</li></ul>
<p><b>Network types:</b></p>
<ul><li><b>Infrastructure</b> — clients connect through APs. Normal mode.</li>
<li><b>Ad hoc</b> (IBSS) — devices connect directly to each other, no AP.</li>
<li><b>Mesh</b> — APs connect to each other wirelessly; only some have a wired uplink. Good where cabling is hard.</li>
<li><b>Point-to-point</b> — a wireless bridge between two sites with directional antennas.</li></ul>
<p>Hiding the SSID is <b>not</b> security — it still appears in probe frames.</p>`,
        [['What identifies one specific AP radio in a WLAN?', 'BSSID', ['SSID', 'ESSID', 'VLAN ID'], 'BSSID = radio MAC.'],
         ['Laptops connecting directly to each other with no AP form which network type?', 'Ad hoc', ['Infrastructure', 'Mesh', 'Point-to-point'], 'Independent BSS.']]),
      P('Wireless security and guest access', 'Choose WPA2/WPA3 Personal or Enterprise and set up guest access.',
        `<ul><li><b>WEP</b> and <b>WPA (TKIP)</b> — broken. Never use.</li>
<li><b>WPA2</b> — AES-CCMP encryption. Still common.</li>
<li><b>WPA3</b> — current standard. <b>SAE</b> replaces the PSK 4-way handshake and resists offline password guessing; forward secrecy; protected management frames.</li></ul>
<table><tr><th></th><th>Personal (PSK / SAE)</th><th>Enterprise (802.1X)</th></tr>
<tr><td>Credential</td><td>One shared passphrase</td><td>Each user's own login or certificate</td></tr>
<tr><td>Needs</td><td>Nothing extra</td><td>RADIUS server</td></tr>
<tr><td>Fit</td><td>Home, small office</td><td>Business; revoke one user without changing everyone's key</td></tr></table>
<p><b>Guest networks</b>: separate SSID and VLAN with Internet only, client isolation, often a <b>captive portal</b> (accept terms or log in on a web page before access).</p>`,
        [['Which WPA3 feature replaces the pre-shared key handshake?', 'SAE', ['TKIP', 'WEP', 'LEAP'], 'Simultaneous Authentication of Equals.'],
         ['A company wants each user to log in with their own credentials on Wi-Fi. Which mode?', 'WPA3-Enterprise (802.1X with RADIUS)', ['WPA3-Personal', 'Open with captive portal', 'WEP'], 'Per-user authentication.']],
        'pb-wifi'),
      P('Antennas and AP types', 'Choose omni or directional antennas and autonomous or lightweight APs.',
        `<ul><li><b>Omnidirectional</b> — radiates 360° horizontally (a donut). Default for ceiling APs covering rooms.</li>
<li><b>Directional</b> — focuses energy one way for distance: <b>Yagi</b>, <b>patch/panel</b>, <b>parabolic dish</b>. Use for hallways, warehouses and building-to-building links.</li>
<li>Antenna <b>gain</b> (dBi) focuses energy; it doesn't create it. More gain = farther, narrower.</li></ul>
<p><b>AP types:</b></p>
<ul><li><b>Autonomous (fat/thick) AP</b> — configured individually; fine for a few APs.</li>
<li><b>Lightweight (thin) AP</b> — managed by a <b>wireless LAN controller</b> (on-prem or cloud), which handles config, channel/power planning and roaming. CAPWAP tunnels connect them.</li></ul>`,
        [['Which antenna is best for a link between two buildings?', 'Directional (e.g. Yagi or dish)', ['Omnidirectional', 'Dipole rubber duck', 'Any built-in antenna'], 'Focused beam for distance.'],
         ['Which AP type relies on a controller for its configuration?', 'Lightweight AP', ['Autonomous AP', 'Ad hoc AP', 'Mesh client'], 'Thin APs are controller-managed.']],
        'n9-ant')
    ],
    wrap: { recap: ['2.4 GHz: range, crowded, channels 1/6/11. 5 GHz: many channels, DFS. 6 GHz: Wi-Fi 6E/7 only.', 'Wider channels = faster but fewer clean channels. 802.11h = DFS + TPC. Band steering pushes clients to 5/6 GHz.', 'a 5/54 · b 2.4/11 · g 2.4/54 · n Wi-Fi 4 · ac Wi-Fi 5 (5 GHz) · ax Wi-Fi 6/6E · be Wi-Fi 7.', 'SSID = name, BSSID = AP radio MAC, ESSID = many APs one name. Infrastructure, ad hoc, mesh, P2P.', 'WPA2 AES; WPA3 SAE. Personal = shared key; Enterprise = 802.1X + RADIUS. Guest = isolated + captive portal.', 'Omni for coverage, directional for distance. Autonomous vs lightweight + controller.'], lab: 'n9-wlan-design' }
  });

  // ===================== 2.4 Physical installations =====================
  M('n9-rack', 'Wiring closets and racks', 'MDF, IDF, rack terms',
    'Pick the term for each description.', ['MDF', 'IDF', 'Rack unit (U)', 'Patch panel', 'Fiber distribution panel', 'Port-side exhaust', 'Lockable rack'],
    [['Main room where the ISP circuits, core switches and servers live', 'MDF', 'Main distribution frame.'],
     ['Wiring closet on each floor that feeds that floor\'s jacks', 'IDF', 'Intermediate distribution frame.'],
     ['1.75 inches of vertical rack space', 'Rack unit (U)', 'A 42U rack is ~6 ft of space.'],
     ['Where horizontal cable runs from the desks terminate in the closet', 'Patch panel', 'Short patch cords to the switch.'],
     ['Where fiber strands terminate and are patched to equipment', 'Fiber distribution panel', 'Protects and organizes fiber.'],
     ['Switch airflow that blows hot air out of the side with the ports', 'Port-side exhaust', 'Must match hot/cold aisle orientation.'],
     ['Rack with doors that can be secured against tampering', 'Lockable rack', 'Physical security.']],
    'Airflow direction matters: mount gear so it pulls from the cold aisle and exhausts to the hot aisle.');
  Cc('n9-power', 'Power the rack', 'UPS and PDU load math',
    'A rack holds 2 switches at 150 W each, 4 servers at 400 W each, and a firewall at 100 W. Circuits are 120 V. Plan the power.',
    [['Total load in watts', 2000, '2000 W', '2×150 + 4×400 + 100.'],
     ['Current draw in amps at 120 V (watts ÷ volts, 2 decimals)', 16.67, '16.67 A', '2000 ÷ 120.'],
     ['Minimum UPS rating in watts if you keep it under 80% load (watts ÷ 0.8)', 2500, '2500 W', '2000 ÷ 0.8.'],
     ['How many 20 A circuits are needed if each is loaded to 80% (16 A max)? (whole number)', 2, '2', '16.67 A > 16 A, so 2 circuits / dual PDUs.']],
    'Real designs use two PDUs on two separate circuits so dual power supplies survive one circuit failure.',
    ['Watts = volts × amps.', 'Keep UPS and circuits at or below ~80% of rating.'], 2);

  N.add({ id: '2.4', dom: 2, short: 'Physical installations', title: 'Explain important factors of physical installations',
    goal: 'MDF/IDF, racks and airflow, patch and fiber panels, lockable cabinets, UPS/PDU and power load, and environmental controls.',
    parts: [
      P('Closets, racks and cabling', 'Describe the MDF and IDFs, rack sizing and airflow, and patch/fiber panels.',
        `<ul><li><b>MDF</b> (main distribution frame) — the main wiring room: demarc, ISP circuits, core switches, often servers.</li>
<li><b>IDF</b> (intermediate distribution frame) — a closet on each floor/area, uplinked to the MDF (usually fiber), feeding the local jacks over copper (≤100 m).</li>
<li><b>Rack size</b> — measured in <b>U</b> (1U = 1.75 in). Common full rack = 42U. Note depth and weight too.</li>
<li><b>Airflow</b> — gear is <b>port-side intake</b> or <b>port-side exhaust</b>. Match it to the room's hot aisle/cold aisle layout so equipment doesn't breathe its own exhaust.</li>
<li><b>Patch panel</b> — horizontal cables from wall jacks terminate here; short patch cords go to the switch. Makes moves and changes easy.</li>
<li><b>Fiber distribution panel</b> — terminates and protects fiber strands.</li>
<li><b>Lockable</b> racks/cabinets and closet doors are basic physical security.</li></ul>`,
        [['Which room holds the ISP demarc and core switches?', 'MDF', ['IDF', 'DMZ', 'Plenum'], 'Main distribution frame.'],
         ['How tall is one rack unit?', '1.75 inches', ['1 inch', '19 inches', '2.5 inches'], 'Racks are 19 in wide.']],
        'n9-rack'),
      P('Power: UPS, PDU, load and voltage', 'Size a UPS and PDUs from the equipment power load.',
        `<ul><li><b>UPS</b> (uninterruptible power supply) — batteries that keep gear running through outages and clean up sags/spikes. Sized in <b>VA/watts</b> and runtime. Long outages need a <b>generator</b>; the UPS bridges the gap until it starts.</li>
<li><b>PDU</b> (power distribution unit) — the rack's power strip. Smart PDUs report load per outlet and allow remote reboot.</li>
<li><b>Power load</b> — add up the watts of everything in the rack. Keep circuits and UPSs at about <b>80%</b> of their rating.</li>
<li><b>Voltage</b> — 120 V (US standard), 208/240 V common in data centers (same watts, fewer amps). <b>Watts = volts × amps</b>.</li>
<li><b>Redundancy</b> — dual power supplies in each device, fed from two PDUs on two different circuits/UPSs (A and B feeds).</li></ul>`,
        [['What does a UPS provide that a PDU does not?', 'Battery power during an outage', ['More outlets', 'VLAN tagging', 'Cooling'], 'PDUs only distribute power.'],
         ['A 1,200 W load on 120 V draws how many amps?', '10 A', ['12 A', '100 A', '1.2 A'], 'Amps = watts ÷ volts.']],
        'n9-power'),
      P('Environmental factors', 'Set safe temperature, humidity and fire suppression for a network room.',
        `<ul><li><b>Temperature</b> — keep intake air roughly 18–27 °C (64–81 °F, ASHRAE guidance). Use <b>hot aisle / cold aisle</b> layout and blanking panels so hot exhaust doesn't recirculate.</li>
<li><b>Humidity</b> — about 40–60% relative humidity. <b>Too dry</b> = static electricity (ESD). <b>Too humid</b> = condensation and corrosion.</li>
<li><b>Fire suppression</b> — water sprinklers ruin electronics. Server rooms use <b>clean agent</b> gas systems (e.g. FM-200, Novec 1230) or <b>pre-action</b> sprinklers that only fill pipes after a detector trips.</li>
<li><b>Monitoring</b> — temperature, humidity, water-leak and door sensors that alert via SNMP or email.</li></ul>
<p>Exam angle: if equipment keeps rebooting in a closet, think heat. If there are random ESD failures in winter, think low humidity.</p>`,
        [['What problem does very low humidity cause in a server room?', 'Static electricity (ESD)', ['Condensation', 'Fiber attenuation', 'Duplex mismatch'], 'Dry air builds static.'],
         ['Which fire suppression avoids water damage to servers?', 'Clean agent gas system', ['Wet-pipe sprinklers', 'Fire hose', 'Foam'], 'Gas suppresses without residue.']])
    ],
    wrap: { recap: ['MDF = main room (demarc, core). IDF = floor closets uplinked to MDF.', 'Racks measured in U (1.75 in); 42U common. Match port-side intake/exhaust to hot/cold aisles.', 'Patch panels for copper runs; fiber distribution panels for fiber; lockable racks.', 'UPS = battery ride-through; PDU = rack power strip; watts = volts × amps; plan ~80% load; A/B feeds.', 'Temperature ~18–27 °C, humidity 40–60% (dry = ESD, wet = corrosion).', 'Clean agent or pre-action suppression in server rooms.'], lab: 'n9-rack' }
  });
})();
