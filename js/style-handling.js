const styleTheme = {
  styleTag: document.querySelector(".theme-stylesheet"),

  changeSheet: selectedTheme => {
    const $STYLE_TAG = styleTheme.styleTag;
    selectedTheme.className.includes("theme-day")
      ? ($STYLE_TAG.href = "./styles/styles-theme1.css")
      : ($STYLE_TAG.href = "./styles/styles-theme2.css");
  }
};
