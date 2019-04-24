# filter-dropdown

a filter dropdown look like ant-design table filter

[demo](http://sbzy.me/filter-dropdown/)

## useage
`npm i -S filter-dropdown`

or

use script tag [`filter-dropdown.js`](https://github.com/zhangyu1818/filter-dropdown/releases/download/1.0.0/filter-dropdown.js)

``` javascript
const filterDropdown = new FilterDropdown(
  // trigger element
  document.getElementById("dropdown"),
  // data
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  // onChange
  checked => console.log(checked),
  // isRadio
  true
);
// destroy
filterDropdown.destroy();
// open and close (must be mounted so you should click the trigger element first)
filterDropdown.open();
filterDropdown.close();
```

