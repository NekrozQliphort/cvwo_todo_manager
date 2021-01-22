Rails.application.routes.draw do
  root to: 'pages#index'

  namespace :api do
    resources :tasks, except: %i[new edit]
    patch '/tasks/mark_completed/:id', to: 'tasks#mark_completed'
  end

  get '*path', to: 'pages#index', via: :all
end
