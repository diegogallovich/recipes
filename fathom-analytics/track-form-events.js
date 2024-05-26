/*
    This scripts are used to track form events like form submission, form abandonment, etc.

    For fathom event docs visit: https://usefathom.com/docs/features/events
*/

/*
    1.
    Track form submissions & identify the form with a name

    Adding this script to every page will track form submissions and identify the submission event with a name.
*/
window.addEventListener('DOMContentLoaded', () => {
  const forms = Array.from(document.querySelectorAll('form'));

  forms.forEach((form) => {
    form.addEventListener('submit', () => {
      const formName = form.name; // 🚨 Make sure your forms have a name attribute
      fathom.trackEvent(`${formName} Submitted`);
    });
  });
});
