# LUMIDREAM Web 1.2

Osobná mobilná PWA aplikácia na lucidné snívanie s tréningom, denníkom, analýzou motívov a zálohami. Údaje sa ukladajú lokálne do prehliadača.

## GitHub Pages – bez Android Studia
1. Nahraj **obsah** priečinka `LUMIDREAM` do koreňa repozitára `LUMIDREAM`. Nahraj aj skrytý priečinok `.github`. Pôvodný workflow `android-apk.yml` môžeš vymazať.
2. Na GitHube otvor Settings → Pages → Build and deployment → Source = **GitHub Actions**.
3. Otvor Actions → Publish LUMIDREAM Web a spusti Run workflow, ak sa nespustil automaticky.
4. Po úspešnom nasadení bude adresa `https://<tvoj-username>.github.io/LUMIDREAM/`.
5. V Chrome na Androide otvor adresu a vyber ponuku ⋮ → Inštalovať aplikáciu alebo Pridať na plochu.

## Lokálne testovanie
`npm install` → `npm test` → `npm run build` → `npm run dev`.

## Dôležité obmedzenia
- Náhodné pripomienky Reality Check sa kontrolujú iba pri otvorenej aplikácii. Pri zatvorenom prehliadači alebo uspanej stránke nie je doručenie zaručené. Web Push pri zatvorenej aplikácii vyžaduje server a samostatnú implementáciu.
- Online hosting neznamená synchronizáciu údajov. Denník je viazaný na konkrétny prehliadač. Pravidelne exportuj JSON zálohu.
- Nie je zaručený lucidný sen. Aplikácia nevyžaduje nočné alarmy.
