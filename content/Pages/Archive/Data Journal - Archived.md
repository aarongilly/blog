---
tags:
  - page
date: 2024-10-16
---
> [!warning]
> This all *works*, but ultimately I decided not to use it in lieu of one big spreadsheet like I used to.

Data Journal is the ~~latest~~ iteration of my long-running quantified self project. This iteration of the whole Life Tracker/Personal Data Warehouse. It's not *technically* a total re-write of my previous project, but it's pretty darn close.

> [!tldr]
> - Data Journal is a system for capturing, maintaining, & using event-based data
> - Data Journal is a set of data shapes (i.e. regular objects) & tools for operating on them
> - A `DataJournal` is comprised of arrays of `Entry`s and `Def`s, where:
> 	- A `Def` is a definition of a known key/value pair that may exist on `Entry`s
> 	- An `Entry` is an event that happened in a give time period, containing zero-to-many keys/value pairs described by `Def`s
> - `DataJournal`s can be:
> 	- *merged* together without duplication
> 	- *modified* (via `transaction`s)
> 	- *queried* (via `query`s)
> - The [[PDW]] is a system for managing multiple `DataJournal`s, stored across disparate databases and/or files 

## A few more details:
- The Data Journal code is not class-oriented.
	- All data shapes can be serialized to and parsed from JSON without data loss
	- No "instances of class" are required, everything is based on regular objects
	- Classes are used as namespaces for related functions
- A `DataJournal` is comprised of an array of `Entry`s and an array of `Def`s
	- Metadata properties of elements (i.e. `Entry`s and `Def`s) start with an underscore
- A `Def` defines known key/value pairs that may exist on `Entry`s
	- A `Def` must contain `_id`, `_updated`, and `_type` keys
	- `Def`s *may* have other keys as well
	- `Def._id` values cannot start with an underscore
- An `Entry` is a record of something that happened at some point in time
	- An `Entry` must contain `_id`, `_updated`, and `_period` keys
	- An `Entry` may have other keys as well
	- An `Entry` typically contains one or many entry "points", which have an associated `Def`
		- An entry point is a key/value pair on an `Entry` whose key is a `Def._id`
- Merging two or more `DataJournal`s will only keep one copy of each element based on its `_id`, in the case where multiple copies exist, it will only keep the one with the largest `_updated` value (i.e. the **newest** one is kept)
- Data Journals may be written to (via `transaction`) or read from (via `query`) using regular objects
	- A `Transaction` may update elements via `create`, `replace`, `modify`, or `delete`
		- `create` 
			- will always create & not look for existing data with the same `.`
		- `replace` 
			- if the `_id` is not in the `DataJournal`, will create it
			- if the existing `_id` in the journal is **older**, will fully replace it
			- if the existing `_id` in the journal is **newer**, will not affect it at all
		- `modify` 
			- if the `_id` is not in the `DataJournal`, will create it
			- if the existing `_id` is **older**, it will retain any keys not explicitly overwritten by the modification
			- if the existing `_id` is **newer**, will not affect it at all
		- `delete`
			- will always mark the matching element `_id` as `_deleted = true`
	- A `Query` is an object full of `Entry`-filtering parameters
- Other utility classes operating on `DataJournal`s **do exist**, but are decoupled from each other and the Data Journal code does not depend on them.
	- Examples: `Summarizer`, `Validator`, `Overviewer`, `Aliaser`, and a host of `Translator`s and `Connector`s which allow for reading/writing from static files and databases, respectively
## Main Concepts via Picture
 
### Data Shapes 
![[PDW_Conceptual_Data.png]]
### Main Processes
![[PDW_Main_Processes.png]]
### Connectors, Translators, & Utilities
![[PDW_Connectors_Translators_Utilities.png]]