# Corpo Writer 2.0

A second pass at building a tool to write the events for my text-adventure game engine. Coupling will be kind of tight with my specific game at first, but potentially over time I will make the core engine something more general purpose and reusable. I've read that focusing too hard on 'the engine' is a good way to get lost in the woods though, so my focus is not on that at the moment!

## It's a SPA that uses localStorage

There is no server-side things going on at the moment, as I just wanted a tool to write this structured data for my own use. Data is saved and read from local storage, based on a key (hard coded for now). There is an export to file option, and that file is then moved over to the game codebase. Perhaps at some point there will be a benefit to building out a back-end, or setting up the writer so that it is integrated into the same repo as the game and feeds the event data directly.

## Low validation

This includes (for now) not much in the way of validation (and obviously zero server-side validation). I'll probably switch over to building out forms with supervalidator/zod soon - validation guardrails would be nice so there doesn't need to be a bunch of validation of the data upon ingestion and then back and forth correcting broken stuff. But no need for server-side validation / form actions.