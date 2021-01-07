module Api
  class TasksController < ApplicationController
    def index
      tasks = Task.all
      render json: tasks
    end

    def create
      task = Task.new(create_params)
      if task.save
        render json: task
      else
        render json: { error: task.errors }, status: 422
      end
    end
  end

  private

  def create_params
    params.require(:task).permit(:title, :content, :deadline)
  end
end
