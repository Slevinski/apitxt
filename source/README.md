# SignPuddle 3 Source

The SignPuddle 3 source is written in ApiTxt Format, a custom text markup used to define a RESTful API. Each line in an ApiTxt document is a self-contained element which starts with a name and is followed by <TAB> separated fields.


> AUTHOR: https://SteveSlevinski.me  
> SUPPORT: https://www.patreon.com/signwriting

## Group Background

While learning to code a [RESTful API](https://restfulapi.net/) using the [Slim Framework v2](https://docs.slimframework.com/), I discovered [API Blueprint](https://apiblueprint.org/).

Trying to understand how a RESTful API is structured, I created the [ApiTxt Format](../client/doc/apitxt), a custom markup using plain text lines with tab separated fields.

## Group Automation
Automated [tools](../tools) are used to parse, analyze, validate, and transform the source into a variety of formats.

+ ApiTxt Format  
    + JSON Objects  
        + ApiTxt Format  
        + Server  
        + API Pages
        + JavaScript  
        + API Blueprint  
            + HTML
            + Lint
            + Mock  

The first transformation reads the ApiTxt Format document and writes an array of JSON Objects.  

```` shell
ApiTxt Format
OK
````

The second transformation reverses the process by reading the array of JSON Objects and writing an ApiTxt Format document with standard order and indenting.  The original ApiTxt Format document is compared to the new ApiTxt Format document.

```` shell
Nicely formatted!
````

With the ApiTxt Format validated, the array of JSON Objects is used for additional transformations.

API Blueprint has excellent [tooling](https://apiblueprint.org/tools.html).  This project makes use of an API Blueprint tool called [Snowboard](https://github.com/bukalapak/snowboard) to generate HTML documentation, to check for errors with Lint, and to mimic a real API server with Mock.
