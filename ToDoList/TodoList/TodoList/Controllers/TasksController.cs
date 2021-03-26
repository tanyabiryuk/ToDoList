using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Models;
using TodoList.Repositories.Interfaces;
using TodoList.Services.TaskService.Interfaces;

namespace TodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/Tasks
        [HttpGet]
        public IEnumerable<Models.Task> GetTasks() => _taskService.GetTasks();

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Models.Task task)
        {
            await _taskService.UpdateTask(task);
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Models.Task task)
        {
            await _taskService.CreateTask(task);
            return Ok(task);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Models.Task task)
        {
            await _taskService.DeleteTask(task.Id);
            return Ok(task);
        }
    }
}
