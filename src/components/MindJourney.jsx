import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Float, 
  Text, 
  Html, 
  Environment, 
  MeshDistortMaterial,
  Torus,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { X, Play, Info, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const trackData = [
  {
    title: "Sakura",
    lyrics: "සකුරා මලේ.. සකුරා මලේ.. අද මා ළඟ හඬා වැටේ.. /හිමි නොවෙනා ප්‍රේමේ..ලුහු බදිනා ප්‍රේමේ",
    credits: "Producer: Charitha Attalage | Writers: Manasick, Hasanka",
    facts: "Part of the cinematic 'Kuweni' series. Explores class barriers and emotional pain.",
    color: "#ff3333",
    position: [-4, 0, -5],
    fullLyrics: `[Chorus]
හිමි නොවෙනා ප්‍රේමේ
ලුහු බදිනා ප්‍රේමේ

සකුරා මලේ
අද මා ලග හඩා වැටී

දෙන්න මට පලා යන්න
දෙන්න මට පලා යන්න
දෙන්න මට පලා යන්න
දෙන්න මට පලා යන්න

පරසතු සුවදක්
මම නොම වින්දෙමි
සකුරා යායේ

පරසතු කුසුමක්
මම නොම වින්දෙමි
සකුරා යායේ

සකුරා පෙති ගිලිහෙන
මහා කහට
මම දැන් වින්දේ

සකුරා මලේ
පෙති ගිලිහී හඩා වැටේ

කදුලු පිලියමක්
නුඹට වියැකෙන හල් මිටි
සමාජේ අනියම දායි
නුඹගේ කර පිටින්

සිනමා හිරේ
අපගේ යතාර්ථයක්
කනපිටින්
පදාර්ථයේ පිටපතක්
කුසේ උබේ පනපිටින්

යදින්නෙපා
විද සිදලන්න බැරි දොලදුකක්

උඹේ කාලේ පාරේ
උඹේ භාර්‍යාව ගැරහුවත්

මගේ රහසක
රිදී නිම්නයක
කලබල නියන්පත්
කිනම් ඩිම්බයක

ගිනි තියන් උබේ
නෙගටිව් පටි
ඔය හැසිරීම
මට ගබ්සා දොරටු අරී

වීරයන්ට දැන්
උඹේ ආතමාර්තකාමි
වග නොකියන්න ජාතකේට
මා ප්‍රාර්ථනාවී

තිබුනට කඩතුරා
ගැබක් උඹ දාරාගෙන

උඹේ පරාජය
ලතවෙන්නෙ ලය පලාගෙන
වෛයිරය වේද
මහ මතකයන් පලා යන
දෙන්න මට සැලොන
සිහිනෙට මගේ පලා යන්න

හිමි නොවෙනා ප්‍රේමේ
ලුහු බදිනා ප්‍රේමේ

සකුරා පෙති ගිලිහෙන
මහා කහට
මම දැන් වින්දේ

සකුරා මලේ
අද මා ලග හඩා වැටී

සකුරා මලේ
පෙති ගිලිහී හඩා වැටේ

සකුරා මලේ
පෙති ගිලිහී හඩා වැටේ

නිබද දෙව් දූ
සියත වලා බැමි
මුහුරස උර දැක්මේ කඩා වැටී
මා දළු රෝස පලයට
හඩා වැටී
පුරා සකුරා සිසිරේ
පතනවා ඇති

චරිත
මානසික්
වෙස්ට්නාහිර`
  },
  {
    title: "Deviyange Bare",
    lyrics: "මතකයි අද වැනි දවසක..සැමරුවා උපන්දින සාදය අප..මොනවගෙන්ද අඩුපාඩු බොන්නද කන්නද..සල්ලිම ජීවිතේ වුණේ විඳවන්නද",
    credits: "Producer: Drill Team | Writers: Manasick, Drill Team",
    facts: "A foundational Drill track. Focuses on gritty reality and Colombo underground.",
    color: "#ff0000",
    position: [4, 0, -5],
    fullLyrics: `[Verse]
(DRex)
මතකයි අද වැනි දවසක
සැමරුවා උපන්දින සාදය අප
මොනවගෙන්ද අඩුපාඩු බොන්නද කන්නද
සල්ලිම ජීවිතේ වුණේ විඳවන්නද
අතැඟිලි බැඳ ගිවිසුණු පෝරුව
බින්ඳා පොරොන්දු මම අඩිකෝදුව
මැන්නා දහසක් දේ ඇය ගියා සමග දුව සූදුව හුරුව පව පූරුව
ණයටත් ණයයි අවුරුදු හයයි
කූරු ගණිනවා හිර ගේ හිත බයයි
මළ මනස මළ හිත අලස කරයි අදත් ශාප ඒ තණ්හාව
අත හැරියා රස්සාව
සූදු කෙළින්නට මගේ ආසාව
සල්ලි පනම් ගොඩගහන් උත්සාහ
කළා රැවටිලි අඟුරු කැබලි ගෙන හා මතුදාක
ලියමි මගේ වරද බිත්ති අතර පතර
කඳුළු බිඳු මකා දමන්න හමන්න
සුවඳ සුළඟ ජීවිතේ
පැමිණ මා වැළඳගන්න

(ChrishVix)
මිනිසෙකු පිට නැගි අසරුවෙකුට හැකිවිය දවනට ළය ගිනි දස මසකට
ණය හතරවට එක්තැන් පත්තර පිට නොදැනිම පිවිසුණේ කාබාසිනි සයනට
අස්ථිර දිවි කාලකණ්ණි විකාරය
උළු ගේ හතරකොණ උරා බොන්නේ සාරය
වාරය පව් පිටවාන දුමාරය
ශාපලත් ජීවිතේ දෙවියන්ට භාරය
කාලය නාව ගාව තැවිලි නැත සමාව යාව හිත වාව මාව උපමාව
පනිනු පෙර දැල්වෙන සිව්පා ගිණිකොළ අස්සර මත වස්තර වෙත විසිරෙන
තරමට ලැදි කාරණ වරමට ණය වී කලාබර
සරුවට ගෙව් පිරුවට ඇන්දු කළකිරි දිවි කලාවට
නිරුවත කළ මුසාවට තරවටු වී දිවි මුලාවට
කරුමෙට හුරු පුරුදු වූ සූදු රටාවට
සින්න වුණේ ඔප්පුව නව වෙනි ලංසුව
හැංගුවා පොලී ණය වැටුණේ විලංගුව
පෙරළි නිරන්තර ලිව් අනු දෛවය
සෘණ දෙවි සරණ කොටුවූ අඳුරු කුටියට

(D – Minor)
අනූ වසරකට වුණි චූදිත
අමූලික බොරු කරන් මූලික
ජරාගික සමාජ භේද වාර්ගික
ඒ අහිංසක යයි හිංසක මාර්ගෙක
ජීවිත කනමදු මනසට හැඟීම මගෙ පොරබැදු
මායාව මා වැදූ හැදූ රුධිර ලේ මස් ඒ දුක දනි
ඇති බොරු කළා දැන් පිළිගමු

සත්‍යයේ අරුත – ගෙනදෙයි හිරිගඩු
වර්ණයේ ගරුක – පුපුරයි ගිනිකඳු
කාලයේ අරුම – මිනිසද ගුණමකු
කල්පනා කරමි – සෑය ළඟ ගිරිහඩු

මරාගෙන මැරෙන කඩාගෙන හැදෙන
සමාජය නගනයක් ඇහැක් ඇරියම
පතාගෙන ඇවිද හිතාගෙන ලැබෙන
දේ බාර කරපන් දෙවියන්ගේ බාරෙට

(Sanuka)
දුහුවිලි මාවතේ දේවතා එළි පෙනෙයි ද ආදරෙන්?
ළතැවුල් මාරුතෙන් සැඟවියවත් හැකිදෝ ශ්‍රී නාමයෙන්?
සියල්ල හදවතේ පිළිරැව් නවතියි ද ඝණ්ටා නාදයෙන්
විය යුතු මොහොතකින් ගැලවීදෝ දෙවියන්ගේ බාරයෙන්?

(Born Manasick)
මායාව රජවෙලා ඇත්ත නැත්ත බලු වෙලා නැති වෙලා
ලස්සන ජීවිත හැඩිවෙලා බලන් ඉන්න බෑ තව මටනම් ඇති වෙලා
කනමදු ජීවිත කළුවර වී ඇත කෝ ඔය දෙවියන්
වැටුපට උපවාස කරයි හෙදියන්
ගුණ මෙහෙ ගරුක එතැන මැවියන්
කතාකරමු නැත්තන් සාරියේ එතියන්

හිත සී සී කඩ අද වීදී වල
සතුට රැඳෙන්නේ අද ප්‍රීතී වල
භීති කළ ඒ කී දේ කළ
දුන්න දෙවියන් තීරණ ඊතල

අද දියවැඩියාවට වඩා රටේ කටෙ හැදියාව
ඇති නැති කම වෙනස් කළ රැකියාව
හිත ගත කතා කළේම නැතියාව
වට කරන් කෙළ කළේ වැඩිහිටියාව

හිත හීලයි කරගත්තේ මම බීලයි
දුක යනු සිරිමත් ගැන විතරක් කවි ගුණබස් කීමයි ලිවීමයි
පොඩිකාලේ තිබ්බ බය පංතියේ අන්තිම වීමයි හීනයි
සුරයක් දැම්මා බැරි තැන
යකා ඉන්නේ ඇතුළේ කියා දැන දැන
බැණ බැණ කිව්වා අති දැන් ඇණ ඇණ
මේ දෙවෙනි ලියුම දෙවියන් බාරෙට

(Minol)
නක්ෂත්‍ර නොසිත ඉපිද ෆැන්ටසි ලෝකෙක මේ එළිසමේ
වැඳගෙන කරගෙන පාවා දී මායම් දී නෑ මගේ ගූ හිතේ
මොන මොන සෙල්ලම් දැම්මත් හෙළුවැලි කෙල්ලන් මගේ ෆැන්ටසි ලෝකෙට
මතකෙට එල්ලන් නෑ එක කෙල්ලක් ගැලවුණේ රෙදිපිළි මෝලෙට
එද්දී ගෙනාවේ නෑ මොණර කොළ පාවෙන
තොටිලි වල නිදාගෙන නෑ මැද පංතියේ පදික
වඩිග පටුන නටන ජීවිත පදයට යටව
මන්දිර සඳලු තල මවමින් සිහින වන්නම
කාට කියන්නද ඒ මියෙන සිහින මැද
පණ තියෙන ලියන දුවන පන්හිඳ අතින්
තුඩගින් බසින ලවණ රුධිරය වී බැස
පිරවුණු රූල් පිටු පොත ජීවිතේ වී ඇත
මනස දෙකනෙ වදින වචන මතකයිද
මගේ බොළඳ හීන අතර මගේ කඳුළු බින්දු ඇයි
වාෂ්ප වෙන්නේ දකින සිහින වටින කියන පයිය
උඹේ ඇටේ ඉඳන් උඹේ ආච්චිට බඳිනවා මං වෛර
මතක නැද්ද මට කියපුවා ගනින් මතකෙට වරෙන් අද හෙට
දෙන්නම් මතකෙට කට කුඩු කරලා උඹේ දත් ටික
වළඳෙන් පිහ කෑ කුලි ගෙට රෑ සඳ මිතුරා විය
පිටු බලි ගෑ නිල් තුඩ පෑන් වදන් ගෙතුවා ලිය
මං ආස කරපු පාට හීන වලට හදපු මාව
කඩලා බිඳලා විසි කරනවා හිත නොදැනිම මාව
ඇයි මාව අම්මේ මැරුවේ නැත්තේ මම ඉපදුණු දාම
මට දුක හිතෙනවා උඹ මහනවා හැමදාම
කළු කපුටා සුදු වෙනතුරු මානසික පැතුමක් හිත මැරුවා
හදවතක හීන මගේ ලේ වලින් ලිව්වා
කවුරු කිව්වත් හිතේ දුවන ගැම්ම අත පය වල තිව්වා
මම කන අතටම රිව්වා මගේ මනස කොඳුරා කිව්වා මට

(Kalu Malli)
අදටත් නින්දක් නැති ෆිල්ටර් නැති මතකයන්
මතටත් තිතක් නැති හිතුවෙවත් නැති වියමන්
රිවර්ස් වදින්නැති ගියර් වැටෙන්නැති පල්ලම් නැති
සිතියම් නැති සිතුවිලි අන්තිම හුස්මට ණයගැති
කාලය මැන්නේ සිවිලිමක් නැති වහල දෙස බලා
සැපයි කියලා හිතලා මෙමට නිදාගන්න එපා වෙලා
යන්නට මට තැනක් නෑ කරන්නට දෙයක් නෑ
දිව්‍ය ලෝක ඕන නෑ අපායට බයත් නෑ
දැවිලා දැවිලා නිවෙන නිවිලා තිබිලා නැවත දැවෙන
දුමක සුවඳ දුකක නිවෙන කැපි කැපි කැපි යාවෙන
යන්න නො එන ගමන තෙක් පරම සත්‍ය සැඟවෙන
පටබැඳි නම කඩවරගම වටේම බොරු මවාපාන
දෙවියන්ගේ මල්ලිට ඔටුනු පැළඳි කල් හි
ලෝකය තනි යායකි සවණක් ගණ රැස් නැති
පවට පිනදි මම ද මැදිවී ස්වාර්ථයට කිමිදී
උඹට මතක ද එදා මම විතරද වැරදී
යක්ෂ වේශ සංක්‍රාන්ති පාවා දී පියවි දෑස
මිට මොළවා සිටගෙන දිවුරනවා ගනු හුස්ම පිණිස
පාපයක් වෙන්නෙම නැත අනිවා ශාපයක් වුණත්
උඹේ සෛල මරනවා මම නැවත මොනවා මට වුණත්
ඇත්ත තිත්තක් වුණත් කාට කෙසේ තෙරුණත්
ප්‍රශ්න එක පිට එක එකින් එකට විසඳුවත්
මුල මැද අග පැටළුණ විට ඇතුළත ගිනි පැසවන විට
කෝ දෙවියන් කෝ මගේ හෘද සාක්ෂි පුපුරන විට පිට පිට`
  },
  {
    title: "Aruma",
    lyrics: "උඹ හිත හොරා කෑවා, දෑස සැණින් සිර බාර වී...ගොදුරක් කරන් උඹේ පාරමී",
    credits: "Producer: Nishan Malinda | Writers: Manasick",
    facts: "Music video built in Unreal Engine 5. Contrast between childhood and urban pressure.",
    color: "#880000",
    position: [0, 4, -8],
    fullLyrics: `[Verse]
උඹ හිත හොරා කෑවා, දෑස සැණින් සිර බාර වී
ගොදුරක් කරන් උඹේ පාරමී
හිතේ හදිස්සිය! උඹේ ආඥා-බලතලයේ ප්‍රකාර වී
නීතියේ නූපුර හඬ දෙයි හැඩයි පයේ සාරථී


දන්නවා මම තුප්පහී, රැදෙන්න දියන් උර බෙත්මේ හී
උදාරම් උහුලන් ඇකයක්ම වී
උඹේ හලාහල ඇල්ම බැල්ම පැනයක්ම කී
ඒ සයිනයිඩ් තැල්ල සිහිය මට සුරයක්ම කී

නිවාදමන්න දෑහේ දැවෙන වර්ති
ශ්‍රියා වයන්න දියන් බලන් උඹේ සිහශක්ති
මගේ ප්‍රියාව අම්ල වැස්සක් ඒ මෝසමේම මත්වී
පිපාසයි ඛේට ග්‍රන්ථි, තමලිනි කියාපන් භූමියේ මේ කවුද චක්‍රවර්ති

මල්ටි බැරල් කැරළි ලේ කලා
සිහින් පොදයෙන් වැටුණු මීනි අළු තුහිනක් සේ කලා(ව)
තරණ සරණතලයේ හැඩය බලන් රවයි අසේකලා
පැලඳ උණ්ඩ මේඛලා, උඹේ ස්වරයේ ඝෝෂා ඝනය දාහක් චන්ද්‍රලේකලා

උඹේ අයතීන් මිහිදන් සුවයේ මිලයි කණින ආකර
මගේ පවසේ තොල සිඳින්න මවන්නම් සියයක් වාකර
කිලිටි ඇරලත් කොහොම රතු උනේද සාටක
යහනේ අතුරුවන්න දියන් ඛේදවාචක

ඇඳ පැළඳ අළු ගසා ගිණි අවි අතැතිව
ඇවිදියි දිවි නසා මුහුණත රතැතිව
තිමිරයේත් – අරුම!
නිරයේදී – අරුම!
දිස්නයේම-විශ්මයේම අරුම!

උඹේ සිහින් ඉඟි යාන්තමක්
දුන්නා වගේ මට කොබ්බැකඩුව තාන්නමක්
ඔය දිව්‍ය අංග තනු හුදෙක් කාන්දමක්, ආගමක් අවධානමක් ප්‍රාණවත්
අවදානවත් සාරවත් නෑ තාම අවසානවත්

රහසින් තියන පාද චාරිකා
උඹේ සිලිලාර හොයන්න ඕනේනෑ මට මේ යාත්‍රිකා
ඇයි මතවාදයෙන්ම මුරණ්ඩු උඹ ප්‍රියම්බිකා? දැනේද බයේ සුගන්දිකා?
මරණ බයට උඹගේ වේගෙන් දුවල නෑ සුසන්තිකා

ආහ්! හෘදය හොයන් අමුතු වේගයක්
නග්න අහස වසා ඇයිද ඇන්දේ මේඝයක්
ඉරේවි රෞද්‍ර නියට ඔය ගොරෝසු සේදයත්
බලා නොඉන්නේ කොහොම ලැමක මෙහෙම භේදයක්

අරුම-කරුම කෙරුවේ උන්ටික පනස් හයෙන් (1956)
අපේ පරතරය උණ්ඩයක් නම් ඇයි මේ පනත්(පනත) බයෙන්?
ඉහේ මන්කඩක තියං, උදුරා ලයෙන්
පෙන්නන්නනං ආදරේ උඹට T-56

ඇඳ පැළඳ අළු ගසා ගිණි අවි අතැතිව
ඇවිදියි දිවි නසා මුහුණත රතැතිව
තිමිරයේත් – අරුම!
නිරයේදී – අරුම!
දිස්නයේම-විශ්මයේම අරුම!`
  },
  {
    title: "Billa",
    lyrics: "දුර්ලභයි කෙලින් හිස් නැහෙන්නෙ අකාලේ..Westනාහිරින් යක්කු දෙන්නෙක් මේ අවාරේ..",
    credits: "Producer: Bee | Writers: Manasick, Heva",
    facts: "Established the 'Billa' persona. Symbolizes the fear and presence of Westnahira crew.",
    color: "#440000",
    position: [0, -4, -8],
    fullLyrics: `[Verse]
තේරුම් කලත් පයින් පාරකින්
මුන් තේරුම් ගනීද එක වාරේකින් ?
මේක කෝපයෙන් පිරි ලෝකයක් මට
සෝකයත් රෝගයක් වට
මෝඩයත් ලෝබයත් හට ක්‍රෝදයත් ශ්ලෝකයක්
බිඳ පාදා සිඳ බාදා තේරුම් ගත්තා මගෙම ආරෙකින්

දැන් බයේ ගැස්සී තිගැස්සී හැම අඳුරු පාරක
තියයි උන්ගේ රැස්වීම් හරස්වී නැවතුවා සභා කාරක
ඉල්ලා අස්වී බලඇණි පලා ගියේ දැකලා ත්‍රාසයේ වාහක
අත්දැක හුස්මක මාරක බිඳගෙන එන්නේ මම බොලගේ බාධක

බිල්ලා බිල්ලා බිල්ලා බිල්ලා බිල්ලා
බිල්ලා බිල්ලා බිල්ලා බිල්ලා බිල්ලා….//

මේ යුදබිම් වගේ පුදබිම් මාව දැක්කත් බලයි උඹ උඩ බිම්
බිලිගන්නේ හුස්ම උඹේ !!Snap!! යදියි “මැරුනානම් මම උණකින්”
මේ නගරය මම සුරකින් ආවත් වාහේ මොන පුරකින්
නමටනම් කිව්වා තොපි දියසෙන් පැනගන්නත් බැහැ පොඩි උඩකින්

උබේ ඇස් ඉස්ම මස්තිෂ්ක දියකර දෙන්නම් මමයි ග්‍රීස්ම
දෙවියටත් බේරගන්න බෑ ජෙරෝමි කලත් බහුතීස්ම
වෑයම් කරනවා පණ ගැහෙනකන් මගේ මාංශපේශි
කායබලය සර්වකාල වෙන්නෑ උබට ලේසි

වරදගත්තේ හැදාමත් වගේ උඹ කර්මයෙන් ගේම ඉල්ලා
මට තඩි බාන්න ඕනේ අඩි ගානක් උඩ ඔලුවෙන් උඹව එල්ලා
ඔය මොන තරුත් තනි කළු බයේ චකිතයෙන් උන්ගේ දිව ගිල්ලා
නෑවිත් ඉඳි කිව්වත් ඈවිත් ඉන්නේ දුවපන් ගෝනි බිල්ලා….

බිල්ලා බිල්ලා බිල්ලා බිල්ලා බිල්ලා
බිල්ලා බිල්ලා බිල්ලා බිල්ලා බිල්ලා….//

අන්ධ ගොළු බීරි දන අන්දකාරේ
උණ්ඩ ගන්නේ බිලි මිනී අද පාරේ
දුර්ලභයි කෙලින් හිස් නැහෙන්නෙ අකාලේ
Westනාහිරින් යක්කු දෙන්නෙක් මේ අවාරේ

වමේ පුත්‍ර උඩින් පල්ලෙන් බලන් එයි ප්‍රකාශනේ communist
සාහසික තතු හේවා දිග අරියි මග තොට නෑ දැන් කම් මිනිස්
නිස්කාරනේ ගස් ගල්ද වැඳ සංසාරේ දික් ගස්සන්න
මිහිදන් කලා විරු පස් කන්න උන්ට බාස්මති එක්ක මස් කන්න

උළුක් වූ මොල කෙනිත්තූ මං නැගී සිටි තව කෙනෙකු
මේක හටන් බිමක් මං gladiator අපි ඇන කොටා උන් පිනවූ
තර්ක මැද ගමන විටදි කල කිරුනත් අවසි තැනට කොඳු සිරස්
බලය මට පවර ලඳරු මත මැරුවා අයාගෙන ඉන්නෙ තිදැස්

තිරිසන් මෙන් ක්‍රියා කරන
බිය වදී අසා මේ ව්‍යාකරණ
පෑන පොඟවලා ලේ කුප්පි
මානසික් මං හෙව්වෙ යුක්ති

බිල්ලා බිල්ලා බිල්ලා බිල්ලා බිල්ලා
බිල්ලා බිල්ලා බිල්ලා බිල්ලා බිල්ලා….//`
  }
];

const Gate = ({ track, onSelect }) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.z += 0.005;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime + track.position[0]) * 0.2;
    }
  });

  return (
    <group position={track.position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh 
          ref={mesh} 
          onClick={(e) => { e.stopPropagation(); onSelect(track); }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
          <meshStandardMaterial 
            color={hovered ? "#ff0000" : track.color} 
            emissive={track.color}
            emissiveIntensity={hovered ? 5 : 1}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>
      
      <Html position={[0, -2.5, 0]} center>
        <div className={`transition-all duration-500 pointer-events-none select-none text-center ${hovered ? 'opacity-100 scale-125' : 'opacity-20 scale-100'}`}>
          <h3 className="text-white font-black text-3xl uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">{track.title}</h3>
          <p className="text-mind-red text-[10px] uppercase tracking-[0.5em] mt-2">Open Mind Node</p>
        </div>
      </Html>
    </group>
  );
};

const MindJourney = ({ onClose, initialTrack }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showFullLyrics, setShowFullLyrics] = useState(false);

  useEffect(() => {
    if (initialTrack) {
      const track = trackData.find(t => t.title === initialTrack.title);
      if (track) setSelectedTrack(track);
    }
  }, [initialTrack]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-black"
      id="deep-mind-container"
    >
      {/* 3D Scene - Ensure absolute and full size */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            maxDistance={15}
            minDistance={4}
          />
          
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 5, 25]} />
          
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ff0000" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff0000" castShadow />
          
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            
            {trackData.map((track, i) => (
              <Gate key={i} track={track} onSelect={(t) => { setSelectedTrack(t); setShowFullLyrics(false); }} />
            ))}

            <Torus args={[25, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#222" transparent opacity={0.3} />
            </Torus>
          </Suspense>
        </Canvas>
      </div>

      {/* Global UI Overlays */}
      <div className="absolute top-10 left-10 z-[450]">
        <button 
          onClick={onClose}
          className="flex items-center gap-3 group text-zinc-500 hover:text-white transition-all bg-black/40 backdrop-blur-md p-3 border border-zinc-900"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
          <span className="text-xs uppercase tracking-[0.4em] font-bold">Exit Inner Mind</span>
        </button>
      </div>

      <AnimatePresence>
        {selectedTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto" onClick={() => setSelectedTrack(null)} />
            
            <motion.div 
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 p-6 z-10">
                <button 
                  onClick={() => setSelectedTrack(null)}
                  className="p-3 text-zinc-500 hover:text-mind-red transition-colors"
                >
                  <X size={32} strokeWidth={3} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden">
                {/* Visual Side */}
                <div className="md:col-span-4 bg-gradient-to-br from-mind-red/20 to-black p-8 flex flex-col justify-end relative">
                   <div className="absolute -top-10 -left-10 w-40 h-40 bg-mind-red opacity-10 blur-[80px]" />
                   <div className="space-y-4">
                      <span className="text-mind-red text-[10px] uppercase font-black tracking-[0.5em] block">Mind Node</span>
                      <h2 className="text-6xl font-black uppercase text-white leading-none tracking-tighter">{selectedTrack.title}</h2>
                      <div className="h-1 w-12 bg-mind-red" />
                   </div>
                </div>

                {/* Content Side */}
                <div className="md:col-span-8 p-8 md:p-12 overflow-y-auto scrollbar-hide space-y-12">
                   {!showFullLyrics ? (
                     <div className="space-y-12 animate-in fade-in duration-500">
                        <section className="space-y-4">
                           <h4 className="flex items-center gap-2 text-mind-red text-[10px] font-black uppercase tracking-widest">
                             <Play size={14} fill="currentColor" /> Lyrical Core
                           </h4>
                           <p className="text-3xl font-sinhala leading-relaxed text-zinc-200">
                              {selectedTrack.lyrics}
                           </p>
                           <button 
                             onClick={() => setShowFullLyrics(true)}
                             className="group flex items-center gap-2 text-white text-[10px] uppercase tracking-widest font-bold mt-4"
                           >
                             <BookOpen size={16} className="text-mind-red" /> 
                             <span className="border-b border-transparent group-hover:border-white transition-all">Expand Full Lyrics</span>
                             <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                           </button>
                        </section>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-zinc-900">
                           <section className="space-y-3">
                              <h4 className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                                <Info size={14} /> Credits
                              </h4>
                              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                                 {selectedTrack.credits}
                              </p>
                           </section>
                           <section className="space-y-3">
                              <h4 className="flex items-center gap-2 text-mind-red text-[10px] font-black uppercase tracking-widest">
                                 The Identity
                              </h4>
                              <p className="text-sm text-zinc-500 italic leading-relaxed">
                                 {selectedTrack.facts}
                              </p>
                           </section>
                        </div>
                     </div>
                   ) : (
                     <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-mind-red">Full Transcript</h4>
                           <button onClick={() => setShowFullLyrics(false)} className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 hover:text-white transition-colors">
                             Back to Insight
                           </button>
                        </div>
                        <div className="text-xl font-sinhala leading-loose text-zinc-300 whitespace-pre-wrap select-text">
                           {selectedTrack.fullLyrics}
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Helper */}
      {!selectedTrack && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.5 }} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none"
        >
          <div className="w-12 h-[1px] bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-[1em] text-white">Explore Nodes</span>
          <div className="w-12 h-[1px] bg-zinc-800" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default MindJourney;
