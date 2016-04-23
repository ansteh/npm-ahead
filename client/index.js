(function(document, jQuery){
  jQuery.getJSON('https://registry.npmjs.org/-/_view/byKeyword?startkey=["shape"]&endkey=["shape",{}]&group_level=3', function(res){
    console.log(res);
  });

  var source = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(obj) { console.log(obj); return obj.word; },
    remote: {
      url: 'https://registry.npmjs.org/-/_view/byKeyword?startkey=["%QUERY"]&endkey=["%QUERY",{}]&group_level=3',
      wildcard: '%QUERY'
    }
  });

  jQuery(document).ready(function(){

    jQuery('#suggestion .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    }, {
      name: 'suggestions',
      display: 'value',
      source: source,
      limit: 9,
      templates: {
        empty: [
          '<div class="empty-message">',
            'unable to find any package that match the current keyword',
          '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div>{{word}}</div>')
      }
    });

    jQuery('#suggestion .typeahead').bind('typeahead:select', function(event, suggestion) {
      //console.log('Selection: ', suggestion);
    });
  });


}(document, jQuery));
