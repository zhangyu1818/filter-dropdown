import FilterDropdown from "./index";

window.filterDropdown = new FilterDropdown(
  document.getElementById("dropdown"),
  [
    { name: "long long long long long name", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log(checked)
);
