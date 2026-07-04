(() => {
  const mobileQuery = window.matchMedia('(max-width: 960px)');

  function setupNav(nav) {
    const toggle = nav.querySelector('.nav-toggle');
    const links = nav.querySelector('.nav-links');
    if (!toggle || !links) return;
    const navItems = Array.from(links.querySelectorAll('.nav-item'));
    const overviewLabels = {
      'ホーム': 'トップ',
      'イベント情報': 'イベント一覧',
      'ブログ': 'ブログ一覧'
    };

    const ensureOverviewLink = (mainLink, submenu) => {
      const href = mainLink.getAttribute('href');
      if (!href || href === '#') return;
      const hasSameLink = Array.from(submenu.querySelectorAll('a')).some((link) => link.getAttribute('href') === href);
      if (hasSameLink || submenu.querySelector('[data-nav-overview="true"]')) return;

      const label = overviewLabels[mainLink.textContent.trim()] || mainLink.textContent.trim();
      const overviewLink = document.createElement('a');
      overviewLink.href = href;
      overviewLink.textContent = label;
      overviewLink.className = 'nav-overview-link';
      overviewLink.dataset.navOverview = 'true';
      submenu.prepend(overviewLink);
    };

    const closeNavItems = (exceptItem = null) => {
      navItems.forEach((item) => {
        const isOpen = item === exceptItem;
        item.classList.toggle('is-open', isOpen);
        const mainLink = item.querySelector('.nav-link-main');
        if (mainLink) mainLink.setAttribute('aria-expanded', String(isOpen));
      });
    };

    const ensureMobileOverviewLinks = () => {
      if (!mobileQuery.matches) return;
      navItems.forEach((item) => {
        const mainLink = item.querySelector('.nav-link-main');
        const submenu = item.querySelector('.nav-submenu');
        if (mainLink && submenu) ensureOverviewLink(mainLink, submenu);
      });
    };

    const setOpen = (open) => {
      if (open) ensureMobileOverviewLinks();
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
        event.preventDefault();
        ensureOverviewLink(mainLink, submenu);
        closeNavItems(item.classList.contains('is-open') ? null : item);
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

    links.addEventListener('click', (event) => {
      if (!mobileQuery.matches) return;
      const link = event.target.closest('a');
      if (!link || !links.contains(link)) return;
      if (link.classList.contains('nav-link-main') && link.closest('.nav-item')?.querySelector('.nav-submenu')) {
        return;
      }
      setOpen(false);
    });

    const resetDesktopNav = () => {
      if (!mobileQuery.matches) {
        setOpen(false);
      } else {
        ensureMobileOverviewLinks();
      }
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
