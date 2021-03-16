Rails.application.routes.draw do
  post 'auth/login', to: 'auth#login'
  post 'auth/logout', to: 'auth#logout' 

  namespace :portal do
    resources :users
    resources :tests
  end

  namespace :api do
    resources :tests
    resources :submissions
  end
end
