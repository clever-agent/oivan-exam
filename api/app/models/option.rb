class Option < ApplicationRecord
  belongs_to :question

  def self.create_or_update params, question_id
    item = Option.find_by_id(params[:id])
    item = Option.new if item.nil?

    item.content = params[:content]
    item.is_correct = params[:is_correct]
    item.question_id = question_id
    item.save

    item
  end
end
