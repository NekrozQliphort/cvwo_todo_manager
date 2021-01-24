module Api
  class TasksController < ApplicationController
    def index
      tasks = Task.includes(:tags).all.as_json(include: :tags)
      render json: tasks
    end

    def create
      task = Task.new(task_params)
      if task.save
        render json: task
      else
        render json: { error: task.errors }, status: 422
      end
    end

    def update
      task = Task.find(params[:id])
      if task.update(task_params)
        render json: task
      else
        render json: { error: task.errors }, status: 422
      end
    end

    def show
      task = Task.find(params[:id])
      render json: task
    end

    def destroy
      task = Task.find(params[:id])
      if task.destroy
        head :no_content
      else
        render json: { error: task.errors }, status: 422
      end
    end

    def mark_completed
      task = Task.find(params[:id])
      if task.update({ completed: true })
        render json: task
      else
        render json: { error: task.errors }, status: 422
      end
    end

    private

    def task_params
      params.require(:task).permit(:title, :remarks, :deadline, added_tags: [:name], deleted_tags: [:name])
    end
  end
end
