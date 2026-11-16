/* Domain 1.0 Networking Concepts — objectives 1.5 to 1.8 */
(function () {
  var N = window.N9, P = N.P, M = N.M, O = N.O;

  // ===================== 1.5 Media & transceivers =====================
  M('n9-cat', 'Copper cable picker', 'Categories, shielding, plenum, coax, DAC',
    'Pick the cable that fits each job.', ['Cat 5e', 'Cat 6', 'Cat 6a', 'Cat 8', 'STP', 'Plenum-rated', 'RG-6 coax', 'DAC (twinax)'],
    [['1 Gbps to desks at up to 100 m, lowest cost', 'Cat 5e', '1000BASE-T, 100 m.'],
     ['10 Gbps over a full 100 m run', 'Cat 6a', 'Cat 6 only does 10G to ~55 m.'],
     ['25/40 Gbps between racks, runs of 30 m or less', 'Cat 8', 'Short data center runs.'],
     ['Cable runs next to large motors and fluorescent ballasts', 'STP', 'Shielding fights EMI.'],
     ['Cable pulled through the air-handling space above the ceiling', 'Plenum-rated', 'Fire code: low smoke, low toxicity jacket.'],
     ['Cable modem connection to the ISP', 'RG-6 coax', 'F-type connector.'],
     ['3 m top-of-rack 10G link from server to switch, cheapest option', 'DAC (twinax)', 'Copper with transceivers built in.'],
     ['1 Gbps (and 10G to ~55 m) for a typical new office', 'Cat 6', 'Common modern install.']],
    'Category sets speed and distance. Shielding fights interference. Plenum vs non-plenum is about fire code, not speed.');
  M('n9-fiber', 'Fiber picker', 'Single-mode vs multimode',
    'Pick single-mode or multimode for each case.', ['Single-mode', 'Multimode'],
    [['Link between two buildings 8 km apart', 'Single-mode', 'Long distance.'],
     ['Inside one data center row, 150 m, cheapest optics', 'Multimode', 'Short reach, cheaper LED/VCSEL optics.'],
     ['Narrow 9-micron core, laser light source', 'Single-mode', 'One path of light.'],
     ['50 or 62.5-micron core, color-coded aqua/orange jacket', 'Multimode', 'OM3/OM4 are aqua.'],
     ['Yellow jacket', 'Single-mode', 'Typical SMF jacket color.'],
     ['Carrier/ISP metro and long-haul links', 'Single-mode', 'Tens of km.']],
    'Mismatching single-mode and multimode optics or patch cords is a classic troubleshooting question (5.2).');
  M('n9-conn', 'Connector ID', 'Copper and fiber connectors',
    'Pick the connector for each description.', ['RJ45', 'RJ11', 'F-type', 'BNC', 'LC', 'SC', 'ST', 'MPO'],
    [['8-pin modular plug on Ethernet patch cables', 'RJ45', '8P8C.'],
     ['Smaller 6-position plug on analog phone lines and DSL', 'RJ11', 'Phone line.'],
     ['Screw-on coax connector for cable modems and TV', 'F-type', 'RG-6.'],
     ['Bayonet twist-lock coax connector on older video/test gear', 'BNC', 'Twist and lock.'],
     ['Small push-pull fiber connector used on most SFP modules', 'LC', '"Little connector."'],
     ['Square push-pull fiber connector', 'SC', '"Square connector / stick and click."'],
     ['Round bayonet (twist) fiber connector', 'ST', '"Stick and twist."'],
     ['One connector holding 12 or more fibers for 40/100G links', 'MPO', 'Multi-fiber push-on.']],
    'Fiber shapes: LC little, SC square, ST round twist, MPO many fibers.');
  M('n9-media-pick', 'Choose the media and optics', 'Combined 1.5 scenarios',
    'Pick the best fit for each requirement.', ['Cat 6a + RJ45', 'Multimode fiber + LC', 'Single-mode fiber + LC', 'QSFP28', 'SFP+', 'Satellite', 'Cellular (5G)', 'Plenum-rated Cat 6'],
    [['10G copper to wall jacks at 90 m', 'Cat 6a + RJ45', '10GBASE-T to 100 m.'],
     ['10G uplink module on a switch port', 'SFP+', 'SFP+ = 10G.'],
     ['100G spine uplinks', 'QSFP28', 'Four 25G lanes.'],
     ['Campus building 15 km away', 'Single-mode fiber + LC', 'Long reach.'],
     ['Server room switches 200 m apart', 'Multimode fiber + LC', 'Short reach, cheaper optics.'],
     ['Remote farm with no wired ISP, wide view of the sky', 'Satellite', 'Coverage anywhere, higher latency (lower with LEO).'],
     ['Backup WAN link for a retail kiosk', 'Cellular (5G)', 'Quick to deploy, no cabling.'],
     ['New drops pulled above the drop ceiling air space', 'Plenum-rated Cat 6', 'Plenum jacket required in air-handling spaces.']],
    'Every real install decision is: speed + distance + environment + cost.');

  N.add({ id: '1.5', dom: 1, short: 'Transmission media & transceivers', title: 'Compare and contrast transmission media and transceivers',
    goal: 'Wireless, copper and fiber media; cable categories; transceivers (SFP, QSFP); and every connector type.',
    parts: [
      P('Wireless media: 802.11, cellular, satellite', 'Compare Wi-Fi, cellular and satellite as transmission media.',
        `<ul><li><b>802.11 (Wi-Fi)</b> — local wireless LAN in unlicensed bands (2.4, 5, 6 GHz). Short range, high speed. Details in objective 2.3.</li>
<li><b>Cellular</b> (4G LTE, 5G) — licensed spectrum from a carrier. Great for mobile users, backup WAN links and IoT. 5G offers high speed and low latency.</li>
<li><b>Satellite</b> — works almost anywhere with a clear sky view.
<ul><li><b>GEO</b> satellites (~36,000 km up) give <b>high latency</b> (~600 ms round trip) — bad for voice/gaming.</li>
<li><b>LEO</b> constellations (e.g. Starlink, ~550 km) cut latency to ~25–60 ms.</li>
<li>Rain fade and obstructions affect the signal.</li></ul></li></ul>
<p><b>Wired 802.3 (Ethernet)</b> is the copper/fiber family. Names read as <i>speed</i>BASE-<i>media</i>: <code>1000BASE-T</code> = 1 Gbps over twisted pair, <code>10GBASE-SR</code> = 10 Gbps short-reach multimode fiber, <code>10GBASE-LR</code> = long-reach single-mode.</p>`,
        [['Which medium has the highest latency for real-time voice?', 'Geostationary satellite', ['Cat 6', 'Single-mode fiber', '5G cellular'], 'GEO satellites are ~36,000 km away.'],
         ['In 10GBASE-LR, what does "LR" indicate?', 'Long reach over single-mode fiber', ['Low rate copper', 'Local radio', 'Short multimode'], 'SR = short (multimode), LR = long (single-mode).']]),
      P('Copper: twisted pair, coax and DAC', 'Pick the right copper cable category, shielding and jacket for a run.',
        `<table><tr><th>Category</th><th>Speed</th><th>Max distance</th></tr>
<tr><td>Cat 5e</td><td>1 Gbps</td><td>100 m</td></tr>
<tr><td>Cat 6</td><td>1 Gbps (10 Gbps to ~55 m)</td><td>100 m</td></tr>
<tr><td>Cat 6a</td><td>10 Gbps</td><td>100 m</td></tr>
<tr><td>Cat 7</td><td>10 Gbps, shielded (not a TIA standard)</td><td>100 m</td></tr>
<tr><td>Cat 8</td><td>25/40 Gbps</td><td>30 m</td></tr></table>
<ul><li><b>UTP</b> (unshielded) is the default. <b>STP</b> (shielded) resists <b>EMI</b> near motors and power lines — but must be grounded.</li>
<li><b>Plenum</b> jackets (fire-resistant, low smoke) are required in air-handling spaces; <b>non-plenum (PVC/riser)</b> elsewhere.</li>
<li><b>Coax</b> (RG-6) carries cable Internet/TV with an F-type connector.</li>
<li><b>DAC</b> (direct attach copper / twinax) — a short copper cable with transceivers molded on each end. Cheapest way to do 10/25G inside a rack (up to ~7 m).</li></ul>`,
        [['What is the maximum distance for 1000BASE-T over Cat 5e?', '100 meters', ['55 meters', '185 meters', '500 meters'], 'Twisted pair Ethernet = 100 m.'],
         ['Cable runs through the air-handling space above a drop ceiling. What is required?', 'Plenum-rated cable', ['Cat 8 cable', 'Coax', 'Riser-rated PVC'], 'Plenum jacket meets fire code there.']],
        'n9-cat'),
      P('Fiber: single-mode vs multimode', 'Choose single-mode or multimode fiber based on distance and cost.',
        `<table><tr><th></th><th>Single-mode (SMF)</th><th>Multimode (MMF)</th></tr>
<tr><td>Core</td><td>~9 µm</td><td>50 or 62.5 µm</td></tr>
<tr><td>Light source</td><td>Laser</td><td>LED / VCSEL</td></tr>
<tr><td>Distance</td><td>Kilometers (10–80+ km)</td><td>Hundreds of meters</td></tr>
<tr><td>Cost</td><td>Pricier optics</td><td>Cheaper optics</td></tr>
<tr><td>Jacket color</td><td>Usually yellow</td><td>Orange (OM1/2), aqua (OM3/4), lime (OM5)</td></tr></table>
<ul><li>Fiber is immune to <b>EMI</b>, does not carry electricity (safe between buildings), and is hard to tap.</li>
<li>You <b>cannot mix</b> single-mode optics with multimode cable (or the reverse) — the link will fail or be very lossy.</li>
<li>Fiber links use <b>two strands</b> (transmit and receive) unless a <b>BiDi</b> optic uses WDM to share one strand.</li></ul>`,
        [['Which fiber type is used for links of many kilometers?', 'Single-mode', ['Multimode', 'Cat 6a', 'Coax'], 'Narrow core + laser = long distance.'],
         ['Why is fiber a good choice between two buildings?', 'It is immune to EMI and does not conduct electricity', ['It is cheaper than copper', 'It needs no transceivers', 'It carries PoE'], 'No ground loops or lightning paths.']],
        'n9-fiber'),
      P('Transceivers: SFP and QSFP', 'Match transceiver form factors to speeds and protocols.',
        `<p>A <b>transceiver</b> (transmitter + receiver) is a hot-swappable module that plugs into a switch port and decides the speed and media.</p>
<table><tr><th>Form factor</th><th>Typical speed</th></tr>
<tr><td>SFP</td><td>1 Gbps</td></tr><tr><td>SFP+</td><td>10 Gbps</td></tr><tr><td>SFP28</td><td>25 Gbps</td></tr>
<tr><td>QSFP+</td><td>40 Gbps (4 × 10G)</td></tr><tr><td>QSFP28</td><td>100 Gbps (4 × 25G)</td></tr></table>
<ul><li>"Q" = <b>quad</b>: four lanes in one module. A QSFP port can often be split into four SFP-speed links with a breakout cable.</li>
<li>Transceivers speak a <b>protocol</b>: most are <b>Ethernet</b>, but storage networks use <b>Fibre Channel</b> optics. They are not interchangeable.</li>
<li>Both ends must match: same speed, same wavelength (e.g. 850 nm SR vs 1310 nm LR), same fiber type. A mismatch = no link.</li></ul>`,
        [['Which form factor carries 100 Gbps using four 25G lanes?', 'QSFP28', ['SFP+', 'SFP', 'SFP28'], 'Q = quad, 28 = 25G lanes.'],
         ['A 10GBASE-SR optic is on one end and 10GBASE-LR on the other. What happens?', 'No link — wavelength and fiber type do not match', ['It works at 1 Gbps', 'It works normally', 'Only one direction works'], 'Both ends must match.']]),
      P('Connectors: copper and fiber', 'Identify RJ45, RJ11, F-type, BNC, LC, SC, ST and MPO.',
        `<table><tr><th>Connector</th><th>Media</th><th>Recognize it by</th></tr>
<tr><td>RJ45 (8P8C)</td><td>Twisted pair</td><td>8 pins, Ethernet</td></tr>
<tr><td>RJ11</td><td>Twisted pair</td><td>Smaller, phone/DSL</td></tr>
<tr><td>F-type</td><td>Coax</td><td>Screw-on, cable modem</td></tr>
<tr><td>BNC</td><td>Coax</td><td>Bayonet twist-lock</td></tr>
<tr><td>LC</td><td>Fiber</td><td>Small push-pull, on most SFPs</td></tr>
<tr><td>SC</td><td>Fiber</td><td>Square push-pull</td></tr>
<tr><td>ST</td><td>Fiber</td><td>Round, bayonet twist</td></tr>
<tr><td>MPO</td><td>Fiber</td><td>One connector, 12+ fibers (40/100G)</td></tr></table>
<p>Fiber end-face polish: <b>UPC</b> (blue) and <b>APC</b> (green, angled 8°). Never mate APC to UPC — it damages the end faces and causes high loss.</p>`,
        [['Which fiber connector is small, push-pull and used on most SFP modules?', 'LC', ['ST', 'BNC', 'F-type'], 'LC = little connector.'],
         ['A cable modem uses which connector?', 'F-type', ['RJ45', 'LC', 'MPO'], 'Coax with screw-on F-type.']],
        'n9-conn')
    ],
    wrap: { recap: ['Wireless media: 802.11 (unlicensed), cellular (carrier), satellite (GEO high latency, LEO low).', 'Cat 5e 1G/100 m · Cat 6 10G to 55 m · Cat 6a 10G/100 m · Cat 8 25–40G/30 m.', 'STP fights EMI; plenum jacket for air-handling spaces; DAC = cheap short in-rack copper.', 'Single-mode: 9 µm, laser, km. Multimode: 50/62.5 µm, hundreds of meters, cheaper.', 'SFP 1G · SFP+ 10G · SFP28 25G · QSFP+ 40G · QSFP28 100G. Ends must match.', 'RJ45, RJ11, F-type, BNC; fiber LC, SC, ST, MPO.'], lab: 'n9-media-pick' }
  });

  // ===================== 1.6 Topologies & architectures =====================
  M('n9-topo', 'Name the topology', 'Mesh, star, P2P, hybrid',
    'Pick the topology described.', ['Full mesh', 'Partial mesh', 'Star / hub-and-spoke', 'Point-to-point', 'Hybrid'],
    [['Every site connects directly to every other site', 'Full mesh', 'Most redundant, most links.'],
     ['Branches all connect to HQ, and only through HQ to each other', 'Star / hub-and-spoke', 'HQ is the single point of failure.'],
     ['One dedicated link joining exactly two sites', 'Point-to-point', 'Two endpoints.'],
     ['Critical sites are meshed; small sites hang off them in a star', 'Hybrid', 'Mix of topologies.'],
     ['Some, but not all, sites have direct links to each other', 'Partial mesh', 'Redundancy where it matters.'],
     ['PCs in an office each cable to one switch', 'Star / hub-and-spoke', 'Physical star.']],
    'Full mesh links = n(n−1)/2. Six sites need 15 links — that cost is why partial mesh and hub-and-spoke exist.');
  M('n9-flows', 'Three-tier, spine-leaf and traffic flow', 'Architecture terms',
    'Pick the term for each description.', ['Core layer', 'Distribution layer', 'Access layer', 'Collapsed core', 'Spine-and-leaf', 'North-south traffic', 'East-west traffic'],
    [['Where users and APs plug in', 'Access layer', 'Edge ports, PoE, port security.'],
     ['Aggregates access switches, applies policy, routes between VLANs', 'Distribution layer', 'Policy boundary.'],
     ['Fast, redundant backbone — no heavy filtering', 'Core layer', 'Speed only.'],
     ['Small campus where core and distribution are the same switches', 'Collapsed core', 'Two tiers.'],
     ['Every leaf connects to every spine; any server is two hops from any other', 'Spine-and-leaf', 'Predictable data center latency.'],
     ['A user downloading from the Internet into the data center', 'North-south traffic', 'In/out of the data center.'],
     ['A web server querying a database server in the same data center', 'East-west traffic', 'Server to server.']],
    'Three-tier fits north-south campus traffic. Spine-and-leaf was built for heavy east-west traffic.');
  M('n9-arch', 'Design review', 'Pick the architecture for each site',
    'Choose the best design for each requirement.', ['Three-tier hierarchical', 'Collapsed core', 'Spine-and-leaf', 'Hub-and-spoke WAN', 'Full mesh WAN', 'Point-to-point link'],
    [['Large multi-building campus with thousands of users', 'Three-tier hierarchical', 'Scales with clear roles.'],
     ['Single-building office with 150 users and a tight budget', 'Collapsed core', 'Core + distribution in one.'],
     ['Virtualization cluster with heavy server-to-server traffic', 'Spine-and-leaf', 'East-west optimized.'],
     ['40 retail stores that mostly talk only to HQ', 'Hub-and-spoke WAN', 'Cheap and simple.'],
     ['4 data centers that must all survive any single link failure and talk directly', 'Full mesh WAN', 'Maximum redundancy.'],
     ['Dedicated link between a factory and its warehouse', 'Point-to-point link', 'Two sites only.']],
    'Pick the simplest design that meets the redundancy and traffic-flow needs.');

  N.add({ id: '1.6', dom: 1, short: 'Topologies, architectures & types', title: 'Compare and contrast network topologies, architectures, and types',
    goal: 'Mesh, star/hub-and-spoke, point-to-point, hybrid; three-tier and collapsed core; spine-and-leaf; north-south vs east-west.',
    parts: [
      P('Topologies: mesh, star, point-to-point, hybrid', 'Identify each topology and its main trade-off.',
        `<ul><li><b>Star / hub-and-spoke</b> — everything connects to a central point (a switch in a LAN, HQ in a WAN). Easy to manage; the center is a <b>single point of failure</b>.</li>
<li><b>Full mesh</b> — every node links to every other. Maximum redundancy, maximum cost. Links needed: <b>n(n−1)/2</b>.</li>
<li><b>Partial mesh</b> — only important nodes get extra links. A common compromise.</li>
<li><b>Point-to-point</b> — one link, two endpoints (a leased line or a wireless bridge between buildings).</li>
<li><b>Hybrid</b> — a mix, e.g. meshed core with star branches. Most real networks are hybrid.</li></ul>
<p><b>Physical vs logical:</b> physical topology is how cables run; logical topology is how data flows. Old Ethernet hubs were a physical star but a logical bus.</p>
<p><b>Network types by size:</b> PAN (Bluetooth), LAN (one site), CAN (campus), MAN (city), WAN (cities/countries), WLAN (wireless LAN), SAN (storage).</p>`,
        [['How many links does a full mesh of 5 sites need?', '10', ['5', '20', '25'], '5 × 4 ÷ 2 = 10.'],
         ['What is the main weakness of hub-and-spoke?', 'The hub is a single point of failure', ['It needs the most links', 'Spokes cannot reach the hub', 'It only works wirelessly'], 'Lose the hub, lose everything.']],
        'n9-topo'),
      P('Three-tier hierarchy and collapsed core', 'Describe the core, distribution and access layers and when to collapse them.',
        `<p>The classic campus design splits switches into three roles:</p>
<ul><li><b>Access</b> — where users, phones, printers and APs connect. Features: PoE, VLAN assignment, port security, 802.1X.</li>
<li><b>Distribution</b> — aggregates access switches. Inter-VLAN routing, ACLs, QoS policy, redundancy toward the core.</li>
<li><b>Core</b> — high-speed backbone between distribution blocks and to the data center/WAN. Keep it <b>fast and simple</b>: no heavy filtering.</li></ul>
<p><b>Collapsed core</b> — in smaller sites, the core and distribution roles run on the same pair of switches. Fewer boxes, lower cost, still redundant.</p>
<p>Why bother with tiers? Each layer can grow on its own, faults stay contained, and troubleshooting has a clear map.</p>`,
        [['Which layer should be optimized for speed with minimal filtering?', 'Core', ['Access', 'Distribution', 'Presentation'], 'Fast transport only.'],
         ['A small office combines the core and distribution roles. What is this called?', 'Collapsed core', ['Spine-and-leaf', 'Full mesh', 'Access layer'], 'Two-tier design.']]),
      P('Spine-and-leaf and traffic flows', 'Explain spine-and-leaf and tell north-south from east-west traffic.',
        `<p>Modern data centers are built for <b>east-west</b> traffic: servers, VMs and containers talking to each other.</p>
<ul><li><b>Spine-and-leaf</b> — servers connect to <b>leaf</b> (top-of-rack) switches. Every leaf connects to <b>every spine</b>. Spines never connect to each other; leaves never connect to each other.</li>
<li>Result: any server is the same number of hops from any other (leaf → spine → leaf). Predictable latency, and you scale by adding leaves (more ports) or spines (more bandwidth).</li>
<li>All links are active (routed with ECMP), unlike STP blocking redundant links.</li></ul>
<p><b>Traffic flows:</b></p>
<ul><li><b>North-south</b> — in and out of the data center (clients ↔ servers, Internet ↔ DC). Inspected at the perimeter.</li>
<li><b>East-west</b> — between servers inside the data center. Needs internal segmentation (micro-segmentation) because the perimeter never sees it.</li></ul>`,
        [['In spine-and-leaf, which switches connect to each other?', 'Every leaf to every spine', ['Spine to spine', 'Leaf to leaf', 'Only one spine per leaf'], 'Full bipartite mesh.'],
         ['An app server talking to a database in the same data center is:', 'East-west traffic', ['North-south traffic', 'Broadcast traffic', 'WAN traffic'], 'Server to server inside the DC.']],
        'n9-flows')
    ],
    wrap: { recap: ['Star = central point (SPOF). Full mesh = n(n−1)/2 links. Partial mesh = compromise. P2P = two ends. Hybrid = mix.', 'Network sizes: PAN, LAN, CAN, MAN, WAN; plus WLAN and SAN.', 'Three-tier: access (users), distribution (policy, inter-VLAN), core (fast backbone).', 'Collapsed core merges core + distribution for smaller sites.', 'Spine-and-leaf: every leaf to every spine; equal hops; all links active.', 'North-south = in/out of the DC. East-west = server to server.'], lab: 'n9-arch' }
  });

  // ===================== 1.7 IPv4 addressing =====================
  M('n9-v4types', 'What kind of IPv4 address?', 'Private, public, APIPA, loopback, class',
    'Pick the best description of each address.', ['RFC 1918 private', 'Public', 'APIPA', 'Loopback', 'Multicast (Class D)', 'Experimental (Class E)'],
    [['10.44.3.9', 'RFC 1918 private', '10.0.0.0/8.'],
     ['172.20.1.1', 'RFC 1918 private', '172.16.0.0/12 = 172.16–172.31.'],
     ['172.32.1.1', 'Public', 'Just outside 172.16.0.0/12.'],
     ['169.254.77.3', 'APIPA', 'Windows self-assigns when DHCP fails.'],
     ['127.0.0.1', 'Loopback', 'The host itself.'],
     ['239.10.10.10', 'Multicast (Class D)', '224–239.'],
     ['250.1.1.1', 'Experimental (Class E)', '240–255.'],
     ['8.8.8.8', 'Public', 'Globally routable.']],
    'RFC 1918: 10/8, 172.16/12, 192.168/16. APIPA 169.254/16 is a symptom: "DHCP did not answer."');
  O('n9-subnet-steps', 'Magic number method', 'Order the subnetting steps',
    'You must find the network, broadcast and usable range for 192.168.10.77/27. Put the steps in order.',
    [['Find the interesting octet (the one the mask does not fill completely)', '/27 → 4th octet mask 224.'],
     ['Block size = 256 − interesting octet mask', '256 − 224 = 32.'],
     ['List multiples of the block size: 0, 32, 64, 96…', 'Subnets start on these.'],
     ['Network = the multiple at or below the host value', '77 falls in 64 → 192.168.10.64.'],
     ['Broadcast = next network − 1', '96 − 1 → 192.168.10.95.'],
     ['Usable range = network + 1 through broadcast − 1', '.65 – .94, 30 hosts.']],
    'With practice this is a 20-second process on scratch paper.');

  N.add({ id: '1.7', dom: 1, short: 'IPv4 addressing', title: 'Given a scenario, use appropriate IPv4 network addressing',
    goal: 'Binary, masks and CIDR, public vs private, APIPA, loopback, classes, subnetting and VLSM — fast, on paper.',
    parts: [
      P('Binary and the 32-bit address', 'Convert an octet between decimal and binary using the 128-64-32-16-8-4-2-1 chart.',
        `<p>An IPv4 address is <b>32 bits</b>, written as four 8-bit <b>octets</b> in decimal: <code>192.168.1.10</code>.</p>
<p>Each octet uses these bit values: <code>128 64 32 16 8 4 2 1</code> (they add up to 255).</p>
<table><tr><th>Decimal</th><th>Binary</th><th>How</th></tr>
<tr><td>192</td><td>11000000</td><td>128 + 64</td></tr><tr><td>168</td><td>10101000</td><td>128 + 32 + 8</td></tr>
<tr><td>10</td><td>00001010</td><td>8 + 2</td></tr><tr><td>255</td><td>11111111</td><td>all bits on</td></tr></table>
<p><b>Decimal → binary:</b> walk left to right. If the bit value fits in what is left, write 1 and subtract; otherwise write 0.</p>
<p><b>Mask values you will see constantly:</b> 128, 192, 224, 240, 248, 252, 254, 255 (1, 2, 3 … 8 bits on from the left).</p>`,
        [['What is 11100000 in decimal?', '224', ['192', '240', '112'], '128 + 64 + 32.'],
         ['How many bits are in an IPv4 address?', '32', ['48', '64', '128'], 'Four 8-bit octets.']],
        'd-binary'),
      P('Network vs host: masks and CIDR', 'Use a subnet mask or CIDR prefix to split an address into network and host parts.',
        `<p>The <b>subnet mask</b> marks which bits are the <b>network</b> (1s) and which are the <b>host</b> (0s). <b>CIDR</b> notation just counts the 1s: <code>255.255.255.0</code> = <code>/24</code>.</p>
<ul><li>Two hosts can talk directly only if they are in the <b>same network</b>. Otherwise traffic goes to the <b>default gateway</b> (a router).</li>
<li><b>Network address</b> = all host bits 0 (cannot be assigned). <b>Broadcast</b> = all host bits 1 (cannot be assigned).</li>
<li><b>Usable hosts</b> = 2<sup>host bits</sup> − 2. A /24 has 8 host bits → 256 − 2 = <b>254</b>.</li></ul>
<table><tr><th>CIDR</th><th>Mask</th><th>Usable hosts</th></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr><tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr><tr><td>/27</td><td>255.255.255.224</td><td>30</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr><tr><td>/30</td><td>255.255.255.252</td><td>2 (router links)</td></tr></table>
<p>The paired lab has you address two PCs on the same /24 and prove it with a ping.</p>`,
        [['How many usable hosts are in a /26?', '62', ['64', '30', '126'], '2^6 − 2.'],
         ['Which mask equals /27?', '255.255.255.224', ['255.255.255.240', '255.255.255.192', '255.255.254.0'], '3 bits on in the last octet = 224.']],
        'l-first'),
      P('Address types: public, private, APIPA, loopback, classes', 'Recognize RFC 1918, APIPA, loopback and the classful ranges.',
        `<table><tr><th>Type</th><th>Range</th><th>Meaning</th></tr>
<tr><td>RFC 1918 private</td><td>10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16</td><td>Free to use inside; not routed on the Internet — needs NAT</td></tr>
<tr><td>APIPA</td><td>169.254.0.0/16</td><td>Self-assigned when DHCP fails</td></tr>
<tr><td>Loopback</td><td>127.0.0.0/8 (127.0.0.1)</td><td>The host itself</td></tr>
<tr><td>Public</td><td>Everything else (unicast)</td><td>Globally unique, assigned by ISPs/RIRs</td></tr></table>
<p><b>Classful ranges</b> (by first octet, still tested):</p>
<table><tr><th>Class</th><th>First octet</th><th>Default mask</th></tr>
<tr><td>A</td><td>1–126</td><td>/8</td></tr><tr><td>B</td><td>128–191</td><td>/16</td></tr><tr><td>C</td><td>192–223</td><td>/24</td></tr>
<tr><td>D</td><td>224–239</td><td>Multicast</td></tr><tr><td>E</td><td>240–255</td><td>Experimental</td></tr></table>
<p>A PC showing <b>169.254.x.x</b> is your cue to check DHCP, the cable or the VLAN.</p>`,
        [['A PC shows 169.254.10.20. What does that tell you?', 'It did not get a DHCP lease', ['It has a public address', 'It is in Class D', 'DNS is broken'], 'APIPA = DHCP failed.'],
         ['Which address is NOT RFC 1918 private?', '172.32.0.5', ['172.31.255.1', '10.200.1.1', '192.168.50.5'], '172.16–172.31 only.']],
        'n9-v4types'),
      P('Subnetting with the magic number', 'Find the network, broadcast and usable range of any address in under a minute.',
        `<p><b>Magic number (block size) = 256 − the mask value in the interesting octet.</b></p>
<p>Example: <code>192.168.10.77 /27</code></p>
<ol><li>/27 → last octet mask <b>224</b>.</li>
<li>Block size = 256 − 224 = <b>32</b>. Subnets start at 0, 32, 64, 96…</li>
<li>77 sits in the block starting at <b>64</b> → network <code>192.168.10.64</code>.</li>
<li>Broadcast = next block − 1 = <code>192.168.10.95</code>.</li>
<li>Usable = <code>.65 – .94</code> (30 hosts).</li></ol>
<p>It works in any octet. <code>10.1.37.5 /20</code>: mask 255.255.<b>240</b>.0, block 16 in the third octet → network <code>10.1.32.0</code>, broadcast <code>10.1.47.255</code>.</p>
<p><b>Number of subnets</b> when you borrow bits: 2<sup>borrowed bits</sup>. A /24 split into /27s = 2<sup>3</sup> = 8 subnets.</p>`,
        [['What is the network address of 10.0.0.200/26?', '10.0.0.192', ['10.0.0.128', '10.0.0.200', '10.0.0.255'], 'Block 64: 0, 64, 128, 192.'],
         ['What is the broadcast address of 172.16.5.10/29?', '172.16.5.15', ['172.16.5.7', '172.16.5.16', '172.16.5.255'], 'Block 8: 8–15.']],
        'pb-subnet'),
      P('Right-sizing with VLSM', 'Pick the smallest mask for a host count and carve one block into different-sized subnets.',
        `<p><b>VLSM</b> (variable-length subnet masking) = using different masks inside one address block so no subnet wastes addresses.</p>
<p><b>Pick a mask for N hosts:</b> find the smallest power of 2 that is ≥ N + 2.</p>
<table><tr><th>Need</th><th>Block</th><th>Mask</th></tr><tr><td>100 hosts</td><td>128</td><td>/25</td></tr><tr><td>50 hosts</td><td>64</td><td>/26</td></tr><tr><td>20 hosts</td><td>32</td><td>/27</td></tr><tr><td>2 (router link)</td><td>4</td><td>/30</td></tr></table>
<p><b>Rule:</b> allocate the <b>largest</b> subnet first, then the next largest, each starting right after the previous one ends. This keeps every block on a valid boundary.</p>
<p><b>Summarization (supernetting)</b> is the reverse: advertise many contiguous networks as one route. 192.168.0.0/24 through 192.168.3.0/24 = <code>192.168.0.0/22</code>.</p>`,
        [['What is the smallest subnet that holds 60 hosts?', '/26', ['/27', '/25', '/28'], '64 − 2 = 62 usable.'],
         ['Summarize 10.1.0.0/24 – 10.1.7.0/24 into one route.', '10.1.0.0/21', ['10.1.0.0/22', '10.1.0.0/23', '10.1.0.0/16'], 'Eight /24s = /21.']],
        'pb-vlsm'),
      P('Subnetting in the simulator', 'Apply a subnet plan on real router and PC interfaces and prove it with ping.',
        `<p>Time to use the plan on real gear. In the paired lab you address a small office with a router and two subnets.</p>
<ul><li>Each router interface gets the <b>first usable</b> address of its subnet (a common convention) — that is the PCs' <b>default gateway</b>.</li>
<li>Every host in a subnet must use the <b>same mask</b> and a gateway <b>inside its own subnet</b>.</li>
<li>Router interface command: <code>interface g0/0</code> → <code>ip address 192.168.1.1 255.255.255.0</code> → <code>no shutdown</code>.</li>
<li>PC: <code>ip 192.168.1.10 255.255.255.0 192.168.1.1</code> (address, mask, gateway).</li></ul>
<p><b>Checks that catch 90% of mistakes:</b> Is the interface up/up (<code>show ip interface brief</code>)? Is the PC's gateway in its own subnet? Do both sides use the same mask?</p>`,
        [['A PC is 192.168.1.10/24 with gateway 192.168.2.1. What happens?', 'It can reach its own subnet but nothing beyond it', ['Everything works', 'It gets APIPA', 'It cannot reach anything at all'], 'The gateway must be inside the PC\'s own subnet.'],
         ['Which command enables a router interface that is administratively down?', 'no shutdown', ['enable', 'ip routing', 'interface up'], 'Interfaces default to shutdown on routers.']],
        'l-addressing')
    ],
    wrap: { recap: ['Bit values 128 64 32 16 8 4 2 1; mask octets 128 192 224 240 248 252 254 255.', 'CIDR counts mask 1s. Usable hosts = 2^host bits − 2.', 'RFC 1918: 10/8, 172.16/12, 192.168/16. APIPA 169.254/16. Loopback 127/8.', 'Classes A 1–126, B 128–191, C 192–223, D multicast 224–239, E 240–255.', 'Block size = 256 − mask octet; network = block at/below; broadcast = next − 1.', 'VLSM: largest subnet first. Summarize contiguous networks into one shorter prefix.'], lab: 'l-vlsm' }
  });

  // ===================== 1.8 Evolving use cases =====================
  M('n9-sdwan', 'SDN & SD-WAN terms', 'Planes and features',
    'Pick the term for each description.', ['Control plane', 'Data plane', 'Management plane', 'SDN controller', 'Zero-touch provisioning', 'Application-aware routing', 'Transport agnostic'],
    [['Decides where traffic should go (routing protocols, tables)', 'Control plane', 'The "brain."'],
     ['Actually forwards packets/frames at line rate', 'Data plane', 'The "muscle."'],
     ['How admins configure and monitor devices (SSH, API, GUI)', 'Management plane', 'Admin access.'],
     ['Central software that programs the forwarding of many devices', 'SDN controller', 'Centralized control plane.'],
     ['A new branch router is unboxed, plugged in and pulls its config automatically', 'Zero-touch provisioning', 'No engineer on site.'],
     ['Voice goes over MPLS while backups use the cheaper broadband link', 'Application-aware routing', 'Per-app path selection.'],
     ['SD-WAN runs over broadband, LTE or MPLS equally', 'Transport agnostic', 'Any underlay.']],
    'SDN separates the control plane (centralized) from the data plane (distributed). SD-WAN applies that idea to WAN links.');
  M('n9-zt', 'Modern security architectures', 'VXLAN, Zero Trust, SASE/SSE',
    'Pick the term for each description.', ['VXLAN', 'Zero Trust', 'SASE', 'SSE', 'Least privilege'],
    [['Carries Layer 2 frames inside UDP/IP so VLANs can stretch between data centers', 'VXLAN', '24-bit VNI, ~16M segments.'],
     ['Never trust, always verify — every request is authenticated and authorized', 'Zero Trust', 'No implicit trust inside.'],
     ['Security services (SWG, CASB, ZTNA, FWaaS) PLUS SD-WAN delivered from the cloud', 'SASE', 'Secure access service edge.'],
     ['The cloud-delivered security services only, without the SD-WAN part', 'SSE', 'Security service edge.'],
     ['Users and services get only the access they need, nothing more', 'Least privilege', 'Core Zero Trust principle.']],
    'SASE = SSE + SD-WAN. VXLAN is the data center answer to "4094 VLANs is not enough."');
  O('n9-git', 'Change a config the IaC way', 'Order the source-control workflow',
    'You need to add a VLAN to 40 switches using infrastructure as code. Put the steps in order.',
    [['Pull the latest copy of the central repository', 'Start from the current version.'],
     ['Create a feature branch', 'Work without touching main.'],
     ['Edit the template/playbook and commit with a clear message', 'Version history.'],
     ['Open a merge (pull) request for peer review', 'Second set of eyes.'],
     ['Resolve any merge conflicts the repository identifies', 'Conflict identification.'],
     ['Merge to main and let automation push the change to all switches', 'Repeatable deployment.'],
     ['Run a compliance check for configuration drift', 'Prove every device matches.']],
    'Source control gives you history, rollback and review. IaC makes the change identical on every device.');
  M('n9-v6types', 'IPv6 address types & transition', 'Prefixes and coexistence',
    'Pick the correct item for each.', ['Global unicast', 'Link-local', 'Unique local', 'Multicast', 'Loopback', 'Dual stack', 'Tunneling', 'NAT64'],
    [['2001:db8:10::25 (starts with 2 or 3)', 'Global unicast', '2000::/3, Internet routable.'],
     ['fe80::1c2:3ff:fe4d:5e6f', 'Link-local', 'fe80::/10, every interface has one, never routed.'],
     ['fd12:3456:789a::1', 'Unique local', 'fc00::/7 — like RFC 1918.'],
     ['ff02::1', 'Multicast', 'All nodes — replaces broadcast.'],
     ['::1', 'Loopback', 'Like 127.0.0.1.'],
     ['Each host runs IPv4 and IPv6 at the same time', 'Dual stack', 'Most common migration path.'],
     ['IPv6 packets are carried inside IPv4 across an IPv4-only network', 'Tunneling', '6to4, 6in4, GRE.'],
     ['IPv6-only clients reach IPv4-only servers through a translator', 'NAT64', 'Usually with DNS64.']],
    'IPv6 exists because IPv4 ran out of addresses; these transition tools let both run during the long migration.');
  M('n9-modern', 'Modern network scenarios', 'Combined 1.8 decisions',
    'Pick the technology that solves each problem.', ['SD-WAN', 'VXLAN', 'Zero Trust', 'SASE', 'Infrastructure as code', 'Source control', 'Dual stack', 'NAT64'],
    [['200 branches, mix of broadband and LTE, central app-based policy', 'SD-WAN', 'Transport agnostic WAN.'],
     ['Stretch a Layer 2 segment between two data centers', 'VXLAN', 'Data center interconnect.'],
     ['Remote workers must be verified on every access, not just at VPN login', 'Zero Trust', 'Continuous verification.'],
     ['One cloud service giving remote users firewall, web filtering and ZTNA plus branch SD-WAN', 'SASE', 'Converged edge.'],
     ['Every switch config is generated from one template so they never drift', 'Infrastructure as code', 'Automation.'],
     ['See who changed the firewall template last Tuesday and roll it back', 'Source control', 'Version history.'],
     ['Run IPv4 and IPv6 on the same network during migration', 'Dual stack', 'Both at once.'],
     ['New IPv6-only mobile network must still reach legacy IPv4 sites', 'NAT64', 'Translation.']],
    'Each of these is a response to scale: more sites, more cloud, more devices, more change.');

  N.add({ id: '1.8', dom: 1, short: 'Modern network environments', title: 'Summarize evolving use cases for modern network environments',
    goal: 'SDN/SD-WAN, VXLAN, Zero Trust, SASE/SSE, infrastructure as code, source control, and IPv6 addressing and transition.',
    parts: [
      P('SDN and SD-WAN', 'Explain control, data and management planes, and what SD-WAN adds to a WAN.',
        `<p>Every network device has three jobs (planes):</p>
<ul><li><b>Control plane</b> — decides <i>where</i> traffic goes: routing protocols, STP, building tables.</li>
<li><b>Data plane</b> (forwarding plane) — actually moves packets using those tables, fast, in hardware.</li>
<li><b>Management plane</b> — how admins talk to the device: SSH, SNMP, GUI, API.</li></ul>
<p><b>SDN</b> (software-defined networking) pulls the control plane into a central <b>controller</b> that programs many switches. Apps talk to the controller through <b>northbound APIs</b>; the controller talks to devices through <b>southbound APIs</b>.</p>
<p><b>SD-WAN</b> brings that to branch WANs:</p>
<ul><li><b>Application aware</b> — sends voice over the best link and bulk traffic over the cheapest.</li>
<li><b>Transport agnostic</b> — runs over broadband, LTE/5G or MPLS.</li>
<li><b>Zero-touch provisioning</b> — a new branch box downloads its config automatically.</li>
<li><b>Central policy management</b> — one dashboard for every site.</li></ul>`,
        [['Which plane actually forwards packets?', 'Data plane', ['Control plane', 'Management plane', 'Application plane'], 'Control decides, data forwards.'],
         ['A branch router configures itself after being plugged in. Which SD-WAN feature?', 'Zero-touch provisioning', ['Application awareness', 'Dual stack', 'VXLAN'], 'No on-site engineer needed.']],
        'n9-sdwan'),
      P('VXLAN, Zero Trust and SASE/SSE', 'Describe VXLAN, Zero Trust principles and the difference between SASE and SSE.',
        `<p><b>VXLAN</b> — wraps Layer 2 Ethernet frames inside UDP/IP (port 4789). Uses a 24-bit <b>VNI</b> for ~16 million segments (vs 4094 VLANs). Used for <b>data center interconnect</b> and multi-tenant clouds: Layer 2 stretched across a Layer 3 network.</p>
<p><b>Zero Trust Architecture (ZTA)</b> — "never trust, always verify." Being inside the network earns nothing.</p>
<ul><li><b>Policy-based authentication</b> — every request checks identity, device health, location and time.</li>
<li><b>Authorization</b> for each resource, not the whole network.</li>
<li><b>Least privilege</b> — only the access needed, for only as long as needed.</li></ul>
<p><b>SASE</b> (secure access service edge) = cloud-delivered security <b>+ SD-WAN</b> in one service.<br><b>SSE</b> (security service edge) = just the security part: secure web gateway, CASB, ZTNA, firewall-as-a-service.</p>`,
        [['How many segments can VXLAN identify?', 'About 16 million', ['4094', '65,535', '1024'], '24-bit VNI.'],
         ['What is the difference between SASE and SSE?', 'SASE includes SD-WAN; SSE is only the security services', ['SSE includes SD-WAN; SASE does not', 'They are identical', 'SASE is on-premises only'], 'SASE = SSE + SD-WAN.']],
        'n9-zt'),
      P('Infrastructure as code and source control', 'Explain IaC benefits (playbooks, drift, dynamic inventory) and the source-control workflow.',
        `<p><b>Infrastructure as code (IaC)</b> — network and server configs written as files and pushed by automation (Ansible, Terraform) instead of typed by hand.</p>
<ul><li><b>Playbooks / templates / reusable tasks</b> — one template creates the same config on 1 or 1,000 devices.</li>
<li><b>Configuration drift</b> — when a device slowly stops matching its standard (someone made a "quick fix"). IaC detects and corrects drift → <b>compliance</b>.</li>
<li><b>Upgrades</b> — automate firmware rollouts in waves.</li>
<li><b>Dynamic inventories</b> — the list of devices is pulled live from a source (cloud API, IPAM) instead of a static file.</li></ul>
<p><b>Source control</b> (Git) stores those files:</p>
<ul><li><b>Version control</b> — full history; roll back any change.</li>
<li><b>Central repository</b> — one source of truth everyone pulls from.</li>
<li><b>Branching</b> — work on a change without touching production (main).</li>
<li><b>Conflict identification</b> — two people edited the same lines; Git flags it before merging.</li></ul>`,
        [['A switch no longer matches its approved template after manual edits. What is this?', 'Configuration drift', ['A merge conflict', 'Zero-touch provisioning', 'Elasticity'], 'IaC compliance checks catch it.'],
         ['Which source-control feature lets you build a change without affecting the main version?', 'Branching', ['Dynamic inventory', 'Rollback', 'Drift'], 'Work on a branch, then merge.']],
        'n9-git'),
      P('IPv6 format and compression', 'Write an IPv6 address in its shortest valid form.',
        `<p>IPv6 exists to fix <b>IPv4 address exhaustion</b>: 128 bits = 3.4 × 10<sup>38</sup> addresses.</p>
<p>Written as <b>eight groups of four hex digits</b>: <code>2001:0db8:0000:0000:0000:ff00:0042:8329</code></p>
<p><b>Two compression rules:</b></p>
<ol><li>Drop <b>leading zeros</b> in each group: <code>0db8 → db8</code>, <code>0042 → 42</code>.</li>
<li>Replace <b>one</b> run of all-zero groups with <code>::</code> — only once per address (otherwise you can't tell how many zeros each one hides).</li></ol>
<p>Result: <code>2001:db8::ff00:42:8329</code></p>
<p>Typical split: the first <b>64 bits</b> are the network prefix (/64 for every LAN), the last 64 bits are the <b>interface ID</b>. A host can build its own interface ID from its MAC (<b>EUI-64</b>: insert <code>fffe</code> in the middle, flip the 7th bit) or randomly for privacy.</p>`,
        [['Which is a valid compression of 2001:0db8:0000:0000:0000:0000:0000:0001?', '2001:db8::1', ['2001:db8:::1', '2001:db8::0::1', '2001:db8:1'], ':: once, leading zeros dropped.'],
         ['How many bits long is an IPv6 address?', '128', ['64', '32', '256'], 'Eight 16-bit groups.']],
        'd-v6'),
      P('IPv6 types, SLAAC and transition', 'Identify IPv6 address types and the dual stack, tunneling and NAT64 transition methods.',
        `<table><tr><th>Type</th><th>Prefix</th><th>Like IPv4…</th></tr>
<tr><td>Global unicast</td><td>2000::/3</td><td>Public</td></tr><tr><td>Unique local</td><td>fc00::/7 (fd…)</td><td>RFC 1918 private</td></tr>
<tr><td>Link-local</td><td>fe80::/10</td><td>APIPA (but always present and normal)</td></tr><tr><td>Multicast</td><td>ff00::/8</td><td>Multicast + replaces broadcast</td></tr>
<tr><td>Loopback</td><td>::1</td><td>127.0.0.1</td></tr></table>
<ul><li><b>NDP</b> (Neighbor Discovery, over ICMPv6) replaces ARP and finds routers.</li>
<li><b>SLAAC</b> — a host hears the router's prefix and builds its own address. No DHCP server required (DHCPv6 is optional).</li></ul>
<p><b>Running IPv4 and IPv6 together (compatibility):</b></p>
<ul><li><b>Dual stack</b> — devices run both at once. Most common.</li>
<li><b>Tunneling</b> — IPv6 carried inside IPv4 across IPv4-only networks (6to4, 6in4).</li>
<li><b>NAT64</b> (with DNS64) — translates IPv6-only clients to IPv4-only servers.</li></ul>`,
        [['Which IPv6 prefix is link-local?', 'fe80::/10', ['2000::/3', 'fc00::/7', 'ff00::/8'], 'Every IPv6 interface has one.'],
         ['Which method runs IPv4 and IPv6 on the same host at the same time?', 'Dual stack', ['NAT64', 'Tunneling', 'SLAAC'], 'Both protocols side by side.'],
         ['What replaces ARP in IPv6?', 'NDP (Neighbor Discovery)', ['DHCPv6', 'RARP', 'SLAAC'], 'NDP uses ICMPv6.']],
        'n9-v6types')
    ],
    wrap: { recap: ['Planes: control decides, data forwards, management configures. SDN centralizes control.', 'SD-WAN: app-aware, transport agnostic, zero-touch provisioning, central policy.', 'VXLAN: L2 over UDP/IP, 24-bit VNI (~16M). Zero Trust: verify every request, least privilege.', 'SASE = SSE (SWG, CASB, ZTNA, FWaaS) + SD-WAN.', 'IaC: templates/playbooks, drift detection, dynamic inventory. Git: version control, branching, conflicts.', 'IPv6: 128 bits, drop leading zeros, :: once. GUA 2000::/3, ULA fc00::/7, link-local fe80::/10, multicast ff00::/8. Dual stack, tunneling, NAT64.'], lab: 'n9-modern' }
  });

  // ===================== Domain 1 combined lab =====================
  M('n9-d1-wrap', 'Domain 1 mixed review', 'One item from every objective',
    'Every item comes from a different Domain 1 objective. Pick the correct answer.', ['Layer 3', 'Reverse proxy', 'NAT gateway', 'UDP 514', 'Single-mode fiber', 'Spine-and-leaf', '/27', 'SD-WAN', 'Layer 2', 'TCP 3389'],
    [['1.1 — The OSI layer of a router and an IP packet', 'Layer 3', 'Network layer.'],
     ['1.1 — The OSI layer of a switch and a frame', 'Layer 2', 'Data link.'],
     ['1.2 — Terminates TLS in front of internal web servers', 'Reverse proxy', 'Acts for servers.'],
     ['1.3 — Lets private cloud servers get updates with no inbound access', 'NAT gateway', 'Outbound only.'],
     ['1.4 — Syslog', 'UDP 514', 'Log collection.'],
     ['1.4 — Remote Desktop', 'TCP 3389', 'RDP.'],
     ['1.5 — 20 km link between campuses', 'Single-mode fiber', 'Long reach.'],
     ['1.6 — Data center built for east-west traffic', 'Spine-and-leaf', 'Equal hops.'],
     ['1.7 — Smallest subnet for 25 hosts', '/27', '30 usable.'],
     ['1.8 — Branch WAN that picks a link per application', 'SD-WAN', 'Application aware.']],
    'If any of these felt shaky, flip back to that objective before the domain test.');
})();
