(function() {
  const form = document.querySelector("#search-form");
  const searchField = document.querySelector("#search-keyword");
  // let searchedForText;
  const responseContainer = document.querySelector("#response-container");
  // To hide the API Key from the Github
  let myUnsplashKey = config.MY_UNSPLASH_KEY;
  let myNYTkey = config.MY_NYT_KEY;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    let searchedForText = searchField.value;

    // function addImage(data) {
    //   // setting a debugger - to stop here
    //   // debugger;
    //   // further
    //   let htmlContent = "";
    //   // const data = JSON.parse(this.responseText);
    //   // observe this in the networks tab
    //   // the response we've got
    //   // below we are just capturing the first image
    //   if (data && data.results && data.results[0]) {
    //     const firstImage = data.results[0];
    //     htmlContent = `<figure>
    //                 <img src="${
    //                   firstImage.urls.regular
    //                 }" alt="${searchedForText}">
    //                 <figcaption>${searchedForText} by ${
    //       firstImage.user.name
    //     }</figcaption>
    //             </figure>`;
    //   } else {
    //     htmlContent = '<div class="error-no-image">No Images Available</div>';
    //   }

    //   responseContainer.insertAdjacentHTML("afterbegin", htmlContent);
    // }
    // searchedForText = 'hippos';
    // const unsplashRequest = new XMLHttpRequest();
    // unsplashRequest.onload = addImage;
    // unsplashRequest.onerror = function(err) {
    //   requestError(err, "image");
    // };
    // unsplashRequest.open(
    //   "GET",
    //   `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
    // );
    // you need to set this request header
    // unsplashRequest.setRequestHeader(
    //   "Authorization",
    //   "Client-ID " + myUnsplashKey
    // );
    // unsplashRequest.send();

    // Using jQuery
    // $.ajax({
    //   url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
    //   headers: {
    //     Authorization: "Client-ID " + myUnsplashKey
    //   }
    // })
    //   .done(addImage)
    //   .fail(function(err) {
    //     requestError(err, "image");
    //   });

    // using fetchAPI
    fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
      {
        headers: {
          Authorization: "Client-ID " + myUnsplashKey
        }
      }
    )
      .then(response => response.json())
      .then(addImage)
      .catch(e => requestError(e, "image"));

    function addImage(data) {
      let htmlContent = "";
      const firstImage = data.results[0];

      if (firstImage) {
        htmlContent = `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${
          firstImage.user.name
        }</figcaption>
            </figure>`;
      } else {
        htmlContent = "Unfortunately, no image was returned for your search.";
      }

      responseContainer.insertAdjacentHTML("afterbegin", htmlContent);
    }

    function requestError(e, part) {
      console.log(e);
      responseContainer.insertAdjacentHTML(
        "beforeend",
        `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`
      );
    }

    //Now for the News
    function addArticles(data) {
      let htmlContent = "";
      //   const data = JSON.parse(this.responseText);
      console.log("addArticles fired");
      if (
        data.response &&
        data.response.docs &&
        data.response.docs.length > 1
      ) {
        console.log("If statement Articles fired");
        htmlContent =
          "<ul>" +
          data.response.docs
            .map(
              article => `<li class="article">
                       <h2><a href="${article.web_url}">${
                article.headline.main
              }</a></h2>
                       <p>${article.snippet}</p>
                </li>`
            )
            .join("") +
          "</ul>";
      } else {
        htmlContent =
          '<div class="error-no-articles">No articles available</div>';
      }

      responseContainer.insertAdjacentHTML("beforeend", htmlContent);
    }
    // const articleRequest = new XMLHttpRequest();
    // articleRequest.onload = addArticles;
    // articleRequest.open(
    //   "GET",
    //   `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=` +
    //     myNYTkey
    // );
    // articleRequest.send();
    // $.ajax({
    //   url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${myNYTkey}`
    // })
    //   .done(addArticles)
    //   .fail(function(err) {
    //     requestError(err, "image");
    //   });

    // using fetchAPI
    fetch(
      `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${myNYTkey}`
    )
      .then(response => response.json())
      .then(addArticles)
      .catch(e => requestError(e, "article"));
  });
})();
