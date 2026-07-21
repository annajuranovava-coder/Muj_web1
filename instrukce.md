# Instrukce pro tvorbu webu - Anna Juranová

Tento dokument obsahuje kompletní specifikace, požadavky na design, bezpečnost, SEO a textové podklady pro tvorbu webové prezentace.

---

## **Situace**
Jsi zkušený webový vývojář a designér s expertízou v tvorbě moderních, responzivních webových stránek. Tvým úkolem je vytvořit kompletní web podle specifikací níže.
Každá sekce webu má působit, jako by její návrh stál 20 tisíc korun. Web má působit prémiově, v souladu se značkou a jako hotový profesionální produkt.
Výsledný web nemá vypadat jako web vytvořený AI, vyvaruj se typickým grafickým prvkům.

---

## **Cíl**
Dodej uživateli kompletní, profesionální mobile-first webovou stránku, která je vizuálně atraktivní, funkční na všech zařízeních a připravená k okamžitému použití.

---

## **Úkol**
Vytvoř funkční web, který bude obsahovat:
*   Strukturovaný komentovaný HTML5 kód s validní sémantikou
*   Responzivní design (mobile-first přístup)
*   CSS styly pro přizpůsobení všem obrazovkám (4K monitory, desktop, tablet, mobil)
*   CSS jednotky velikosti: pro běžný text použij `rem`, pro nadpisy použij `clamp`
*   Základní JavaScript pro interaktivitu (na jemné oživení stránek)

---

## **Znalosti**
*   Zajisti rychlé načítání a optimalizovaný výkon
*   Dodržuj best practices pro přístupnost (barevný kontrast, velikost písma, ARIA)
*   Vlož favicon ve formátu svg (pokud ho nemáš dodaný, vytvoř ho)
*   Pokud web produkuje marketingové a statistické cookies, vytvoř Cookie lištu, která bude obsahovat tlačítka Přijmout, Odmítnout a Nastavit. Vytvoř ji v barvách webu.
*   Jako kanonickou (tj. preferovanou) URL webu chci `annajuranova.cz` a web přesměruj z verze `www` na bez `www` (poznámka: můžete to chtít opačně, je to jedno)
*   Přesměrování `http` → `https` je řešeno na úrovni hostingu, nedávej ho do souboru `.htaccess`

---

## **Bezpečnost**
Vytvoř bezpečnostní hlavičku v `.htaccess`.

| Hlavička | Co dělá |
| :--- | :--- |
| **X-Frame-Options: SAMEORIGIN** | Tvůj web nelze vložit do cizího iframu — ochrana před clickjackingem (útok, kdy tě někdo přiměje kliknout na něco, co nevidíš) |
| **X-Content-Type-Options: nosniff** | Prohlížeč nebude hádat typ souboru — zabrání spuštění souboru, který se tváří jako obrázek, ale je to skript |
| **Strict-Transport-Security** | Po prvním HTTPS spojení si prohlížeč zapamatuje, že web používá jen HTTPS — zabrání downgrade útoku na HTTP |
| **Referrer-Policy: strict-origin-when-cross-origin** | Při přechodu na jiný web odesílá jen doménu (ne celou URL s parametry) — necílíš zbytečně citlivé URL třetím stranám |
| **Permissions-Policy** | Explicitně zakazuje stránce přistupovat k mikrofonu, kameře a geolokaci — i kdyby se někdo dostal do kódu, nemůže tyto API zapnout |

---

## **Práce s CSS**
Při tvorbě webu vždy pracuj s CSS jako s design systémem, ne jako s náhodnými styly.

### 1. Struktura CSS
*   Veškeré styly zapisuj výhradně do `style.css`.
*   CSS musí být hlavní zdroj stylování pro celý web.
*   Nepoužívej inline styly ani `<style>` bloky v HTML (výjimky jen s jasným zdůvodněním kritického CSS).

### 2. Povinný design systém (na začátku projektu)
Vytvoř v `style.css` základní systém proměnných:
*   **Barvy (CSS variables):**
    *   `primary`
    *   `secondary`
    *   `background`
    *   `text`
    *   `muted`
    *   `accent`
*   **Spacing systém:**
    *   používej škálu např.: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
    *   nikdy nevymýšlej náhodné hodnoty
*   **Typografie:**
    *   definuj: base font size, `h1`–`h6` hierarchii, line-height pravidla
    *   používej konzistentní škálování (např. 1.25 ratio)
*   **Layout pravidla:**
    *   definuj: container max-width, grid systém (např. 12 sloupců nebo flex systém), breakpointy (mobile-first)

### 3. Tvorba komponent
Každý prvek webu navrhuj jako komponentu:
*   `button`, `navbar`, `card`, `form`, `section`, `hero`
*   Každá komponenta musí být znovupoužitelná a nesmí mít pevně zakódované hodnoty.

### 4. CSS disciplína (velmi důležité)
*   Nepiš jednorázové styly pro konkrétní HTML prvek.
*   Nepoužívej nadměrnou specifitu (žádné zbytečné `!important`).
*   CSS musí být škálovatelné pro budoucí rozšíření webu.

---

## **Čisté URL (bez .html)**
Vytvoř web s čistými URL (bez `.html`) a zároveň přidej serverovou pojistku pro staré odkazy.

*   **Pravidla pro frontend:**
    *   Všechny interní odkazy (`href`) generuj pouze jako čisté URL: `/sluzby`, `/kontakt`, `/o-mne`
    *   Nikdy nepoužívej `.html` v navigaci, tlačítkách, obsahu, sitemap ani canonical URL.
*   **Serverová pojistka:**
    *   Vytvoř `.htaccess` s pravidly:
        *   301 redirect všech `.html` URL na čisté URL
        *   interní rewrite čistých URL na odpovídající `.html` soubory (pokud existují)

---

## **Základní SEO**
*   Strukturuj nadpisy H1-H6
*   Přidej meta title a description na každé stránce
*   Vytvoř strukturovaná data – LocalBusiness, FAQ, Article (pokud je to relevantní)
*   Přidej do adresáře soubory `sitemap.xml`, `robots.txt` a `llms.txt`
*   Obrázkům dej alt popisky
*   Propoj stránky vnitřními odkazy
*   Vytvoř Open Graph meta tagy (náhled webu pro Facebook a další sociální sítě)

---

## **Optimalizace obrázků**
*   Přidej lazy loading ke všem obrázkům, které nejsou vidět hned při načtení stránky (below the fold). Tj. u hero sekce lazy loading nedělej.
*   Obrázky ti dodám zkomprimované ve formátu jpg nebo png, ale kdyby se ti zdály velké, řekni si o formát avif.

---

## **Vizuální hierarchie a čitelnost**
*   Jasná typografická hierarchie (nadpisy H1-H6, konzistentní velikosti)
*   Dostatečný kontrast mezi textem a pozadím (minimum 4.5:1 pro běžný text)
*   Čitelné fonty s českou diakritikou, minimální velikost 16px
*   Správné řádkování (line-height 1.5-1.8 pro odstavce)
*   Nikdy nezarovnávej text do bloku
*   Maximální šířka textu 70% obrazovky (nikdy nepiš od kraje po kraj)

---

## **Layout**
*   Šířku celého webu dej na 85% obrazovky
*   Jasné oddělení sekcí a obsahových celků
*   Pokud mám v sekci 4 karty/boxy – dej je po dvou na řádek (ne 3+1)
*   Vyvážené použití bílého prostoru (white space)
*   Intuitivní navigace - logo vlevo, hamburger menu na mobilu vpravo
*   Dej si záležet na patičce webu
*   U prvku accordion (př. pro otázky a odpovědi) dávej ikonu šipky dolů a nahoru a pokud je jich víc než 3, tak je rozděl do dvou sloupců
*   Jednopísmenové znaky (spojky, předložky) zalamuj na nový řádek (pomocí nedělitelné mezery `&nbsp;`)
*   Jednotky (Kč, m, kg, Eur, atd.) spoj s číslem nedělitelnou mezerou
*   Datum piš ve formátu `1. 1. 2026` a mezery dej nedělitelné

---

## **Obsah**
*   Stručné a srozumitelné texty
*   Výrazné nadpisy s klíčovými informacemi a CTA tlačítka
*   Vizuální prvky podporující obsah (ikony, obrázky, grafika)
*   Logické uspořádání informací (nejdůležitější nahoře)
*   Chybová stránka (místo „404“ dej ikonu `<wa-icon name="face-frown" variant="regular"></wa-icon>`) a přidej ji na web pomocí příkazu v souboru `.htaccess`: `ErrorDocument 404 /404.html`
*   Kontrola povinných údajů na webu: jméno, sídlo, IČ, zápis v rejstříku

---

## **Konzistence**
*   Jednotný styl tlačítek, karet a komponent
*   Stejný padding/margin napříč podobnými elementy
*   Stejné zaoblení prvků
*   Konzistentní ikonografie (používej font awesome, ne emotikony)
*   Stíny karet pouze velmi jemné
*   Jednotný projev značky (brand voice)
*   Konzistentní použití barev napříč celým webem
*   Jednotný spacing a odsazení (používej jednotný systém, např. 8px grid)

---

## **Barevná paleta**
*   **Brand barvy (HEX):**
    *   primární: `#a61f4d`
    *   sekundární: `#d4af37`
    *   tlačítka: `#d4af37`
    *   pozadí: `#d4af37`
    *   text: `#a61f4d`

---

## **Fonty**
*   Zvol vhodný patkový nebo bezpatkový font podle obsahu webu.
*   Pokud není jasné, zvol moderní sans-serif font (např. **Outfit**).

---

## **Struktura webu**
*   Vícestránkový web
*   **Položky menu:**
    *   Můj příběh
    *   Virtuální asistentka
    *   Tvorba webu
    *   FAQ
    *   Kontakt

---

## **Další prvky na webu**
*   Vlož LinkedIn
*   Vytvoř kontaktní formulář včetně antispamu (honeypot), použijeme službu `https://formspree.io/`
*   Vlož booking kalendář

---

## **Design**
*   Akvarelové stříkance v barvě `#a61f4d` a `#d4af37` na bílém pozadí na celém webu.
*   Vytvoř moderní mobile-first web: použít můžeš trendy jako velká typografie, barevné gradienty, dekorativní animace a scroll animace.
*   **Moderní design:**
    *   Animace: Mikro interakce na hover, jemné scroll animace
    *   Expanding CTA
    *   FAQ
    *   Image mask
    *   Timeline
    *   Lottie ikon

---

## **Obrázky**
Na webu použij fotky (např. přílohy), které najdeš ve složce `Obrazky`.

---

## **Textové podklady pro jednotlivé sekce / stránky**
*Drž se jich doslova a nic neměň ani nepřidávej.*

### **Hero sekce**
*   **Hlavní nadpis:** Vaše parťačka – od administrativy po web s duší.
*   **Podtext:** Pomáhám srdcařkám v podnikání volněji dýchat – ať jde o zákaznickou péči, papírování, nebo web, který přes vibecoding postavím tak, aby měl duši a vyprávěl Váš příběh. Získáte zpátky čas a klid. Já se postarám o zbytek.
*   **CTA:** Chci volněji dýchat

### **Úvod pod hero sekcí**
*   **Layout:** 4 kartičky v řadě (responzivně se zalomí na menších obrazovkách). Každá karta obsahuje ikonku, nadpis a krátký text.
*   **Kartička 1:**
    *   *Nadpis:* 7 let v administrativě a zákaznické péči
    *   *Text:* Prošla jsem si pozicemi jako back office i koordinátorka dálkového studia. Vím, že administrativa a zákaznická péče jsou nepostradatelný základ každého podnikání – a vím, jak se o ně postarat.
*   **Kartička 2:**
    *   *Nadpis:* Tvořím weby s duší
    *   *Text:* Neslibuju weby hotové přes noc. Než začnu cokoli stavět, chci znát Váš příběh. Jedině tak může vzniknout web, který bude opravdu Váš.
*   **Kartička 3:**
    *   *Nadpis:* Empatický a individuální přístup
    *   *Text:* Nejste pro mě jen další klientka. Zajímá mě Váš příběh, Vaše podnikání i to, co Vás trápí. Protože jen tak můžu být skutečnou parťačkou.
*   **Kartička 4:**
    *   *Nadpis:* Průvodkyně digitálním chaosem
    *   *Text:* Ztrácíte se v e-mailech nebo papírování? Nebo nevíte, jak začít delegovat? Od toho tu jsem já – provedu Vás krok za krokem.

---

### **Jak Vám můžu pomoct?**
*   **Nadpis sekce:** Jak Vám můžu pomoct?
*   **Podtitulek:** Dvě služby, jeden přístup – parťačka, které záleží na Vašem příběhu.
*   **Layout:** 2 kartičky vedle sebe, každá se stejnou strukturou – nadpis, text, CTA odkaz.
*   **Kartička 1:**
    *   *Nadpis:* Virtuální asistentka
    *   *Text:* Administrativa, zákaznická péče, osobní agenda — převezmu to, co Vám bere čas a energii. Abyste konečně mohla volněji dýchat.
    *   *CTA:* Chci vědět víc →
*   **Kartička 2:**
    *   *Nadpis:* Tvorba webů
    *   *Text:* Web bez duše je jako zahrada bez péče. Pojďme to změnit – postavíme web od základů, nebo vdechneme duši tomu, co už máte.
    *   *CTA:* Chci vědět víc →

---

### **Můj příběh**
Jmenuji se Anna, jsem virtuální asistentka a webařka. 7 let jsem pracovala v administrativě a zákaznické péči, a tak když jsem přemýšlela, co budu dělat, až půjdou děti do školky, volba byla jasná. Stanu se virtuální asistentkou. Je to práce, která mě nesmírně baví a naplňuje. Navíc mi umožňuje věnovat se tomu, co je pro mě nejdůležitější – rodině.

Nejsem člověk, který si jen odškrtává úkoly, chci se stát Vaší parťačkou. Vím, že záleží na detailech a že kvalitní zákaznická péče je základ. Aby se klienti vraceli, musí se u Vás cítit opečováváni. A tento pocit jim ráda dopřeju – a Vám tak pomůžu, aby se k Vám klienti s radostí vraceli. Nejraději spolupracuji s podnikatelkami, které svou práci dělají srdcem — a hledají někoho, kdo se o jejich podnikání bude starat se stejnou péčí jako ony samy.

Když jsem se stala virtuální asistentkou, pochopila jsem, jak důležité je v dnešní době umět pracovat s AI. A protože mám ráda výzvy, ponořila jsem se do studia AI a stále se učím nové věci. Díky tomu jsem zjistila, co je vibecoding, postavila pomocí něj tento web a zjistila, že mě to baví. A tak jsem se rozhodla rozšířit služby o tvorbu webů. Nechci ale tvořit weby, které budou hotové přes noc. Chci tvořit weby, které budou mít duši a budou odrážet Vás a Váš příběh.

Mimo podnikání jsem hlavně máma dvou holčiček. Kdybyste podle mých koníčků měli hádat, kolik mi je, tipli byste nejspíš 60+. 😀 Jsem vášnivá čtenářka — v mé knihovně byste našly spoustu žánrů. Miluju zahradničení, u kterého se skvěle uvolním, a jsem velká milovnice zvířat — doma nám dělají společnost dva kocouři a pes. Ráda se vzdělávám a objevuju nové věci — momentálně jsem ponořená do Notionu a pronikám do tajů malování hennou.

Věřím, že delegování není známkou toho, že něco nezvládáte. Naopak — je to důkaz, že si vážíte svého času. 🩷

*(zde vodorovná oddělující čára)*

**Poznámka pod čarou (menší písmo):**
PS: I když se zaměřuji hlavně na podnikatelky, ráda se stanu parťačkou i mužům, kteří to mají nastavené podobně a v podnikání hledají lidskost.

---

### **Virtuální asistentka**
*   **Nadpis sekce:** S čím Vám ráda pomůžu?
*   **Hook text (pod nadpisem, před kartami):**
    Aby Vaše podnikání mohlo růst, potřebuje pevné základy a trochu péče. Od administrativy přes zákaznickou péči až po osobní asistenci – tohle jsou oblasti, ve kterých Vám ráda pomůžu.

*   **Formátování karet:** Karty mají jednotnou strukturu – ikonka nahoře, pak nadpis (bold), pak tagline kurzívou, pak bullet seznam. Ikonky doplním později.

*   **Karta 1:**
    *   *Nadpis:* Administrativa
    *   *Tagline (kurzíva):* Konec digitálního chaosu. Pohlídám to, co Vás nebaví, ale musí to fungovat.
    *   *Seznam:*
        *   Příprava podkladů a rešerše
        *   Hlídání plateb a faktur
        *   Správa kalendáře
        *   Digitalizace dokumentů
        *   Přepis audia
        *   Tvorba grafiky v Canvě
        *   Tvorba formulářů a dotazníků
        *   Správa v Notionu
*   **Karta 2:**
    *   *Nadpis:* Zákaznická péče
    *   *Tagline (kurzíva):* Aby se Vaší klienti cítili slyšeni. Budu Vaším hlasem na e-mailu i sítích.
    *   *Seznam:*
        *   Správa e-mailu
        *   Komunikace s klienty na sociálních sítích
        *   Vyřizování reklamací
        *   Tvorba dotazníků spokojenosti
        *   Reporty objednávek a prodejů
        *   Vyhodnocování dotazníků
*   **Karta 3:**
    *   *Nadpis:* Osobní asistence
    *   *Tagline (kurzíva):* Moje specialita a Vaše úleva. Od drobností až po velké plány.
    *   *Seznam:*
        *   Plánování dovolené
        *   Hledání kroužků pro děti
        *   Volnočasové aktivity
        *   Příprava fotoknihy
        *   Úklid v osobním mailu
        *   Online nákupy a rezervace
        *   Řešení každodenních starostí

*   **Doplňující text pod kartami služeb (kurzíva, s ikonkou):**
    *Neustále se vzdělávám, aby má podpora byla co nejlepší. Aktuálně pracuji v Notionu — své klientce jsem vytvořila virtuální kancelář, kde máme společný přehled nad úkoly a agendou. Ráda ji vytvořím i Vám. Absolvovala jsem workshop zaměřený na Claude, kde jsem se naučila tvořit vlastní asistenty a základy vibecodingu — mimochodem, i tento web vznikl touto cestou. Zajímá mě, jak moderní nástroje usnadňují práci, a ráda se naučím pracovat i se systémy, které už používáte.*

#### **JAK TO FUNGUJE?**
*   **Nadpis sekce:** Společně to zvládneme
*   **Layout:** 4 kroky na střídačku (zigzag) – ikonka uprostřed ve vlastním kruhu, karta s textem střídavě nalevo/napravo. Ikonky jsou propojené rovnou svislou čárou uprostřed, vedoucí skrz středy všech kruhů s ikonkami (čára je "za" ikonkami, tedy ikonky mají bílé/světlé pozadí, aby čára nebyla vidět přes ně). Karty mají bílé pozadí, zaoblené rohy, jemný okraj. Ikonky v kruhových bublinách stejné velikosti, zarovnané do středu mezi levou a pravou kartu.
*   **Krok 1 — karta nalevo**
    *   *Ikonka:* obálka (e-mail)
    *   *Nadpis:* Napište mi
    *   *Text:* Ozvěte se mi e-mailem — ráda si s Vámi dám online kávičku a zjistíme, jestli jsme na stejné vlně.
*   **Krok 2 — karta napravo**
    *   *Ikonka:* kávový šálek
    *   *Nadpis:* Online kávička
    *   *Text:* Při nezávazné online kávičce si povíme, kde Vám nejvíc uniká čas a energie. Společně najdeme cestu, jak Vám ho vrátit — a jak Vám ulevit.
*   **Krok 3 — karta nalevo**
    *   *Ikonka:* schránka s fajfkou (checklist)
    *   *Nadpis:* Nastavíme spolupráci
    *   *Text:* Vzájemnou shodu potvrdíme férovou smlouvou. Jasně si v ní nastavíme rozsah práce i odměnu, abychom do spolupráce vstupovaly s čistou hlavou a vzájemnou důvěrou.
*   **Krok 4 — karta napravo**
    *   *Ikonka:* raketa
    *   *Nadpis:* Startujeme!
    *   *Text:* Doladíme technické detaily a způsob komunikace — a můžeme se pustit do práce. Mým cílem je, abyste už po pár dnech pocítila skutečnou úlevu.

#### **CENÍK (Virtuální asistentka)**
*   **Label nad nadpisem:** CENÍK
*   **Nadpis sekce:** Vyberte si svůj balíček
*   **Layout:** 5 karet v řadě (responzivně se zalomí na menších obrazovkách). Každá karta obsahuje: ikonku v kruhu nahoře, název balíčku (caps), počet hodin (velké číslo + "HODIN" pod tím), krátký tagline, oddělující čáru, cenu.
*   **Karta 1:**
    *   *Název:* Start
    *   *Hodiny:* 5 hodin
    *   *Tagline:* První kroky k delegování. Odbavení restů a vzájemné naladění.
    *   *Cena:* 3 000 Kč
*   **Karta 2:**
    *   *Název:* Standard
    *   *Hodiny:* 10 hodin
    *   *Tagline:* Pravidelná podpora pro plynulý rozvoj i čas na to nejdůležitější.
    *   *Cena:* 6 000 Kč
*   **Karta 3:**
    *   *Název:* Profi
    *   *Hodiny:* 15 hodin
    *   *Tagline:* Ideální řešení pro delegování agendy, která už nemusí být Vaší starostí.
    *   *Cena:* 9 000 Kč
*   **Karta 4:**
    *   *Název:* Expert
    *   *Hodiny:* 20 hodin
    *   *Tagline:* Intenzivní podpora. Společně proměníme chaos v jasný a udržitelný směr.
    *   *Cena:* 12 000 Kč
*   **Karta 5:**
    *   *Název:* Parťák
    *   *Hodiny:* 25 hodin
    *   *Tagline:* Maximální úleva a jistota — parťák v zádech s garantovanou kapacitou.
    *   *Cena:* 15 000 Kč

*   **Poznámky pod ceníkem (menší písmo, s ikonkami):**
    *   Platnost hodin v balíčku je 30 dní od zakoupení. Hodiny jsou nepřenosné do dalšího měsíce.
    *   Klientky s balíčky Expert a Parťák mají garantovanou přednostní kapacitu.
*   **Box s vysvětlením (orámovaný/odlišené pozadí, kurzíva):**
    *Balíčky jsou předplacené. Zpravidla začínáme balíčkem Start, abychom se poznaly a zjistily, jak nám spolupráce funguje. Pokud zjistíte, že hodin potřebujete více nebo méně, balíček přizpůsobíme přímo Vašim potřebám. Po domluvě je samozřejmě možné dojednat i větší počet hodin.*

#### **Reference**
*   **Label nad nadpisem:** Co o mně říkají klientky?
*   **Layout:** Jedna výrazná, velká citace na celou šířku obsahu. Foto klientky vlevo (nebo nahoře na mobilu), citace vpravo/pod fotkou ve větším, čitelném písmu. Jméno a obor pod citací, menší písmo.
*   **Citace:**
    „Spolupráce s mou virtuální asistentkou je pro mě obrovská úleva a úspora času. Pomáhá mi s přehledem financí – sleduje platby hypotéky i půjčky, takže mám ve všem jasno a nemusím nic hlídat. Zároveň za mě řeší i věci, na které bych jinak neměla čas – například nákup dárků k narozeninám, vyhledávání informací k podnikání nebo tvorbu plakátů na akce. Velkou pomocí je pro mě také správa skladových položek v CleverFarm, vedení rozvrhu a také pomoc se zautomatizováním sociálních sítí a webu. Velmi oceňuji i to, že v době mé dovolené přebírá komunikaci – vyřizuje e-maily i telefonáty, takže si můžu opravdu odpočinout. S její prací jsem velmi spokojená a budu s ní s radostí spolupracovat i nadále. Je spolehlivá, samostatná a vždy najde řešení. Díky ní se můžu víc soustředit na to, co je pro mě opravdu důležité."
*   **Jméno a obor:**
    Blanka Bartáková
    Agronomka a majitelka farmy

*   **Závěrečná výzva k akci:**
    Je čas přestat všechno zvládat sama. Napište mi a domluvíme si nezávaznou online kávičku, kde proberem, jak Vám můžu pomoct volněji dýchat.
    `[Domluvit online kávičku]`

---

### **Tvorba webu**
*   **Hook:** Web bez duše je jako zahrada bez péče — možná existuje, ale nikdo se u něj nezastaví.
*   **Podtext:** Pomůžu Vám postavit web od základů, nebo vdechnout duši tomu, co už máte.

*   **Pro koho to je:**
    *   Chcete vizitku nebo landing page, která bude vyprávět Váš příběh
    *   Podnikáte jako koučka, psycholožka, fotografka, floristka nebo provozujete ubytování, kavárnu či bistro
    *   Nepotřebujete web často měnit
    *   Chcete web, který bude vypadat osobně a profesionálně zároveň
*   **Pro koho to není:**
    *   Provozujete e-shop
    *   Potřebujete členskou sekci nebo online kurzy
    *   Potřebujete web sami pravidelně editovat (produkty, akce, články)
    *   Jste větší firma s komplexními požadavky
*   **Věta pod tím:** Nevíte si rady? Napište mi nebo si zamluvte online kávičku — společně se na to podíváme.

#### **JAK TO FUNGUJE**
*   **Nadpis sekce:** Společně to zvládneme
*   **Layout:** 5 kroků na střídačku (zigzag) – ikonka uprostřed ve vlastním kruhu, karta s textem střídavě nalevo/napravo. Ikonky propojené rovnou svislou čárou uprostřed.
*   **Krok 1:**
    *   *Nadpis:* Online kávička
    *   *Text:* Domluvíme si spolu termín nezávazné konzultace zdarma. Ta bude trvat 15–30 minut. Během ní se poznáme, zjistíme, jestli jsme na stejné vlně, a probereme Váš projekt, představy a co od webu očekáváte.
*   **Krok 2:**
    *   *Nadpis:* Cenová nabídka
    *   *Text:* Po konzultaci si vše v klidu promyslím a zašlu Vám individuální cenovou nabídku.
*   **Krok 3:**
    *   *Nadpis:* Vyladíme detaily
    *   *Text:* Po odsouhlasení cenové nabídky si domluvíme druhou schůzku, která bude trvat cca 2 hodiny. Probereme veškeré detaily – obsah webu, jaké podklady mi máte dodat a v jakém termínu. Po odsouhlasení Vám zašlu první fakturu na 5 000,- Kč a po zaplacení začínám pracovat na webu.
*   **Krok 4:**
    *   *Nadpis:* Ladím Váš web
    *   *Text:* Teď přichází ta nejlepší část – pustím se do práce. Do 30 dnů od dodání podkladů Vám web zašlu ke schválení.
*   **Krok 5:**
    *   *Nadpis:* Spuštění webu
    *   *Text:* Po finálním schválení Vám zašlu druhou fakturu. Po jejím zaplacení spustím web na Vaší doméně.

#### **CENÍK (Tvorba webu)**
*   **Label nad nadpisem:** CENÍK
*   **Nadpis sekce:** Jaký web bude ten Váš?
*   **Layout:** 2 karty vedle sebe. Každá karta obsahuje: název, cenu, rozbalovací accordion "Co je v ceně" a "Co není v ceně".

*   **Karta 1:**
    *   *Název:* Jednostránkový web
    *   *Cena:* od 9 000 Kč
    *   *Co je v ceně (rozbalovací):*
        *   Úvodní konzultace (2 hodiny) v ceně
        *   Design a struktura webu
        *   Pomoc se zakoupením domény a hostingu
        *   Responzivita (mobil, tablet, počítač)
        *   Základní kontaktní formulář
        *   Propojení se sociálními sítěmi
        *   Pomoc s texty
        *   Základní SEO
        *   Nasazení na hosting
    *   *Co není v ceně (rozbalovací):*
        *   Platba za doménu a hosting
        *   Úpravy webu po spuštění
*   **Karta 2:**
    *   *Název:* Vícestránkový web
    *   *Cena:* od 15 000 Kč
    *   *Co je v ceně (rozbalovací):*
        *   Úvodní konzultace (2 hodiny) v ceně
        *   Design a struktura webu
        *   Pomoc se zakoupením domény a hostingu
        *   Responzivita (mobil, tablet, počítač)
        *   Základní kontaktní formulář
        *   Propojení se sociálními sítěmi
        *   Pomoc s texty
        *   Základní SEO
        *   Nasazení na hosting
    *   *Co není v ceně (rozbalovací):*
        *   Platba za doménu a hosting
        *   Úpravy webu po spuštění

*   **Poznámka pod ceníkem (menší písmo):**
    Úpravy webu po spuštění účtuji hodinovou sazbou 600 Kč/h.

#### **Portfolio**
*   **Název sekce:** Portfolio
*   **Text:** Portfolio právě vzniká. Brzy zde uvidíte první projekty.
*   **Výzva k akci:** Chcete web, který bude mít duši? Pojďme ho společně postavit.
*   **Tlačítko:** Domluvit online kávičku

---

### **FAQ (Časté otázky)**
*   **Nadpis sekce:** Časté otázky
*   **Layout:** Accordion / rozbalovací seznam – otázka viditelná vždy, odpověď se rozbalí po kliknutí.

#### **Virtuální asistence**
1.  **Jak probíhá spolupráce?**
    Napíšete mi a domluvíme si nezávaznou online kávičku, kde si vše probereme. Pokud zjistíme, že jsme na stejné vlně, vybereme balíček, který Vám bude vyhovovat, a můžeme odstartovat spolupráci.
2.  **Jak dlouho platí hodiny v balíčku?**
    Hodiny v balíčku jsou platné v daném měsíci, ve kterém jste balíček zakoupila, a nejsou přenosné do dalšího měsíce.
3.  **Co když mi nebude vyhovovat počet hodin v balíčku?**
    Nevadí, balíček vždy můžeme upravit nebo dojednat víc hodin tak, aby Vám vyhovoval.
4.  **Uzavíráme spolu nějakou smlouvu?**
    Ano, pracujeme spolu na základě smlouvy, kterou Vám před podpisem zašlu k nahlédnutí.
5.  **Jak je to s bezpečností mých dat a přístupů?**
    Bezpečnost beru velmi vážně. Součástí naší smlouvy je i dohoda o mlčenlivosti. K zabezpečení hesel používám nástroj Bitwarden.
6.  **Pracujete jen s klienty z konkrétních oborů?**
    Ne. Na své práci miluju právě tu rozmanitost. Ráda budu asistovat v jakémkoli oboru.

#### **Weby**
1.  **Co je to vibecoding?**
    Vibecoding je moderní způsob tvorby webů pomocí AI. Místo ručního psaní kódu pracuji s umělou inteligencí, která mi pomáhá web postavit rychleji a efektivněji. Pro Vás to znamená web na míru za přijatelnější cenu – bez kompromisů na kvalitě nebo duši výsledku.
2.  **Jak dlouho trvá tvorba webu?**
    Do 30 dnů od dodání podkladů. Někdy to jde i rychleji – záleží na mé aktuální kapacitě.
3.  **Musím předem vědět, jak chci, aby můj web vypadal?**
    Nemusíte. Všechno dáme dohromady společně – od struktury přes obsah až po vizuální styl. Od toho tu jsem.
4.  **Mohu web po spuštění upravovat sám?**
    Ano, jde to pomocí nástroje Direct Edit. Ukážu Vám jak.
5.  **Nabízíte správu webu po spuštění?**
    Ano, pokud budete chtít na webu něco změnit nebo přidat, stačí mi napsat. Správu webu účtuji hodinovou sazbou 600 Kč/h.
6.  **Zajišťujete hosting a doménu? Kolik to stojí?**
    Ano, pokud budete chtít, zajistím Vám hosting na Webkitty.cz, kde je cena cca 1 275 Kč bez DPH za rok. Doména s koncovkou .cz stojí cca 244 Kč bez DPH za rok.
7.  **Pomůžete mi s texty na web?**
    Ano, součástí tvorby webu je základní podpora při tvorbě obsahu – tipy, co na web určitě patří, jak strukturovat nadpisy nebo jak oslovit Vaši cílovou skupinu. Pokud potřebujete texty napsat od začátku nebo přepracovat, ráda se s Vámi individuálně domluvím.
8.  **Jak probíhá platba?**
    Po druhé online schůzce a odsouhlasení Vám zašlu fakturu na 5 000,- Kč. Zbylou částku doplácíte po schválení webu a před nasazením na hosting. Platba probíhá převodem na účet.
9.  **Co když potřebuji web rychleji?**
    Pokud potřebujete web dříve než do 30 dnů, ozvěte se mi a domluvíme se individuálně. Expresní zhotovení je za příplatek.

---

### **Kontakt**
*   **Nadpis sekce:** Pojďme se poznat
*   **Úvodní text:**
    Nemusíte mít vše promyšlené do detailu. Napište mi — dáme si online kávičku a společně zjistíme, jak Vám pomoct volněji dýchat. Ať jde o administrativu, péči o klienty nebo web, který konečně bude vyprávět Váš příběh.
    *První online kávička je zdarma a nezávazná.*
*   **CTA tlačítko pod textem:** Domluvit online kávičku
*   **Layout:** Dva sloupce vedle sebe.
    *   **Sloupec vlevo – Rychlý kontakt:**
        *   ✉️ info@annajuranova.cz
        *   LinkedIn
        *   Facebook
    *   **Sloupec vpravo – Formulář:**
        *   *Pole:* Jméno (placeholder: Vaše jméno)
        *   *Pole:* E-mail (placeholder: vas@email.cz)
        *   *Rozbalovací menu:* Ozývám se kvůli: Virtuální asistenci / Tvorbě webu
        *   *Pole:* Zpráva (placeholder: S čím Vám mohu pomoci?)
        *   *Tlačítko:* Odeslat zprávu

---

### **Patička (Footer - na každé stránce)**
*   **Layout:** 3 sloupce vedle sebe.
*   **Sloupec 1 – O mně:**
    *   Anna Juranová
    *   IČO: 24385026
    *   Fyzická osoba podnikající podle živnostenského zákona
    *   Sídlo: Jabloňová 2669, 438 01 Žatec
*   **Sloupec 2 – Kontakt:**
    *   ✉️ info@annajuranova.cz
*   **Sloupec 3 – Sledujte mě:**
    *   LinkedIn (odkaz doplníš)
    *   Facebook (odkaz doplníš)
