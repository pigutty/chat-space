$(function(){
  function buildHTML(message){
    var image = "";
    image = (message.image !== null)?  `<img src="${message.image}" class="content__message__image"></img>` : "" ;
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="content">
                    <div class="content__header">
                      <div class="content__header__user-name">${message.user_name}</div>
                      <div class="content__header__message__date">${message.created_at}</div>
                    </div>
                    <p class="content__message__text">${message.content}</p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  var url = window.location.href;

  var reloadMessages = function() {
    last_message_id = $('.message').eq(-1).attr('data-id');
    reload_url_pattern = /messages/;
    result = url.replace(reload_url_pattern,'api/messages');
    $.ajax({
      url: result,
      type: "GET",
      dataType: 'json',
      data: { last_id: last_message_id },
      processData: false,
      contentType: false
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        if (message.id > last_message_id) {
          insertHTML += buildHTML(message);
        }
      })
      $('.right-middle-content').append(insertHTML);
      var height = $('.right-middle-content')[0].scrollHeight;
      $('.right-middle-content').animate({scrollTop:height});
    })
    .fail(function(){
      console.log('自動更新に失敗しました');
    })
  };

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
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
      $('.right-middle-content').append(html);
      var height = $('.right-middle-content')[0].scrollHeight;
      $('.right-middle-content').animate({scrollTop:height});
      $('#message_content').val('');
      $('.hidden').val('');
    })
    .fail(function(){
      console.log('メッセージの送信に失敗しました');
    });
    return false;
  });

  var group_view_url_pattern = /\/groups\/\d+\/messages/;
  var result = url.match(group_view_url_pattern);
  if (result) {
    setInterval(reloadMessages, 5000);
  }
  else {
    console.log('グループの表示画面でないです。');
  }
});
