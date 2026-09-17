# Open Play Rotation — deploy to Railway

This folder is a ready-to-deploy copy of your board: a tiny Node server
(`server.js`, no dependencies) that serves `public/index.html` — the same
app you've been using as a Claude Artifact, converted into a standalone
page anyone can open with a plain URL.

A couple of things change once it's off the Artifact platform:
- **Storage** — the "Backup" panel's download/restore still works (it
  just uses the browser's normal download instead of the in-app one),
  and the board still saves itself in each visitor's browser via
  `localStorage`, same as before.
- Nothing else changes — same courts, queue, pairing, history, etc.

## Option A — deploy from GitHub (recommended)

1. Push this folder to a new GitHub repo:
   ```
   cd railway-deploy
   git init
   git add .
   git commit -m "Open Play Rotation"
   git branch -M main
   git remote add origin https://github.com/<you>/openplay-rotation.git
   git push -u origin main
   ```
2. Go to [railway.app](https://railway.app) and sign in (GitHub login is
   easiest).
3. **New Project → Deploy from GitHub repo** → pick the repo you just
   pushed.
4. Railway detects the Node app automatically (via `package.json`) and
   runs `npm start`. No extra config needed — it reads `process.env.PORT`
   on its own.
5. Once it finishes building, open **Settings → Networking** on the
   service and click **Generate Domain** to get a public `*.up.railway.app`
   URL. That's the link you share.

Any time you push a new commit to `main`, Railway redeploys automatically.

## Option B — deploy from your computer with the Railway CLI

No GitHub required:

```
npm install -g @railway/cli
cd railway-deploy
railway login
railway init
railway up
railway domain      # generates/prints your public URL
```

## Updating later

- **GitHub method**: edit `public/index.html`, commit, push — Railway
  redeploys on its own.
- **CLI method**: edit `public/index.html`, then run `railway up` again
  from this folder.

If you come back to Claude with more changes to the app, ask for an
updated `public/index.html` and swap it into this same folder before
redeploying — everything else here (`server.js`, `package.json`) stays
the same.
