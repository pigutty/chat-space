require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you’ve limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
 class Application < Rails::Application
  config.action_view.field_error_proc = Proc.new do |html_tag, instance| 
    html_tag
  end
   config.generators do |g|
     g.stylesheets false
     g.javascripts false
     g.helper false
     g.test_framework false
   end
   config.i18n.default_locale = :ja
 end
end