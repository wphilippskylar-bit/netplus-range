/* Domain 1.0 Networking Concepts — objectives 1.1 to 1.4 */
(function () {
  var N = window.N9, P = N.P, M = N.M, O = N.O;

  // ===================== 1.1 OSI =====================
  M('n9-osi-dev', 'Which layer does it live at?', 'Devices, PDUs and addresses → OSI layer',
    'For each item, pick the OSI layer where it <b>does its main job</b>. You only need the layer numbers and names from this part.',
    ['1 Physical', '2 Data link', '3 Network', '4 Transport'],
    [['Hub, repeater, cable, voltage on the wire', '1 Physical', 'Bits only. No addresses.'],
     ['Switch reading a destination MAC address', '2 Data link', 'MAC addresses and frames are Layer 2.'],
     ['Router choosing a path with an IP address', '3 Network', 'Logical addressing and routing are Layer 3.'],
     ['TCP port 443 / UDP port 53', '4 Transport', 'Ports and segments are Layer 4.'],
     ['PDU called a frame', '2 Data link', 'L2 PDU = frame.'],
     ['PDU called a packet', '3 Network', 'L3 PDU = packet.'],
     ['PDU called a segment (TCP) or datagram (UDP)', '4 Transport', 'L4 PDU = segment/datagram.'],
     ['Wireless radio signal / light pulses in fiber', '1 Physical', 'Signaling media is Layer 1.']],
    'Layers 1–4 are where almost every Network+ device lives. Hubs = 1, switches = 2, routers = 3, firewalls filtering ports = 4.');
  M('n9-osi-upper', 'Upper layers sort', 'Session, presentation, application',
    'Pick the layer for each item.', ['5 Session', '6 Presentation', '7 Application'],
    [['HTTP request for a web page', '7 Application', 'Protocols users and apps talk directly.'],
     ['TLS encryption of the data', '6 Presentation', 'CompTIA puts encryption/encoding at Layer 6.'],
     ['Converting text to ASCII or Unicode, compressing a JPEG', '6 Presentation', 'Formatting and translation.'],
     ['Setting up, maintaining and tearing down a conversation (RPC, NetBIOS sessions)', '5 Session', 'Dialog control.'],
     ['DNS query, SMTP mail, SSH login prompt', '7 Application', 'Application protocols.'],
     ['Checkpointing a long transfer so it can resume', '5 Session', 'Session layer synchronization.']],
    'Layers 5–7 are often lumped together as "the application" in TCP/IP. On the exam, encryption → 6, sessions → 5, named protocols → 7.');
  O('n9-encap', 'Build a frame', 'Put encapsulation in order',
    'A browser sends an HTTPS request. Order what happens on the <b>sender</b>, from first to last.',
    [['Application creates the HTTP data', 'Layer 7 starts with the data.'],
     ['Data is encrypted with TLS', 'Layer 6 encryption.'],
     ['TCP adds source/destination ports → segment', 'Layer 4 header.'],
     ['IP adds source/destination IP addresses → packet', 'Layer 3 header.'],
     ['Ethernet adds MAC addresses and the FCS trailer → frame', 'Layer 2 header + trailer.'],
     ['The NIC turns the frame into bits on the wire', 'Layer 1 signaling.']],
    'The receiver does the reverse (de-encapsulation): strip the frame, read the packet, hand the segment to the right port, decrypt, deliver.');
  M('n9-osi-ts', 'Troubleshoot by layer', 'Symptom → the layer to fix',
    'Each ticket describes one symptom. Pick the layer where the fault most likely is.',
    ['1 Physical', '2 Data link', '3 Network', '4 Transport', '7 Application'],
    [['No link light on the switch port', '1 Physical', 'No signal = cable, port or NIC.'],
     ['Link is up, but the PC is in the wrong VLAN', '2 Data link', 'VLANs are Layer 2.'],
     ['PC has the wrong default gateway', '3 Network', 'IP addressing/routing.'],
     ['Ping works but a firewall blocks TCP 443', '4 Transport', 'Port-based filtering.'],
     ['Website loads but shows a login error from the app', '7 Application', 'Everything below works.'],
     ['Many CRC errors on an interface', '1 Physical', 'Usually cabling/interference (seen at L2, caused at L1).']],
    'Bottom-up works great when you suspect hardware. Top-down when the app is the complaint. Divide and conquer: start at Layer 3 with a ping, then go up or down.');

  N.add({ id: '1.1', dom: 1, short: 'OSI reference model', title: 'Explain concepts related to the OSI reference model',
    goal: 'Name all 7 layers, what lives at each, how data is wrapped, and how to use the model to troubleshoot.',
    parts: [
      P('The 7 layers at a glance', 'Name the seven OSI layers in order and give one example for each.',
        `<p>The <b>OSI model</b> is a seven-layer map of how data moves between two devices. Nobody "runs" OSI — it is a shared vocabulary. When an engineer says "it's a Layer 2 problem," everyone knows to look at switching and MAC addresses.</p>
<table><tr><th>#</th><th>Layer</th><th>Job</th><th>Example</th></tr>
<tr><td>7</td><td>Application</td><td>Protocols apps use</td><td>HTTP, DNS, SMTP</td></tr>
<tr><td>6</td><td>Presentation</td><td>Format, encrypt, compress</td><td>TLS, JPEG, ASCII</td></tr>
<tr><td>5</td><td>Session</td><td>Start/stop conversations</td><td>RPC, NetBIOS</td></tr>
<tr><td>4</td><td>Transport</td><td>Ports, reliability</td><td>TCP, UDP</td></tr>
<tr><td>3</td><td>Network</td><td>Logical addressing, routing</td><td>IP, ICMP, routers</td></tr>
<tr><td>2</td><td>Data link</td><td>Local delivery by MAC</td><td>Ethernet, switches</td></tr>
<tr><td>1</td><td>Physical</td><td>Bits on the medium</td><td>Cables, hubs, radio</td></tr></table>
<p><b>Memory trick</b> (top → bottom): <i>All People Seem To Need Data Processing</i>. Bottom → top: <i>Please Do Not Throw Sausage Pizza Away</i>.</p>
<p>Layers 1–4 are where most Network+ hardware lives. Layers 5–7 are often treated as one "application" block in the real world.</p>`,
        [['Which OSI layer handles logical addressing and routing?', 'Layer 3 — Network', ['Layer 2 — Data link', 'Layer 4 — Transport', 'Layer 1 — Physical'], 'IP addresses and routers live at Layer 3.'],
         ['Which layer is directly above Transport?', 'Session (5)', ['Network (3)', 'Presentation (6)', 'Application (7)'], 'Order: 4 Transport → 5 Session → 6 Presentation → 7 Application.']],
        'n9-osi-upper'),
      P('Layers 1–4: devices, PDUs and addresses', 'Match each layer 1–4 to its PDU, address type and typical device.',
        `<p>The exam loves asking "what is the PDU at layer X" and "which device works at layer X."</p>
<table><tr><th>Layer</th><th>PDU</th><th>Address</th><th>Device</th></tr>
<tr><td>4 Transport</td><td>Segment (TCP) / Datagram (UDP)</td><td>Port number</td><td>Firewall filtering ports</td></tr>
<tr><td>3 Network</td><td>Packet</td><td>IP address</td><td>Router, L3 switch</td></tr>
<tr><td>2 Data link</td><td>Frame</td><td>MAC address (48-bit)</td><td>Switch, bridge, NIC, AP</td></tr>
<tr><td>1 Physical</td><td>Bits</td><td>None</td><td>Hub, repeater, cable, transceiver</td></tr></table>
<ul><li><b>Layer 2</b> is split into two sublayers: <b>LLC</b> (talks to Layer 3) and <b>MAC</b> (talks to the medium).</li>
<li>A <b>MAC address</b> is 48 bits written in hex, e.g. <code>00:1A:2B:3C:4D:5E</code>. The first half (OUI) identifies the vendor.</li>
<li>A <b>Layer 3 switch</b> can route between VLANs, so it works at both 2 and 3.</li>
<li><b>ARP</b> bridges layers 2 and 3: it finds the MAC address that goes with an IP address on the local network.</li></ul>`,
        [['What is the PDU at the Data link layer?', 'Frame', ['Packet', 'Segment', 'Bit'], 'L2 = frames; L3 = packets; L4 = segments.'],
         ['A hub operates at which layer?', 'Layer 1', ['Layer 2', 'Layer 3', 'Layer 4'], 'A hub repeats bits to every port — no addresses.'],
         ['Which address does a switch use to forward traffic?', 'MAC address', ['IP address', 'Port number', 'Hostname'], 'Switches forward frames by destination MAC.']],
        'n9-osi-dev'),
      P('Encapsulation and the TCP/IP model', 'Describe how each layer wraps data on the way down, and map OSI to the 4-layer TCP/IP model.',
        `<p><b>Encapsulation</b> = each layer adds its own header as data moves <b>down</b> the stack on the sender:</p>
<p><code>Data → [TCP hdr | Data] → [IP hdr | TCP | Data] → [Eth hdr | IP | TCP | Data | FCS]</code> → bits</p>
<ul><li>The Ethernet <b>FCS</b> (frame check sequence) is a trailer the receiver uses to detect corrupted frames (CRC errors).</li>
<li>On the receiver, <b>de-encapsulation</b> strips headers going <b>up</b>, one layer at a time.</li>
<li>A router strips and rebuilds the <b>Layer 2</b> header at every hop, but keeps the same source/destination IPs (unless NAT changes them).</li></ul>
<p><b>TCP/IP model</b> (the one the Internet actually uses) squeezes OSI into 4 layers:</p>
<table><tr><th>TCP/IP</th><th>OSI layers</th></tr><tr><td>Application</td><td>5, 6, 7</td></tr><tr><td>Transport</td><td>4</td></tr><tr><td>Internet</td><td>3</td></tr><tr><td>Network access (link)</td><td>1, 2</td></tr></table>`,
        [['When data is sent, which header is added last?', 'The Layer 2 frame header', ['The TCP header', 'The IP header', 'The application header'], 'Encapsulation goes 7 → 1, so Layer 2 wraps last.'],
         ['As a packet crosses a router, which header is rebuilt?', 'The Layer 2 (frame) header', ['The TCP header', 'The application data', 'Nothing changes'], 'New source/destination MACs on every hop.'],
         ['The TCP/IP "Internet" layer matches which OSI layer?', 'Network (3)', ['Transport (4)', 'Data link (2)', 'Session (5)'], 'Internet layer = IP = OSI Layer 3.']],
        'n9-encap'),
      P('Using OSI to troubleshoot', 'Pick a troubleshooting direction (bottom-up, top-down, divide and conquer) and place symptoms at a layer.',
        `<p>The model's real value is <b>narrowing a problem fast</b>.</p>
<ul><li><b>Bottom-up</b> — start at the cable and work up. Best when you suspect hardware or a new install.</li>
<li><b>Top-down</b> — start at the application. Best when one app fails but others work.</li>
<li><b>Divide and conquer</b> — start in the middle (Layer 3: can you <code>ping</code> the gateway?) and go up or down based on the result.</li></ul>
<table><tr><th>Symptom</th><th>Layer</th></tr>
<tr><td>No link light, bad cable, interference</td><td>1</td></tr>
<tr><td>Wrong VLAN, MAC flapping, STP blocking</td><td>2</td></tr>
<tr><td>Wrong IP/mask/gateway, missing route</td><td>3</td></tr>
<tr><td>Port blocked by firewall/ACL</td><td>4</td></tr>
<tr><td>Expired certificate, wrong credentials, app error</td><td>6–7</td></tr></table>
<p><b>Rule of thumb:</b> if a ping by IP works but a name does not, Layers 1–3 are fine — look at DNS (an application service).</p>`,
        [['A user can ping 8.8.8.8 but cannot open websites by name. Where do you look?', 'DNS — an application-layer service', ['The cable', 'The switch VLAN', 'The NIC driver'], 'A successful ping proves Layers 1–3.'],
         ['Which approach starts by testing Layer 3 and then goes up or down?', 'Divide and conquer', ['Bottom-up', 'Top-down', 'Follow the path'], 'Start in the middle.']],
        'n9-osi-ts')
    ],
    wrap: { recap: ['7 layers top → bottom: Application, Presentation, Session, Transport, Network, Data link, Physical.', 'PDUs: bits (1), frames (2), packets (3), segments/datagrams (4).', 'Devices: hub 1, switch 2, router 3, port-filtering firewall 4.', 'Encapsulation adds headers going down; the frame header is rebuilt at each router hop.', 'TCP/IP model: Application (5–7), Transport (4), Internet (3), Network access (1–2).', 'Troubleshoot bottom-up, top-down, or divide and conquer from Layer 3.'], lab: 'd-osi' }
  });

  // ===================== 1.2 Appliances =====================
  M('n9-appl1', 'Pick the device: core gear', 'Router, switch, AP, controller',
    'Pick the device that fits each need.', ['Router', 'Layer 2 switch', 'Layer 3 switch', 'Wireless access point', 'Wireless LAN controller'],
    [['Connect the office LAN to the ISP and choose paths between networks', 'Router', 'Routers forward between networks.'],
     ['Plug 24 PCs into the same VLAN and forward frames by MAC', 'Layer 2 switch', 'Switching inside one network.'],
     ['Route between 12 VLANs at wire speed inside the building', 'Layer 3 switch', 'SVIs route between VLANs in hardware.'],
     ['Let laptops join the wired LAN over Wi-Fi', 'Wireless access point', 'An AP bridges wireless to wired.'],
     ['Push one config and channel plan to 150 APs across a campus', 'Wireless LAN controller', 'Central management of lightweight APs.']],
    'Routers = between networks. Switches = inside a network. L3 switches do both inside a campus. Controllers manage APs; APs serve clients.');
  M('n9-appl2', 'Pick the device: security & services', 'Firewall, IDS/IPS, proxy, load balancer',
    'Pick the device that fits each need.', ['Firewall', 'NGFW', 'IDS', 'IPS', 'Forward proxy', 'Reverse proxy', 'Load balancer'],
    [['Allow or deny traffic by IP and port, and track connection state', 'Firewall', 'Classic stateful firewall.'],
     ['Block a specific app (e.g. BitTorrent) no matter what port it uses', 'NGFW', 'Application awareness at Layer 7.'],
     ['Alert on suspicious traffic from a SPAN copy without ever blocking', 'IDS', 'Passive, out of band.'],
     ['Sit inline and drop exploit attempts automatically', 'IPS', 'Inline = can block.'],
     ['Make web requests for employees, cache pages and filter categories', 'Forward proxy', 'Acts for clients going out.'],
     ['Receive Internet HTTPS for internal web servers and offload TLS', 'Reverse proxy', 'Acts for servers coming in.'],
     ['Spread users across 4 web servers and pull a dead one out of rotation', 'Load balancer', 'Distributes + health-checks.']],
    'IDS = detect, IPS = prevent. Forward proxy protects clients; reverse proxy protects servers.');
  M('n9-func', 'Functions & applications', 'CDN, VPN, QoS, TTL',
    'Match each need to the function that solves it.', ['CDN', 'VPN', 'QoS', 'TTL'],
    [['Cache videos on servers close to users around the world', 'CDN', 'Content delivery network.'],
     ['Give remote workers an encrypted tunnel into the office', 'VPN', 'Virtual private network.'],
     ['Make sure voice calls get bandwidth first during congestion', 'QoS', 'Quality of service prioritizes traffic.'],
     ['Stop a packet from looping forever between routers', 'TTL', 'Decremented each hop; dropped at 0.'],
     ['Control how long a DNS answer is cached', 'TTL', 'DNS records carry a TTL too.'],
     ['Mark packets with DSCP values so routers can prioritize them', 'QoS', 'DSCP marking is QoS.']],
    'TTL shows up twice on the exam: IP TTL (hop limit, used by traceroute) and DNS TTL (cache time).');
  M('n9-appl-wrap', 'Design a small office', 'Choose every appliance for one site',
    'A 60-person office needs the following. Pick the best fit for each.', ['Router', 'Layer 3 switch', 'NGFW', 'IPS', 'Load balancer', 'NAS', 'SAN', 'Wireless LAN controller'],
    [['Internet edge that filters by application and user', 'NGFW', 'App-aware perimeter.'],
     ['File shares for users over SMB', 'NAS', 'File-level storage on the LAN.'],
     ['Block-level storage for the virtualization hosts over Fibre Channel', 'SAN', 'Block level, dedicated network.'],
     ['Route between the user, voice and printer VLANs', 'Layer 3 switch', 'Inter-VLAN routing.'],
     ['Manage the 20 lightweight APs', 'Wireless LAN controller', 'Central AP management.'],
     ['Share traffic across two web front-ends', 'Load balancer', 'Distribution + health checks.'],
     ['Drop known exploit traffic inline before it reaches servers', 'IPS', 'Prevention, inline.']],
    'Real designs combine many of these, often as virtual appliances on the same hardware.');

  N.add({ id: '1.2', dom: 1, short: 'Appliances, applications & functions', title: 'Compare and contrast networking appliances, applications, and functions',
    goal: 'Pick the right box for the job: routers, switches, firewalls, IDS/IPS, proxies, load balancers, storage, wireless, CDN, VPN, QoS and TTL.',
    parts: [
      P('Routers, switches and wireless gear', 'Tell routers, L2/L3 switches, access points and wireless controllers apart.',
        `<ul><li><b>Router</b> — forwards <b>packets between networks</b> using a routing table. It is the default gateway for a subnet. Layer 3.</li>
<li><b>Layer 2 switch</b> — forwards <b>frames inside a network</b> by MAC address. Each port is its own collision domain. Layer 2.</li>
<li><b>Layer 3 switch</b> — a switch that can also route between VLANs using <b>SVIs</b> (virtual interfaces). Common in the campus core/distribution.</li>
<li><b>Wireless access point (AP)</b> — bridges Wi-Fi clients onto the wired network.</li>
<li><b>Wireless LAN controller (WLC)</b> — centrally configures many <b>lightweight</b> APs: SSIDs, channels, power, roaming.</li></ul>
<p><b>Physical vs virtual appliances:</b> any of these can be a dedicated box or a <b>virtual appliance</b> (a VM running router/firewall software). Virtual = fast to deploy and scale; physical = dedicated performance.</p>
<p><b>Exam cue words:</b> "different subnets / default gateway" → router. "Same VLAN / MAC table" → switch. "Inter-VLAN at wire speed" → L3 switch. "Manage hundreds of APs" → controller.</p>`,
        [['Which device forwards traffic between different IP networks?', 'Router', ['Layer 2 switch', 'Hub', 'Access point'], 'Routing between networks is a Layer 3 job.'],
         ['A campus needs one place to manage SSIDs and channels for 200 APs. Which device?', 'Wireless LAN controller', ['Load balancer', 'Router', 'Proxy server'], 'Controllers manage lightweight APs.']],
        'n9-appl1'),
      P('Firewalls, IDS/IPS, proxies and load balancers', 'Choose between a firewall, NGFW, IDS, IPS, forward/reverse proxy and load balancer.',
        `<ul><li><b>Firewall</b> — permits/denies traffic by rules (IP, port, protocol). <b>Stateful</b> firewalls remember connections and allow return traffic automatically.</li>
<li><b>NGFW</b> (next-generation firewall) — adds <b>application awareness</b> (Layer 7), user identity, IPS and URL filtering.</li>
<li><b>IDS</b> (intrusion detection) — watches a <b>copy</b> of traffic (SPAN/TAP) and <b>alerts</b>. It cannot block. Zero risk to production.</li>
<li><b>IPS</b> (intrusion prevention) — sits <b>inline</b> and <b>drops</b> malicious traffic. Risk: a false positive blocks real users.</li>
<li><b>Forward proxy</b> — makes requests <b>for clients</b> going out: caching, content filtering, hiding client IPs.</li>
<li><b>Reverse proxy</b> — receives requests <b>for servers</b> coming in: TLS offload, caching, hiding server details.</li>
<li><b>Load balancer</b> — spreads connections across a pool of servers behind one <b>virtual IP (VIP)</b> and health-checks them.</li></ul>
<p><b>Memory:</b> IDS = <i>Detect</i>, IPS = <i>Prevent</i>. Forward = for the <i>users</i>, reverse = for the <i>servers</i>.</p>`,
        [['Which device can block traffic, not just alert on it?', 'IPS', ['IDS', 'SPAN port', 'Syslog server'], 'An IPS is inline.'],
         ['A server in front of three web servers terminates TLS for Internet users. What is it?', 'Reverse proxy', ['Forward proxy', 'IDS', 'Wireless controller'], 'It acts on behalf of the servers.'],
         ['Which firewall type identifies applications regardless of port?', 'NGFW', ['Stateless packet filter', 'Layer 2 switch', 'Hub'], 'Application awareness defines an NGFW.']],
        'n9-appl2'),
      P('Storage: NAS vs SAN', 'Explain the difference between file-level (NAS) and block-level (SAN) storage.',
        `<table><tr><th></th><th>NAS</th><th>SAN</th></tr>
<tr><td>What it serves</td><td><b>Files</b> (folders, shares)</td><td><b>Blocks</b> (looks like a local disk)</td></tr>
<tr><td>Protocols</td><td>SMB (Windows), NFS (Linux)</td><td>Fibre Channel, iSCSI, FCoE</td></tr>
<tr><td>Network</td><td>The normal LAN</td><td>Usually a dedicated storage network</td></tr>
<tr><td>Typical use</td><td>User shares, backups</td><td>Databases, VM datastores</td></tr></table>
<ul><li><b>iSCSI</b> carries SCSI block commands over regular IP/Ethernet — a cheaper SAN.</li>
<li><b>Fibre Channel</b> is a separate, very low-latency storage protocol with its own switches and HBAs.</li>
<li>SANs are often built with <b>jumbo frames</b> and separate VLANs or switches so storage traffic does not fight user traffic.</li></ul>
<p><b>Exam cue:</b> "file share / SMB / NFS" → NAS. "Block-level / LUN / datastore / Fibre Channel" → SAN.</p>`,
        [['Which storage type gives clients file-level access over SMB or NFS?', 'NAS', ['SAN', 'DAS', 'Tape library'], 'NAS serves files.'],
         ['A hypervisor needs block-level storage over a dedicated Fibre Channel network. Which?', 'SAN', ['NAS', 'CDN', 'Proxy'], 'Block level over FC = SAN.']]),
      P('Applications and functions: CDN, VPN, QoS, TTL', 'Explain what a CDN, VPN, QoS and TTL each do.',
        `<ul><li><b>CDN</b> (content delivery network) — copies content to servers close to users (edge locations). Faster load times, less load on the origin server, DDoS absorption.</li>
<li><b>VPN</b> (virtual private network) — an encrypted tunnel over an untrusted network. Site-to-site joins offices; client-to-site connects remote users. (More detail in 3.5.)</li>
<li><b>QoS</b> (quality of service) — gives priority to traffic that needs it (voice, video) when links are busy. Packets are <b>classified and marked</b> (DSCP at Layer 3, CoS at Layer 2) and queued by priority.</li>
<li><b>TTL</b> (time to live) — two meanings:
<ul><li><b>IP TTL</b>: a hop counter. Each router subtracts 1; at 0 the packet is dropped and an ICMP "time exceeded" is sent back. This stops routing loops and is how <code>traceroute</code> works.</li>
<li><b>DNS TTL</b>: how long a resolver may cache a record.</li></ul></li></ul>
<p>Voice traffic is commonly marked <b>DSCP EF (46)</b> — "expedited forwarding."</p>`,
        [['What does a router do when a packet\'s TTL reaches 0?', 'Drops it and sends ICMP time exceeded', ['Forwards it with priority', 'Resets TTL to 255', 'Encrypts it'], 'This prevents endless loops.'],
         ['Which function prioritizes voice packets when a WAN link is congested?', 'QoS', ['CDN', 'TTL', 'NAT'], 'QoS classifies, marks and queues traffic.']],
        'n9-func')
    ],
    wrap: { recap: ['Router = between networks; switch = within; L3 switch routes between VLANs.', 'AP serves clients; WLC manages many lightweight APs.', 'Firewall filters; NGFW adds app awareness; IDS alerts, IPS blocks inline.', 'Forward proxy acts for clients; reverse proxy acts for servers; load balancer spreads load behind a VIP.', 'NAS = files over SMB/NFS; SAN = blocks over FC/iSCSI.', 'CDN caches near users; VPN encrypts; QoS prioritizes; TTL limits hops or cache time.'], lab: 'n9-appl-wrap' }
  });

  // ===================== 1.3 Cloud =====================
  M('n9-cloud-svc', 'Who manages what?', 'IaaS, PaaS, SaaS scenarios',
    'Pick the cloud service model for each scenario.', ['IaaS', 'PaaS', 'SaaS'],
    [['You rent virtual machines and install your own OS patches and apps', 'IaaS', 'You manage the OS and up.'],
     ['Your developers upload code; the provider runs the OS, runtime and scaling', 'PaaS', 'You manage only app + data.'],
     ['Staff log in to Microsoft 365 or Salesforce in a browser', 'SaaS', 'You only manage users and data.'],
     ['You build virtual networks, subnets and firewalls for your servers in AWS', 'IaaS', 'Infrastructure building blocks.'],
     ['A managed database service where you never see the server', 'PaaS', 'Platform service.']],
    'The higher up the stack (IaaS → PaaS → SaaS), the less you manage — and the less you control.');
  M('n9-cloud-dep', 'Deployment models & elasticity', 'Public, private, hybrid; scale vs elastic',
    'Pick the best term for each scenario.', ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Multitenancy', 'Scalability', 'Elasticity'],
    [['A hospital keeps patient systems on its own cloud but bursts web traffic to AWS', 'Hybrid cloud', 'A mix of private and public.'],
     ['Infrastructure used by one organization only, on- or off-site', 'Private cloud', 'Single tenant.'],
     ['Many customers share the same provider hardware, isolated from each other', 'Multitenancy', 'Shared, logically separated.'],
     ['Servers are added automatically on Black Friday and removed the next day', 'Elasticity', 'Grows and shrinks on demand, automatically.'],
     ['The design can grow to handle 10× more users by adding resources', 'Scalability', 'Ability to grow.'],
     ['Anyone can sign up and rent resources from a provider such as Azure', 'Public cloud', 'Shared, provider-owned.']],
    'Scalability = can it grow? Elasticity = does it grow AND shrink automatically with demand?');
  M('n9-vpc', 'Cloud network parts', 'VPC, security groups, gateways',
    'Pick the cloud component for each job.', ['VPC', 'Network security group', 'Network security list (NACL)', 'Internet gateway', 'NAT gateway', 'VPN', 'Direct Connect'],
    [['Your own isolated private network inside the provider', 'VPC', 'Virtual private cloud.'],
     ['Stateful allow rules attached to an instance or NIC', 'Network security group', 'Instance-level, stateful.'],
     ['Stateless allow/deny rules applied to a whole subnet', 'Network security list (NACL)', 'Subnet-level, stateless.'],
     ['Gives a public subnet two-way access to the Internet', 'Internet gateway', 'Inbound and outbound.'],
     ['Lets private servers download updates but blocks inbound connections from the Internet', 'NAT gateway', 'Outbound only.'],
     ['Encrypted tunnel to the VPC over the Internet, quick to set up', 'VPN', 'Cheap, uses the Internet.'],
     ['Private dedicated circuit from your data center to the provider', 'Direct Connect', 'Predictable, does not use the Internet.']],
    'Security group = instance, stateful. NACL = subnet, stateless. IGW = two-way. NAT GW = outbound only.');
  O('n9-vpc-build', 'Build a two-tier VPC', 'Order the build steps',
    'You need web servers reachable from the Internet and database servers that can only download patches. Put the steps in a working order.',
    [['Create the VPC with a CIDR block (e.g. 10.0.0.0/16)', 'Everything lives inside the VPC.'],
     ['Create a public subnet and a private subnet', 'Separate tiers.'],
     ['Attach an Internet gateway to the VPC', 'Needed for any Internet access.'],
     ['Route 0.0.0.0/0 from the public subnet to the Internet gateway', 'Makes the subnet "public."'],
     ['Deploy a NAT gateway in the public subnet', 'The NAT gateway itself needs Internet access.'],
     ['Route 0.0.0.0/0 from the private subnet to the NAT gateway', 'Outbound-only access for the databases.'],
     ['Apply security groups: web allows 443 from anywhere, DB allows 1433 from web only', 'Least privilege between tiers.']],
    'A subnet is only "public" because of its route table. The NAT gateway lives in the public subnet but serves the private one.');

  N.add({ id: '1.3', dom: 1, short: 'Cloud concepts & connectivity', title: 'Summarize cloud concepts and connectivity options',
    goal: 'Service and deployment models, VPCs, security groups, cloud gateways, cloud connectivity, NFV and elasticity.',
    parts: [
      P('Service models: IaaS, PaaS, SaaS', 'Say who manages what in IaaS, PaaS and SaaS.',
        `<table><tr><th>Model</th><th>Provider manages</th><th>You manage</th><th>Example</th></tr>
<tr><td><b>IaaS</b></td><td>Hardware, virtualization, physical network</td><td>OS, apps, data, virtual networks</td><td>AWS EC2, Azure VMs</td></tr>
<tr><td><b>PaaS</b></td><td>…plus OS and runtime</td><td>Your code and data</td><td>Azure App Service, managed databases</td></tr>
<tr><td><b>SaaS</b></td><td>Everything</td><td>Users, settings, data</td><td>Microsoft 365, Salesforce</td></tr></table>
<p>This split is the <b>shared responsibility model</b>: the provider secures the cloud itself, and you secure what you put in it. In every model, <b>you</b> are responsible for your data and who can access it.</p>
<p><b>Exam cue:</b> "install and patch the OS" → IaaS. "Just deploy code" → PaaS. "Use the app in a browser" → SaaS.</p>`,
        [['In which model does the customer patch the operating system?', 'IaaS', ['PaaS', 'SaaS', 'None of them'], 'IaaS gives you the VM; the OS is yours.'],
         ['Developers want to deploy code without managing servers. Which model?', 'PaaS', ['IaaS', 'SaaS', 'On-premises'], 'The platform runs the OS and runtime.']],
        'n9-cloud-svc'),
      P('Deployment models, multitenancy and elasticity', 'Compare public, private and hybrid clouds, and explain scalability vs elasticity.',
        `<ul><li><b>Public cloud</b> — provider-owned, shared by many customers (AWS, Azure, GCP).</li>
<li><b>Private cloud</b> — cloud-style infrastructure for <b>one</b> organization (on-site or hosted).</li>
<li><b>Hybrid cloud</b> — private + public working together, e.g. sensitive data on-prem, web front-end in public cloud.</li>
<li><b>Community cloud</b> — shared by organizations with common needs (e.g. government agencies).</li></ul>
<p><b>Multitenancy</b>: many customers (tenants) share the same physical hardware, kept logically isolated. It is why public cloud is cheap — and why isolation matters.</p>
<p><b>Scalability</b> = the ability to grow (scale <b>up</b> = bigger server; scale <b>out</b> = more servers).<br>
<b>Elasticity</b> = scaling <b>automatically up and down</b> with demand, so you pay only for what you use.</p>`,
        [['Resources are added automatically during peak hours and removed after. What is this?', 'Elasticity', ['Multitenancy', 'Hybrid cloud', 'Private cloud'], 'Automatic grow AND shrink.'],
         ['Many customers share the same provider hardware but are isolated. Term?', 'Multitenancy', ['Elasticity', 'Private cloud', 'Direct Connect'], 'Tenants share infrastructure.']],
        'n9-cloud-dep'),
      P('VPCs, security groups and cloud gateways', 'Name the cloud network building blocks and what each controls.',
        `<ul><li><b>VPC</b> (virtual private cloud, Azure calls it a VNet) — your own isolated network in the provider, with your own CIDR range and subnets.</li>
<li><b>Network security group</b> — <b>stateful</b> rules on an instance or NIC. Return traffic is allowed automatically.</li>
<li><b>Network security list / NACL</b> — <b>stateless</b> rules on a whole subnet. You must allow return traffic explicitly. Rules are processed in number order.</li>
<li><b>Internet gateway</b> — two-way Internet access for a VPC. A subnet whose route table sends <code>0.0.0.0/0</code> to it is a <b>public subnet</b>.</li>
<li><b>NAT gateway</b> — lets instances in a <b>private</b> subnet start outbound connections (updates) while blocking inbound ones.</li></ul>
<p>Tip: security group = <i>bodyguard for one server</i>. NACL = <i>gate guard for the whole subnet</i>.</p>`,
        [['Which cloud filter is stateless and applies to an entire subnet?', 'Network ACL / security list', ['Security group', 'NAT gateway', 'Internet gateway'], 'NACLs are subnet-level and stateless.'],
         ['Private-subnet servers need to download patches but must not accept inbound Internet connections. Which?', 'NAT gateway', ['Internet gateway', 'Direct Connect', 'Load balancer'], 'NAT gateway = outbound only.']],
        'n9-vpc'),
      P('Cloud connectivity and NFV', 'Choose between VPN and a direct connection to the cloud, and define NFV.',
        `<p>How does your data center reach your VPC?</p>
<table><tr><th></th><th>VPN</th><th>Direct connection</th></tr>
<tr><td>Path</td><td>Encrypted IPsec tunnel over the Internet</td><td>Private circuit to the provider</td></tr>
<tr><td>Speed to set up</td><td>Minutes</td><td>Weeks (carrier install)</td></tr>
<tr><td>Performance</td><td>Varies with the Internet</td><td>Predictable bandwidth and latency</td></tr>
<tr><td>Names</td><td>Site-to-site VPN</td><td>AWS Direct Connect, Azure ExpressRoute</td></tr></table>
<p>Many companies use a direct connection as primary and a VPN as backup.</p>
<p><b>NFV</b> (network functions virtualization) — running network functions (routers, firewalls, load balancers) as <b>software on standard servers</b> instead of dedicated hardware. In the cloud, every firewall and gateway you deploy is NFV.</p>`,
        [['A company needs predictable latency from its data center to Azure, without using the Internet. Which?', 'A dedicated connection such as ExpressRoute', ['Site-to-site VPN', 'NAT gateway', 'CDN'], 'Private circuits avoid the Internet.'],
         ['Running a firewall as a VM instead of a hardware appliance is an example of:', 'NFV', ['SaaS', 'Multitenancy', 'QoS'], 'Network functions virtualization.']])
    ],
    wrap: { recap: ['IaaS: you manage OS+. PaaS: you manage code+data. SaaS: you manage users+data.', 'Public, private, hybrid, community; multitenancy = shared hardware, isolated tenants.', 'Scalability = can grow; elasticity = grows and shrinks automatically.', 'VPC = your network; security group = stateful, per instance; NACL = stateless, per subnet.', 'Internet gateway = two-way; NAT gateway = outbound only for private subnets.', 'VPN over the Internet vs Direct Connect/ExpressRoute private circuit; NFV = network functions as software.'], lab: 'n9-vpc-build' }
  });

  // ===================== 1.4 Ports & protocols =====================
  M('n9-tcpudp', 'TCP or UDP?', 'Pick the transport',
    'Pick the transport each service normally uses.', ['TCP', 'UDP', 'Both'],
    [['Web browsing (HTTP/HTTPS)', 'TCP', 'Needs reliable delivery.'],
     ['DHCP address requests', 'UDP', 'Broadcast-based, no connection.'],
     ['DNS', 'Both', 'UDP for normal queries, TCP for zone transfers and large answers.'],
     ['Live voice (RTP) and video streaming', 'UDP', 'Late is worse than lost.'],
     ['SSH remote login', 'TCP', 'Interactive session must be reliable.'],
     ['TFTP firmware transfer', 'UDP', 'Trivial FTP = UDP 69.'],
     ['SNMP polling', 'UDP', 'UDP 161 (traps 162).']],
    'TCP = connection, sequence numbers, acknowledgments, retransmits. UDP = fire and forget, low overhead.');
  M('n9-portsA', 'Ports, part 1', 'The classic services',
    'Pick the port for each service.', ['20/21', '22', '23', '25', '53', '67/68', '69', '80', '123'],
    [['FTP (data / control)', '20/21', 'TCP 20 data, 21 control.'],
     ['SSH, SFTP and SCP', '22', 'All ride on SSH.'],
     ['Telnet', '23', 'Clear text — replace with SSH.'],
     ['SMTP (server to server mail)', '25', 'Submission from clients uses 587.'],
     ['DNS', '53', 'UDP and TCP.'],
     ['DHCP (server / client)', '67/68', 'UDP.'],
     ['TFTP', '69', 'UDP, no authentication.'],
     ['HTTP', '80', 'Unencrypted web.'],
     ['NTP', '123', 'UDP time sync.']],
    'Say them out loud in order: 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 69 TFTP, 80 HTTP, 123 NTP.');
  M('n9-ipproto', 'Not a port: IP protocols', 'ICMP, GRE, IPsec',
    'Pick the protocol for each description.', ['ICMP', 'TCP', 'UDP', 'GRE', 'AH', 'ESP', 'IKE'],
    [['Carries ping echo requests and "destination unreachable" messages', 'ICMP', 'IP protocol 1. No ports.'],
     ['Wraps other packets in a tunnel with no encryption (IP protocol 47)', 'GRE', 'Generic Routing Encapsulation.'],
     ['IPsec part that encrypts the payload (and can authenticate it)', 'ESP', 'IP protocol 50.'],
     ['IPsec part that authenticates and checks integrity but does NOT encrypt', 'AH', 'IP protocol 51.'],
     ['Negotiates IPsec keys and security associations on UDP 500', 'IKE', 'Also UDP 4500 with NAT traversal.'],
     ['Connection-oriented transport, IP protocol 6', 'TCP', 'TCP = 6.'],
     ['Connectionless transport, IP protocol 17', 'UDP', 'UDP = 17.']],
    'Protocol numbers live in the IP header; port numbers live in the TCP/UDP header. ICMP, GRE, ESP and AH have no ports.');
  M('n9-traffic', 'Who receives it?', 'Unicast, multicast, anycast, broadcast',
    'Pick the traffic type.', ['Unicast', 'Multicast', 'Anycast', 'Broadcast'],
    [['A PC downloads a file from one web server', 'Unicast', 'One to one.'],
     ['An ARP request to every host in the subnet', 'Broadcast', 'One to all (IPv4 only).'],
     ['A video stream sent once to every device that joined group 239.1.1.1', 'Multicast', 'One to many subscribers.'],
     ['Users reach the nearest of many DNS servers that share one IP address', 'Anycast', 'One to the nearest.'],
     ['OSPF routers sending hellos to 224.0.0.5', 'Multicast', '224.0.0.0/4 is multicast.'],
     ['DHCP Discover sent to 255.255.255.255', 'Broadcast', 'Client has no IP yet.']],
    'IPv6 has no broadcast — it uses multicast (e.g. ff02::1 all nodes) instead.');

  N.add({ id: '1.4', dom: 1, short: 'Ports, protocols & traffic types', title: 'Explain common networking ports, protocols, services, and traffic types',
    goal: 'Know every exam port cold, TCP vs UDP, IP protocol types (ICMP, GRE, IPsec) and the four traffic types.',
    parts: [
      P('How ports work: TCP vs UDP', 'Explain what a port is and choose TCP or UDP for a service.',
        `<p>An IP address gets traffic to the right <b>host</b>; a <b>port number</b> (0–65535) gets it to the right <b>application</b> on that host. IP + port = a <b>socket</b>, e.g. <code>10.1.1.5:443</code>.</p>
<ul><li><b>Well-known</b> 0–1023 (servers), <b>registered</b> 1024–49151, <b>ephemeral/dynamic</b> 49152–65535 (temporary client source ports).</li></ul>
<table><tr><th>TCP</th><th>UDP</th></tr>
<tr><td>Connection-oriented: 3-way handshake <b>SYN → SYN-ACK → ACK</b></td><td>Connectionless: just send</td></tr>
<tr><td>Sequence numbers, acknowledgments, retransmits, flow control (window)</td><td>No delivery guarantee, no ordering</td></tr>
<tr><td>Web, email, SSH, file transfer</td><td>DNS queries, DHCP, VoIP, streaming, SNMP, TFTP, NTP</td></tr></table>
<p>TCP closes with <b>FIN</b> (polite) or <b>RST</b> (reset/abort). A SYN answered by RST usually means "port closed."</p>`,
        [['What is the correct order of the TCP three-way handshake?', 'SYN, SYN-ACK, ACK', ['SYN, ACK, FIN', 'ACK, SYN, SYN-ACK', 'SYN, RST, ACK'], 'Client SYN, server SYN-ACK, client ACK.'],
         ['Which transport best suits live voice where late packets are useless?', 'UDP', ['TCP', 'ICMP', 'GRE'], 'No retransmission delays.']],
        'n9-tcpudp'),
      P('Ports you must know, part 1', 'Recall the ports for FTP, SSH, Telnet, SMTP, DNS, DHCP, TFTP, HTTP and NTP.',
        `<table><tr><th>Port</th><th>Protocol</th><th>Transport</th><th>Note</th></tr>
<tr><td>20/21</td><td>FTP</td><td>TCP</td><td>20 data, 21 control; clear text</td></tr>
<tr><td>22</td><td>SSH / SFTP / SCP</td><td>TCP</td><td>Encrypted remote shell and file copy</td></tr>
<tr><td>23</td><td>Telnet</td><td>TCP</td><td>Clear text — never on the exam's "secure" answer</td></tr>
<tr><td>25</td><td>SMTP</td><td>TCP</td><td>Mail between servers (secure submission = SMTPS 587)</td></tr>
<tr><td>53</td><td>DNS</td><td>UDP/TCP</td><td>TCP for zone transfers</td></tr>
<tr><td>67/68</td><td>DHCP</td><td>UDP</td><td>67 server, 68 client</td></tr>
<tr><td>69</td><td>TFTP</td><td>UDP</td><td>No login; used for firmware and IP phone configs</td></tr>
<tr><td>80</td><td>HTTP</td><td>TCP</td><td>Unencrypted web</td></tr>
<tr><td>123</td><td>NTP</td><td>UDP</td><td>Time sync</td></tr></table>
<p><b>Study tip:</b> learn ports in <b>secure pairs</b> — Telnet 23 → SSH 22, HTTP 80 → HTTPS 443, FTP 21 → SFTP 22 / FTPS 989-990.</p>`,
        [['Which port does SSH use?', '22', ['23', '21', '443'], 'SSH, SFTP and SCP all use TCP 22.'],
         ['DHCP servers listen on which port?', 'UDP 67', ['UDP 68', 'TCP 53', 'UDP 69'], 'Server 67, client 68.'],
         ['Which protocol uses UDP 123?', 'NTP', ['TFTP', 'SNMP', 'DNS'], 'Network Time Protocol.']],
        'n9-portsA'),
      P('Ports you must know, part 2', 'Recall the ports for SNMP, LDAP/LDAPS, HTTPS, SMB, syslog, SMTPS, SQL Server, RDP and SIP.',
        `<table><tr><th>Port</th><th>Protocol</th><th>Transport</th><th>Note</th></tr>
<tr><td>161/162</td><td>SNMP</td><td>UDP</td><td>161 polling, 162 traps</td></tr>
<tr><td>389</td><td>LDAP</td><td>TCP</td><td>Directory lookups (Active Directory)</td></tr>
<tr><td>443</td><td>HTTPS</td><td>TCP</td><td>HTTP over TLS</td></tr>
<tr><td>445</td><td>SMB</td><td>TCP</td><td>Windows file sharing</td></tr>
<tr><td>514</td><td>Syslog</td><td>UDP</td><td>Log messages to a collector</td></tr>
<tr><td>587</td><td>SMTPS (secure mail submission)</td><td>TCP</td><td>CompTIA's answer for SMTPS; uses STARTTLS (465 is also seen for implicit TLS)</td></tr>
<tr><td>636</td><td>LDAPS</td><td>TCP</td><td>LDAP over TLS</td></tr>
<tr><td>1433</td><td>Microsoft SQL Server</td><td>TCP</td><td>Database</td></tr>
<tr><td>3389</td><td>RDP</td><td>TCP</td><td>Windows Remote Desktop</td></tr>
<tr><td>5060/5061</td><td>SIP</td><td>TCP/UDP</td><td>VoIP call setup; 5061 = SIP over TLS</td></tr></table>
<p>Secure pairs again: LDAP 389 → LDAPS 636, SIP 5060 → 5061, SNMPv1/v2c → SNMPv3 (same ports, adds encryption).</p>`,
        [['Which port does RDP use?', '3389', ['3306', '1433', '5060'], 'Remote Desktop = TCP 3389.'],
         ['A firewall must allow encrypted directory lookups. Which port?', '636', ['389', '445', '514'], 'LDAPS = 636.'],
         ['SNMP traps from devices arrive on which port?', 'UDP 162', ['UDP 161', 'TCP 514', 'UDP 69'], 'Polling 161, traps 162.']],
        'pb-ports'),
      P('IP protocol types: ICMP, GRE and IPsec', 'Describe ICMP, GRE and the IPsec pieces (AH, ESP, IKE), which have protocol numbers, not ports.',
        `<p>Not everything rides on TCP or UDP. The IP header has a <b>protocol</b> field that says what is inside:</p>
<table><tr><th>Protocol</th><th>Number</th><th>Purpose</th></tr>
<tr><td>ICMP</td><td>1</td><td>Errors and diagnostics: ping (echo), unreachable, time exceeded</td></tr>
<tr><td>TCP</td><td>6</td><td>Reliable transport</td></tr>
<tr><td>UDP</td><td>17</td><td>Connectionless transport</td></tr>
<tr><td>GRE</td><td>47</td><td>Generic tunnel — carries other packets (even multicast/routing protocols), <b>no encryption</b></td></tr>
<tr><td>ESP</td><td>50</td><td>IPsec: <b>encrypts</b> + authenticates the payload</td></tr>
<tr><td>AH</td><td>51</td><td>IPsec: authenticates + integrity only, <b>no encryption</b></td></tr></table>
<ul><li><b>IKE</b> sets up IPsec: it negotiates keys and security associations on <b>UDP 500</b> (and <b>UDP 4500</b> when NAT is in the path).</li>
<li>Common combo: <b>GRE over IPsec</b> — GRE carries routing protocols, IPsec encrypts it.</li>
<li>A firewall passing a VPN must allow UDP 500/4500 and protocol 50 (ESP) — not "port 50."</li></ul>`,
        [['Which IPsec component encrypts the payload?', 'ESP', ['AH', 'GRE', 'ICMP'], 'ESP encrypts; AH only authenticates.'],
         ['Which protocol creates an unencrypted tunnel that can carry routing protocols?', 'GRE', ['ESP', 'IKE', 'SNMP'], 'GRE = IP protocol 47.'],
         ['IKE negotiates IPsec keys using which port?', 'UDP 500', ['TCP 443', 'UDP 161', 'TCP 22'], 'UDP 4500 with NAT-T.']],
        'n9-ipproto'),
      P('Traffic types: unicast, multicast, anycast, broadcast', 'Identify the four traffic types and their address ranges.',
        `<ul><li><b>Unicast</b> — one sender to <b>one</b> receiver. Most traffic.</li>
<li><b>Broadcast</b> — one to <b>every</b> host in the subnet (<code>255.255.255.255</code> or the subnet's broadcast address). Routers do <b>not</b> forward broadcasts. IPv4 only.</li>
<li><b>Multicast</b> — one to a <b>group</b> of hosts that joined. IPv4 range <code>224.0.0.0/4</code> (224–239). IPv6 <code>ff00::/8</code>. Examples: OSPF 224.0.0.5, IPTV.</li>
<li><b>Anycast</b> — one IP address shared by many servers; routing delivers to the <b>nearest</b>. Used by DNS root servers and CDNs. Common in IPv6.</li></ul>
<p>Why it matters: broadcasts reach every host and waste CPU, which is one reason we split large networks into VLANs and subnets. IPv6 removed broadcast entirely and uses multicast instead.</p>`,
        [['Which traffic type delivers to the nearest of several servers sharing one address?', 'Anycast', ['Multicast', 'Broadcast', 'Unicast'], 'Routing picks the closest.'],
         ['224.0.0.5 is what kind of address?', 'Multicast', ['Broadcast', 'Private unicast', 'Loopback'], '224–239 is IPv4 multicast.']],
        'n9-traffic')
    ],
    wrap: { recap: ['Ports find the application; IP finds the host. Well-known 0–1023, ephemeral 49152+.', 'TCP: handshake, sequencing, retransmits. UDP: fast, no guarantees.', '20/21 FTP · 22 SSH · 23 Telnet · 25 SMTP · 53 DNS · 67/68 DHCP · 69 TFTP · 80 HTTP · 123 NTP.', '161/162 SNMP · 389 LDAP · 443 HTTPS · 445 SMB · 514 syslog · 587 SMTP · 636 LDAPS · 1433 SQL · 3389 RDP · 5060/5061 SIP.', 'IP protocols: ICMP 1, TCP 6, UDP 17, GRE 47, ESP 50, AH 51; IKE = UDP 500/4500.', 'Unicast 1:1, broadcast 1:all (IPv4 only), multicast 1:group, anycast 1:nearest.'], lab: 'd-ports' }
  });
})();
