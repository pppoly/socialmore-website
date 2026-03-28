(() => {
  const mobileQuery = window.matchMedia('(hover: none) and (pointer: coarse) and (max-width: 768px)');

  function setupNav(nav) {
    const toggle = nav.querySelector('.nav-toggle');
    const links = nav.querySelector('.nav-links');
    if (!toggle || !links) return;
    const navItems = Array.from(links.querySelectorAll('.nav-item'));

    const closeNavItems = (exceptItem = null) => {
      navItems.forEach((item) => {
        const isOpen = item === exceptItem;
        item.classList.toggle('is-open', isOpen);
        const mainLink = item.querySelector('.nav-link-main');
        if (mainLink) mainLink.setAttribute('aria-expanded', String(isOpen));
      });
    };

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      if (!open) closeNavItems();
    };

    navItems.forEach((item) => {
      const mainLink = item.querySelector('.nav-link-main');
      const submenu = item.querySelector('.nav-submenu');
      if (!mainLink || !submenu) return;

      mainLink.setAttribute('aria-expanded', 'false');
      mainLink.addEventListener('click', (event) => {
        if (!mobileQuery.matches) return;
        if (!item.classList.contains('is-open')) {
          event.preventDefault();
          closeNavItems(item);
        }
      });
    });

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setOpen(!nav.classList.contains('is-open'));
    });

    document.addEventListener('click', (event) => {
      if (!mobileQuery.matches) return;
      if (!nav.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileQuery.matches) setOpen(false);
      });
    });

    const resetDesktopNav = () => {
      if (!mobileQuery.matches) setOpen(false);
    };

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', resetDesktopNav);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(resetDesktopNav);
    }

    setOpen(false);
  }

  function init() {
    document.querySelectorAll('.nav').forEach(setupNav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
