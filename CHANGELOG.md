# Changelog

Notable changes to Blawx will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
As of v0.2-alpha, this project is attempting to adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While alpha, however, any version changes may cause breaking changes that may not be specifically noted as such.

## [v0.2.3-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2.2-alpha) 2020-06-29
### Added
* adding `?load=url` to address for interface will pre-load a .blawx file
  at that url.

## [v0.2.2-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2.2-alpha) 2020-06-06
### Added
* Script for updating running container in development enviroments.
* Start of gh-pages based documentation
### Changed
* Implemented custom true/false value block ([Issue #8](https://github.com/Blawx/blawx/issues/8))
  **Note that this may be a breaking change for people using the docassemble-blawx integration.**
* Changes to what counts as conflicting results for the purpose of override blocks, only applies
  to workspaces using the new true/false blocks.
### Fixed
* Docker install missing sudo.
* Docker install missing python3. ([Issue #38](https://github.com/Blawx/blawx/issues/38))
* Overridden answers still returned. ([Issue #2](https://github.com/Blawx/blawx/issues/2))
* Aggregate functions not working. ([Issue #19](https://github.com/Blawx/blawx/Issues/19))

## [v0.2.1-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2.1-alpha) 2020-05-26
### Added
* Dockerized install process ([Issue #21](https://github.com/Blawx/blawx/issues/21))
* Calculation Block ([Issue #20](https://github.com/Blawx/blawx/issues/20))
* Changelog
### Changed
* Remove extra implication operators ([Issue #16](https://github.com/Blawx/blawx/issues/16))
* Math operators and aggregate functions now report "Number" as their output type.

## [v0.2-alpha](https://github.com/Blawx/blawx/releases/tag/v0.2-alpha) 2020-05-22
### Changed
* Installation process clarified, simplified. ([Issue #9](https://github.com/Blawx/blawx/issues/9))
### Fixed
* Reasoner was crashing on machines with slower processors. ([Issue #25](https://github.com/Blawx/blawx/issues/25))ff

