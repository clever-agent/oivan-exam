class Test < ApplicationRecord
    has_many :questions, dependent: :destroy

    def self.create_or_update params
        result = {success: true}
        begin
            test = Test.create_or_update_test(params)
            test.questions.destroy_all
            params[:questions].each do |question_params|
                question = Question.create_or_update question_params, test.id
                question_params[:options].each do |option_params|
                    option = Option.create_or_update option_params, question.id
                end
            end 
        rescue Exception => e
            result = {success: false, message: e.message}
        end

        result
    end

    def self.create_or_update_test params
        item = Test.find_by_id(params[:id])
        item = Test.new if item.nil?
    
        item.name = params[:name]
        item.description = params[:description]
        item.save
    
        item
    end

    def self.destroy_test params
        result = {success: true}
        begin
            Test.destroy(params[:id])
        rescue Exception => e
            {success: false, message: e.message}
        end

        result
    end
end
