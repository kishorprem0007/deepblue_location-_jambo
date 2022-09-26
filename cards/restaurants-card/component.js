{{> cards/card_component componentName='restaurants-card' }}


class restaurantsCardComponent extends BaseCard['restaurants-card'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
  }
 

  onMount() {
    const onVerticalFullPageMap = !!document.querySelector('.js-answersVerticalFullPageMap');
    onVerticalFullPageMap && registerVerticalFullPageMapCardListeners(this);

    

    const self = this;
    const tabLinks = self._container.querySelectorAll(".tablinks");

    // var tabLinks = document.querySelectorAll(".tablinks");  

    tabLinks.forEach(function(elTab) {
      
      var tabLinksTabsId = elTab.dataset.tabsid;
      
      elTab.addEventListener("click", function (el) {

        var tabsId = el.currentTarget.dataset.tabsid;
        // console.log(el);              
        if( tabLinksTabsId === tabsId ){
                    
          var element = document.getElementById(tabsId);
          // console.log(tabsId);
          // console.log(element.classList.contains("active"));
          if(element.classList.contains("active")){
            element.classList.remove("active");
            document.getElementById("tabs-"+tabsId).classList.remove("active");
            // console.log(["tabs-"+tabsId, "remove-active"]);
          }else{ 
            
            // const tabcontent = self._container.querySelectorAll(".tabcontent"); 
            const tabcontent = document.querySelectorAll(".tabcontent");           
            tabcontent.forEach(function(tc) {
              tc.classList.remove("active");
            });

            // const tabLinks1 = self._container.querySelectorAll(".tablinks"); 
            const tabLinks1 = document.querySelectorAll(".tablinks");     
            tabLinks1.forEach(function(tl) {        
                tl.classList.remove("active");        
            });

            document.getElementById("tabs-"+tabsId).classList.add("active");                     
            element.classList.add("active");
            // console.log(["tabs-"+tabsId, "add-active"])
          }
        }
          
      });

    });  
    

    $('.accordion-container').on('click', '.test', function(){
      $('.set-acc').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.accordion-container').on('click', '.active .test', function(){
      $('.set-acc').removeClass('active');
    });
        
    super.onMount();
  }




  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param {Object} profile of the entity in the card
   */
  dataForRender(profile) {
    const linkTarget = AnswersExperience.runtimeConfig.get('linkTarget') || '_top';    
    
    let opts = {};
    opts.disableOpenStatus = true;
    return {
      title: profile.name, // The header text of the card
      uid: profile.uid, // The header text of the card
      url: "#", // If the card title is a clickable link, set URL here
      target: linkTarget, // If the title's URL should open in a new tab, etc.
      titleEventOptions: this.addDefaultEventOptions(), // The event options for title click analytics
      // subtitle: '', // The sub-header text of the card
    
      hours: Formatter.hoursList(profile, opts),
      deliveryHours: Formatter.deliveryHourslist(profile, opts),
      takeoutHours: Formatter.takeoutHourslist(profile, opts),
      phoneurl: Formatter.phoneLink(profile),


      line1: profile.address.line1,
      line2: profile.address.line2,
      city: profile.address.city,
      postalCode:profile.address.postalCode,

      //testHours: profile.hours.monday.openIntervals[0].start,
      // services: [], // Used for a comma delimited list of services for the location
      address: Formatter.address(profile) || profile.locationString || '', // The address for the card
      phone: Formatter.nationalizedPhoneDisplay(profile), // The phone number for the card
      phoneEventOptions: this.addDefaultEventOptions(), // The analytics event options for phone clicks
      distance: Formatter.toLocalizedDistance(profile), // Distance from the user’s or inputted location
      // details: profile.description, // The description for the card, displays below the address and phone
      // altText: '', // The alt-text of the displayed image
       image: profile.photoGallery ? profile.photoGallery[0].image.url : null, // The URL of the image to display on the card
      showOrdinal: true, // Show the map pin number on the card. Only supported for universal search
      CTA1: { // The primary call to action for the card
        label: 'MORE INFO', // The label of the CTA
        iconName: 'document', // The icon to use for the CTA
        url: "#", // The URL a user will be directed to when clicking
        target: linkTarget, // If the URL will be opened in a new tab, etc.
        eventType: 'CTA_CLICK', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(), // The analytics event options for CTA clicks
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      CTA2: { // The secondary call to action for the card
        label: 'Get Directions',
        iconName: 'directions',
        url: Formatter.getDirectionsUrl(profile),
        target: '_blank',
        eventType: 'DRIVING_DIRECTIONS',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
      },
      CTA3: {
        label: 'Call', // The CTA's label
        iconName: 'phone', // The icon to use for the CTA
        url: Formatter.phoneLink(profile), // The URL a user will be directed to when clicking
        target: 'blank', // Where the new URL will be opened
        eventType: 'TAP_TO_CALL', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
       CTA4: {
        label: 'order now', // The CTA's label
        iconName: '', // The icon to use for the CTA
        url: "#", // The URL a user will be directed to when clicking
       //  iconUrl: 'static/assets/images/deliver.png',
        target: 'blank', // Where the new URL will be opened
        eventType: 'ORDER_NOW', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      feedback: false, // Shows thumbs up/down buttons to provide feedback on the result card
      feedbackTextOnSubmission: 'Thanks!', // Text to display after a thumbs up/down is clicked
      positiveFeedbackSrText: 'This answered my question', // Screen reader only text for thumbs-up
      negativeFeedbackSrText: 'This did not answer my question' // Screen reader only text for thumbs-down
    };
  }

  /**
   * The template to render
   * @returns {string}
   * @override
   */
  static defaultTemplateName (config) {
    return 'cards/restaurants';
  }
}

ANSWERS.registerTemplate(
  'cards/restaurants',
  {{{stringifyPartial (read 'cards/restaurants-card/template') }}}
);
ANSWERS.registerComponentType(restaurantsCardComponent);
