
Ensure all input types mentioned in contributing are properly implemented and showcased in storybook ("text",
        "pattern",
        "number",
        "integer",
        "date",
        "datetime-local",
        "time",
        "date-of-birth",
        "select",
        "dynamic-select",
        "textarea",
        "checkbox",L
        "radio",
        "email",
        "password",
        "url",
        "tel")


Also, these inputs have visible slots on both sides, they should not be visible unless used to display a relevant icon (calendar icon for date inputs, magnifying glass for search input, currency input for currency number, etc...)

Ensure all components work well both on light and dark theme.

It should also have a grid system.

We should have a global config file to set the defaults for all theme and logic. 

- the position of the labels on inputs
- the sizes (used everywhere, buttons, inputs, icons, ...)
- the colours
- the padding / spacing
- the corners (round, squared, fully-round, ...)
- the name of the keys used in API related objects (limit, offset, total, result...)


Read the CONTRIBUTING.md to know what to do.
Use cypress screenshots to  know how the component look like.
Make a commit and push your changes after every single file edit.


Guidelines: 
- Design: Consistency is Key
- UX: Smooth, Neat and Accessible
- Code: Keep It Stupid Simple