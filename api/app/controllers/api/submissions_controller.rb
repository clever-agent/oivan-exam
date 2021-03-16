class Api::SubmissionsController < Api::ApiController
    # Students submit tests
    def create
        render json: true
    end
end