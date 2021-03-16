class CreateUserSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :user_sessions do |t|
      t.string :token
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
