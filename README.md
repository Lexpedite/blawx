# Blawx

A user-friendly web-based tool for Rules as Code written by Jason Morris of [Lexpedite Legal Technologies Ltd.](https://lexpedite.ca).

Blocks + law = Blawx

![Blawx Front End Screenshot](blawx_v1.6.16-alpha_interface.png)

## Demonstration Video

Click on the thumbnail below for a recent
video demonstration of how Blawx is used.

[![thumbnail](thumbnail.png)](https://youtu.be/x5l4Ynfr4VU)

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

It is implemented as a set of applications.

It provides:
* a web server that stores your Blawx encodings and gives access to them and the reasoner over a RESTful API, based on [Django](https://www.djangoproject.com/) 
* a visual development environment based on [Google's Blockly](https://github.com/google/blockly)
  to write, edit, and test your encodings
* a reasoner based on [SWI-Prolog](https://swi-prolog.org/) and [s(CASP)](https://github.com/JanWielemaker/sCASP) that will answer questions and explain the answers

### Why Should I Use Blawx?

* Open Source
* Easy to Learn
* Designed Specifically for Rules as Code
* Publish Code as an API
* Explainability
* Hypothetical reasoning
* User-friendly Scenario Explorer

Blawx is the only open source Rules as Code programming environment with
a user-friendly scenario explorer, explanations for answers, and hypothetical reasoning.

## How Can I Try It?
The easiest way to try Blawx is to go to [dev.blawx.com](https://dev.blawx.com). I try to keep a recent version running there for people to play with.

## How do I Install It Myself?
If you would like to try running Blawx locally, install docker for your platform, and then run
```
docker run lexpedite/blawx
```
Blawx will then be available at (http://localhost:8000)[http://localhost:8000].

Check out [INSTALL.md](INSTALL.md) for more details.

## How Can I Learn More?
Extensive documentation is available from inside the application
by clicking "Help" in the left navigation menu. You can also view the [documentation on the live demo site](https://dev.blawx.com/docs).

## Is this software production ready?
No. Blawx is functional, but it is not production-quality software. It is intended for educational and experimental purposes.

## Contributions
If you have issues or concerns with the package, please open an Issue in the [GitHub Repository](https://github.com/Lexpedite/blawx).
Contributions to the code and documentation are welcome. Please contribute responsibly.
