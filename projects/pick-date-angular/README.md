# pick-date-angular

A date picker for your Angular applications, based on regular expression checks.

It represents a whole new approach to play with dates based on the regex provided. It provides with pure JavaScript Date objects in return, and internally no other library is used.

## Features

- Works on pattern matching, which means it will format and validate a date based on the regular expression provided.
- Accordingly formats the date and returns a JavaScript date object.
- If the regex does not match, it will always return false. 
- Live typing - Your date will be validated while you type in the input box, if it matches the regular expression. This means that the Calendar will be updated automatically if it is valid. 
- Theme - You can change the color of the Calendar. 
- The Calendar could be used as a stand alone component, without the input box. 

## Get Started

To install the package, simply run:
```npm install pick-date-angular```

## Input and Output directives

These are the Input and Output directives which can be passed in:

- `date` - A JavaScript Date object. 
- `handleOnChange` - An onChange handler, to receive back the Date object.
- `minDay` - The minimum date parameter, should be a JavaScript Date object.
- `maxDay` - The maximum date parameter, should be a JavaScript Date object.
- `isInputDisabled` - Value to disable the input value, and only get values from the Calendar.
- `format` - A regular expression for date, if not specified, would default to `mm/dd/yyyy`. Can be one of these four `mm/dd/yyyy, dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd`
- `config` - An object which takes in 3 parameters, format, regular expression, and separator.
-  `theme` - A background color, and a hover color can be provided in object, to change the theme color of the picker.

## Examples

### Basic parameters with Minimum Day and Maximum Day

```html
  <pick-date-angular 
    [date]="date" 
    (handleOnChange)="handleOnChange($event)" 
    isInputDisabled="true" 
    [minDay]=minDay
    [maxDay]=maxDay
    [theme]=theme 
  >
  </pick-date-angular>
```

```ts
  date = new Date();
  minDay = new Date();
  maxDay = new Date();
  theme = {
    backgroundColor: 'red',
    hoverColor: 'pink',
  };
```

### config object

```html
  <pick-date-angular [date]="date" (handleOnChange)="handleOnChange($event)" [config]="config"></pick-date-angular>
```

### Define in this .ts file
```ts
    config={{
        format: "dd/mm/yyyy",
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        separator: "/"
    }}
```

### Calendar component
In addition, the Calendar component can directly be used too.
```html
  <pick-calendar-angular [date]="date" (handleOnChange)="handleOnChange($event)"></pick-calendar-angular>
```

## Build

Run `ng build pick-date-angular --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test pick-date-angular` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng test pick-date-angular --codeCoverage=true` to execute the unit tests with code coverage.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.