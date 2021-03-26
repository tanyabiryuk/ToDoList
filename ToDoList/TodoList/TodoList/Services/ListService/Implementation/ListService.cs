using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Models;
using TodoList.Repositories.Interfaces;
using TodoList.Services.ListService.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace TodoList.Services.ListService.Implementations
{
    public class ListService : IListService
    {

        private readonly IRepository<List> _ListRepository;
        private readonly IUnitOfWork _unitOfWork;
        public ListService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _ListRepository = _unitOfWork.GetRepository<List>();
        }
        public List GetList(Guid id) => _ListRepository.GetOne(e => e.Id == id);

        public IEnumerable<List> GetLists() => _ListRepository.GetAll();

        public async Task UpdateList(List updatedList)
        {
            var List = _ListRepository.GetOne(e => e.Id == updatedList.Id);
            List.Title = updatedList.Title;
            _ListRepository.Update(List);
            await _unitOfWork.SaveChanges();
        }

        public async Task DeleteList(Guid id)
        {
            var List = _ListRepository.GetOne(e => e.Id == id);
            _ListRepository.Remove(List);
            await _unitOfWork.SaveChanges();
        }

        public async Task CreateList(List List)
        {
            if (_ListRepository.GetOne(e => e.Title == List.Title) == null)
            {
                _ListRepository.Add(List);
                await _unitOfWork.SaveChanges();
            }
        }
    }
}
