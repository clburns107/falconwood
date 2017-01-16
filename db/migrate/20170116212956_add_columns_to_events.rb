class AddColumnsToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :start_time, :datetime
    add_column :events, :end_time, :datetime
    add_column :events, :description, :text
    add_column :events, :notes, :text
    add_column :events, :guest_number, :integer
    add_column :events, :head_table_count, :integer
    add_column :events, :alcohol_order, :text
    add_column :events, :table_arrangement, :text
    add_column :events, :catering_instructions, :text
    add_column :events, :glamp_site_number, :integer
    add_column :events, :ceremony_site, :string
    add_column :events, :schedule, :text
    add_column :events, :rental_fee, :integer
    add_column :events, :ticket_link, :string
    add_column :events, :rating, :string
    add_column :events, :door_time, :datetime
    add_column :events, :presale_ticket_number, :datetime
    add_column :events, :door_ticket_number, :datetime
  end
end
