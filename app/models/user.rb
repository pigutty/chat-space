class User < ApplicationRecord
  # Include default devise modules. Others available are:
<<<<<<< HEAD
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
=======
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users
end
>>>>>>> 1669085442edb0b6c58d98151401b28e32e62d82
