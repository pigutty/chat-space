<<<<<<< HEAD
!!!
%html
  %head
    %meta{:content => "text/html; charset=UTF-8", "http-equiv" => "Content-Type"}/
    %title ChatSpace
    = stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true
    = javascript_include_tag 'application', 'data-turbolinks-track' => true
    = csrf_meta_tags
  %body
    = render partial: 'layouts/flash'
    = yield
=======
require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you’ve limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
 class Application < Rails::Application
   config.generators do |g|
     g.stylesheets false
     g.javascripts false
     g.helper false
     g.test_framework false
   end
   config.i18n.default_locale = :ja
 end
end
>>>>>>> 8c706d4... complete_user_function
