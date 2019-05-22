$(function(){
  function buildHTML(message){
    var image = (message.image !== null)?  `<img src="${message.image}" class="content__message__image"></img>` : "" ;
    var html = `<div class="message">
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
      document.getElementById('new_message').reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
});
