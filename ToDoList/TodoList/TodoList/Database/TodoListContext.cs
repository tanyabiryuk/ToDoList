using Microsoft.EntityFrameworkCore;
using TodoList.Models;

namespace TodoList.Database
{
    public class TodoListContext: DbContext
    {
        public TodoListContext(DbContextOptions<TodoListContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<List> Lists { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }
}
