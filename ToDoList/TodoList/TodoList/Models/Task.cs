using System;

namespace TodoList.Models
{
    public class Task
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public bool Done { get; set; }
        public bool InProgress { get; set; }
        public Guid ListId { get; set; }
    }
}
