class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :event_name
      t.datetime :start_time
      t.datetime :end_time
      t.text :description
      t.text :notes
      t.integer :guest_number
      t.integer :head_table_count
      t.text :alcohol_order
      t.text :table_arrangement
      t.text :catering_instructions
      t.integer :glamp_site_number
      t.string :ceremony_site
      t.text :schedule
      t.integer :rental_fee
      t.string :ticket_link
      t.string :rating
      t.datetime :door_time
      t.datetime :presale_ticket_number
      t.datetime :door_ticket_number

      t.timestamps
    end
  end
end
