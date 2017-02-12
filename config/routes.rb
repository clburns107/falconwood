Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get "private_events", to: "private_events#index"
  get "camping", to: "camping#index"
  get "drive_in", to: "drive_in#index"
  get "weddings", to: "weddings#index"
  get "live_music", to: "live_music#index"
end
