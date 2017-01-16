class RenameBandNameToEventName < ActiveRecord::Migration[5.0]
  def change
  	rename_column :events, :band_name, :event_name
  end
end
