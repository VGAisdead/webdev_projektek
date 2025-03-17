export const reports = {
	emerleg: {
		title: "Egyszerűsített éves beszámoló mérlege",
		description:
			"A vállalkozás egyszerűsített vagyoni helyzetét mutatja (csak mérlegsorok) az adott időpontban.",
		rows: [
			{
				label: "ESZKÖZÖK /",
				name: "AKTÍVÁK",
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
				tooltip: "Rövid távon hasznosítható eszközök.",
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
					"Jövőbeni bevételek, költségek, ráfordítások időbeli elszámolása.",
			},
		],
	},

	osszkoltseg: {
		title: "Összköltség Eredménykimutatás",
		description:
			"Az összköltség eredménykimutatás a bevételeket és ráfordításokat összesítve mutatja az eredményt.",
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
				label: "ESZKÖZÖK /",
				name: "AKTÍVÁK",
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
		],
	},

	lepcso: {},
};
