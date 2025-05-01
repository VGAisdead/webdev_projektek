export const reports = {
	test: {
		title: "Teszt kimutatás",
		description: "Új funkciók tesztelése",
		rows: [
			{
				label: "▼ TEST",
				name: "IT ▼",
				type: "mainheader",
				tooltip: "well u want to check if it works or not?",
			},
			{
				label: "...",
				name: "pls work",
				type: "selectable",
			},
		],
	},

	emerleg: {
		title: "Egyszerűsített éves beszámoló mérlege",
		description:
			"A vállalkozás egyszerűsített vagyoni helyzetét mutatja (csak mérlegsorok) az adott időpontban.",
		rows: [
			{
				label: "▼ ESZKÖZÖK /",
				name: "AKTÍVÁK ▼",
				type: "mainheader",
				tooltip: "A cég összes eszközét foglalja össze",
			},
			{
				label: "A/",
				name: "Befektetett eszközök",
				type: "secheader",
				tooltip: "Hosszú távú eszközök csoportja",
			},
			{
				label: "I.",
				name: "Immateriális javak",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Tárgyi eszközök",
				type: "selectable",
			},
			{
				label: "III.",
				name: "Befektetett pénzügyi eszközök",
				type: "selectable",
			},
			{
				label: "B/",
				name: "Forgóeszközök",
				type: "secheader",
				tooltip: "Rövid távon hasznosítható eszközök",
			},
			{
				label: "I.",
				name: "Készletek",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Követelések",
				type: "selectable",
			},
			{
				label: "III.",
				name: "Értékpapírok",
				type: "selectable",
			},
			{
				label: "IV.",
				name: "Pénzeszközök",
				type: "selectable",
			},
			{
				label: "C/",
				name: "Aktív időbeli elhatárolások",
				type: "secheader",
				tooltip:
					"Jövőbeni bevételek, költségek, ráfordítások időbeli elszámolása",
			},
			{
				label: "ESZKÖZÖK ",
				name: "ÖSSZESEN",
				type: "sum",
				tooltip: "A vállalkozás teljes eszközállományának értéke",
			},
			{
				label: "",
				name: "",
				type: "nothing",
			},
			{
				label: "▼ FORRÁSOK / ",
				name: "PASSZÍVÁK ▼",
				type: "mainheader",
				tooltip: "A cég vagyonát biztosító kötelezettségek és tőke",
			},
			{
				label: "D/",
				name: "Saját tőke",
				type: "secheader",
				tooltip:
					"A cég saját erőforrásai, a teljes vagyon és kötelezettségek különbözete",
			},
			{
				label: "I.",
				name: "Jegyzett tőke",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Jegyzett, de még be nem fizetett tőke (-)",
				type: "selectable",
			},
			{
				label: "III.",
				name: "Tőketartalék",
				type: "selectable",
			},
			{
				label: "IV.",
				name: "Eredménytartalék",
				type: "selectable",
			},
			{
				label: "V.",
				name: "Lekötött tartalék",
				type: "selectable",
			},
			{
				label: "VI.",
				name: "Értékelési tartalék",
				type: "selectable",
			},
			{
				label: "VII.",
				name: "Adózott eredmény",
				type: "selectable",
			},
			{
				label: "E/",
				name: "Céltartalékok",
				type: "secheader",
				tooltip:
					"Jövőbeli kiadásokra (pl. garancia, per) előre elkülönített összeg",
			},
			{
				label: "F/",
				name: "Kötelezettségek",
				type: "secheader",
				tooltip:
					"A cég külső felekkel szembeni tartozásai, pl. hitelek, szállítói számlák",
			},
			{
				label: "I.",
				name: "Hátrasorolt kötelezettségek",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Hosszú lejáratú kötelezettségek",
				type: "selectable",
			},
			{
				label: "III.",
				name: "Rövid lejáratú kötelezettségek",
				type: "selectable",
			},
			{
				label: "G/",
				name: "Passzív időbeli elhatárolások",
				type: "secheader",
				tooltip:
					"Később esedékes bevételek, költségek, ráfordítások időbeli elszámolása",
			},
			{
				label: "FORRÁSOK ",
				name: "ÖSSZESEN",
				type: "sum",
				tooltip:
					"A cég teljes finanszírozása, a saját tőke és a kötelezettségek összege",
			},
		],
	},

	osszkoltseg: {
		title: "Összköltség Eredménykimutatás",
		description:
			"Az összköltség eredménykimutatás a bevételeket és ráfordításokat összesítve  mutatja az eredményt.",
		rows: [
			{
				label: "01.",
				name: "Belföldi értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "02.",
				name: "Export értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "I.",
				name: "Értékesítés nettó árbevétele (01+02)",
				type: "secheader",
			},
			{
				label: "03.",
				name: "Saját termelésű készletek állományváltozása (STKÁV)",
				type: "selectable",
			},
			{
				label: "04.",
				name: "Saját előállítású eszközök aktivált értéke (SEEAÉ)",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Aktivált saját teljesítmények értéke (±03+04)",
				type: "secheader",
			},
			{
				label: "III.",
				name: "Egyéb bevételek",
				type: "secheader",
			},
			{
				label: "ebből:",
				name: "Visszaírt értékvesztés",
				type: "sum",
			},
			{
				label: "05.",
				name: "Anyagköltség",
				type: "selectable",
			},
			{
				label: "06.",
				name: "Igénybe vett szolgáltatások értéke",
				type: "selectable",
			},
			{
				label: "07.",
				name: "Egyéb szolgáltatások értéke",
				type: "selectable",
			},
			{
				label: "08.",
				name: "Eladott áruk beszerzési értéke (ELÁBÉ)",
				type: "selectable",
			},
			{
				label: "09.",
				name: "Eladott (közvetített) szolgáltatások értéke",
				type: "selectable",
			},
			{
				label: "IV.",
				name: "Anyagjellegű ráfordítások (05+06+07+08+09)",
				type: "secheader",
			},
			{
				label: "10.",
				name: "Bérköltség",
				type: "selectable",
			},
			{
				label: "11.",
				name: "Személyi jellegű egyéb kifizetések",
				type: "selectable",
			},
			{
				label: "12.",
				name: "Bérjárulékok",
				type: "selectable",
			},
			{
				label: "V.",
				name: "Személyi jellegű ráfordítások (10+11+12)",
				type: "secheader",
			},
			{
				label: "VI.",
				name: "Értékcsökkenési leírás",
				type: "secheader",
			},
			{
				label: "VII.",
				name: "Egyéb ráfordítások",
				type: "secheader",
			},
			{
				label: "ebből:",
				name: "Értékvesztés",
				type: "sum",
			},
			{
				label: "A /",
				name: "ÜZEMI (Üzleti) tevékenység eredménye",
				type: "mainheader",
				tooltip: "I ± II ± III - IV - V - VI - VII",
			},
			{
				label: "",
				name: "",
				type: "nothing",
			},
			{
				label: "13.",
				name: "Kapott (járó) osztalék és részesedés",
				type: "selectable",
			},
			{
				label: "ebből:",
				name: "Kapcsolt vállalkozástól kapott",
				type: "sum",
			},
			{
				label: "14.",
				name: "Részesedésekből származó bevételek, árfolyamnyereségek",
				type: "selectable",
			},
			{
				label: "ebből:",
				name: "Kapcsolt vállalkozástól kapott",
				type: "sum",
			},
			{
				label: "15.",
				name: "Befektetett pénzügyi eszközökből (értékpapírokból, kölcsönökből) származó bevételek, árfolyamnyereségek",
				type: "selectable",
			},
			{
				label: "ebből:",
				name: "Kapcsolt vállalkozástól kapott",
				type: "sum",
			},
			{
				label: "16.",
				name: "Egyéb kapott (járó) kamatok és kamatjellegű bevételek",
				type: "selectable",
			},
			{
				label: "ebből:",
				name: "Kapcsolt vállalkozástól kapott",
				type: "sum",
			},
			{
				label: "17.",
				name: "Pénzügyi műveletek egyéb bevételei",
				type: "selectable",
			},
			{
				label: "ebből:",
				name: "Értékelési különbözet",
				type: "sum",
			},
			{
				label: "VIII.",
				name: "Pénzügyi műveletek bevételei",
				type: "secheader",
				tooltip: "13 + 14 + 15 + 16 + 17",
			},
			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
			},
		],
	},

	forgalmi: {
		title: "Forgalmi Eredménykimutatás",
		description:
			"A forgalmi költség kimutatás a nettó árbevételt és költségeket részletezi az eredményhez.",
		rows: [
			{
				label: "01.",
				name: "Belföldi értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "02.",
				name: "Export értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "I.",
				name: "Értékesítés nettó árbevétele (01+02)",
				type: "secheader",
			},
			{
				label: "03.",
				name: "Saját termelésű készletek állományváltozása",
				type: "selectable",
			},
			{
				label: "04.",
				name: "Saját előállítású eszközök aktivált értéke",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Aktivált saját teljesítmények értéke (±03+04)",
				type: "secheader",
			},
			{
				label: "A /",
				name: "ÜZEMI (Üzleti) tevékenység eredménye",
				type: "mainheader",
			},

			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
			},
		],
	},

	cashflow: {
		title: "Cashflow kimutatás",
		description:
			"A cashflow kimutatás a pénzforgalmat mutatja be, működési, befektetési és finanszírozási szinten.",
		rows: [
			{
				label: "01.",
				name: "Belföldi értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "02.",
				name: "Export értékesítés nettó árbevétele",
				type: "selectable",
			},
			{
				label: "I.",
				name: "Értékesítés nettó árbevétele (01+02)",
				type: "secheader",
			},
			{
				label: "03.",
				name: "Saját termelésű készletek állományváltozása",
				type: "selectable",
			},
			{
				label: "04.",
				name: "Saját előállítású eszközök aktivált értéke",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Aktivált saját teljesítmények értéke (±03+04)",
				type: "secheader",
			},
			{
				label: "A /",
				name: "ÜZEMI (Üzleti) tevékenység eredménye",
				type: "mainheader",
			},

			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
			},
		],
	},

	merleg: {
		title: "Éves beszámoló mérlege",
		description:
			"A mérleg a vállalkozás vagyoni helyzetét mutatja egy adott időpontban, eszközök és források szerint.",
		rows: [
			{
				label: "▼ ESZKÖZÖK /",
				name: "AKTÍVÁK ▼",
				type: "mainheader",
				tooltip: "A cég összes eszközét foglalja össze.",
			},
			{
				label: "A/",
				name: "Befektetett eszközök",
				type: "secheader",
				tooltip: "Hosszú távú eszközök csoportja.",
			},
			{
				label: "I.",
				name: "Immateriális javak",
				type: "subheader",
				tooltip: "Nem fizikai eszközök köre.",
			},
			{
				label: "1.",
				name: "Alapítás átszervezés aktivált értéke",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Kísérleti fejlesztés aktivált értéke",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Vagyoni értékű jogok",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Szellemi termékek",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Üzleti vagy cégérték",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Immateriális javakra adott előlegek",
				type: "selectable",
			},
			{
				label: "7.",
				name: "Immateriális javak értékhelyesbítése",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Tárgyi eszközök",
				type: "subheader",
				tooltip: "Fizikai, tartós használatú eszközök.",
			},
			{
				label: "1.",
				name: "Ingatlanok és a kapcsolódó vagyoni értékű jogok",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Műszaki berendezések, gépek, járművek",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Egyéb berendezések, felszerelések, járművek",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Tenyészállatok",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Beruházások, felújítások ",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Beruházásokra adott előlegek",
				type: "selectable",
			},
			{
				label: "7.",
				name: "Tárgyi eszközök értékhelyesbítése",
				type: "selectable",
			},
			{
				label: "III.",
				name: "Befektetett pénzügyi eszközök",
				type: "subheader",
				tooltip: "Hosszú távú pénzügyi befektetések.",
			},
			{
				label: "1.",
				name: "Tartós részesedés kapcsolt vállalkozásban",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Tartósan adott kölcsön kapcsolt vállalkozásban",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Tartós jelentős tulajdoni részesedés",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Tartósan adott kölcsön jelentős tulajdoni részesedési viszonyban álló vállalkozásban",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Egyéb tartós részesedés",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Tartósan adott kölcsön egyéb részesedési viszonyban álló vállalkozásban",
				type: "selectable",
			},
			{
				label: "7.",
				name: "Egyéb tartósan adott kölcsön",
				type: "selectable",
			},
			{
				label: "8.",
				name: "Tartós hitelviszonyt megtestesítő értékpapír",
				type: "selectable",
			},
			{
				label: "9.",
				name: "Befektetett pénzügyi eszközök értékhelyesbítése",
				type: "selectable",
			},
			{
				label: "10.",
				name: "Befektetett pénzügyi eszközök értékelési különbözete",
				type: "selectable",
			},
			{
				label: "B/",
				name: "Forgóeszközök",
				type: "secheader",
				tooltip: "Rövid távon hasznosítható eszközök.",
			},
			{
				label: "I.",
				name: "Készletek",
				type: "subheader",
				tooltip: "A cég raktáron lévő anyagai és termékei.",
			},
			{
				label: "1.",
				name: "Anyagok",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Befejezetlen termelés és félkész termékek",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Növendék, hízó és egyéb állatok",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Késztermékek",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Áruk",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Készletekre adott előlegek",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Követelések",
				type: "subheader",
				tooltip: "A cégnek járó, még ki nem fizetett összegek.",
			},
			{
				label: "1.",
				name: "Követelések áruszállításból és szolgáltatásból (vevők)",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Követelések kapcsolt vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Követelések jelentős tulajdoni részesedési viszonyban lévő vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Követelések egyéb részesedési viszonyban lévő vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Váltókövetelések",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Egyéb követelések",
				type: "selectable",
			},
			{
				label: "7.",
				name: "Követelések értékelési különbözete",
				type: "selectable",
			},
			{
				label: "8.",
				name: "Származékos ügyletek pozitív értékelési különbözete",
				type: "selectable",
			},
			{
				label: "III.",
				name: "Értékpapírok",
				type: "subheader",
				tooltip:
					"Forgalomképes, vagyoni jogokat megtestesítő eszközök.",
			},
			{
				label: "1.",
				name: "Részesedés kapcsolt vállalkozásban",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Jelentős tulajdoni részesedés",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Egyéb részesedés",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Saját részvények, saját üzletrészek",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Forgatási célú hitelviszonyt megtestesítő értékpapírok",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Értékpapírok értékelési különbözete",
				type: "selectable",
			},
			{
				label: "IV.",
				name: "Pénzeszközök",
				type: "subheader",
				tooltip: "Készpénz és azonnal felhasználható banki betétek.",
			},
			{
				label: "1.",
				name: "Pénztár, csekkek",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Bankbetétek",
				type: "selectable",
			},
			{
				label: "C/",
				name: "Aktív időbeli elhatárolások",
				type: "secheader",
				tooltip:
					"Jövőbeni bevételek, költségek, ráfordítások időbeli elszámolása.",
			},
			{
				label: "1.",
				name: "Bevételek aktív időbeli elhatárolása",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Költségek, ráfordítások aktív időbeli elhatárolása",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Halasztott ráfordítások",
				type: "selectable",
			},
			{
				label: "ESZKÖZÖK ",
				name: "ÖSSZESEN",
				type: "sum",
				tooltip: "A vállalkozás teljes eszközállományának értéke.",
			},
			{
				label: "",
				name: "",
				type: "nothing",
			},
			{
				label: "▼ FORRÁSOK / ",
				name: "PASSZÍVÁK ▼",
				type: "mainheader",
				tooltip: "A cég vagyonát biztosító kötelezettségek és tőke.",
			},
			{
				label: "D/",
				name: "Saját tőke",
				type: "secheader",
				tooltip:
					"A cég saját erőforrásai, a teljes vagyon és kötelezettségek különbözete.",
			},
			{
				label: "I.",
				name: "Jegyzett tőke",
				type: "subheader",
				tooltip: "A tulajdonosok által befektetett tőke összege.",
			},
			{
				label: "ebből: ",
				name: "Visszavásárolt tulajdoni részesedés névértéken",
				type: "sum",
				tooltip: "A tulajdonosok által visszavásárolt részesedés.",
			},
			{
				label: "II.",
				name: "Jegyzett, de még be nem fizetett tőke (-)",
				type: "subheader",
				tooltip: "A jegyzett tőke még ki nem fizetett része.",
			},
			{
				label: "III.",
				name: "Tőketartalék",
				type: "subheader",
				tooltip:
					"Tőkeemelésből vagy egyéb hozzájárulásból származó többletösszeg.",
			},
			{
				label: "IV.",
				name: "Eredménytartalék",
				type: "subheader",
				tooltip:
					"Korábbi évek felhalmozott, fel nem osztott nyeresége vagy vesztesége.",
			},
			{
				label: "V.",
				name: "Lekötött tartalék",
				type: "subheader",
				tooltip:
					"Külön célra (pl. fejlesztésre) félretett, fel nem osztható összeg.",
			},
			{
				label: "VI.",
				name: "Értékelési tartalék",
				type: "subheader",
				tooltip:
					"Eszközök piaci értékeléséből adódó különbözet összege.",
			},
			{
				label: "1.",
				name: "Értékhelyesbítés értékelési tartaléka",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Valós értékelés értékelési tartaléka",
				type: "selectable",
			},
			{
				label: "VII.",
				name: "Adózott eredmény",
				type: "subheader",
				tooltip:
					"A cég adózás utáni nyeresége vagy vesztesége adott időszakban.",
			},
			{
				label: "E/",
				name: "Céltartalékok",
				type: "secheader",
				tooltip:
					"Jövőbeli kiadásokra (pl. garancia, per) előre elkülönített összeg.",
			},
			{
				label: "1.",
				name: "Céltartalék a várható kötelezettségekre",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Céltartalék a jövőbeni költségekre",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Egyéb céltartalék",
				type: "selectable",
			},
			{
				label: "F/",
				name: "Kötelezettségek",
				type: "secheader",
				tooltip:
					"A cég külső felekkel szembeni tartozásai, pl. hitelek, szállítói számlák.",
			},
			{
				label: "I.",
				name: "Hátrasorolt kötelezettségek",
				type: "subheader",
				tooltip: "5 éven túli, hátrasorolt, alárendelt tartozások.",
			},
			{
				label: "1.",
				name: "Hátrasorolt kötelezettségek kapcsolt vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Hátrasorolt kötelezettségek jelentős tulajdoni viszonyban lévő vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Hátrasorolt kötelezettségek egyéb részesedési viszonyban lévő vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "II.",
				name: "Hosszú lejáratú kötelezettségek",
				type: "subheader",
				tooltip:
					"1 éven túli lejáratú, külső felekkel szembeni tartozások.",
			},
			{
				label: "1.",
				name: "Hosszú lejáratra kapott kölcsönök",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Átváltoztatható kötvények",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Tartozások kötvénykibocsátásból",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Beruházási és fejlesztési hitelek",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Egyéb hosszú lejáratú hitelek",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Tartós kötelezettségek kapcsolt vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "7.",
				name: "Tartós kötelezettségek jelentős tulajdoni viszonyban lévő vállalkozásokkal szemben",
				type: "selectable",
			},
			{
				label: "8.",
				name: "Tartós kötelezettségek egyéb részesedésiviszonyban lévő vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "9.",
				name: "Egyéb hosszú lejáratú kötelezettségek",
				type: "selectable",
			},
			{
				label: "III.",
				name: "Rövid lejáratú kötelezettségek",
				type: "subheader",
				tooltip:
					"1 éven belüli lejáratú, külső felekkel szembeni tartozások.",
			},
			{
				label: "1.",
				name: "Rövid lejáratú kölcsönök",
				type: "selectable",
			},
			{
				label: "ebből: ",
				name: "Átváltoztatható kötvények",
				type: "sum",
				tooltip:
					"Rövid lejáratú kötvények, amelyek részvényre válthatók.",
			},
			{
				label: "2.",
				name: "Rövid lejáratú hitelek",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Vevőktől kapott előlegek",
				type: "selectable",
			},
			{
				label: "4.",
				name: "Kötelezettségek áruszállításból és szolgáltatásból (szállítók)",
				type: "selectable",
			},
			{
				label: "5.",
				name: "Váltótartozások",
				type: "selectable",
			},
			{
				label: "6.",
				name: "Rövid lejáratú kötelezettségek kapcsolt vállalkozással szemben",
				type: "selectable",
			},
			{
				label: "7.",
				name: "Rövid lejáratú kötelezettségek jelentős tulajdoni viszonyban lévő vállalkozásokkal szemben",
				type: "selectable",
			},
			{
				label: "8.",
				name: "Rövid lejáratú kötelezettségek egyéb részesedési viszonyban lévő vállalkozással szemben",
			},
			{
				label: "9.",
				name: "Egyéb rövid lejáratú kötelezettségek",
				type: "selectable",
			},
			{
				label: "10.",
				name: "Kötelezettségek értékelési különbözete",
				type: "selectable",
			},
			{
				label: "11.",
				name: "Származékos ügyletek negatív értékelési különbözete",
				type: "selectable",
			},
			{
				label: "G/",
				name: "Passzív időbeli elhatárolások",
				type: "secheader",
				tooltip:
					"Később esedékes bevételek, költségek, ráfordítások időbeli elszámolása.",
			},
			{
				label: "1.",
				name: "Bevételek passzív időbeli elhatárolása",
				type: "selectable",
			},
			{
				label: "2.",
				name: "Költségek, ráfordítások passzív időbeli elhatárolása",
				type: "selectable",
			},
			{
				label: "3.",
				name: "Halasztott Bevételek",
				type: "selectable",
			},
			{
				label: "FORRÁSOK ",
				name: "ÖSSZESEN",
				type: "sum",
				tooltip:
					"A cég teljes finanszírozása, a saját tőke és a kötelezettségek összege.",
			},
		],
	},

	lepcso: {},
};
