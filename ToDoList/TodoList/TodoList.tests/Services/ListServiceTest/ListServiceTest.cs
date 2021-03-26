using NUnit.Framework;
using System;
using TodoList.Services.ListService.Interfaces;
using TodoList.Services.ListService.Implementations;
using Moq;
using TodoList.Repositories.Interfaces;
using List = TodoList.Models.List;
using TodoList.Repositories.Implementations;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace TodoList.tests.Services.ListServiceTest
{
    class ListServiceTest
    {
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private MockRepository<List> _mockRepository;
        private List<List> _fakeLists;
        private IListService _listService;

        [Test]
        public void GetLists_ReturnsArrayWithLength_3()
        {
            //Arrange
            _mockUnitOfWork.Setup(x => x.GetRepository<List>()).Returns(_mockRepository);
            _listService = new ListService(_mockUnitOfWork.Object);

            //Act
            var result = _listService.GetLists();

            //Assert
            Assert.AreEqual(result.Count(),3);
        }

        [SetUp]
        public void SetUp()
        {
            _fakeLists = new List<List>()
            {
                new List
                {
                    Id = new Guid(),
                    Title = "First List"
                },
                new List
                {
                    Id = new Guid(),
                    Title = "Second List"
                },
                new List
                {
                    Id = new Guid(),
                    Title = "Third List"
                }
            };

            _mockRepository = new MockRepository<List>(_fakeLists);
            _mockUnitOfWork = new Mock<IUnitOfWork>();
        }
    }
}
