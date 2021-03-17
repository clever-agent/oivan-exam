class Api::TestsController < Api::ApiController
    def index
        tests =  Test.left_joins(:questions).select('tests.*, COUNT(questions.id) as question_count').group('tests.id')
        render json: tests.as_json(only: [:id, :name, :description, :question_count])
    end

    def show
        test = Test.find_by_id(params[:id])        
        test_fields = [:id, :name, :description]
        question_fields = [:id, :content, :test_id]
        option_fields = [:id, :content, :question_id]
        render json: test.as_json(only: test_fields, include: {:questions => {only: question_fields, include: {options: {only: option_fields }}}})
    end     
end