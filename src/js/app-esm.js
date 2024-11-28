import Stream from '@halo-lab/stream';
import {navigateTo, onRender, onLeave} from 'postdoc/page';

// File State
const appSidebarState = Object.freeze({
  guide: new Set(),
  api: new Set(),
  about: new Set()
});

let stopWatchingFilterSidebar;

let anchorListItems = []; // Cache links from the filter dropdown.



// Url Utils
const getShortUrl = (url = location) => url.pathname + url.search + url.hash;
const clearUrl = (url) => url.split(/[?#]/)[0];
const stripHtmlExtension = (url) => url.includes('.html') ? clearUrl(url) : url;

const updateActiveDropdownIds = (activeDropdownIdsSet, button) => {
  const dropdownId = button.getAttribute('data-bs-target').replace(/(#|-collapse)/g, '');

  if (button.getAttribute('aria-expanded') === 'true') {
    activeDropdownIdsSet.add(dropdownId);
  } else {
    activeDropdownIdsSet.delete(dropdownId);
  }
};

const sidebarTabsClickEvent = (activeDropdownIdsSet) => {
  const dropdownButtons = document.querySelectorAll('button.btn.btn-toggle[aria-expanded]');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {
      updateActiveDropdownIds(activeDropdownIdsSet, button);
    });
  });
};

const findIdsByLink = (link) =>
  [...document.querySelectorAll('.nav.bs-sidenav div[id]')]
    .filter(div => div.querySelector(`a[href="${link}"]`) || div.getAttribute('data-section-url') === link)
    .map(div => div && !div.closest('li [data-redirect="true"]') ? div.id.replace('-collapse', '') : null)
    .filter(Boolean)
    .reverse();

const findSelectedTabs = (currentUrl, activeDropdownIdsSet) => {
  const selectedElementIds = findIdsByLink(stripHtmlExtension(currentUrl));

  [...selectedElementIds, ...activeDropdownIdsSet].forEach((id) => {
    const selectedBlock = document.querySelector(
      `button[data-bs-target="#${id}-collapse"]`
    );


    if (selectedBlock) {
      selectedBlock.classList.remove('collapsed');
      selectedBlock.setAttribute('aria-expanded', 'true');

      const selectedBlockList = selectedBlock.parentElement.querySelector(`div[id="${id}-collapse"]`);
      if (selectedBlockList) {selectedBlockList.classList.add('show')}

      const selectedElement = selectedBlockList.querySelector(
        `li:not([data-redirect="true"]) > a[href="${stripHtmlExtension(currentUrl)}"]`
      );
      if (selectedElement) {
        selectedElement.classList.add('active');
        selectedBlock.classList.add('active');
      }
    }
  });

  selectedElementIds.forEach((id) => activeDropdownIdsSet.add(id));
};

const removeFilterListChildren = (filterList) => {
  Array.from(filterList.children).forEach((child) => filterList.removeChild(child));
};

const clearFilterList = (sidebarFilter, filterList) => {
  sidebarFilter.value = '';
  removeFilterListChildren(filterList);
  filterList.classList.remove('d-block');
};

const createSidebarFilterHandler = (sidebarFilter, filterList) => (event) => {
  const {target: {value}} = event;

  if (!value) {
    anchorListItems = [];

    return clearFilterList(sidebarFilter, filterList);
  }

  const $guideLinks = $('#guide-container .bs-sidenav li>a');

  const titles = $guideLinks.toArray().map(el => ({title: el.innerHTML, el}));
  const results = fuzzysort.go(value, titles, {key: 'title', limit: 5});

  const filteredLinks = results.map(({obj: {el}}) => el).map((anchor) => {
    anchor.setAttribute('tabindex', '-1');

    return anchor.cloneNode(true);
  });

  const clonedLinks = filteredLinks.map(
    (link) => {
      const li = document.createElement('li');

      li.classList.add('list-group-item');

      li.append(link);

      return li;
    }
  );

  anchorListItems = clonedLinks;

  removeFilterListChildren(filterList);
  filterList.append(...clonedLinks);
  filterList.classList.add('d-block');
  //set filterList width
  $(filterList).width($(sidebarFilter).width());
};

const createAPISidebarFilterHandler = (sidebarFilter, filterList) => (event) => {
  const {target: {value}} = event;

  if (!value) {
    anchorListItems = [];

    return clearFilterList(sidebarFilter, filterList);
  }

  const $guideLinks = $('li[data-api-name]');

  const titles = $guideLinks.toArray().map(el => ({title: el.getAttribute('data-api-name'), el: el.firstChild}));
  const results = fuzzysort.go(value, titles, {key: 'title', limit: 5});

  const filteredLinks = results.map(({obj: {title, el}}) => {
    el.setAttribute('tabindex', '-1');
    const elCopy = el.cloneNode(true);
    elCopy.innerHTML = title;

    return elCopy;
  });

  const clonedLinks = filteredLinks.map(
    (link) => {
      const li = document.createElement('li');

      li.classList.add('list-group-item');

      li.append(link);

      return li;
    }
  );

  anchorListItems = clonedLinks;

  removeFilterListChildren(filterList);
  filterList.append(...clonedLinks);
  filterList.classList.add('d-block');
  //set filterList width
  $(filterList).width($(sidebarFilter).width());
};

const focusFilterListItem = (index) => {
  anchorListItems[index]?.classList.add('keyactive');
  anchorListItems[index]?.firstElementChild.setAttribute('tabindex', '0');
};

const releaseFocusFromFilterListItem = (index) => {
  anchorListItems[index]?.classList.remove('keyactive');
  anchorListItems[index]?.firstElementChild.setAttribute('tabindex', '-1');
};

const enableKeyboardNavigationInFilterResults = (sidebarFilter, filterList) => {
  let stopKeyboardControl;
  let stopGlobalClicksChecking;

  const searchResults = Stream.from((push) => {
    addEventListener('keyup', push);

    return () => removeEventListener('keyup', push);
  });

  const globalClicks = Stream.from((push) => {
    addEventListener('click', push);

    return () => removeEventListener('click', push);
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const attributeValue = filterList.getAttribute(mutation.attributeName);

      if (attributeValue?.includes('d-block')) {
        // Nothing is selected by default.
        let currentSelectionIndex = -1;

        stopKeyboardControl = pipe(
          searchResults,
          Stream.filter((event) => event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter'),
          Stream.map((event) => event.key),
          Stream.forEach((key) => {
            switch (key) {
              case 'ArrowUp': {
                if (currentSelectionIndex > 0) {
                  releaseFocusFromFilterListItem(currentSelectionIndex);
                  currentSelectionIndex--;
                  focusFilterListItem(currentSelectionIndex);
                }

                break;
              }
              case 'ArrowDown': {
                if (currentSelectionIndex < anchorListItems.length - 1) {
                  releaseFocusFromFilterListItem(currentSelectionIndex);
                  currentSelectionIndex++;
                  focusFilterListItem(currentSelectionIndex);
                }

                break;
              }
              case 'Escape':
                clearFilterList(sidebarFilter, filterList);
                break;
              default: {
                if (currentSelectionIndex >= 0) {
                  anchorListItems[currentSelectionIndex]?.firstElementChild.click();
                }
              }
            }
          })
        );

        stopGlobalClicksChecking = pipe(
          globalClicks,
          Stream.filter((event) =>
            !event.target.closest(`[${mutation.attributeName}="${attributeValue}"]`)
          ),
          Stream.forEach(() => clearFilterList(sidebarFilter, filterList))
        );
      } else {
        stopGlobalClicksChecking?.();
      }
    });
  });

  observer.observe(filterList, {
    attributes: true,
    attributeFilter: ['class']
  });

  return () => {
    stopKeyboardControl?.();
    stopGlobalClicksChecking?.();
    observer.disconnect();
  };
};



// Pipe Utils
const pipe = (value, ...fns) => fns.reduce((accumulator, fn) => fn(accumulator), value);



// Code Utils
const renderCodeTabs = () => {
  const snippets = Array.from($('.sample-test'));

  snippets.forEach((snippet, i) => {
    const javascriptEl = snippet.querySelector('[data-language="javascript"]');
    const typescriptEl = snippet.querySelector('[data-language="typescript"]');

    if (typescriptEl) {
      const tabs = $(`
        <nav class="nav nav-tabs" role="tablist">
          <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#javascript${i}" type="button" role="tab" aria-controls="javascript" aria-selected="true">JavaScript</button>
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#typescript${i}" type="button" role="tab" aria-controls="typescript" aria-selected="false">TypeScript</button>
        </nav>
      `);

      const javascriptElWrapper = $(`
        <div class="tab-pane show active" id="javascript${i}" role="tabpanel" aria-labelledby="javascript-tab"></div>
      `);
      const typescriptElWrapper = $(`
        <div class="tab-pane" id="typescript${i}" role="tabpanel" aria-labelledby="typescript-tab"></div>
      `);

      javascriptElWrapper.append(javascriptEl);
      typescriptElWrapper.append(typescriptEl);

      const tabContent = $('<div class="tab-content"></div>');
      tabContent.append(javascriptElWrapper, typescriptElWrapper);

      snippet.appendChild(tabs[0]);
      snippet.appendChild(tabContent[0]);
    }
  });
};

const updatePreStyle = () => {
  document.querySelectorAll('pre').forEach((preTag) => {
    if (!preTag.classList.contains('line-numbers') && !preTag.classList.contains('nocode-space')) {
      preTag.classList.add('code-space');
    }
  });
};



// Main actions
onRender((url) => {
  if (url.pathname === '/guide/') {
    navigateTo('/guide/overview/what-is-nightwatch.html');
  } else if (url.pathname === '/about/highlights/') {
    navigateTo('/about/highlights/types-of-testing.html');
  }

  const currentPage = url.pathname.split('/')[1];

  sidebarTabsClickEvent(appSidebarState[currentPage]);

  findSelectedTabs(getShortUrl(url), appSidebarState[currentPage]);

  renderCodeTabs();

  updatePreStyle();

  if (currentPage === 'guide') {
    const sidebarFilter = document.querySelector('#sidebar-filter');
    const filterList = document.querySelector('.filter-list');

    if (sidebarFilter && filterList) {
      sidebarFilter.addEventListener('input', createSidebarFilterHandler(sidebarFilter, filterList));
      stopWatchingFilterSidebar = enableKeyboardNavigationInFilterResults(sidebarFilter, filterList);
    }

  }

  if (currentPage === 'api') {
    const sidebarFilter = document.querySelector('#sidebar-filter');
    const filterList = document.querySelector('.filter-list');

    sidebarFilter.addEventListener('input', createAPISidebarFilterHandler(sidebarFilter, filterList));
    stopWatchingFilterSidebar = enableKeyboardNavigationInFilterResults(sidebarFilter, filterList);
  }

}, {forPage: /(\/guide\/|\/api\/|\/about\/)/});

onLeave((currentUrl, nextUrl) => {
  const currentPage = currentUrl.pathname.split('/')[1];

  if ((currentPage === 'guide' || currentPage === 'api') && stopWatchingFilterSidebar) {
    stopWatchingFilterSidebar();
  }

  if (!nextUrl.pathname.includes('guide')) {
    appSidebarState['guide'].clear();
  }

  if (!nextUrl.pathname.includes('api')) {
    appSidebarState['api'].clear();
  }

  if (!nextUrl.pathname.includes('about')) {
    appSidebarState['about'].clear();
  }
}, {forPage: /(\/guide\/|\/api\/|\/about\/)/});
