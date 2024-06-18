# Corpo Writer 2.0

![Screenshot](/screen.png?raw=true "Screenshot")

A second pass at building a tool to write the events for my text-adventure game engine. Coupling will be kind of tight with my specific game at first, but potentially over time I will make the core engine something more general purpose and reusable. I've read that focusing too hard on 'the engine' is a good way to get lost in the woods though, so my focus is not on that at the moment!

## It's a SPA that uses localStorage - server not doing much

There is no server-side things going on at the moment, as I just wanted a tool to write this structured data for my own use. Data is saved and read from local storage, based on a key (hard coded for now). There is an export to file option, and that file is then moved over to the game codebase. Perhaps at some point there will be a benefit to building out a back-end, or setting up the writer so that it is integrated into the same repo as the game and feeds the event data directly.

## Except validation

I built out validation with a full implementation of zod/superforms because of the nice things that enables with svelte and live clientside validation/feedback. 