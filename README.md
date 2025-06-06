# 🧩 CrossRef Injector for Google Docs

This tool allows you to **inject the Cross Reference Google Apps Script** into any existing Google Docs file directly from your local terminal using the **Apps Script API** and **Google Drive API**.

It eliminates the need to manually copy-paste multiple script files into each document.

## 🚀 Features

- Injects the full [Cross Reference](https://github.com/davidrthorn/cross_reference) add-on code into any Google Doc
- Runs from your local terminal (Node.js)
- Fast and repeatable — inject with a one-liner
- Uses a template Apps Script project as the source

## 🧰 Prerequisites

### Install `Node.js`

Follow instructions [here](https://nodejs.org/).

### Create Google Cloud project

Go to [Google Cloud](https://console.cloud.google.com/).

Select or Create a Project
- Click the dropdown at the top to select an existing project, or click "New Project"
- Name it something like CrossRef Injector

Enable Required APIs
Go to APIs & Services > Library and enable:
- ✅ Google Drive API
- ✅ Google Apps Script API

Create a Service Account
Go to IAM & Admin > Service Accounts:
- Click Create Service Account
- Name: crossref-injector (or any name)
- Skip permission for now, click Create and Continue.

Grant Access (Optional, skip for now)
Click Continue and then Done (no roles needed here because you'll share Docs directly).

Create a Key
In the list of service accounts:
- Click your newly created service account
- Go to the "Keys" tab
- Click "Add Key" > "Create new key"
- Choose JSON
- Click Create → a JSON will be downloaded.
- Rename it as `credentials.json` and move it in the same folder as the inject.js script.

Share Docs with Your Service Account. You must manually share both (i) Your source Apps Script project (CrossRef template) and (ii) Your target Google Docs with the service account email, which looks like:

```css
crossref-injector@your-project-id.iam.gserviceaccount.com
```

### Create a template Apps Script project

Go to Google Apps Script Dashboard
🔗 https://script.google.com

Create a New Standalone Project

- Click + New Project
- Click the title and rename it to something like: `CrossRef Template`. 

Copy Code from GitHub

- Open the repo:
🔗 https://github.com/davidrthorn/cross_reference (if no more available, here use [this fork](https://github.com/jcohenadad/cross_reference))
- You'll need to recreate all files listed under the src root (such as main.gs, label-code.gs, etc.).

Get the Script ID

- Click the gear ⚙️ next to your project title → Project Settings
- Make sure "Show appsscript.json" is enabled
- Copy the `Script ID`.
- Paste this `Script ID` into the file `inject.js`. Example:

   ```js
   const SOURCE_SCRIPT_ID = '1a2B3cD4E5fGH6ijkLmnopQR7stUvWxyz';
   ```

Share script

- Go to [My Projects]()
- Click the '...' on the right of your project, and select "Share doc + script"
- Share with the email address listed in the `credentials.json`.

Enable Apps Script API for Your Google Account

- Go to: https://script.google.com/home/usersettings
- "Apps Script API" — switch it ON

## 📁 Project Structure

```bash
crossref-injector/
├── inject.js ← Main script
├── credentials.json ← Your service account key file
├── package.json
└── node_modules/
```

## ⚙️ Installation

Clone this repository or copy the script into a folder:

```shell
git clone https://github.com/YOUR_USERNAME/crossref-injector.git
cd crossref-injector
```

Install dependencies

```bash
npm init -y
npm install googleapis minimist
```

Download `credentials.json` and place it in your project directory.

## 📝 Configuration

Edit the top of inject.js to set your source script:

```bash
const SOURCE_SCRIPT_ID = 'YOUR_TEMPLATE_SCRIPT_ID_HERE';
```

This should be the Apps Script ID of your Cross Reference template project.

## 🚀 Usage

To inject Cross Reference into a Google Doc, run:

```bash
node inject.js --doc YOUR_DOC_ID --title "CrossRef Script"
```

- `--doc`: The ID of the target Google Doc (from the URL)
- `--title`: (optional) Title for the bound script project

Example:
```bash
node inject.js --doc 1A2B3C4D5E6F7G8H9I --title "CrossRef for My Thesis"
```

After a few seconds, your Doc will have the Cross Reference menu.

## 🧼 Tips

You can create an alias in your .bashrc or .zshrc:

```bash
alias inject-crossref='node /path/to/crossref-injector/inject.js'
```

Then use:

```bash
inject-crossref --doc 1XYZ... --title "CrossRef"
```

## 🧪 Troubleshooting

### Permission denied?

Make sure the Google Doc is shared with your service account email.

### User has not enabled the Apps Script API

If you _did_ enable the Apps Script but you still see the following message:
```console
❌ Injection failed: GaxiosError: User has not enabled the Apps Script API.
```

Wait a few more minutes for Google to propagate the settings.

### APIs not working?

Confirm both Apps Script and Drive APIs are enabled in your GCP project.

### Missing credentials.json?

Generate and download it from your Google Cloud Console.

## 🧠 Credits

Based on the [Cross Reference](https://github.com/davidrthorn/cross_reference) add-on by @davidrthorn.
