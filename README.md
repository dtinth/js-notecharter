
js-notecharter
==============

A web-based notecharter. In an early stage.


Design
------

* Be flexible to work with any kind of rhythm games. This editor comes with its
    own concepts.
* Works primary with its own JSON file format.
    * Must be converted to target game's file format, such as BMS.
* A notechart is just a collection of "events" and some metadata such as time
    signature.
* An event has a "row" and a "channel". 48 rows = 1 quarter note. An event can
    also have other attributes, depending on the game.
    * Each event also has an "id" which is a UUID generated when the event is
        created.
* All kinds of notes are represented by events. For example, a long note
    can be represented using 2 events, the start and the finish event.


