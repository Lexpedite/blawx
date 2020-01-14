# Blawx
A user-friendly web-based tool for Rules as Code written by Jason Morris of Round Table Law and Lemma Legal Consulting.

Blocks + law = Blawx

![Blawx Front End Screenshot](blawx_screenshot.PNG)

## What is "Rules as Code"
Rules as Code is the idea that if you write rules in a programming langauge at the same time you write them in a natural language,
you end up with better rules, and you make it easier for people to automate implementations of those rules. The best programming
languages for encoding rules are declarative logic programming languages, but most of them are too hard to learn and use.

## What is Blawx?
Blawx is a friendly web-based tool for encoding and testing and using rules using declarative logic.

It has a front-end part and a back-end part. The front-end part is a web app based on Google's Blockly framework for visual
programming environments.

The back-end is an Apache server which hosts the front end, but also provides an API over which the front end and other applications
can send requests and get answers.

The server takes the request from the front end, converts it to ErgoLite code, and then sends that code to an ErgoLite reasoner
running on the webserver and returns
the results to the Blawx front end, or whichever other app made the request.

## How Can I Try It?
The easiest way to try Blawx is to go to www.blawx.com. The current version of Blawx is available for free at that site, and has all
the features of this package.

## How Can I Learn More?
Right now, most of the useful information is at www.blawx.com/learn. I hope to increase the amount of documentation in this repository
in future.  If you would like to try running Blawx locally, check out the INSTALL.md file for the latest instructions.

## Is this software production ready?
No. Blawx is a proof of concept. It is appropriate for use in Rules as Code experiments, but not in production environments.
At least not yet.

## Contributions
Help is welcome. We need developers, testers, and people who can create documentation and learning materials.
