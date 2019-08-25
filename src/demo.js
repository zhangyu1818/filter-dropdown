import FilterDropdown from "./index";

new FilterDropdown(
  document.getElementById("example-1"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log("example-1", checked)
);
new FilterDropdown(
  document.getElementById("example-2"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log("example-2", checked),
  {
    okText: "Ok",
    resetText: "Reset"
  }
);
new FilterDropdown(
  document.getElementById("example-3"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log("example-3", checked),
  {
    okText: "ok",
    resetText: "reset"
  }
);
new FilterDropdown(
  document.getElementById("example-4"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log("example-4", checked),
  {
    okText: "ok",
    resetText: "reset",
    alignment: "center"
  }
);
new FilterDropdown(
  document.getElementById("example-5"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log("example-5", checked),
  {
    okText: "ok",
    resetText: "reset",
    alignment: "right"
  }
);
new FilterDropdown(
  document.getElementById("example-6"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log("example-6", checked),
  {
    okText: "ok",
    resetText: "reset"
  }
);
new FilterDropdown(
  document.getElementById("example-7"),
  [
    { name: "id", value: 0 },
    { name: "name", value: 1 },
    { name: "age", value: 2 }
  ],
  checked => console.log("example-7", checked),
  {
    okText: "ok",
    resetText: "reset",
    alignment: "left",
    radio: true
  }
);
