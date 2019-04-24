import FilterDropdown from "./index";

new FilterDropdown(
  document.getElementById("dropdown"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log(checked),
  true
);
