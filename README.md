# Getting Started

This guide walks you through setting up and running this app from scratch on your computer.

---

## Step 1 — Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the left button)
3. Open the downloaded file and follow the installer — just keep clicking Next
4. Once done, open a terminal and verify it worked:
   ```
   node --version
   ```
   You should see a version number like `v22.0.0`

---

## Step 2 — Install Git

1. Go to [https://git-scm.com](https://git-scm.com)
2. Download and install it for your operating system
3. **Windows:** during installation, when asked about default editor, select **Use Visual Studio Code** — leave everything else as default
4. Once done, verify it worked:
   ```
   git --version
   ```
   You should see a version number like `git version 2.47.0`

---

## Step 3 — Install VS Code


1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Download and install it for your operating system
3. Open VS Code and install these two extensions (click the Extensions icon on the left sidebar):
   - **ES7+ React/Redux/React-Native snippets**
   - **Prettier - Code formatter**

---

## Step 4 — Install Expo Go on your phone

1. Open the **App Store** (iPhone) or **Google Play Store** (Android)
2. Search for **Expo Go** and install it
3. Make sure your phone and computer are on the **same Wi-Fi network**

---

## Step 5 — Fork and download this project

1. Go to the main repository page on GitHub
2. Click the **Fork** button at the top right — this creates your own personal copy of the project
3. On your forked repo page, click the green **Code** button and copy the URL
4. In VS Code, open a terminal and run:
   ```
   git clone <your-fork-url>
   cd <project-folder>
   ```

---

## Step 6 — Install project dependencies

1. In VS Code, open the terminal (Terminal → New Terminal from the top menu)
2. Run:
   ```
   npm install
   ```
3. Wait for it to finish — this installs everything the app needs to run

---

## Step 7 — Start the app

In the terminal, run:
```
npx expo start
```

A QR code will appear in the terminal.

If your Expo Go timed out, run:
```
npx expo start --tunnel
```

---

## Step 8 — Open on your phone

- **iPhone:** Open the Camera app and point it at the QR code — tap the notification that appears
- **Android:** Open the Expo Go app, tap **Scan QR code**, and scan it

The app should launch on your phone within a few seconds.

---

## Adding a New Level

1. Copy `app/game/g1.tsx` and rename it to the next number (e.g. `g10.tsx`)
2. Inside the new file, change the function name and title text to match the new number
3. Open `app/levels.tsx` and add the new level ID to the `LEVELS` array at the top:
   ```
   const LEVELS = ['g1', 'g2', ..., 'g10'];
   ```
4. Save both files — the new level will appear in the level select screen automatically

---

## Git Workflow

Follow this every time you work on the project.

---

### Before starting work — sync the latest changes

**Using terminal:**
```
git pull origin main
npm install
```

**Using VS Code:**
1. Click the **Source Control** icon on the left sidebar (looks like a branch)
2. Click the **...** menu at the top right of the Source Control panel
3. Click **Pull**
4. Then run `npm install` in the terminal to make sure dependencies are up to date

---

### After finishing your changes — save and submit

**Using terminal:**
```
git add .
git commit -m "describe what you changed"
git push origin main
```

**Using VS Code:**
1. Click the **Source Control** icon on the left sidebar
2. You'll see a list of changed files — hover over **Changes** and click the **+** button to stage all files (this is the same as `git add .`)
3. Type a short description of your changes in the **Message** box at the top
4. Click the **Commit** button (checkmark)
5. Click the **Sync Changes** button that appears — this pushes your changes to GitHub

---

### Opening a Pull Request — submitting your work for review

After pushing your changes:
1. Go to your forked repository on GitHub
2. Click the **Contribute** button → **Open pull request**
3. Make sure the base repository is set to the main repo and base branch is `main`
4. Add a title and short description of what you did
5. Click **Create pull request**

Your work will then be reviewed before being merged into the main project.

---

**`npm install` fails**
- Make sure Node.js is installed correctly by running `node --version` in the terminal

**QR code doesn't work**
- Make sure your phone and computer are on the same Wi-Fi network
- Try pressing `r` in the terminal to reload

**App shows a blank screen**
- Press `r` in the terminal to reload the app
- Check the terminal for any red error messages and copy them into your AI assistant

**Expo Go says SDK version mismatch**
- Make sure you have the latest version of Expo Go installed on your phone
