class User < ApplicationRecord
    has_many :user_sessions, dependent: :destroy
    validates :email, uniqueness: true

    def self.authenticate email, password
        user = User.find_by_email(email)
		return nil if user.nil?

		hash = hash_password password
        user.password == hash ? user : nil
	end

	def self.hash_password password
		Digest::SHA256.hexdigest password
	end

    def self.create_or_update params
        result = {success: true}
        begin
            user = User.find_by_id(params[:id])
            user = User.new if user.nil?

            user.name = params[:name]
            user.email = params[:email]
            user.password = User.hash_password(params[:password])
            user.role = params[:role]
            user.save!
        rescue Exception => e
            result = {success: false, message: e.message}
        end 
        
        result
    end

    def self.destroy_user params
        result = {success: true}
        begin
            User.destroy(params[:id])
        rescue
            result = {success: false, message: e.message}
        end

        result
    end
end
