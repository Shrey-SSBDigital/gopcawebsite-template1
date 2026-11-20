const fs = require('fs');
const path = require('path');

const dumpDir = path.join(__dirname, 'gopca_dump');

function parseTableRows(html) {
  const rows = [];
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;
  while ((trMatch = trRegex.exec(html)) !== null) {
    const cells = [];
    const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
    let cMatch;
    while ((cMatch = cellRegex.exec(trMatch[1])) !== null) {
      const raw = cMatch[1];
      const imgMatch = raw.match(/src=["']([^"']+)["']/i);
      const clean = raw.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      cells.push({
        text: clean,
        img: imgMatch ? imgMatch[1].replace(/^\.\.\//, '').replace(/^\.\//, '') : null
      });
    }
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

// 1. Governing Board
const gbHtml = fs.readFileSync(path.join(dumpDir, 'Governing_Board.aspx.html'), 'utf8');
const gbRows = parseTableRows(gbHtml).slice(1); // skip header
const governingBoard = gbRows.map((r, idx) => {
  const col0 = r[0] || { text: '' };
  const col1 = r[1] || { text: '', img: null };
  const col2 = r[2] || { text: '' };
  const col3 = r[3] || { text: '' };

  // col0 often has "Name Address"
  return {
    srNo: idx + 1,
    name: col0.text,
    role: col1.text || 'Member',
    photo: col1.img ? '/' + col1.img : null,
    contactNumber: col2.text,
    email: col3.text
  };
});
console.log('Parsed governingBoard:', governingBoard.length);

// 2. Staff
const staffHtml = fs.readFileSync(path.join(dumpDir, 'Staff.aspx.html'), 'utf8');
const staffRows = parseTableRows(staffHtml).slice(1);
const staff = staffRows.map((r, idx) => {
  const col0 = r[0] || { text: '' };
  const col1 = r[1] || { text: '', img: null };
  const col2 = r[2] || { text: '' };
  const col3 = r[3] || { text: '' };

  return {
    id: `st-${String(idx + 1).padStart(2, '0')}`,
    name: col0.text,
    designation: col1.text || 'Officer',
    photo: col1.img ? '/' + col1.img : null,
    contactNumber: col2.text,
    email: col3.text,
    office: 'GOPCA Directorate, Ahmedabad'
  };
});
console.log('Parsed staff:', staff.length);

// 3. Downloads
const dlHtml = fs.readFileSync(path.join(dumpDir, 'Download.aspx.html'), 'utf8');
const dlRows = parseTableRows(dlHtml).slice(1);
console.log('Parsed download rows:', dlRows.length);
if (dlRows.length > 0) console.log('Sample DL row:', dlRows[0].map(c => c.text));

// 4. Inspection Plan
const ipHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspxc8b3.html'), 'utf8');
const ipRows = parseTableRows(ipHtml).slice(1);
console.log('Inspection plan rows:', ipRows.length);

// 5. Terminated
const termHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspxd5a5.html'), 'utf8');
const termRows = parseTableRows(termHtml).slice(1);
console.log('Terminated rows:', termRows.length);

// 6. Suspended
const suspHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspx88f9.html'), 'utf8');
const suspRows = parseTableRows(suspHtml).slice(1);
console.log('Suspended rows:', suspRows.length);

// 7. Discontinued
const discHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspxa166.html'), 'utf8');
const discRows = parseTableRows(discHtml).slice(1);
console.log('Discontinued rows:', discRows.length);

// 8. Approved Inputs
const inpHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link78db.aspx'), 'utf8');
const inpRows = parseTableRows(inpHtml).slice(1);
console.log('Approved inputs rows:', inpRows.length);

// 9. Active ICS Operators
const icsHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspx7e33.html'), 'utf8');
const icsRows = parseTableRows(icsHtml).slice(1);
console.log('Active ICS rows:', icsRows.length);

// 10. Active Individual Operators
const indHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link5e53.aspx'), 'utf8');
const indRows = parseTableRows(indHtml).slice(1);
console.log('Active Individual rows:', indRows.length);

// 11. Farmer Details
const farmHtml = fs.readFileSync(path.join(dumpDir, 'Side_Linkf14d.aspx'), 'utf8');
const farmRows = parseTableRows(farmHtml).slice(1);
console.log('Farmer details rows:', farmRows.length);
