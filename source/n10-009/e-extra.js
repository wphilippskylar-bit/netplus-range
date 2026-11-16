/* Extra gate-test questions for objectives with small pools (used in objective/domain tests, not quick checks). */
(function () {
  var N = window.N9;
  function add(id, list) { N.objs.forEach(function (o) { if (o.id === id) o.extra = (o.extra || []).concat(list); }); }
  add('2.4', [
    ['Where do horizontal cable runs from desks terminate in a wiring closet?', 'Patch panel', ['Fiber distribution panel', 'PDU', 'UPS'], 'Short patch cords then go to the switch.'],
    ['Which device distributes power to equipment inside a rack and may allow remote outlet control?', 'PDU', ['UPS', 'Generator', 'Patch panel'], 'Power distribution unit.'],
    ['A 42U rack has how many rack units of mounting space?', '42', ['19', '84', '24'], '1U = 1.75 in.'],
    ['Network gear exhausts hot air from the port side but is mounted facing the cold aisle. What is wrong?', 'Airflow direction does not match the hot/cold aisle layout', ['The PDU is too small', 'The rack is not lockable', 'Humidity is too high'], 'Match port-side intake/exhaust.'],
    ['What is the main risk of humidity above ~60% in a server room?', 'Condensation and corrosion', ['Static discharge', 'Faster fiber', 'PoE failures'], 'Too wet = corrosion.'],
    ['Which closet type serves a single floor and uplinks to the main room?', 'IDF', ['MDF', 'DMZ', 'SAN'], 'Intermediate distribution frame.']
  ]);
  add('3.5', [
    ['Which management method works with no IP address configured on the device?', 'Console connection', ['SSH', 'HTTPS GUI', 'REST API'], 'Serial/USB cable.'],
    ['Why is Telnet unacceptable for device management?', 'It sends credentials in clear text', ['It is too slow', 'It needs UDP', 'It only works in-band'], 'Use SSH.'],
    ['Which access method suits automated configuration by scripts?', 'API', ['Console', 'GUI', 'Clientless VPN'], 'Programmatic.'],
    ['A full-tunnel VPN sends which traffic through the tunnel?', 'All traffic, including Internet browsing', ['Only corporate traffic', 'Only DNS', 'Only management traffic'], 'Everything is inspected at HQ.'],
    ['Which VPN type connects two office firewalls permanently?', 'Site-to-site', ['Client-to-site', 'Clientless', 'Split tunnel'], 'Gateway to gateway.'],
    ['Managing switches over the same VLANs that carry user traffic is called:', 'In-band management', ['Out-of-band management', 'Jump box', 'Console'], 'Shares the production path.'],
    ['What is a key benefit of a jump box?', 'A single hardened, logged point of administrative access', ['Faster Internet', 'More DHCP addresses', 'Encrypted Wi-Fi'], 'Shrinks the attack surface.'],
    ['Which protocol most commonly builds site-to-site VPN tunnels?', 'IPsec', ['Telnet', 'SNMPv2c', 'TFTP'], 'ESP + IKE.']
  ]);
  add('5.1', [
    ['Which step includes asking users what changed recently?', 'Identify the problem', ['Test the theory', 'Verify functionality', 'Document findings'], 'Step 1.'],
    ['"Question the obvious" belongs to which step?', 'Establish a theory of probable cause', ['Identify the problem', 'Implement the solution', 'Document findings'], 'Step 2.'],
    ['When should you escalate a problem?', 'When the theory cannot be confirmed or the fix is beyond your authority/skill', ['Before identifying the problem', 'After documenting', 'Never'], 'Steps 3 and 5 allow escalation.'],
    ['Adding monitoring so the problem is caught next time is part of which step?', 'Verify full system functionality and implement preventive measures', ['Plan of action', 'Test the theory', 'Identify the problem'], 'Step 6.'],
    ['Multiple problems are reported at once. The methodology says to:', 'Approach each problem individually', ['Fix them all with one change', 'Reboot everything', 'Skip documentation'], 'One at a time.']
  ]);
  add('5.4', [
    ['What is the difference between bandwidth and throughput?', 'Bandwidth is capacity; throughput is the actual achieved rate', ['They are identical', 'Throughput is always higher', 'Bandwidth measures delay'], 'Rated vs real.'],
    ['Which wireless issue does moving 2.4 GHz APs to channels 1, 6 and 11 fix?', 'Channel overlap', ['Coverage holes', 'Jitter on the WAN', 'DHCP exhaustion'], 'Non-overlapping plan.'],
    ['Which metric matters most for satellite-link VoIP quality complaints?', 'Latency', ['Bandwidth', 'MTU', 'PoE'], 'GEO satellites add ~600 ms.']
  ]);
})();
