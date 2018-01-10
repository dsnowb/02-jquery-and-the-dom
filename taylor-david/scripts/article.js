'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE
//The purpose of this function is to instantiate new Article objects which will eventually be used to append new content into the DOM based on the article template in index.html. The rawDataObj is one of the objects that exists in the rawData array in blogArticles.js - each of those will be passed as arguments into this constructor function.

function Article(rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  for (let property in rawDataObj) this[property] = rawDataObj[property];
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // PUT YOUR RESPONSE HERE
  // Cloning the article allows us to create a "custom version" of the template that exists in index.html where we replace the placeholder content with the content that exists in the given Article object.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.find('address a').text(this.author);
  $newArticle.find('address a').attr('href', this.authorUrl);
  $newArticle.find('header h1').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').attr('datetime',this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

for(let i = 0; i < rawData.length; i++) {
  articles.push(new Article(rawData[i]));
}

for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml());
}
