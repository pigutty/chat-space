$(function(){
  function buildHTML(message){
    var html = `<p>
                  <strong>
                    <a href=/groups/${group.user_id}/messages>${message.user_name}</a>
                    :
                  </strong>
                  ${message.text}
                </p>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('#message_content').val('');
    })
    .fail(function(){
      alert('error');
    });
  });
});
