const fs = require('fs');
const path = require('path');

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix all imports with version numbers
    const importRegex = /from\s+["']([^"']+)@\d+\.\d+\.\d+["']/g;
    content = content.replace(importRegex, (match, packageName) => {
      modified = true;
      return `from "${packageName}"`;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Get all .tsx files in components/ui directory
const uiDir = path.join(__dirname, 'components', 'ui');
const files = fs.readdirSync(uiDir).filter(file => file.endsWith('.tsx'));

console.log(`Found ${files.length} .tsx files to process`);

// Process each file
files.forEach(file => {
  const filePath = path.join(uiDir, file);
  fixImportsInFile(filePath);
});

console.log('Import fixing completed!');
