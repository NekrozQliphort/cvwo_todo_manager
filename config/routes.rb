Rails.application.routes.draw do
  root to: 'pages#index'

  namespace :api do
    resources :tasks, only: %i[index create]
  end

  get '*path', to: 'pages#index', via: :all
end
