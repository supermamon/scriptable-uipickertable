// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: table;

/* ----------------------------------------------
Script      : uipickertable.js
Author      : dev@supermamon.com
Version     : 1.0.0
Description :
  UIPickerTable is a class that extends UITable
  making each row a selectable item.
Docs        : github.com/supermamon/scriptable-uipickertable
---------------------------------------------- */

// private variables
const _private = {
    rows: []
}

class UIPickerTable extends UITable {

    constructor({multiselect=true, selectedBackgroundColor=(new Color('#a8a8a8'))}={}) {
      super()
      this.multiselect = multiselect
      this.selectedBackgroundColor = selectedBackgroundColor
      this.selections = []
    }
    
    addRow(uitablerow, isSelected=false) {
  
        var table = this

        // if header, just add the row.
        if (uitablerow.isHeader) {
            _private.rows.push(uitablerow)
            super.addRow(uitablerow)
            return table    
        }

        // save attributes
        uitablerow['selected'] = isSelected && table.multiselect
        // save the original properties
        uitablerow['originalBackgroundColor'] = uitablerow.backgroundColor
        uitablerow['originalOnSelect'] = uitablerow.onSelect
        
        _private.rows.push(uitablerow)
    
        // highlight if selected
        if (uitablerow['selected']) {
            uitablerow.backgroundColor = table.selectedBackgroundColor
            table.selections.push(_private.rows.length-1)
        }
        
        // toggle selection and background color it tapped
        uitablerow.onSelect = (i) => {
            if (table.multiselect) {
                // toggle
                _private.rows[i]['selected'] = !_private.rows[i]['selected']
                
                // set background color and update selections property
                if (_private.rows[i]['selected']) {
                    table.selections.push(i)
                    uitablerow.backgroundColor = table.selectedBackgroundColor 
                } else {
                    var idx = table.selections.indexOf(i)
                    table.selections.splice(idx, 1);
                    uitablerow.backgroundColor = uitablerow.originalBackgroundColor
                }
                table.reload()
            } else { // single select
                table.selections = [i]
                uitablerow.backgroundColor = table.selectedBackgroundColor 
                table.reload()
            }

            if (uitablerow.originalOnSelect) {
                uitablerow.originalOnSelect(i)
            }
            
        }
    
        // prevent dismissing table view
        uitablerow.dismissOnSelect = !this.multiselect

        // insert the row
        super.addRow(uitablerow)   

        // return table for chaining
        return table
      
    }
  }
  
  module.exports = UIPickerTable
  