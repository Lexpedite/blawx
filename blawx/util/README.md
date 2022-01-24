# Util Files

Blawx's user interface elements are implemented using Blockly Developer Tools, and
online eat-your-own-dogfood graphical approach to generating block definitions.

In order to facilitate that interface, the following process is used:

1. Go to Blockly Developer Tools, and upload the blawx_block_library.xml file.
2. Make the desired changes, as far as is possible, inside Blockly Developer Tools.
3. Export the revised block library, and update the blawx_block_library.xml file
   in this repository.
4. Use the block exporter to export the JSON block definitions 
   for the entire library into the
   `blawx_block_definitions.json` file, and update that file in this repository.
5. Copy the contents of the `blawx_block_definitions.json` file into the
   `blawx_block.js` file in the blawx/static/blawx folder, to make them the value
   of the `scasp_blockset` variable. *(There has GOT to be a better way to do this.)*
6. If there are changes that need to be made to the block definitions that it is
   not possible to make in the Blockly Devloper Tools, make those changes
   programmatically inside `blawx_blocks.js` after the `scasp_blockset` variable
   has been defined. This avoids the need to re-implement changes when the underlying
   blocks change in irrelevant ways.

The `blawx_block_definitions.json` file is therefore not critical, because it is
duplicated elsewhere in the code, and if it is deleted it can be regenerated as
long as Blockly Developer Tools exists. But the `blawx_block_library.xml` file is
what we need to be able to use the Developer Tools.

Note that the developer tools are buggy. You will frequently need to refresh in order
to get the workspace generator to display the blocks correctly. Also, the workspace
generator is not used to generate Blawx's workspace, or toolbox, because the workspace
is always blank to start, and the toolbox includes nested and customzied drawers, neither
of which can be built inside BDT.

