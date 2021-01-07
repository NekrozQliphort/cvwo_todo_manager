class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :remarks
      t.datetime :deadline

      t.timestamps
    end
  end
end
