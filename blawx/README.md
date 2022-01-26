# Blawx

A user-friendly web-based tool for Rules as Code written by Jason Morris of [Lexpedite Legal Technologies Ltd.](https://lexpedite.ca).

Blocks + law = Blawx

![Blawx Front End Screenshot](blawx_screenshot_v1.png)

## Overview

### What is "Rules as Code"?
Rules as Code is the idea that if you write rules in a programming language at the same time you write them in a natural language,
you end up with better rules, and you make it easier for people to automate implementations of those rules.

I believe:
1. The best tools for doing knowledge representation of laws are declarative logic programming languages.
2. Rules as Code requires tools that make it easy for non-programmers to do legal knowledge representation.
3. Tools for Rules as Code must be accessible, and transparent, which means they need to be open source.

## What is Blawx?
Blawx is an open source, user-friendly, web-based declarative logic knowledge representation tool
designed specifically for encoding, testing and using rules.

It is implemented as a set of [Django](https://www.djangoproject.com/) applications.

It provides:
* a web server that stores your Blawx encodings
* a visual development environment based on [Google's Blockly](https://github.com/google/blockly)
  to write, edit, and test your encodings
* a reasoner that will answer queries against your encodings over a web API

The reasoner is based on SWI-Prolog, using the s(CASP) library.

### Why Should I Use Blawx?

In addition to being free, and open source, Blawx is build on cutting-edge research in symbolic artificial
intelligence, and has several features that are found in no other open source tools, as well as features
that are found in no other open source tools at all.

## How Can I Try It?
The easiest way to try Blawx is to go to [www.blawx.com](https://www.blawx.com). The latest public release of Blawx is always available
to try, there.

## How do I Install It Myself?
If you would like to try running Blawx locally, check out [INSTALL.md](INSTALL.md) for instructions.

## How Can I Learn More?
Extensive documentation, including the Blawx Beginner's Guide and several examples, is available from inside the application
by clicking "Help" in the coding interface. You can also view the [documentation on the live demo site](https://dev.blawx.com/docs).

## Is this software production ready?
No. Blawx is functional, but it is not production-quality software. It is a proof of concept that is intended to motivate
investment in similar technologies in the future by demonstrating what they are capable of.

## Contributions
If you have questions on how to use Blawx, please consider joining the [Blawx Slack server](https://blawx.slack.com).
If you have issues or concerns with the package, please open an Issue here in the [GitHub Repository](https://github.com/Blawx/blawx).
Contributions to the code and documentation are welcome. Please contribute responsibly.

## Development Notes
* Base Capabilities
  * Interface
    * Finish code generation for available blocks.
  * Reasoner
    * Add the blawx reasoner as a Django app
    * Make a no-query-specified version of the endpoint
  * Integration
    * On Save (or Run?), add workspace code to Django Database, and
      save a generated .pl associated with the workspace.
    * Get the Run Blawx Code command to send requests
      to the code editor's s(CASP) reasoner.
    * Display responses from the s(CASP) reasoner in the
      workspace.
    
* Future Capabilities
  * Interface
    * Make the responses pretty.
    * Category Declaration Customization
    * Legal Documents
    * Input Blocks
    * Include
    * Switch to attributed version of blocks (for rule references)
    * Dates
    * Overrides
    * Disjunction
  * Random
    * Bring the help files back in to the main site.
    * Create an app that will collect
      input in an auto-generated interface and run a predefined query
    * Add the ability to save queries to a workspace
    * Add the ability to make a workspace or query public or not
    * GitHub integration
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

## Notes for Installation Process

Python requirements are in the requirements.txt
To run the reasoner,
```
apt-add-repository --yes ppa:swi-prolog/stable
apt-get update
apt-get install swi-prolog
git clone https://github.com/JanWielemaker/sCASP.git
cd sCASP && swipl -g "pack_install('.',[interactive(false)])" -t halt
```