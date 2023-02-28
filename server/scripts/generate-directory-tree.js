const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const OUTPUT_FILE = path.join(__dirname, 'directory-tree.md');

const ignoredFolders = ['.git', 'node_modules'];

function buildDirectoryTree(dir, indent = '') {
  const files = fs.readdirSync(dir);
  let tree = '';

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (ignoredFolders.includes(file)) {
      continue;
    }

    if (stats.isDirectory()) {
      tree += `${indent}- ${file}/\n`;
      const childTree = buildDirectoryTree(filePath, `${indent}  `);
      tree += childTree;
    } else {
      tree += `${indent}- ${file}\n`;
    }
  }

  return tree;
}

const tree = buildDirectoryTree(ROOT_DIR);

fs.writeFileSync(OUTPUT_FILE, `.\n${tree}`);
