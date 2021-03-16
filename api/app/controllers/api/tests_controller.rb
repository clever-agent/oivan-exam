class Api::TestsController < Api::ApiController
    def index
        tests =  Test.left_joins(:questions).select('tests.*, COUNT(questions.id) as question_count').group('tests.id')
        render json: tests
    end

    def show
        test = Test.find_by_id(params[:id])
        render json: test.as_json(:include => {:questions => {:include => :options}})
    end     
end