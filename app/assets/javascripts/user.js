$(document).on('turbolinks:load', function() {
    var search_list = $('#user-search-result');
    var preWord ;

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">${"追加"}</div>
                  </div>`
      search_list.append(html);
    }

    function editElement(element) {
      var result = "^" + element;
      return result;
    }

    function appendErrMsgToHTML(msg) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${msg}</p>
                  </div>`
      search_list.append(html);
    }

    var member_list = $("#chat-group-users");

    function addUser(userId,userName){
      var html = `<div id='chat-group-users'>
                    <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                      <input name='group[user_ids][]' type='hidden' value='${userId}'>
                        <p class='chat-group-user__name'>${userName}</p>
                        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                    </div>`;
      member_list.append(html);
    }

    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      var inputs = input.split(" ").filter(function(a) { return a;});
      var newInputs = inputs.map(editElement);
      var word = newInputs.join("|");
      var reg = RegExp(word);
      if (word != preWord){

        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input},
          dataType: 'json'
        })

        .done(function(users) {
          $('#user-search-result').empty();
          if (input.length !== 0) {
            if (users.length !== 0) {
              users.forEach(function(user){
                appendUser(user);
              });
            }
            else {
              appendErrMsgToHTML("一致するユーザーはいません");
            }
          }
        })
        .fail(function() {
          alert('検索に失敗しました');
        })
      }
      preWord = word;
    });

    $(document).on("click", ".user-search-add", function (){
      $('#chat-group-users').val();
      var user_id = $(this).attr('data-user-id');
      var user_name = $(this).attr('data-user-name');
      addUser(user_id, user_name);
      $(this).parent().remove();
    });

    $(document).on("click", ".user-search-remove", function(){
      $(this).parent().remove();
    })
});
