using System;
using System.Collections.Generic;
using TodoList.Models;
using Task = System.Threading.Tasks.Task;

namespace TodoList.Services.TaskService.Interfaces
{
    public interface ITaskService
    {
        Models.Task GetTask(Guid id);
        IEnumerable<Models.Task> GetTasks();
        Task UpdateTask(Models.Task updatedTask);
        Task DeleteTask(Guid id);
        Task CreateTask(Models.Task Task);
    }
}
