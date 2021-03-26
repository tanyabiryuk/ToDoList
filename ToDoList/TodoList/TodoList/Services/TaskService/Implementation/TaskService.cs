using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Models;
using TodoList.Repositories.Interfaces;
using TodoList.Services.TaskService.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace TodoList.Services.TaskService.Implementations
{
    public class TaskService : ITaskService
    {

        private readonly IRepository<Models.Task> _TaskRepository;
        private readonly IUnitOfWork _unitOfWork;
        public TaskService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _TaskRepository = _unitOfWork.GetRepository<Models.Task>();
        }
        public Models.Task GetTask(Guid id) => _TaskRepository.GetOne(e => e.Id == id);

        public IEnumerable<Models.Task> GetTasks() => _TaskRepository.GetAll();

        public async Task UpdateTask(Models.Task updatedTask)
        {
            var Task = _TaskRepository.GetOne(e => e.Id == updatedTask.Id);
            Task.Content = updatedTask.Content;
            Task.Done = updatedTask.Done;
            Task.InProgress = updatedTask.InProgress;
            _TaskRepository.Update(Task);
            await _unitOfWork.SaveChanges();
        }

        public async Task DeleteTask(Guid id)
        {
            var Task = _TaskRepository.GetOne(e => e.Id == id);
            _TaskRepository.Remove(Task);
            await _unitOfWork.SaveChanges();
        }

        public async Task CreateTask(Models.Task Task)
        {
            if (_TaskRepository.GetOne(e => e.Content == Task.Content) == null)
            {
                _TaskRepository.Add(Task);
                await _unitOfWork.SaveChanges();
            }
        }
    }
}
