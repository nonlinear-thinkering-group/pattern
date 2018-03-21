pattern
=======

A relational subject-oriented computational engine.

## Architecture

The engine is composed of different layers, each layer wrapping around the previous one, adding layers of abstraction.

#### Storage
The core datastructure consists of `Nodes`. A `Node` can be an `Atom`, which is an atomic value such as a string, number or boolean, or It can be a `List`, which contains other `Nodes`.

More Formally:
```
Node := Atom | List
Atom := String | Number | Boolean
List := [Node, Node .... nth]
```
A list can contain the same node twice, and nodes can be inside multiple lists;

The storage is persistent and append only, meaning that it's possible to query historic values.


#### Frames, Contexts
Lists can form frames or contexts which are used for scoping

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
