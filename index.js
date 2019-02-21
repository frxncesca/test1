
/**
 * main
 * 
 * Invoked when the page is loaded.
 * All custom JS code can go within this function.
 */

function main () {

  console.log("Welcome to fran.world!");

  function getAssetUrl (caseStudyNum, assetType) {
    let onContactPage = !!~window.location.href.indexOf('contact');
    
    if (onContactPage) {
      if (assetType == 'GIF') {
        return `url(../assets/gifs/gif${caseStudyNum}.gif)`
      }

      else {
        return `url(../assets/static/static${caseStudyNum}.PNG)`
      }
    }

    else {
      if (assetType == 'GIF') {
        return `url(assets/gifs/gif${caseStudyNum}.gif)`
      }

      else {
        return `url(assets/static/static${caseStudyNum}.PNG)`
      }
    }
  }

  /**
   * onHoverCaseStudy
   * 
   * When we hover over a case study, it will
   * switch to animating that GIF.
   */

  function onHoverCaseStudy () {
    let caseStudyNum = $(this).attr('data-cs');
    $(this)
    .children()
    .first()
    .css("background-image", getAssetUrl(caseStudyNum, 'GIF'));
  }

  /**
   * onHoverLeaveCaseStudy
   * 
   * When we move off of hovering a case study, it will deactivate
   * the GIF that is currently showing.
   */

  function onHoverLeaveCaseStudy () {
    let caseStudyNum = $(this).attr('data-cs');
    $(this)
    .children()
    .first()
    .css("background-image", getAssetUrl(caseStudyNum, 'STATIC'));
  }

  /**
   * Get viewport height, gridTop and gridBottom
   */

  let windowHeight = window.innerHeight;
  let gridTop = windowHeight * .10;
  let gridBottom = windowHeight * .90;

  /**
   * TODO: This needs a little bit of tweaking
   */

  function onScroll () {

    /**
     * We will only check the scrolling event if the viewport
     * is less than 1100px.
     */

    if ($(window).width() <= 1100) {

      // On each scroll check if `case-study-wrapper` is in interested viewport
      $('.case-study-wrapper').each(function() {

        // Get the `top` of this `case-study-wrapper`
        let thisTop = $(this).offset().top - $(window).scrollTop(); 

        // Check if this element is in the interested viewport
        if (thisTop >= gridTop && (thisTop + $(this).height()) <= gridBottom) {
          let caseStudyNum = $(this).attr('data-cs');
          $(this)
          .children()
          .first()
          .css("background-image", getAssetUrl(caseStudyNum, 'GIF'));
        } 
        
        else {
          let caseStudyNum = $(this).attr('data-cs');
          $(this)
          .children()
          .first()
          .css("background-image", getAssetUrl(caseStudyNum, 'STATIC'));
        }
      });
    }
  }

  // Link event handlers
  $(".case-study-wrapper").hover(onHoverCaseStudy, onHoverLeaveCaseStudy); 
  $(window).on('scroll', onScroll);

}

// Load
$(document).ready(main)