# GitHub Pages Deployment - Step-by-Step Guide

## 🎯 Simple 5-Minute Deployment

Follow these exact steps to deploy your Executive Alignment Scorecard:

---

## STEP 1: Open Your GitHub Repository

1. Open your web browser
2. Go to this exact URL:
   ```
   https://github.com/brendadlawrenc3-cloud/Alignment-Tool-for-Executives
   ```
3. Make sure you're logged into GitHub

---

## STEP 2: Go to Settings

1. Look at the top of the page for tabs: **< > Code**, **Issues**, **Pull requests**, etc.
2. Click on the **Settings** tab (it's the last one with a gear ⚙️ icon)
3. If you don't see Settings, you may not have admin access to this repository

---

## STEP 3: Find Pages Section

1. On the left sidebar, scroll down until you see **Pages** (under "Code and automation")
2. Click on **Pages**

---

## STEP 4: Configure Source

You'll see a section called "Build and deployment"

1. Under **Source**, there's a dropdown that might say "Deploy from a branch"
   - If it says something else, click it and select **"Deploy from a branch"**

2. Under **Branch**, you'll see dropdown menus:
   - Click the first dropdown (currently says "None")
   - Select: **claude/executive-alignment-scorecard-011CUdwyVvyuJ2eohuSjqCr4**

3. Leave the second dropdown as **/ (root)**

4. Click the **Save** button

---

## STEP 5: Wait for Deployment

1. The page will refresh
2. You'll see a blue box that says: "GitHub Pages source saved"
3. Wait 2-3 minutes for the site to build
4. Refresh the page after waiting

---

## STEP 6: Get Your Live URL

1. After refreshing, you should see a green box at the top that says:
   ```
   Your site is live at https://brendadlawrenc3-cloud.github.io/Alignment-Tool-for-Executives/
   ```

2. Click that URL or copy it to your browser

3. **That's it!** Your tool is now live on the internet! 🎉

---

## 🚨 TROUBLESHOOTING

### Problem: "I don't see the Settings tab"
**Solution:** You need to be the repository owner or have admin access. Contact the repository owner to grant you access or ask them to deploy it.

### Problem: "I get a 404 error when visiting the URL"
**Solution:**
- Wait 5 more minutes and try again
- Make sure you're using the exact URL with https:// at the start
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Problem: "The branch dropdown doesn't show my branch"
**Solution:**
- Make sure your code is pushed to GitHub (we already did this ✅)
- Refresh the GitHub Settings page
- Try using the branch name: `claude/executive-alignment-scorecard-011CUdwyVvyuJ2eohuSjqCr4`

### Problem: "Repository not found or access denied"
**Solution:**
- Make sure you're logged into the correct GitHub account
- Check that the repository exists at: https://github.com/brendadlawrenc3-cloud/Alignment-Tool-for-Executives

---

## 📱 ALTERNATIVE: Easy Download & Test Locally

If GitHub Pages isn't working, you can download and run locally:

### Download Files:
All your files are in this folder on your computer:
```
/home/user/Alignment-Tool-for-Executives/
```

### To Test Locally:
1. Open a terminal/command prompt
2. Navigate to the folder: `cd /home/user/Alignment-Tool-for-Executives/`
3. Run: `python3 -m http.server 8080`
4. Open browser to: `http://localhost:8080/index.html`

---

## 🆘 STILL STUCK?

Tell me exactly what you see when you:
1. Go to the GitHub repository URL
2. What tabs/options you see at the top
3. Whether you can access Settings

I'll help you figure it out!

---

## ✅ EXPECTED FINAL RESULT

Once deployed successfully, you'll have:
- **Live URL:** https://brendadlawrenc3-cloud.github.io/Alignment-Tool-for-Executives/
- **Accessible by anyone** with the link
- **Automatically updates** when you push changes to the branch
- **Free hosting** forever (GitHub Pages is free for public repositories)

---

## 📧 SHARE WITH YOUR TEAM

Once deployed, just send this URL to your executive team:
```
https://brendadlawrenc3-cloud.github.io/Alignment-Tool-for-Executives/
```

They can take the assessment directly from their browser - no login required!
