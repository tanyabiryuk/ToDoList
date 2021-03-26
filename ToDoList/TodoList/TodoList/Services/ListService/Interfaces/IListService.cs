using System;
using System.Collections.Generic;
using TodoList.Models;
using Task = System.Threading.Tasks.Task;

namespace TodoList.Services.ListService.Interfaces
{
    public interface IListService
    {
        List GetList(Guid id);
        IEnumerable<List> GetLists();
        Task UpdateList(List updatedList);
        Task DeleteList(Guid id);
        Task CreateList(List List);
    }
}
