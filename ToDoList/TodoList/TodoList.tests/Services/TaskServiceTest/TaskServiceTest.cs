using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoList.Repositories.Interfaces;
using TodoList.Services.TaskService.Implementations;
using TodoList.Services.TaskService.Interfaces;
using Task = TodoList.Models.Task;

namespace TodoList.tests.Services.TaskServiceTest
{
    class TaskServiceTest
    {
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private MockRepository<Task> _mockRepository;
        private List<Task> _fakeTasks;
        private ITaskService _taskService;

        [Test]
        public void GetTasks_ReturnsArrayWithLength_3()
        {
            //Arrange
            _mockUnitOfWork.Setup(x => x.GetRepository<Task>()).Returns(_mockRepository);
            _taskService = new TaskService(_mockUnitOfWork.Object);

            //Act
            var result = _taskService.GetTasks();

            //Assert
            Assert.AreEqual(result.Count(), 3);
        }

        [SetUp]
        public void SetUp()
        {
            _fakeTasks = new List<Task>()
            {
                new Task
                {
                    Content = "First Task",
                    Done = false,
                    InProgress = false,
                    ListId = new Guid()
                },
                new Task
                {
                    Content = "Second Task",
                    Done = false,
                    InProgress = false,
                    ListId = new Guid()
                },
                new Task
                {
                    Content = "Third Task",
                    Done = false,
                    InProgress = false,
                    ListId = new Guid()
                },
            };

            _mockRepository = new MockRepository<Task>(_fakeTasks);
            _mockUnitOfWork = new Mock<IUnitOfWork>();
        }
    }
}
