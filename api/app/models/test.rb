class Test < ApplicationRecord
    has_many :questions, dependent: :destroy

    def self.create_or_update params
        begin
            test = Test.create_or_update_test(params)
            test.questions.destroy_all
            params[:questions].each do |question_params|
                question = Question.create_or_update question_params, test.id
                question_params[:options].each do |option_params|
                    option = Option.create_or_update option_params, question.id
                end
            end 

            return {success: true}
        rescue
            return {success: false, message: "Failed"}
        end
    end

    def self.create_or_update_test params
        item = Test.find_by_id(params[:id])
        if item.nil?
            item = Test.new
        end
    
        item.name = params[:name]
        item.description = params[:description]
        item.save
    
        item
    end

    def self.destroy_test params
        begin
            Test.destroy(params[:id])
            return {success: true}
        rescue
            return {success: false, message: "Failed"}
        end
    end
end
