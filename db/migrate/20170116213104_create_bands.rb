class CreateBands < ActiveRecord::Migration[5.0]
  def change
    create_table :bands do |t|
      t.string :band_name
      t.datetime :start_time
      t.datetime :end_time
      t.text :description
      t.text :notes
      t.string :facebook_link
      t.string :instagram_link
      t.string :twitter_link
      t.string :youtube_link
      t.string :website_link
      t.text :rider
      t.datetime :load_in_time
      t.datetime :sound_check_time
      t.text :pay_agreement
      t.integer :settled_amount
      t.integer :event_id

      t.timestamps
    end
  end
end
