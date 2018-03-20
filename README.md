pattern
=======

A relational subject-oriented computational engine.

## Architecture

The engine is composed of different layers, each layer wrapping around the previous one, adding layers of abstraction.

#### Datastructure
The core datastructure is a linked-list, where elements can be linked into multiple lists. You could think of it as lisp in higher dimensions. The datastructure is also append only, variables are streams in time.

#### Composable type system
On top of the structure we implement a metaobject protocol which implements types. Types are implemented as composable behaviours for entities.
For example a `Set` would be defined using the behaviours `unorderd`, `unique` and `boolean`

#### Subject-object patterns
An `Observer` makes `Distinctions`

Groups of `Distinctions` give rise to `Relations`

Groups of `Relations` give rise to `Patterns`


`Patterns` can be thought of as expectations. And different observers can have different expectations.

#### Query language
Queries are expressed as an AST in the core datastructure. Queries work using filtering, mapping and reducing techniques over the different types. Queries can be stored in the datastructure itself, allowing them to be referenced and composed as `libraries`. Views are expressed as Queries.
