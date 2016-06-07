# Contributing

1.  Fork the project and clone your fork.

2.  Create a local feature branch:

        $ git checkout -b <branch>

3.  Add your Unit with name and base value to `var UNITS` inside an object with
    the same name as your type of unit of measurement.

4.  The `converter` object stores all methods used to convert an unit into another,
    `basicConverterCreator(unitSymbol)` is a simples cross-multiplication, feel
    free to add a new function if you need something more sophisticated.

5.  Finally you need to put the name of the unit inside the object `helper`,
    using another curried function called `helperCreator(unitSymbol, conversionType)`,
    with parameters used in `converter` and `UNITS`

6.  Run `npm run build`

7.  Push to your fork:

        $ git push origin <branch>

8.  Open a pull request.
