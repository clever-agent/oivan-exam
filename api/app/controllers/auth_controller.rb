class AuthController < ApplicationController
    skip_before_action :verify_authenticity_token

    def login
        user = User.authenticate params[:email], params[:password]
        token = nil
        user_id = nil
        if !user.nil? #&& user.role == UserRole::TEACHER
            token = Token.generate user
            user_id = user.id
            UserSession.create(user_id: user.id, token: token)
        end

        render json: {token: token, user_id: user_id}
    end

    def logout
        user_session = UserSession.find_by_token(params[:token])
        if user_session.nil?
            render json: {logout: false}
        else
            user_session.delete
            render json: {logout: true}
        end
    end
end