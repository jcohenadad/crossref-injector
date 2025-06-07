const { google } = require('googleapis');
const { authorize } = require('./auth');
const argv = require('minimist')(process.argv.slice(2));

// CLI usage: node inject.js --doc DOC_ID --title "My Script Title"

// Config
// const SOURCE_SCRIPT_ID = 'YOUR_TEMPLATE_SCRIPT_ID_HERE';  // Put your CrossRef template Apps Script ID here
const SOURCE_SCRIPT_ID = '1XlBDaw4Kd8n6QAjYtjdOkPo97Oh1JMKKdZL-gevClg8bOo_4MQUOI0LS';  // Put your CrossRef template Apps Script ID here
const TARGET_DOC_ID = argv.doc;
const SCRIPT_TITLE = argv.title || 'CrossRef Injected';

if (!TARGET_DOC_ID) {
  console.error('❌ Missing required --doc DOCUMENT_ID argument.');
  process.exit(1);
}

async function injectScript() {
  const auth = await authorize();
  const script = google.script({ version: 'v1', auth });

  console.log('📥 Fetching source project...');
  const { data: sourceContent } = await script.projects.getContent({
    scriptId: SOURCE_SCRIPT_ID,
  });

  console.log('📄 Creating bound script for doc...');
  const { data: created } = await script.projects.create({
    requestBody: {
      title: SCRIPT_TITLE,
      parentId: TARGET_DOC_ID,
    },
  });

  const newScriptId = created.scriptId;
  console.log(`📌 Bound script created: ${newScriptId}`);

  console.log('✏️ Injecting source content...');
  await script.projects.updateContent({
    scriptId: newScriptId,
    requestBody: {
      files: sourceContent.files,
    },
  });

  console.log('✅ Done! Open your doc here:');
  console.log(`🔗 https://docs.google.com/document/d/${TARGET_DOC_ID}`);
}

injectScript().catch((err) => {
  console.error('❌ Injection failed:', err);
});
