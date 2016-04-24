(function(document, jQuery){
  jQuery.getJSON('/search?q=shape', function(res){
    console.log(res);
  });

  var source = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(obj) { console.log(obj); return obj.word; },
    remote: {
      url: '/search?q=%QUERY',
      wildcard: '%QUERY'
    }
  });

  jQuery(document).ready(function(){

    jQuery('#suggestion .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    }, {
      name: 'package-suggestions',
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
