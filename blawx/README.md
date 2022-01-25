# Blawx 2.0

## Overview

## Installation

## Configuration

## Use

## Development Notes

* Base Capabilities
  * Interface
    * Finish code generation for available blocks.
      * Deal with commas at the end of lists in conditions, conclusions.
    * Make the responses pretty.
  * Reasoner
    * Add the blawx reasoner as a Django app
    * Make a no-query-specified version of the endpoint
  * Application
    * Make it possible to create workspaces
    * Make it possible to delete workspaces
    * Make it possible to edit workspaces
  * Integration
    * Get the Run Blawx Code command to send requests
      to the code editor's s(CASP) reasoner.
    * Display responses from the s(CASP) reasoner in the
      workspace.
    * On Save (or Run?), add workspace code to Django Database, and
      save a generated .pl associated with the workspace.
* Future Capabilities
  * Interface
    * Category Declaration Customization
    * Legal Documents
    * Input Blocks
    * Include
    * Switch to attributed version of blocks (for rule references)
    * Dates
    * Overrides
    * Disjunction
  * Random
    * Create an app that will collect
      input in an auto-generated interface and run a predefined query
    * Add the ability to save queries to a workspace
    * Add the ability to make a workspace or query public or not
    * GitHub integration
    * Bring the helpfiles back in.
    * Update the help files for the new
    blocks and reasoner.
    * Upgrade to the new JSON serialization method for Blockly
    * Fix the CSS and templates to be minimal
    * Import legal documents from external sources
    * WYSIWYG legal document editing
    * Ontology features
    * Switch between attributed/unattributed blocks using context menu
    * Update existing blocks when their
    source definition is updated.
    * Code validation inside the coding environment, missing things, etc.
    * Limit the number of queries to 1
    * Limit the number of inputs to 1.
    * Search capabilities inside the editor?
    * Consider other blockly plugins, like the highlighter.
    * Re-implement code-generation as its own blockly language, instead of piggy-backing off of JavaScript.
