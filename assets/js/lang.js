var rootUrl = "http://localhost/search/";
// Check local storage for language
if (localStorage.getItem('lang') !== null) {
  lang = localStorage.getItem('lang');
} else {
  // Get 2 digit language code
  var lang = navigator.language || navigator.userLanguage;
  lang = lang.substr(0, 2);
  switch (lang) {
    case 'es':
      lang = 'es';
      break;
    default:
      lang = 'en';
      break;      
  }
    
}

// Function to switch language with json file
function switchLang(lang, rootUrl) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);   

      // Set language 
      document.title = data.pageTitle;
      document.getElementById('lang').innerHTML = data.language;
      document.getElementById('login').innerHTML = data.login;
      document.getElementById('about').innerHTML = data.about;
      document.getElementById('searchLink').innerHTML = data.searchLink;
    }
  };
  xhttp.open("GET", rootUrl + "assets/json/" + lang + ".json?v=4", true);
  xhttp.send();

  // Set language in local storage
  localStorage.setItem('lang', lang);
}

// Call function to switch language
switchLang(lang, rootUrl);

// Switch language on click
document.getElementById('langSwitch').addEventListener('click', function() {
  if (lang === 'es') {
    lang = 'en';
  } else {
    lang = 'es';
  }
  switchLang(lang, rootUrl);
});      