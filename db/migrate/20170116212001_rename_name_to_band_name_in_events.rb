class RenameNameToBandNameInEvents < ActiveRecord::Migration[5.0]
  def change
  	rename_column :events, :name, :band_name
  end
end
