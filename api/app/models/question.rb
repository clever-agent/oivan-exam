class Question < ApplicationRecord
    belongs_to :test
    has_many :options, dependent: :destroy

    def self.create_or_update params, test_id
        item = Question.find_by_id(params[:id])
        item = Question.new if item.nil?

        item.content = params[:content]
        item.test_id = test_id
        item.save

        item
    end
end
