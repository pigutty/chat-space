Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
<<<<<<< HEAD
=======
  root 'messages#index'
  resources :users, only: [:edit, :update]
>>>>>>> 8c706d4... complete_user_function
end
