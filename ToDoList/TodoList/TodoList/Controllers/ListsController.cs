using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TodoList.Models;
using TodoList.Repositories.Interfaces;
using TodoList.Services.ListService.Interfaces;

namespace TodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly IListService _listService;

        public ListsController(IListService listService)
        {
            _listService = listService;
        }

        // GET: api/Lists
        [HttpGet]
        public IEnumerable<List> GetLists() => _listService.GetLists();        

        // PUT: api/Lists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(List list)
        {
            await _listService.UpdateList(list);
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Post(List list)
        {
            await _listService.CreateList(list);
            return Ok(list);
        }

        // DELETE: api/Lists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(List list)
        {
            await _listService.DeleteList(list.Id);
            return Ok(list);
        }
    }
}
