# Gym Logbook V3

PWA mobile-first per tracking dell'allenamento. Pensata per Android/Chrome e uso offline.

## Avvio corretto

Perché Service Worker e installazione PWA funzionino, **non aprire index.html direttamente dal file manager (`file://`)**.

Servi la cartella tramite HTTPS oppure localhost. Esempi:

- GitHub Pages
- Netlify / Cloudflare Pages
- `python -m http.server 8080` su un computer collegato alla stessa rete (per test locale)

Su Chrome Android, apri l'indirizzo HTTPS, poi usa **Installa app / Aggiungi alla schermata Home**.

## Dati

Gli allenamenti sono salvati localmente in IndexedDB. Usa **Esporta backup** con regolarità. Il backup JSON contiene esercizi, schede, storico e impostazioni.
