var sections = $('div#container').find('div.section').map(function() {
  return {
    id: '#' + $(this).attr('id'),
    offset: $(this).offset().top,
    height: $(this).outerHeight()
  };
}),
currentSectionIndex = 0, 
lastScrollPosition = 0,
lastActivatedAnchor = sections[currentSectionIndex].id;
$('a.anchor[href="#greeting"]').addClass('active-anchor');
$('main.main-content').scroll(function() {
  var scrollPosition = $(this).scrollTop();
  var currentSection = sections[currentSectionIndex];
  if (lastScrollPosition < scrollPosition && currentSectionIndex !== sections.length - 1) {
    if (currentSection.offset + currentSection.height / 2 < scrollPosition) {
      while(currentSection.offset < scrollPosition) {
        if (currentSectionIndex !== sections.length - 1) {
          currentSectionIndex = currentSectionIndex + 1;
          currentSection = sections[currentSectionIndex];
        } else break;
      }
      $('a.anchor[href="' + lastActivatedAnchor + '"]').removeClass('active-anchor');
      $('a.anchor[href="' + currentSection.id + '"]').addClass('active-anchor');
      lastActivatedAnchor = currentSection.id;
    }
  } else {
  if ((scrollPosition + (currentSection.height / 2)) < currentSection.offset && currentSectionIndex !== 0) {
    while(currentSection.offset - scrollPosition > 100) {
      if (currentSectionIndex !== 0) {
          currentSectionIndex = currentSectionIndex - 1;
          currentSection = sections[currentSectionIndex];
        } else break;
      }
      $('a.anchor[href="' + lastActivatedAnchor + '"]').removeClass('active-anchor');
      $('a.anchor[href="' + currentSection.id + '"]').addClass('active-anchor');
      lastActivatedAnchor = currentSection.id;
    }
  }
  lastScrollPosition = scrollPosition;
});