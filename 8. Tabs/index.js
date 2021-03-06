let tabsData = [];

const $spinner = document.querySelector('.spinner');
const $tabs = document.querySelector('.tabs');

// eslint-disable-next-line arrow-body-style
const fetchTabsData = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });
};

const render = () => {
  const tabTitle = tabsData
    .map(
      (tabData, index) =>
        `<div class="tab" data-index="${index}">${tabData.title}</div>`
    )
    .join('');

  const tabContent = tabsData
    .map(
      (tabData, index) =>
        `<div class="tab-content ${index ? '' : 'active'}">
        ${tabData.content}
      </div>`
    )
    .join('');

  $tabs.innerHTML = `
    <nav>
      ${tabTitle}
      <span class="glider"></span>
    </nav>
    ${tabContent}`;

  $tabs.style.setProperty('--tabs-length', tabsData.length);
};

window.addEventListener('DOMContentLoaded', () => {
  fetchTabsData().then(newData => {
    tabsData = newData;
    $spinner.style.display = 'none';

    render();
  });
});

$tabs.onclick = ({ target }) => {
  if (!target.classList.contains('tab')) return;

  [...document.querySelectorAll('.tab-content')].forEach(($el, index) => {
    $el.classList.toggle('active', index === +target.dataset.index);
  });

  document.querySelector(
    '.glider'
  ).style.left = `calc(var(--tab-width) * ${target.dataset.index}px)`;
};
