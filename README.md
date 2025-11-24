# NeuroReader

NeuroReader is a browser extension that enhances on‑screen reading for people with dyslexia, autism, and anyone who benefits from increased text clarity and visual structure. [web:9]  

## 🌟 Features

- **Reading assist**: Applies a custom bolding pattern to words to improve scanning and reduce visual fatigue on most webpages. [web:9]  
- **Global on/off toggle**: Quickly enable or disable NeuroReader without uninstalling the extension, useful when testing or browsing different types of sites. [web:11]  
- **Per‑site blacklist**: Exclude specific websites from processing so layouts, web apps, or editors you care about remain untouched. [web:13]  
- **Clean popup UI**: Manage the blacklist, check whether the extension is enabled, and control behavior from a minimal, focused popup. [web:7]  
- **Local storage only**: Uses browser storage APIs to keep settings on your device; no external servers are contacted by the extension. [web:9]  

## 🚀 Getting Started

### 1. Clone the repository

Clone the project and move into the directory. [web:9]  

```
git clone https://github.com/yourusername/neuroreader.git
cd neuroreader
```

### 2. (Optional) Install dependencies for development

The core extension runs directly from the files in this folder, but if you are developing or running tooling you can install Node dependencies. [web:11]  

```
npm install
```

At the moment there is no required build step; the browser loads the files from this folder as an “unpacked” or “temporary” extension. [web:8]  

---

## 🧩 Installation by browser

NeuroReader is a standard WebExtension using a Manifest V3 configuration and works best on Chromium‑based browsers such as Chrome, Edge, and Brave. [web:12]  

### Google Chrome (and Brave, Vivaldi, Opera)

1. Open the Extensions page: go to `chrome://extensions/` in the address bar. [web:12]  
2. In the top‑right corner, enable **Developer mode**. [web:8]  
3. Click **Load unpacked**. [web:12]  
4. Select the `neuroreader` project directory that contains `manifest.json`. [web:13]  
5. You should now see the NeuroReader icon in the toolbar; pin it from the extensions menu if needed. [web:9]  

For Brave use `brave://extensions/`, for Vivaldi `vivaldi://extensions/`, and for Opera `opera://extensions/`, then follow the same steps as Chrome. [web:12]  

### Microsoft Edge (Chromium)

1. Open `edge://extensions/` in the address bar. [web:12]  
2. Turn on **Developer mode** using the toggle in the Extensions page. [web:12]  
3. Click **Load unpacked** and choose the `neuroreader` folder with `manifest.json`. [web:12]  
4. Confirm that the NeuroReader icon appears in the Edge toolbar; use the puzzle‑piece menu to pin it if it is hidden. [web:9]  

### Mozilla Firefox (experimental)

Firefox is gradually adding full Manifest V3 support, so behavior may differ slightly from Chromium‑based browsers. [web:13]  

1. Navigate to `about:debugging` in the address bar. [web:13]  
2. Click **This Firefox**. [web:13]  
3. Choose **Load Temporary Add‑on…**. [web:13]  
4. In the file picker, select the `manifest.json` file inside the `neuroreader` folder. [web:13]  
5. NeuroReader will be installed until you close Firefox; for development you can reload it from this same screen. [web:13]  

If you later package and publish the extension, Firefox users will be able to install it from the Add‑ons store without using the temporary‑add‑on flow. [web:13]  

---

## 📄 Usage

1. Click the NeuroReader icon in your browser toolbar to open the popup. [web:9]  
2. Use the **On/Off** toggle at the top to globally enable or disable NeuroReader. [web:11]  
3. To stop NeuroReader from modifying a specific site, click **Blacklist Current Site** in the popup, or manually add a domain like `example.com` using the input field. [web:13]  
4. Once enabled and not blacklisted, NeuroReader automatically processes the visible text on most pages you visit, applying the bolding pattern to help guide your eyes. [web:9]  

Changes to the toggle or blacklist usually apply after a quick page refresh, which the extension can trigger automatically in some cases. [web:8]  

---

## 🛠️ Development

If you want to modify or contribute to NeuroReader, use this workflow. [web:7]  

1. **Create a feature branch**. [web:7]  

   ```
   git checkout -b feature/YourFeatureName
   ```

2. Make your changes to the popup UI, content script, or manifest, then run any local checks or tests you have configured. [web:11]  

3. Commit your work with a clear message. [web:9]  

   ```
   git commit -am "Add new feature"
   ```

4. Push the branch and open a Pull Request on GitHub. [web:7]  

   ```
   git push origin feature/YourFeatureName
   ```

When testing changes locally, reload the unpacked extension from the appropriate extensions page (`chrome://extensions/`, `edge://extensions/`, etc.) so the browser picks up your new files. [web:12]  

---

## 📝 Roadmap

Planned and potential improvements include. [web:11]  

- More advanced text analysis and per‑language tuning of the bolding algorithm. [web:11]  
- User profiles so preferences and blacklists can sync across multiple devices or browsers. [web:9]  
- Better accessibility options such as line‑height, letter‑spacing, and background themes tailored to different visual needs. [web:9]  
- Additional browser store listings and automated packaging scripts for easier installation. [web:8]  

---

## 💬 Feedback

Issues, feature requests, and suggestions are welcome via the repository’s issue tracker. [web:9]  

Consider including screenshots or short videos when reporting UI or readability problems so changes can be evaluated from a real‑world reading perspective. [web:11]  

---

## 📑 License

NeuroReader is distributed under the MIT License; see the `LICENSE` file in this repository for full details. [web:7]  
