
We should have a global config file to set the defaults for all theme and logic. 

- the position of the labels on inputs
- the sizes (used everywhere, buttons, inputs, icons, ...)
- the colours
- the padding / spacing
- the corners (round, squared, fully-round, ...)
- the name of the keys used in API related objects (limit, offset, total, result...)


port all components to use TailwindCSS. it should replace ALL the existing CSS, and ALL colors used within tailwind should be predefined in the tailwind config, that will pull it from the global config.

Give extra attention to the inputs. different input types should actually render different looks and behaviour: a proper date picker and a country selector based on Intl, multiple select, consistent validation system, etc...


Read the CONTRIBUTING.md to know what to do.
Use cypress screenshots to  know how the component look like.
Make a commit and push your changes after every single file edit.


Guidelines: 
- Design: Consistency is Key
- UX: Smooth, Neat and Accessible
- Code: Keep It Stupid Simple
- Naming: Semantic, Simple, Smart