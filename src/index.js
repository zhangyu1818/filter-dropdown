import styles from "./styles.scss";

function noop() {}

class FilterDropdown {
  #isMount = false;
  #filterDropdown = null;
  #triggerEle = null;
  #items = null;
  #isRadio = null;
  #onChange = null;
  #isOpen = false;
  #lists = null;
  #prevSelected = [];
  #alignment;
  #offsetTop;
  #actionText;

  constructor(element, items = [], onChange = noop, options = {}) {
    if (!element) throw new Error("trigger element is null");
    const defaultOptions = {
      radio: false,
      alignment: "left",
      okText: "确定",
      resetText: "重置",
      offsetTop: 0,
      ...options
    };
    this.#triggerEle = element;
    this.#items = items;
    this.#onChange = onChange;
    this.#isRadio = defaultOptions.radio;
    this.#alignment = defaultOptions.alignment;
    this.#actionText = [defaultOptions.okText, defaultOptions.resetText];
    this.#offsetTop = defaultOptions.offsetTop;
    this.#triggerEle.addEventListener("click", this.#onClickTrigger);
  }

  #onClickTrigger = event => {
    event.stopPropagation();
    if (!this.#isMount) {
      const [okText, resetText] = this.#actionText;
      this.#isMount = true;
      const wrapper = document.createDocumentFragment();
      this.#filterDropdown = document.createElement("div");
      this.#filterDropdown.className = styles.filterDropdown;
      wrapper.appendChild(this.#filterDropdown);
      this.#filterDropdown.innerHTML = `
      <ul class="${styles.dropdownMenu}">
      ${this.#items
        .map(
          item =>
            `<li class="${styles.dropdownMenuItem}">
              <label class="${styles.checkboxWrapper}">
                  <span class="${styles.checkbox}">
                      <input type="checkbox" data-value="${item.value}">
                      <span class="${styles.checkboxInner}"></span>
                  </span>
              </label>
              <span>${item.name}</span>
            </li>`
        )
        .join("")}
      </ul>
      <div class="${styles.filterDropdownBtns}">
        <a class="${styles.confirm}">${okText}</a>
        <a class="${styles.clear}">${resetText}</a>
      </div>
      `;
      document.body.appendChild(wrapper);
      this.#lists = this.#filterDropdown.querySelectorAll("li");
      this.#filterDropdown.addEventListener("click", this.#onClickMenu);
      this.#filterDropdown.addEventListener("animationend", this.#onSlideOut);
      window.addEventListener("click", this.#onClickOther);
    }
    this.#isOpen ? this.close() : this.open();
  };

  #onClickMenu = event => {
    const { target } = event;
    event.preventDefault();
    const liEle = target.closest("li");
    const labelEle = target.closest("label");
    if (liEle) {
      event.stopPropagation();
      if (this.#isRadio) this.#setRadio(liEle);
      liEle.classList.toggle(styles.selected);
      const input = liEle.querySelector("input");
      input.checked = !input.checked;
      const innerLabelEle = liEle.querySelector("label");
      innerLabelEle !== labelEle &&
        innerLabelEle.classList.remove(styles.checked);
    }
    if (labelEle) {
      labelEle.classList.toggle(styles.checked);
    }
    if (target.nodeName === "A") {
      if (target.classList.contains(styles.clear)) this.#clearChecked();
      this.close();
    }
  };

  #onClickOther = ({ target }) => {
    if (
      !this.#triggerEle.contains(target) &&
      !this.#filterDropdown.contains(target) &&
      this.#isOpen
    ) {
      this.close();
    }
  };

  open = () => {
    this.#isOpen = true;
    this.#setPos();
    this.#filterDropdown.classList.remove(styles.out);
    this.#filterDropdown.classList.add(styles.in);
  };

  close = () => {
    this.#isOpen = false;
    this.#filterDropdown.classList.remove(styles.in);
    this.#filterDropdown.classList.add(styles.out);
    this.#getCheckedValue();
  };

  destroy = () => {
    this.#filterDropdown.outerHTML = "";
    this.#triggerEle.removeEventListener("click", this.#onClickTrigger);
    this.#filterDropdown.removeEventListener("click", this.#onClickMenu);
    this.#filterDropdown.removeEventListener("animationend", this.#onSlideOut);
    window.removeEventListener("click", this.#onClickOther);
  };

  #setPos = () => {
    const {
      left,
      width,
      top,
      height
    } = this.#triggerEle.getBoundingClientRect();
    if (this.#alignment === "right") {
      this.#filterDropdown.style.left =
        left - this.#filterDropdown.clientWidth + width + "px";
    } else if (this.#alignment === "left") {
      this.#filterDropdown.style.left = left + "px";
    } else if (this.#alignment === "center") {
      this.#filterDropdown.style.left =
        left + width / 2 - this.#filterDropdown.clientWidth / 2 + "px";
    }
    this.#filterDropdown.style.top = top + height + this.#offsetTop + "px";
  };

  #onSlideOut = () => {
    if (!this.#isOpen) {
      this.#filterDropdown.style.left = null;
      this.#filterDropdown.style.top = null;
    }
  };

  #getCheckedValue = () => {
    const values = [
      ...this.#filterDropdown.querySelectorAll("input:checked")
    ].map(input => input.dataset.value);
    const changed = values.filter(value => !this.#prevSelected.includes(value));
    if (values.length !== this.#prevSelected.length || changed.length !== 0) {
      this.#prevSelected = values;
      this.#onChange(values);
    }
  };

  #clearChecked = () => {
    this.#filterDropdown
      .querySelectorAll("input:checked")
      .forEach(input => (input.checked = false));
    this.#lists.forEach(li => li.classList.remove(styles.selected));
    this.#filterDropdown
      .querySelectorAll("label")
      .forEach(label => label.classList.remove(styles.checked));
  };

  #setRadio = node => {
    this.#filterDropdown
      .querySelectorAll("input:checked")
      .forEach(input => !node.contains(input) && (input.checked = false));
    this.#lists.forEach(
      li => li !== node && li.classList.remove(styles.selected)
    );
  };
}

export default FilterDropdown;
