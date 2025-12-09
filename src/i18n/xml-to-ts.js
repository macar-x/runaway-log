const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Create a simple XML parser using JSDOM
function parseXML(xmlString) {
  const dom = new JSDOM(xmlString, { contentType: 'application/xml' });
  const document = dom.window.document;
  
  function parseNode(node) {
    const result = {};
    const children = node.children;
    
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.nodeType === 1) { // Element node
        const childName = child.tagName.toLowerCase();
        const childContent = child.textContent.trim();
        
        if (child.children.length === 0) {
          // Leaf node - direct text content
          result[childName] = childContent;
        } else {
          // Branch node - recursive parse
          result[childName] = parseNode(child);
        }
      }
    }
    
    return result;
  }
  
  return parseNode(document.documentElement);
}

// Convert parsed XML to TypeScript code
function generateTypeScript(parsedData, lang) {
  const tsCode = `export const ${lang} = ${JSON.stringify(parsedData, null, 2)};`;
  return tsCode;
}

// Process all XML files in the i18n directory
function processXMLFiles() {
  const i18nDir = path.resolve(__dirname);
  const xmlFiles = fs.readdirSync(i18nDir).filter(file => file.endsWith('.xml'));
  const translationsDir = path.join(i18nDir, 'translations');
  
  // Ensure translations directory exists
  if (!fs.existsSync(translationsDir)) {
    fs.mkdirSync(translationsDir);
  }
  
  for (const xmlFile of xmlFiles) {
    const xmlPath = path.join(i18nDir, xmlFile);
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
    
    try {
      const parsedData = parseXML(xmlContent);
      const lang = path.basename(xmlFile, '.xml');
      const tsCode = generateTypeScript(parsedData, lang);
      
      const tsPath = path.join(translationsDir, `${lang}.ts`);
      fs.writeFileSync(tsPath, tsCode);
      
      console.log(`✓ Generated ${tsPath}`);
    } catch (error) {
      console.error(`✗ Error processing ${xmlFile}:`, error.message);
    }
  }
}

// Run the conversion
processXMLFiles();