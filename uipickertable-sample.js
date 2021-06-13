// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: tasks;


/* ----------------------------------------------
Script      : uipickertable-sample.js
Author      : dev@supermamon.com
Version     : 1.0.0
Description :
    Example script on how to use UIPickerTable
---------------------------------------------- */

const UIPickerTable = importModule('uipickertable')

const data = [
  {col1: "val1-1", col2: "val1-2", col3: "val1-3"},
  {col1: "val2-1", col2: "val2-2", col3: "val2-3"},
  {col1: "val3-1", col2: "val3-2", col3: "val3-3"},
  {col1: "val4-1", col2: "val4-2", col3: "val4-3"},
]

const table = new UIPickerTable({selectedBackgroundColor: Color.blue()})

const header = new UITableRow()
header.isHeader = true
header.addText('Col1')
header.addText('Col2')
header.addText('Col3')
table.addRow(header)

data.forEach( (item,i) => {
  
  const row = new UITableRow()
  row.height = 40
  row.addText(item.col1)
  row.addText(item.col2)
  row.addText(item.col3)

  const selected = i==2 // make third item selected

  table.addRow(row, selected)
  
})

await table.present()

const alert = new Alert()
alert.message = `[${table.selections}]`
await alert.present()

