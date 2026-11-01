# Track Your Downfall

*Part of [TASHFIN-PORTFOLIO-CONTEXT.md](../TASHFIN-PORTFOLIO-CONTEXT.md). Open this before touching `/track-your-downfall/`.*

A Gen Z habit tracker Tashfin designed with Claude on 2026-11-01. It roasts
you in English and Banglish. Live at
https://tashfin-rahman.github.io/track-your-downfall/

It started as a Claude artifact (https://claude.ai/artifact/Q5gc1zgXzz4qA7jDw2pjuF),
which uses Claude's own storage for the squad. The website copy here is the same
app with that storage swapped for Firebase.

## What he asked for

- Tap-only input. No typing except the nickname and typed roasts.
- Dark humour, Gen Z, English plus Banglish. Never jokes about self-harm or mental health.
  A "Rough day" vibe check turns the roast off for that day.
- Onboarding quiz ("Villain origin story") that learns about the user.
- Friends: leaderboard and a roast wall. **Friends can type roasts** (his call).
  Guard rails: 140 characters, a blocklist of threats and slurs, Hide and Report
  on your own wall, sender's nickname shown on every roast.
- A new separate repo was his first choice. GitHub is not signed in to the
  browser pane, and the session cannot create repos, so it went into this repo
  as a folder. Same URL he wanted.
- Phase 2 (not started): a real Android app (Flutter) that reads screen time
  automatically. He uses Android for this.

## Files

| File | What |
|---|---|
| `track-your-downfall/index.html` | The whole app. One file. |
| `manifest.webmanifest`, `icon-*.png`, `sw.js` | Makes it installable ("Add to Home Screen") and open offline. |

## Current state

- **Solo mode is live.** `FIREBASE_CONFIG` near the bottom of the script is
  `null`, so the app saves to the phone's browser storage and the Squad tab says
  the leaderboard is coming soon.
- **Firebase is not set up yet. Blocked on him.** The browser pane is signed in
  to Google only with his NSU account (`tashfin.rahman.252@northsouth.edu`).
  Creating the project there would put it under NSU's Google organisation, and
  it would die when the university account does. He chose to wait and use his
  personal Gmail. He has an exam on 2026-11-02.

## Finishing Firebase (what to do next session)

1. He signs in to his personal Gmail in Claude's built-in browser (not Opera;
   the pane is a separate browser).
2. console.firebase.google.com → create project `track-your-downfall`
   (he approved accepting the Firebase terms on 2026-11-01). Analytics off.
3. Add a Web app, copy the `firebaseConfig` object, paste it as the value of
   `FIREBASE_CONFIG` in `index.html`.
4. Authentication → Sign-in method → Google → Enable.
   Authentication → Settings → Authorized domains → add `tashfin-rahman.github.io`.
5. Firestore → Create database, production mode, `asia-south1`.
   Rules tab → paste the rules below → Publish.
6. Bump `CACHE` in `sw.js` (`tyd-v2`) so installed copies pick up the change.
   Commit, push, then sign in on the live site and do one Damage Report to check
   that `players/<uid>` appears in the Firestore data tab.

### Firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Each person's profile and logs: only they can read or write.
    match /data/users/{uid}/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    // Leaderboard rows: any signed-in user reads, each writes only their own.
    match /players/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    // Roasts: signed-in users read and post as themselves, max 140 chars.
    // Only the target can flag one. Only the sender can delete one.
    match /roasts/{id} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.from == request.auth.uid
        && request.resource.data.text is string
        && request.resource.data.text.size() <= 140
        && request.resource.data.flagged == false;
      allow update: if request.auth != null
        && resource.data.to == request.auth.uid
        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['flagged', 'flaggedBy']);
      allow delete: if request.auth != null && resource.data.from == request.auth.uid;
    }
  }
}
```

## How the code switches storage

The app was written against Claude's `db` API, which matches the Firestore
compat API closely (`doc().set`, `onSnapshot`, `collection().add`,
`orderBy().limit()`). So the website loads `firebase-*-compat.js` 10.12.2 from
gstatic only when `FIREBASE_CONFIG` is set, and hands `firebase.firestore()` to
the same code. Paths: `data/users/<uid>/profile`, `data/users/<uid>/logs`,
`players/<uid>`, `roasts/<auto id>`.

Without a config, or if a person picks "Use solo", everything goes to
localStorage under `tyd-v1`.

## Not checked

Nothing was clicked through in a browser before it went live. The script
passed a syntax check. The live URL was checked for a 200 after the push.
