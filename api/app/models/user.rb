class User < ApplicationRecord
    has_many :user_sessions, dependent: :destroy

    def self.authenticate email, password
        user = User.find_by_email(email)
        if user == nil
			return nil
		end

		hash = hash_password password
        if user.password == hash
            return user
        else
            return nil
        end
	end

	def self.hash_password password
		Digest::SHA256.hexdigest password
	end

    def self.create_or_update params
        begin
            user = User.find_by_id(params[:id])
            if user.nil?
                user = User.new
            end

            user.name = params[:name]
            user.email = params[:email]
            user.password = User.hash_password(params[:password])
            user.role = params[:role]
            user.save

            return {success: true}
        rescue
            return {success: false, message: "Failed"}
        end      
    end

    def self.destroy_user params
        begin
            User.destroy(params[:id])
            return {success: true}
        rescue
            return {success: false, message: "Failed"}
        end
    end
end
