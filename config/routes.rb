Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get "private_event", to: "private_event#index"
  get "camping", to: "camping#index"
  get "drive_in", to: "drive_in#index"
  get "wedding", to: "wedding#index"
  get "concert", to: "concert#index"
end
