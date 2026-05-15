const DATA_URL = './data/site.json';
const THEME_KEY = 'psv-theme';

const byId = (id) => document.getElementById(id);

const setText = (id, value = '') => {
  const element = byId(id);
  if (element) element.textContent = value;
};

const createLink = ({ label, href, style = 'secondary' }) => {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  link.className = style === 'primary'
    ? 'rounded-full bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 transition-all duration-300 hover:scale-105 shadow-xl shadow-orange-500/20'
    : 'glass bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full px-7 py-3 hover:scale-105 transition-all duration-300';
  return link;
};

const createIdentityCard = (item) => {
  const card = document.createElement('div');
  card.className = 'glass rounded-3xl p-5 bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10';

  const label = document.createElement('div');
  label.className = 'text-xs uppercase tracking-[0.25em] text-orange-500';
  label.textContent = item.label;

  const title = document.createElement('div');
  title.className = 'mt-2 text-xl font-medium';
  title.textContent = item.title;

  card.append(label, title);
  return card;
};

const createSubsidiaryCard = (company) => {
  const card = document.createElement('article');
  card.className = 'subsidiary-card fade-up glass bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] p-7 hover:-translate-y-2 transition-all duration-500 relative flex flex-col';

  const brandCode = document.createElement('div');
  brandCode.className = 'text-xs uppercase tracking-[0.25em] text-orange-500';
  brandCode.textContent = company.brandCode;

  const title = document.createElement('h3');
  title.className = 'text-2xl font-semibold mt-4';
  title.textContent = company.name;

  const description = document.createElement('p');
  description.className = 'mt-5 text-neutral-600 dark:text-neutral-300 leading-7';
  description.textContent = company.description;

  card.append(brandCode, title);

  if (company.status) {
    const status = document.createElement('div');
    status.className = 'text-xs text-neutral-500 dark:text-neutral-400 mt-3';
    status.textContent = company.status;
    card.appendChild(status);
  }

  card.appendChild(description);

  if (company.url) {
    const link = document.createElement('a');
    link.className = 'mt-auto pt-6 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300';
    link.href = company.url;
    link.textContent = company.cta || 'Visit company';
    card.appendChild(link);
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'mt-auto pt-6 text-sm text-neutral-500 dark:text-neutral-400';
    placeholder.textContent = 'Profile coming soon';
    card.appendChild(placeholder);
  }

  return card;
};

const renderNavigation = (items) => {
  const nav = byId('siteNav');
  nav.replaceChildren();
  items.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    link.className = 'hover:text-black dark:hover:text-white transition';
    nav.appendChild(link);
  });
};

const renderPage = (data) => {
  document.title = data.meta.title;
  byId('metaDescription').content = data.meta.description;
  byId('brandLogo').src = data.brand.logo;
  byId('identityLogo').src = data.brand.secondaryLogo;

  setText('brandName', data.brand.name);
  setText('heroEyebrow', data.hero.eyebrow);
  setText('heroTitle', data.hero.title);
  setText('heroText', data.hero.text);
  setText('identityEyebrow', data.identity.eyebrow);
  setText('identityTitle', data.identity.title);
  setText('aboutEyebrow', data.sections.about.eyebrow);
  setText('aboutTitle', data.sections.about.title);
  setText('aboutText', data.sections.about.text);
  setText('subsidiariesEyebrow', data.sections.subsidiaries.eyebrow);
  setText('subsidiariesTitle', data.sections.subsidiaries.title);
  setText('visionEyebrow', data.sections.vision.eyebrow);
  setText('visionTitle', data.sections.vision.title);
  setText('visionText', data.sections.vision.text);
  setText('footerBrand', data.brand.name);
  setText('footerLabel', data.footer.label);
  setText('footerText', data.footer.text);

  renderNavigation(data.navigation);

  const heroActions = byId('heroActions');
  heroActions.replaceChildren(...data.hero.actions.map(createLink));

  const identityCards = byId('identityCards');
  identityCards.replaceChildren(...data.identity.items.map(createIdentityCard));

  const subsidiaryGrid = byId('subsidiaryGrid');
  subsidiaryGrid.replaceChildren(...data.subsidiaries.map(createSubsidiaryCard));
};

const revealOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(THEME_KEY, theme);
};

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(savedTheme || preferredTheme);

  byId('themeToggle').addEventListener('click', () => {
    const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
};

const init = async () => {
  initTheme();

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Could not load ${DATA_URL}`);
    const data = await response.json();
    renderPage(data);
    revealOnScroll();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML('afterbegin', '<p class="m-6 rounded-2xl bg-red-50 p-4 text-red-700">Site content could not be loaded.</p>');
  }
};

init();
