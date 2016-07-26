
$(function() {

  function uibindings(){
    $( "#submit" ).click(function( event ) {
      var desc = $("#description").val();
      if(desc.length == 0){
        $('#invalid').show();
        return
      }
      $('#invalid').hide();
      var notes =  localStorage['notes'];
      if(notes)
        notes = JSON.parse(notes);
      else
        notes = [];
      notes.push(desc);
      localStorage['notes'] = JSON.stringify(notes);
      $('#no-notes').hide();
      var $el = $("#sortable");
      $el.append($("<li class=\"ui-state-default note\">")
        .html("<button id=\"noteDel\" name=\"delete\" class=\"delete\" type=\"button\">Delete</button><div clas=\"content\">"+ desc+"</div>"));
      $("#description").val('');
    });

    $("#sortable").on("click", "li .delete",function(e) {
      var notes = JSON.parse(localStorage['notes']);
      var element = $(this).siblings("div").text();
      notes = _.without(notes,element);
      if (notes.length == 0){
        localStorage.removeItem('notes');
        $('#no-notes').show();
      }else{
        localStorage['notes'] = JSON.stringify(notes);
      }
      $(this).parent().remove();
      return false;
    });
  }
  

  function loadData(){
    var notes =  localStorage['notes'];
    if(notes != undefined && notes.length >= 1){
      notes = JSON.parse(notes);
      var $el = $("#sortable");
      $el.empty();
      $.each(notes, function(index, value) {
            $el.append($("<li class=\"ui-state-default note\">")
              .html("<button id=\"noteDel\" name=\"delete\" class=\"delete\" type=\"button\">Delete</button><div clas=\"content\">"+ value+"</div>"));
        });
      
    }else{
      $('#no-notes').show();
    }
    uibindings();
  }
  loadData();
});