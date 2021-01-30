module Api
  class TasksController < ApplicationController
    def index
      ongoing_tasks = Task.includes(:tags).where('deadline > ? AND completed = ?', DateTime.now, false).as_json(include: :tags)
      completed_tasks = Task.includes(:tags).where(completed: true).as_json(include: :tags)
      render json: { ongoing: ongoing_tasks, completed: completed_tasks }
    end

    def create
      task = Task.new(task_params)
      begin
        task.transaction do
          task.save!
          task.tags = tags_params.map { |tag_params| Tag.where(tag_params).first_or_create!(tag_params) }
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: task.errors }, status: 422
        return
      end
      render json: task
    end

    def update
      task = Task.find(params[:id])
      begin
        task.transaction do
          task.update!(task_params)
          task.tags = tags_params.map { |tag_params| Tag.where(tag_params).first_or_create!(tag_params) }
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: task.errors }, status: 422
        return
      end
      render json: task
    end

    def show
      task = Task.includes(:tags).find(params[:id]).as_json(include: :tags)
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
      params.require(:task).permit(:title, :remarks, :deadline)
    end

    def tags_params
      params[:tags].empty? ? [] : params.require(:tags).map { |p| p.permit(:name) }
    end
  end
end
