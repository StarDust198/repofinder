export const themeSwitcher = (selector) => {
  const switcher = document.querySelector(selector);

  switcher.onclick = () => {
    let currentTheme = document.body.dataset.theme;

    document.body.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
  };
};
