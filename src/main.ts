import './style.css';
import { pwaFeatures } from './data';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="container">
  <header class="header">
    <h1>PWAFire Demo</h1>
    <p class="header-subtitle">Explore Progressive Web App features with this interactive demo</p>
    
    <div class="search-container">
      <span class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <input type="text" id="search-input" class="search-input" placeholder="Search features...">
    </div>
  </header>
  
  <div class="accordion">
    ${pwaFeatures
      .map(
        (feature) => `
      <div class="accordion-item" id="${
        feature.id
      }" data-title="${feature.title.toLowerCase()}" data-description="${feature.description.toLowerCase()}">
        <div class="accordion-header">
          <div class="accordion-icon">${feature.icon}</div>
          <div class="accordion-title">${feature.title}</div>
          <div class="accordion-arrow">▼</div>
        </div>
        <div class="accordion-content">
          <p class="feature-description">${feature.description}</p>
          
          ${
            feature.id === 'share'
              ? `
            <div class="file-input-wrapper">
              <label class="file-input-label" for="share-file-input">Select files to share:</label>
              <input type="file" id="share-file-input" class="file-input" multiple accept="image/*,application/pdf">
            </div>
          `
              : ''
          }
          
          <div class="button-group">
            ${feature.actions
              .map(
                (action) => `
              <button class="button ${
                action.primary ? 'button-primary' : ''
              }" id="${action.id}">${action.label}</button>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `
      )
      .join('')}
  </div>
  
  <div class="no-results">No matching features found</div>
  
  <footer>
    <p>Powered by <a href="https://pwafire.org" target="_blank">PWAFire</a> | <a href="https://github.com/pwafire/pwafire" target="_blank">GitHub</a></p>
  </footer>
</div>
`;

document.addEventListener('DOMContentLoaded', function () {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');

    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach((accordionItem) => {
        accordionItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  if (accordionItems.length > 0) {
    accordionItems[0].classList.add('active');
  }

  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  const fileInput = document.getElementById('share-file-input');
  if (fileInput) {
    fileInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    fileInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const fileCount = target.files?.length || 0;
      if (fileCount > 0) {
        const fileButton = document.getElementById('share-files');
        if (fileButton) {
          fileButton.textContent = `Share ${fileCount} ${
            fileCount === 1 ? 'File' : 'Files'
          }`;
        }
      }
    });
  }

  const searchInput = document.getElementById(
    'search-input'
  ) as HTMLInputElement;
  const noResults = document.querySelector('.no-results') as HTMLElement;

  searchInput?.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let matchCount = 0;

    accordionItems.forEach((item) => {
      const title = item.getAttribute('data-title') || '';
      const description = item.getAttribute('data-description') || '';

      if (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        searchTerm === ''
      ) {
        item.classList.remove('hidden');
        matchCount++;
      } else {
        item.classList.add('hidden');
        item.classList.remove('active');
      }
    });

    if (matchCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';

      if (
        searchTerm !== '' &&
        document.querySelector('.accordion-item.active.hidden')
      ) {
        const firstVisibleItem = document.querySelector(
          '.accordion-item:not(.hidden)'
        );
        if (firstVisibleItem) {
          firstVisibleItem.classList.add('active');
        }
      }
    }
  });
});
