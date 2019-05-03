class UsersController < ApplicationController
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
<<<<<<< HEAD
    params.require(:user).permit(:name, :email)
=======
    params.require(:user).permit(:id, :name, :email)
>>>>>>> 1669085442edb0b6c58d98151401b28e32e62d82
  end
end
