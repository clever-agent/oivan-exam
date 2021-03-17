class Portal::PortalController < ApplicationController
    before_action :auth_portal

    def auth_portal
        authenticate UserRole::TEACHER        
    end
end