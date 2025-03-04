export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  const link = block.querySelector('a');
  const clipPath = block.classList.contains('clip-path');
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    // Only wrap with a link if clipPath is true
    if (clipPath && link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;

      while (row.firstChild) {
        anchor.appendChild(row.firstChild);
      }

      row.replaceWith(anchor);
    }

    // Process columns for image-specific logic
    const currentRow = clipPath && link ? block.querySelector(`a[href="${link.href}"]`) : row;
    [...currentRow.children].forEach((col, idx) => {
      const pic = col.querySelector('picture');
      let picWrapper;
      if (pic) {
        picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // Picture is the only content in the column
          picWrapper.classList.add('columns-img-col');
        }
      }

      if (picWrapper) {
        currentRow.classList.add(`gradient-${idx === 0 ? 'right' : 'left'}`);
      }
    });
  });
}
