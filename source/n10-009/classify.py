import json,re,collections
d=json.load(open('qs.json'))
K={
'1.1':r'\bosi\b|layer [1-7]\b|\blayer\s*(one|two|three|four|five|six|seven)|encapsulat|\bpdu\b|presentation layer|session layer|transport layer|data link|physical layer|application layer|network layer|de-?encapsul|tcp/ip model|dod model',
'1.2':r'\brouter\b.*\bswitch\b|\bids\b|\bips\b|load balanc|\bproxy\b|\bnas\b|\bsan\b|firewall|ngfw|wireless (lan )?controller|\bappliance|\bcdn\b|content delivery|\bqos\b|quality of service|\bttl\b|time to live|vpn concentrator|\bhub\b',
'1.3':r'cloud|iaas|paas|saas|\bvpc\b|security group|\bnacl\b|network acl|internet gateway|nat gateway|direct connect|expressroute|multitenan|elastic|scalab|\bnfv\b|hybrid|public cloud|private cloud',
'1.4':r'(which|what|default|well-known|source|destination) ports?\b|\bports? \d|\bport number|\d+ port|\btcp\b|\budp\b|\bicmp\b|\bgre\b|ipsec|\besp\b|\bah\b|\bike\b|unicast|multicast|broadcast|anycast|well-known|ephemeral|three-way|handshake|\bsyn\b|\bftp\b|telnet|\bsmtp\b|\bsnmp\b.*port|\bldaps?\b|\bsmb\b|\brdp\b|\bsip\b|\bsql\b|tftp|ntp.*port|protocol number',
'1.5':r'\bcat ?(5e?|6a?|7|8)\b|twisted|\bstp\b cable|shielded|\butp\b|fib(er|re)|single-?mode|multi-?mode|\bsfp|qsfp|transceiver|\brj-?45|\brj-?11|\bbnc\b|f-type|\bcoax|\blc\b|\bsc\b|\bst\b connector|\bmpo\b|plenum|direct attach|\bdac\b|twinax|satellite|cellular|\b5g\b|\blte\b|100base|1000base|10gbase|wavelength|\bwdm\b|connector',
'1.6':r'topolog|\bmesh\b|\bstar\b|hub-and-spoke|hub and spoke|spine|leaf|three-tier|collapsed core|\bcore layer|distribution layer|access layer|north-south|east-west|point-to-point|\bbus\b|\bring\b|\blan\b|\bwan\b|\bman\b|\bpan\b|\bwlan\b|campus',
'1.7':r'subnet|\bmask\b|\bcidr\b|/[0-9]{1,2}\b|binary|octet|rfc ?1918|private (ip|address|range)|apipa|169\.254|loopback|127\.0\.0|class [a-e]\b|\bvlsm\b|supernet|summariz|broadcast address|network address|usable host|hosts? per|\bipv4\b|10\.0\.0\.0|172\.16|192\.168',
'1.8':r'\bsdn\b|sd-wan|software-defined|control plane|data plane|vxlan|zero trust|\bztna\b|\bsase\b|\bsse\b|infrastructure as code|\biac\b|ansible|terraform|playbook|configuration drift|version control|\bgit\b|branch(ing)?\b|repository|ipv6|dual stack|nat64|tunnel(ing)? .*ipv6|6to4|eui-64|link-local|fe80|::|slaac|neighbor discovery|\bndp\b|zero-touch',
'2.1':r'routing|\broute\b|routes\b|\bospf\b|\beigrp\b|\bbgp\b|\brip\b|administrative distance|\bmetric\b|longest (prefix|match)|prefix length|static route|default route|\bnat\b|\bpat\b|overload|fhrp|hsrp|vrrp|\bvip\b|virtual ip|subinterface|router-on-a-stick|inter-vlan|next hop|autonomous system|link-state|distance-vector|path-vector',
'2.2':r'\bvlan|trunk|802\.1q|native vlan|voice vlan|\bsvi\b|spanning|\bstp\b|rstp|bpdu|root bridge|port role|blocking|link aggregation|\blacp\b|port channel|etherchannel|duplex|\bmtu\b|jumbo|mac (address )?table|cam table|switch learns|flood|\bswitch(es)?\b|collision domain|broadcast domain|unknown destination|mdi-?x',
'2.3':r'wi-?fi|wireless|802\.11|\bssid|\bbssid|essid|wpa|wep|\bsae\b|channel|2\.4 ?ghz|5 ?ghz|6 ?ghz|band steering|antenna|omni|directional|yagi|captive portal|\bpsk\b|access point|\bap\b|\baps\b|lightweight|autonomous|ad hoc|\bmimo|beamform|802\.11h|\bdfs\b',
'2.4':r'\bmdf\b|\bidf\b|\brack\b|\b[0-9]+u\b|patch panel|fiber distribution|\bups\b|\bpdu\b power|power distribution|power load|voltage|humidity|fire suppression|temperature|hot aisle|cold aisle|intake|exhaust|lockable|generator',
'3.1':r'documentation|diagram|cable map|asset|inventory|\bipam\b|\bsla\b|heat map|site survey|end of life|\beol\b|\beos\b|end of support|patch(ing)? |firmware|decommission|change management|change request|change control|baseline config|golden config|configuration management|backup config|licens|warranty|wiring diagram|physical diagram|logical diagram',
'3.2':r'\bsnmp\b|\bmib\b|\btrap\b|community string|netflow|\bflow\b|sflow|ipfix|packet capture|port mirror|\bspan\b|syslog|\bsiem\b|log aggregat|baseline|anomal|monitor|\bapi\b|alert|severity|discovery|utilization|uptime',
'3.3':r'disaster|\brpo\b|\brto\b|\bmttr\b|\bmtbf\b|cold site|warm site|hot site|active-active|active-passive|tabletop|failover|high availability|redundan|recovery|backup (site|type)|full backup|incremental|differential|availability',
'3.4':r'\bdhcp|dora|lease|scope|reservation|exclusion|helper|relay|\bdns\b|\ba record|aaaa|cname|\bmx\b|\btxt\b|\bns record|\bptr\b|\bsoa\b|\bsrv record|zone|authoritative|recursive|iterative|dnssec|\bdoh\b|\bdot\b|dns over|hosts file|\bntp\b|\bptp\b|\bnts\b|stratum|time sync',
'3.5':r'site-to-site|client-to-site|remote access vpn|clientless|split tunnel|full tunnel|\bssh\b|console (port|cable)|out-of-band|in-band|jump (box|host|server)|bastion|\bgui\b|management (interface|network|plane)|rdp\b|vnc|\bapi\b access',
'4.1':r'\bcia\b|confidentiality|integrity|availability triad|\brisk\b|vulnerabilit|exploit|threat\b|encrypt|\bpki\b|certificate|self-signed|\bca\b|\bmfa\b|multifactor|multi-factor|\bsso\b|radius|tacacs|\bldap\b|saml|kerberos|\baaa\b|least privilege|\brbac\b|role-based|geofenc|camera|\block\b|badge|honeypot|honeynet|deception|pci|gdpr|hipaa|compliance|data locality|\biot\b|iiot|scada|\bics\b|\bot\b|byod|guest network|segmentation|authenticat|authoriz|accounting',
'4.2':r'\bdos\b|\bddos\b|denial|vlan hopping|double.tag|switch spoof|mac flood|arp (poison|spoof)|dns (poison|spoof)|cache poison|rogue|evil twin|on-path|man-in-the-middle|\bmitm\b|phishing|vishing|smishing|dumpster|shoulder surf|tailgat|piggyback|social engineering|malware|ransomware|trojan|worm|virus|botnet|deauth|attack',
'4.3':r'harden|unused port|default password|disable (unused|unneeded)|port security|802\.1x|\bnac\b|mac filter|sticky|key management|\bacl\b|access control list|access-list|implicit deny|url filter|content filter|screened subnet|\bdmz\b|trusted zone|untrusted|dhcp snooping|dynamic arp inspection|\bdai\b|bpdu guard|root guard|\bssh only|transport input',
'5.1':r'troubleshooting (method|step)|identify the problem|theory of probable cause|test the theory|plan of action|implement the solution|verify full|document findings|escalat|question users|duplicate the problem|recent changes',
'5.2':r'crosstalk|attenuat|interference|\bemi\b|termination|tx/rx|transposed|crc|runts?\b|giants?\b|input errors|err-?disabled|error-disabled|administratively down|suspended|\bpoe\b|power budget|802\.3(af|at|bt)|transceiver mismatch|signal strength|dbm|light level|late collision|duplex mismatch|bad cable|cable fault|split pair|open|short',
'5.3':r'loop\b|broadcast storm|wrong vlan|incorrect vlan|pool exhaust|exhausted|default gateway|duplicate ip|ip conflict|wrong (subnet )?mask|incorrect (ip|mask|gateway)|missing route|asymmetric|cannot reach|can\'t reach|unable to reach|users report|routing loop',
'5.4':r'congestion|contention|bottleneck|throughput|bandwidth|capacity|latency|jitter|packet loss|channel overlap|co-channel|adjacent channel|coverage|dead zone|disassociat|roaming|sticky client|slow',
'5.5':r'\bping\b|traceroute|tracert|nslookup|\bdig\b|tcpdump|wireshark|protocol analyzer|netstat|ipconfig|ifconfig|\bip addr|\barp -a|\bnmap\b|\blldp\b|\bcdp\b|speed ?test|iperf|toner|tone generator|cable tester|\btap\b|wi-fi analyzer|spectrum analyzer|visual fault|\bvfl\b|\botdr\b|multimeter|show (mac|ip route|route|interface|run|config|arp|vlan|power)|pathping|mtr\b|\bshow\b',
}
RX={k:re.compile(v,re.I) for k,v in K.items()}
# default objective for old stage + domain
DEF={('s01',1):'1.2',('s02',1):'1.1',('s03',1):'1.5',('s03',2):'1.5',('s04',1):'1.7',('s05',1):'1.7',('s06',1):'1.4',('s07',2):'2.2',('s08',2):'2.1',('s09',1):'1.8',('s10',2):'2.3',('s11',1):'3.4',('s11',3):'3.4',('s12',3):'3.2',('s13',4):'4.1',('s14',5):'5.5'}
SPRI={'s01':['1.2','1.6','1.4'],'s02':['1.1','1.4'],'s03':['1.5','5.2','2.4'],'s04':['1.7','1.4'],'s05':['1.7'],'s06':['1.4','3.4','4.1'],'s07':['2.2','4.2','5.3'],'s08':['2.1'],'s09':['1.8'],'s10':['2.3','5.4','4.2'],'s11':['3.4','1.3','1.8','1.6'],'s12':['3.2','3.1','3.3','1.2'],'s13':['4.1','4.2','4.3','3.5'],'s14':['5.5','5.1','5.2','5.3','5.4'],'s15':[]}
def classify(text,s,dd):
  sc={}
  for k,r in RX.items():
    n=len(r.findall(text))
    if n: sc[k]=n+ (1.5 if k in SPRI.get(s,[]) else 0) + (2.5 if dd and int(k[0])==dd else 0)
  if not sc:
    for k in SPRI.get(s,[]):
      if dd and int(k[0])==dd: return k
    return SPRI.get(s,['?'])[0] if SPRI.get(s) else None
  return max(sc,key=sc.get)
out={};cnt=collections.Counter()
for q in d['qs']:
  if q['s'][0]=='p' or q['s']=='s15': continue
  k=classify((q['q'] or '')+' '+str(q['a'] or ''),q['s'],q['d'] if isinstance(q['d'],int) else 0) if not q['gen'] else {'osi':'1.1','bin':'1.7','subnet':'1.7','hosts':'1.7','subnetIn':'1.7','port':'1.4','v6':'1.8','wifi':'2.3'}.get(q['gen'])
  out[f"{q['s']}:{q['i']}"]=k; cnt[k]+=1
cc={};ccnt=collections.Counter()
for c in d['cards']:
  if c['s'][0]=='p' or c['s']=='s15': continue
  k=classify((c['t'] or '')+' '+(c['d'] or ''),c['s'],0); cc[f"{c['s']}:{c['i']}"]=k; ccnt[k]+=1
print(sorted(cnt.items(),key=lambda x:str(x[0])));print(sorted(ccnt.items(),key=lambda x:str(x[0])))
json.dump({'q':out,'c':cc},open('assign.json','w'))
import random;random.seed(1)
by=collections.defaultdict(list)
for q in d['qs']:
  k=out.get(f"{q['s']}:{q['i']}")
  if k: by[k].append(q)
for k in sorted(by):
  print('==',k)
  for q in random.sample(by[k],min(4,len(by[k]))): print('   ',q['s'],q['q'][:110],'→',str(q['a'])[:40])
